import { defineStore } from "pinia";
import message from 'element-plus/es/components/message'
import { AUTH } from "../composables/api";
import type {
  AuthStore,
  UserRole,
  TokenData,
} from "~/utils/types/authTypes";

export const useAuthStore = defineStore("authStore", {
  state: (): AuthStore => ({
    access: null,
    refresh: null,
    userRole: null,
    authPromise: null,
    isAuth: false,
    initPage: false,
  }),

  actions: {
    setInitPage(value: boolean) {
      this.$state.initPage = value;
    },

    async initAuth() {
      // Попытка получения токена из локального хранилища
      const tokenFromLS = await this.getTokenFromLS();

      // Если токен успешно получен, устанавливаем флаг авторизации
      if (tokenFromLS) {
        this.setAuth(true);
        this.setInitPage(true);
      } else {
        this.setAuth(false);
        this.setInitPage(true);
      }
    },

    setAuth(value: boolean) {
      this.$state.isAuth = value;
    },

    async getTokenFromLS(): Promise<string | null> {
      const accessT = localStorage.getItem("accessToken");

      if (accessT && accessT.length > 30) {
        // Возвращаем токен, если он существует
        return accessT;
      }

      // Если токен не существует, возвращаем null
      return null;
    },

    setTokenToStore(tokenData: Omit<TokenData, "userRole">) {
      this.$state.access = tokenData.access;
      this.$state.refresh = tokenData.refresh;
    },

    async login(authData: { username: string; password: string }): Promise<void> {
      try {
        const tokenResponse = await AUTH.getToken(authData);

        if (tokenResponse) {
          this.setTokenToStore(tokenResponse);
          this.$state.userRole = tokenResponse.userRole || "admin";
          localStorage.setItem("userRole", this.$state.userRole);
          this.setAuth(true);
        } else {
          this.setAuth(false);
        }
      } catch (error) {
        this.setAuth(false);
        console.error(error);
        throw error; // Пересылаем ошибку для обработки в компоненте
      }
    },

    logout() {
      this.$reset();
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
      localStorage.clear();
      this.setAuth(false);
      useRouter().push("/graphic")
      message.success("Вы вышли из личного кабинета");
      return Promise.resolve();
    },
  },
});


