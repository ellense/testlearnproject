<template>
  <div class="directoryBar">
    <h3>Накладные поставок</h3>
    <div class="directoryBar_filter">
      <el-input v-model="searchQuery" placeholder="Фильтр по номеру накладной" clearable
        style="max-width: 300px; min-width: 100px; width: 200px;" size="small"></el-input>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useInvoiceStore } from "~~/stores/invoiceStore";
const store = useInvoiceStore();

//для поиска
const searchQuery = ref('');
watch(searchQuery, (newValue: string) => {
  store.performSearch(newValue);
});

</script>

<style scoped></style>
