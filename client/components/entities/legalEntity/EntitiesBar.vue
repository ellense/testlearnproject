<template>
  <div class="directoryBar">
    <h2>Юридические лица</h2>
    <el-input v-model="searchQuery" placeholder="Поиск" style="max-width: 400px" :prefix-icon="Search"></el-input>
  </div>
</template>

<script setup lang="ts">
import { Search } from "@element-plus/icons-vue";
import { useEntityTableStore } from "~~/stores/entityTableStore";

const searchQuery = ref('');

watch(searchQuery, (newValue: string) => {
  useEntityTableStore().performSearch(newValue);
});


</script>

<style scoped></style>
