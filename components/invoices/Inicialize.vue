<template></template>

<script lang="ts" setup>
import { useInvoiceTableStore } from "~~/stores/invoiceTableStore";

const initializeTableData = () => {
  if (useInvoiceTableStore().tableData.length === 0) {
    // Добавление двух сущностей при инициализации хранилища
    useInvoiceTableStore().tableData.push({
      id: 1,
      number: 347568679,
      summa: 43643626,
      date: "2023/9/21",
      nameProvider: "Minni",
    });
    useInvoiceTableStore().tableData.push({
      id: 2,
      number: 78453234,
      summa: 46533,
      date: "2021/8/18",
      nameProvider: "Minni",
    });
  }
};
initializeTableData();
</script>
