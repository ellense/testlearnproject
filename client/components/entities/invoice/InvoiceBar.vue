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
import { useInvoiceStore } from "~~/stores/invoiceStore";

const invoiceStore = useInvoiceStore();
</script>

<style scoped></style>
