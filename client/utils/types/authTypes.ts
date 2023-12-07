export interface AuthStore {
    access: string | null
    refresh: string | null
    userRole: UserRole | null
    authPromise: any | null
    isAuth: boolean
    initPage: boolean
  }
  export interface UserData {
    username: string | null
    ready: any | null
  }
   export interface AuthApiData {
    username: string
    password: string
  }
  export interface TokenData {
    access: string
    refresh: string
    userRole: UserRole
  } 
  export interface GetUserData {
    login: string
  }
  export type UserRole = 'admin' | 'manager' 
  export type AccessScopes = UserRole | 'all' | 'none'