// https://nuxt.com/docs/api/configuration/nuxt-config



export default defineNuxtConfig({
  imports: {
    presets: [
      {
        from: 'vue-i18n',
        imports: ['useI18n']
      }
    ]
  },

  devtools: {
    enabled: true,
  },
  app: {
    head: {
      title: "Ретро-бонус",
    },
  
  },
  css: ["~/assets/css/main.css"],
  modules: 
   [ "@pinia/nuxt",
   "@element-plus/nuxt",
],
   
  pinia: {
    autoImports: [
      // automatically imports `defineStore`
      "defineStore", // import { defineStore } from 'pinia'
      ["defineStore", "definePiniaStore"], // import { defineStore as definePiniaStore } from 'pinia'
    ],
  },
});
