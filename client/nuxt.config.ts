export default {
  ssr: false,
  imports: {
    presets: [
      {
        from: "vue-i18n",
        imports: ["useI18n"],
      },
    ],
  },
  devtools: {
    enabled: false,
  },
  app: {
    head: {
      title: "УКУК",
      htmlAttrs: {
        lang: "ru",
      },
      meta: [
        { charset: "utf-8" },
        {
          name: "Коммерческие условия",
          content: "width=device-width, initial-scale=1",
        },
      ],
      link: [{ rel: "icon", type: "image/x-icon", href: "/favicon.ico" }],
    },
  },
  runtimeConfig: {
    public: {
      API: {
        BASE_URL: process.env.VITE_BASE_URL || "",
        REFRESH_URL: process.env.VITE_REFRESH_URL || "",
        LOGIN_URL: process.env.VITE_LOGIN_URL || "",
        ACCESS_KEY: process.env.VITE_ACCESS_KEY || "",
        REFRESH_KEY: process.env.VITE_REFRESH_KEY || "",
      },
    },
  },
  css: ["~/assets/css/main.css"],
  modules: ["@pinia/nuxt", "@element-plus/nuxt"],

  pinia: {
    autoImports: ["defineStore", ["defineStore", "definePiniaStore"]],
  },
};
