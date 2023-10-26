// import { ref, Ref } from 'vue';

// interface Locale {
//   code: string;
//   name: string;
// }

// interface Messages {
//   [key: string]: { [key: string]: string };
// }

// const locales: Locale[] = [
//   {
//     code: 'en',
//     name: 'English',
//   },
  
// ];

// const messages: Messages = {
//   en: {
//     msg: 'count is',
//   },
  
// };

// const locale: Ref<Locale | undefined> = ref();
// export const t = useI18n().t;

// export function useI18n() {
//   function initI18n(code: string) {
//     setLocale(code);
//   }

//   async function setLocale(code: string) {
//     if (locale.value?.code !== code) {
//       locale.value = locales.find((l) => l.code === code);
//     }
//   }

//   function t(msg: string, param: string | null = null): string {
//     let val = msg
//       .split('.')
//       .reduce((value, part) => value[part], messages[locale.value?.code]);
//     if (param) {
//       val = val.replace('{0}', param);
//     }
//     return val;
//   }

//   return {
//     t,
//     locale,
//     locales,
//     initI18n,
//     setLocale,
//   };
// }