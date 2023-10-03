<template>
  <el-scrollbar height="calc(100vh - 60px)">
    <h2>Товары</h2>
    <el-table :data="tableData" :style="{ width: '100%' }">
      <el-table-column prop="nameProduct" label="Наименование" width="180" />
      <el-table-column prop="providerProduct" label="Поставщик" width="180" />
      <el-table-column prop="category" label="Категория" />
    </el-table>
    <invoiceTableComponent />
  </el-scrollbar>
</template>

<script lang="ts" setup>
import { ref } from "vue";

const item = {
  nameProduct: "2016-05-02",
  providerProduct: "Tom",
  adcategorydress: "No. 189, Grove St, Los Angeles",
};
const tableData = ref(Array.from({ length: 30 }).fill(item));
</script>
