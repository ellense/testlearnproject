<template>
  <div class="directoryBar">
    <h2>Товары</h2>
    <el-input
      v-model="productStore.search"
      placeholder="Поиск"
      style="max-width: 400px"
      :prefix-icon="Search"
    />
  </div>
</template>

<script setup lang="ts">
import { Search } from "@element-plus/icons-vue";
import { useProductStore } from "~~/stores/productStore";

const productStore = useProductStore();
</script>

<style scoped></style>
