<template>
    <el-scrollbar class="scrollTable">
      <el-table
        style="width: 100%"
        height="calc(100vh - 700px)"
      >
        <el-table-column type="index" width="55" show-overflow-tooltip />
        <el-table-column
          property="number"
          label="Тип номенклатуры"
          width="200"
          show-overflow-tooltip
        />
        <el-table-column
          property="Товар"
          label="Сумма"
          width="300"
          show-overflow-tooltip
        />
        <el-table-column
          property="Категория"
          type="date"
          label="Дата"
          width="300"
          show-overflow-tooltip
        />
        <el-table-column
          property="Производитель"
          label="Поставщик"
          show-overflow-tooltip
        />
        <el-table-column
          property="Торговая марка"
          label="Поставщик"
          show-overflow-tooltip
        />
      </el-table>
    </el-scrollbar>
  </template>
  <script lang="ts" setup>
  // import { useInvoiceTableStore } from "~~/stores/invoiceTableStore";
  // const storeInvoice = useInvoiceTableStore();
  </script>
  
  
  