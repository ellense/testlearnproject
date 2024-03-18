<template>
  <div class="directoryBar">
    <h2>Товары</h2>
    <div class="directoryBar_filter">
      <el-input v-model="searchQuery" placeholder="Поиск по номеру и наименованию" style="max-width: 400px; min-width: 100px; width: 300px;"
        :prefix-icon="Search" size="small"></el-input>
    </div>
  </div>
</template>

<script setup lang="ts">
import { Search } from "@element-plus/icons-vue";
import { useProductStore } from "~~/stores/productStore";

const searchQuery = ref('');
watch(searchQuery, (newValue: string) => {
  useProductStore().performSearch(newValue);
});
</script>

<style scoped></style>
