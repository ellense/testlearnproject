<template>
  <div v-for="product in products" :key="product.id">
    <h2>{{ product.name }}</h2>
  </div>
</template>

<script setup lang="ts">
import axios from '~/plugins/axios';
const {$axiosPlugin} = useNuxtApp();
 const products = ref([]);
 const token = localStorage.getItem('ваш_ключ_токена');

//  const config = { 
//   headers: { 
//     'Authorization': `Bearer ${token}`,  
//   }, 
// };
 await $axiosPlugin.get("api/entitieslist")
 .then(response => {
    products.value = response.data
 })
 .catch(error => {
    // Обработка ошибок
    if (error.response) {
      // Сервер вернул код ответа, отличный от 2xx
      console.error('Ошибка запроса. Код ответа:', error.response.status);
      console.error('Детали ошибки:', error.response.data);
      // Дополнительные действия, связанные с обработкой конкретного статуса, например, 404
      if (error.response.status === 404) {
        console.error('Ресурс не найден');
      }
    } else if (error.request) {
      // Запрос был отправлен, но не получен ответ
      console.error('Ошибка запроса. Запрос был отправлен, но не получен ответ.');
    } else {
      // Возникла ошибка при настройке запроса
      console.error('Ошибка запроса. Детали ошибки:', error.message);
    }
  });
</script>

<style scoped></style>
