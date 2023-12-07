import { ЕAccessScopes } from './utils/types/authTypes'

declare module '#app' {
  interface PageMeta {
    permission?: ЕAccessScopes[]
    displayOrder?: number
    title?: string
    useInMainMenu?: boolean
  }
}
export {}
