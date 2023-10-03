<template>
  <div>
    <p>Введите два числа</p>
    <input v-model="number1" type="number" placeholder="Введите число 1" />
    <input v-model="number2" type="number" placeholder="Введите число 2" />
    <button @click="store.multiply()">Показать результат</button>
    <p v-if="result">Результат умножения: {{ result }}</p>
    <h2>История результатов:</h2>
    <ul>
      <li v-for="(item, index) in history" :key="index">{{ item }}</li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useMultiplyStore } from "~~/stores/multiplyStore";

const store =  useMultiplyStore()
const { number1, number2, result, history } = storeToRefs(store);

</script>

<style scoped></style>
