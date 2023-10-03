<template>
  <div>
    <p>Введите два числа</p>
    <el-input-number
      v-model="number1"
      size="normal"
      label="Введите 1 число"
      :min="1"
      :max="10"
      :step="1"
      :controls="true"
      controls-position="both"
      @change=""
    >
    </el-input-number>
    <el-input-number
      v-model="number2"
      size="normal"
      label=""
      :min="1"
      :max="10"
      :step="1"
      :controls="true"
      controls-position="both"
      @change=""
    >
    </el-input-number>

    <el-button @click="store.multiply()">Показать результат</el-button>
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

const store = useMultiplyStore();
const { number1, number2, result, history } = storeToRefs(store);
</script>

<style scoped></style>
