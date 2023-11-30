import { defineStore } from "pinia";

interface loginData {
  id: number;
  email: string;
  password: string;
}

export const useAuthStore = defineStore("AuthStore", {
  state: () => ({
    currentUser: null as loginData | null,
    accessToken: null as string | null,
    refreshToken: null as string | null,
  }),
  getters: {
    isLoggedIn: (state) => {
      return !!state.accessToken;
    },
  },
  actions: {
    login({ email, password }: { email: string; password: string }) {
      if (email === "test@example.com" && password === "password") {
        this.accessToken = "fake_access_token";
        this.refreshToken = "fake_refresh_token";
        this.currentUser = { email, id: 1, password};
      } else {
        console.error("Ошибка аутентификации");
      }
    },
    logout() {
      this.accessToken = null;
      this.refreshToken = null;
      this.currentUser = null;
    },
  },
});


