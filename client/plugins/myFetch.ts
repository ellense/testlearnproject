import type { NitroFetchRequest, NitroFetchOptions } from 'nitropack'
import { createFetchError } from 'ofetch'
import { defineNuxtPlugin } from '#app'
 
interface StrAnyObj {
  [key: string]: any
}
 
interface RequestOptions {
  isBearer?: boolean
  params?: StrAnyObj
  data?: any
}
interface Tokens {
  access: string
  refresh: string
}
 
interface isBearer {
  isBearer?: boolean
}
 
interface PublicApi {
  BASE_URL: string
  REFRESH_URL: string
  LOGIN_URL: string
  ACCESS_KEY: string
  REFRESH_KEY: string
  TIMEOUT?: number | string
}
 
declare global {
  function $Post<T>(apiUrl: string, options: RequestOptions): Promise<T>
  function $Delete<T>(apiUrl: string, options: RequestOptions): Promise<T>
  function $Put<T>(apiUrl: string, options: RequestOptions): Promise<T>
  function $Get<T>(apiUrl: string, options: RequestOptions): Promise<T>
  function $Authorization(options: RequestOptions): Promise<Tokens | null>
  function $AuthorizationBase(options: RequestOptions): Promise<Tokens | null>
  function $RefreshToken(): Promise<Tokens | string | undefined>
}
 
export default defineNuxtPlugin(() => {
  const config: PublicApi = useRuntimeConfig().public.API
  const ls: Storage = localStorage
  const token = reactive<Partial<Tokens>>({
    access: ls.getItem(config.ACCESS_KEY) || undefined,
    refresh: ls.getItem(config.REFRESH_KEY) || undefined,
  })
 
  const setToken = (data: Tokens) => {
    token.access = data.access
    token.refresh = data.refresh
  }
 
  watch(
    () => token.access,
    (value) => (value ? ls.setItem(config.ACCESS_KEY, value) : undefined)
  )
  watch(
    () => token.refresh,
    (value) => (value ? ls.setItem(config.REFRESH_KEY, value) : undefined)
  )
 
  let promise: any = null
  globalThis.$fetch = $fetch.create({
    ignoreResponseError: true,
    baseURL: config.BASE_URL,
    timeout: typeof config.TIMEOUT === 'string' ? undefined : config.TIMEOUT,
    async onRequest({ options }) {
      const optionsWithIsBearer: typeof options & isBearer = options
 
      const isBearer: boolean = optionsWithIsBearer.isBearer || false
      if (isBearer) {
        const access = token.access || (await $RefreshToken())
        if (!access) throw new Error('bad token')
        options.headers = {
          ...options.headers,
          Authorization: `Bearer ${access}`,
        }
      }
 
      options.headers = {
        ...options.headers,
      }
    },
 
    async onResponse({ request, options, response }) {
      if (response.ok) return
      const optionsWithIsBearer: typeof options & isBearer = options
      const isBearer: boolean = optionsWithIsBearer.isBearer || false
 
      if (response.status === 401 && isBearer) {
        token.access = undefined
 
        if (request === config.REFRESH_URL) {
          throw new Error('logout')
        }
 
        try {
          response._data = await $fetch(
            request,
            options as NitroFetchOptions<NitroFetchRequest>
          )
          return
        } catch (e) {
          throw createFetchError({ request, options, response })
        }
      }
      return Promise.reject(response)
    },
    onRequestError({ request, options, response }) {
      return Promise.reject(response)
    },
  })
 
  globalThis.$Post = async <T>(
    apiUrl: string,
    options: RequestOptions
  ): Promise<T> => {
    return await $fetch(apiUrl, {
      method: 'POST',
      body: { ...options.data },
      params: { ...options.params },
      isBearer: options.isBearer,
    })
  }
  globalThis.$Get = async <T>(
    apiUrl: string,
    options: RequestOptions
  ): Promise<T> => {
    return await $fetch(apiUrl, {
      method: 'GET',
      params: { ...options.params },
      isBearer: options.isBearer,
    })
  }
  globalThis.$Delete = async <T>(
    apiUrl: string,
    options: RequestOptions
  ): Promise<T> => {
    return await $fetch(apiUrl, {
      method: 'DELETE',
      body: { ...options.data },
      params: { ...options.params },
      isBearer: options.isBearer,
    })
  }
  globalThis.$Put = async <T>(
    apiUrl: string,
    options: RequestOptions
  ): Promise<T> => {
    return await $fetch(apiUrl, {
      method: 'PUT',
      body: { ...options.data },
      params: { ...options.params },
      isBearer: options.isBearer,
    })
  }
 
  globalThis.$AuthorizationBase = async <
    T extends { access: string; refresh: string },
  >(
    options: RequestOptions
  ): Promise<T | null> => {
    const res = await $fetch<T>(config.LOGIN_URL, {
      method: 'POST',
      headers: {
        Authorization: `Basic ${btoa(
          options.data.username + ':' + options.data.password
        )}`,
      },
    })
 
    const { access, refresh } = res
    if (access && refresh) {
      ls.setItem('accessToken', access)
      ls.setItem('refreshToken', refresh)
      setToken({ access, refresh })
      return { access, refresh } as T
    }
    return res
  }
 
  globalThis.$Authorization = async (
    options: RequestOptions
  ): Promise<Tokens | null> => {
    const res = (await $Post(config.LOGIN_URL, options)) as any
 
    const { access, refresh } = res as Tokens
    if (access && refresh) {
      ls.setItem('accessToken', access)
      ls.setItem('refreshToken', refresh)
      setToken({ access, refresh })
      return { access, refresh }
    }
    return res
  }
 
  globalThis.$RefreshToken = async function updateTokens(): Promise<
    Tokens | string | undefined
  > {
    if (token.refresh) {
      if (promise === null)
        promise = $fetch(config.REFRESH_URL, {
          method: 'post',
          body: { refresh: token.refresh },
          onRequest() {},
          onResponse() {},
        })
 
      let tokens: any
 
      try {
        tokens = await promise
        if (tokens?.access) {
          token.access = tokens.access
          if (tokens.refresh) token.refresh = tokens.refresh
        } else {
          token.refresh = undefined
        }
      } finally {
        promise = null
      }
    }
    return token.access
  }
})