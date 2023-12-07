import { defineStore } from "pinia";
import message from "element-plus/es/components/message";
import { AUTH } from "../composables/api";
import {
  AuthApiData,
  AuthStore,
  TokenData,
  UserRole,
} from "~/utils/types/authTypes";

let tokenPromiseResolve: () => void;
const tokenReadyPromise = new Promise<void>((resolve) => {
  tokenPromiseResolve = resolve;
});

function isCorrectRole(value: string): UserRole | undefined {
  if (
    value === "admin" ||
    value === "managerLama" ||
    value === "managerOutsourcing"
  )
    return value as UserRole;

  return undefined;
}

export const useAuthStore = defineStore("authStore", {
  state: (): AuthStore => ({
    access: null,
    refresh: null,
    userRole: null,
    authPromise: tokenReadyPromise,
    isAuth: false,
    initPage: false,
  }),
  getters: {},
  actions: {
    initAuth() {
      this.getTokenFromLS()
        .then((res) => {
          if (res && this.getUserDataFromLS()) {
            this.setAuth(true);
          } else {
            this.setAuth(false);
            this.resetDataForLs();
          }
        })
        .finally(() => {
          tokenPromiseResolve();
        });
    },
    setAuth(value: boolean) {
      this.$state.isAuth = value;
    },
    setInitPage(value: boolean) {
      this.$state.initPage = value;
    },
    getUserDataFromLS(): boolean {
      this.$state.userRole = localStorage.getItem("userRole") as UserRole;
      return !!isCorrectRole(this.$state.userRole);
    },
    getTokenFromLS(): Promise<boolean> {
      const accessT = localStorage.getItem("accessToken");
      const refreshT = localStorage.getItem("refreshToken");

      if (accessT && refreshT && accessT.length > 30 && refreshT.length > 30) {
        this.setTokenToStore({ access: accessT, refresh: refreshT });
        return Promise.resolve(true);
      } else {
        return Promise.resolve(false);
      }
    },
    resetDataForLs() {
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.removeItem("userRole");
    },
    async getTokenForApi(authData: AuthApiData): Promise<TokenData> {
      let tokenResponse: TokenData | null;
      try {
        tokenResponse = (await AUTH.getToken(authData)) as TokenData | null;
      } catch (e) {
        return Promise.reject(e);
      }

      if (tokenResponse) {
        this.setTokenToStore(tokenResponse);
        this.$state.userRole = tokenResponse.userRole || "admin";
        localStorage.setItem("userRole", this.$state.userRole);
        return tokenResponse;
      } else {
        return Promise.reject(tokenResponse);
      }
    },
    setTokenToStore(tokenData: Omit<TokenData, "userRole">) {
      this.$state.access = tokenData.access;
      this.$state.refresh = tokenData.refresh;
    },
    logout() {
      this.$reset();
      this.resetDataForLs();
      this.setAuth(false);
      useRouter().push("/graphic");
      message.success("Вы вышли из личного кабинета");
    },
  },
});
