// @ts-ignore
import VueExcelEditor from 'vue3-excel-editor'
import { defineNuxtPlugin } from '#app'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.vueApp.use(VueExcelEditor)
})
