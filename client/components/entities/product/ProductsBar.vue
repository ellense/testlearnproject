<template>
  <div class="directoryBar">
    
    <h2>Поставщики</h2>
    <div class="directoryBar_filter">
    
  
  <el-input v-model="searchQuery" placeholder="Поиск по номеру и наименованию" style="width: 400px;" :prefix-icon="Search"></el-input>

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
