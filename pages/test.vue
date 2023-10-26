<template>
    <div>
      <p>Текущая локаль: {{ currentLocale }}</p>
    </div>
  </template>
  
  <script>
  export default {
    computed: {
      currentLocale() {
        return this.$i18n.locale;
      }
    }
  };
  </script>