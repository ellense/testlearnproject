<template>
  <form @submit.prevent="login">
    <div>
      <input type="text" v-model="form.email" placeholder="почта" />
    </div>
    <div>
      <input type="text" v-model="form.username" placeholder="Логин" />
    </div>
    <div>
      <input type="text" v-model="form.password" placeholder="пароль" />
    </div>
    <button type="submit">Войти</button>
  </form>
  
</template>

<script setup lang="ts">
import { ref } from 'vue';
const products = ref<Array<{ id: number; name: string }>>([]);
const form = ref({
    username: '',
    password: '',
    email: '',
})
const {$axiosPlugin} = useNuxtApp()
 

const login = async () => {
await $axiosPlugin.post('auth/token/login', {
    username:form.value.username,
    password: form.value.password,
    email: form.value.email,
})
.then(response => {
    console.log(response)
    console.log("успешно")
    localStorage.setItem('ваш_ключ_токена', response.data.auth_token);
})
.catch(error => {console.error('Ошибка при запросе:', error.message);
  console.error('Детали ошибки:', error);})
 } 
</script>

<style scoped></style>
