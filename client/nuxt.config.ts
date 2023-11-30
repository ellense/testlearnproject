export default defineNuxtConfig({
  imports: {
    presets: [
      {
        from: "vue-i18n",
        imports: ["useI18n"],
      },
    ],
  },

  devtools: {
    enabled: true,
  },
  app: {
    head: {
      title: "Ретро-бонус",
    },
  },
  runtimeConfig: {
    public: {
      apiBase: process.env.API_BASE_URL || "no-url",
    },
  },
  css: ["~/assets/css/main.css"],
  modules: ["@pinia/nuxt", "@element-plus/nuxt"],

  pinia: {
    autoImports: [
      "defineStore", 
      ["defineStore", "definePiniaStore"],
    ],
  },
});
