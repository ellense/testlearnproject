<template>
  <div v-for="product in products" :key="product.id">
    <h2>{{ product.completed }}</h2>
  </div>
</template>

<script setup lang="ts">
//import {axiosPlugin} from "~~/plugins/axios";
const {$axiosPlugin} = useNuxtApp();
 const products = ref([]);
 await $axiosPlugin.get("/todos")
 .then(response => {
    // console.log(response)
    products.value = response.data
 })
 .catch(error => console.error(error))
</script>

<style scoped></style>
