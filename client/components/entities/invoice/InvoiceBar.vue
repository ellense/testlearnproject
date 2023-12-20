<template>
    <div class="directoryBar">
      <h2>Накладные поставок</h2>
        <el-input
          v-model="invoiceStore.search"
          placeholder="Поиск"
          style="max-width: 400px"
          :prefix-icon="Search"
        />
    </div>
  </template>
  
  <script setup lang="ts">
  import { Search } from "@element-plus/icons-vue";
  import { useInvoiceTableStore } from "~~/stores/invoiceTableStore";
  
  const invoiceStore = useInvoiceTableStore();
  
  </script>
  
  <style scoped></style>