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
import { useProductTableStore } from "~~/stores/productTableStore";

const productStore = useProductTableStore();
</script>

<style scoped></style>
