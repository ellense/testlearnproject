export default defineNuxtConfig({
  ssr: true,
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
      title: 'УКУК',
      htmlAttrs: {
        lang: 'ru',
      },
      meta: [
        { charset: 'utf-8' },
        {
          name: 'Коммерческие условия',
          content: 'width=device-width, initial-scale=1',
        },
      ],
      link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }],
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
