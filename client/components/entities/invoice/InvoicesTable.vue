<template>
  <el-scrollbar class="scrollTable">
    <el-table
      ref="multipleTableRef"
      :data="storeInvoice.searchTableData"
      style="width: 100%"
      @selection-change="storeInvoice.handleSelectionChange"
      height="calc(100vh - 160px)"
    >
      <el-table-column
        property="selection"
        type="selection"
        width="55"
        show-overflow-tooltip
      />
      <el-table-column type="index" width="55" show-overflow-tooltip />
      <el-table-column
        property="number"
        label="Номер"
        width="200"
        show-overflow-tooltip
      />
      <el-table-column
        property="summa"
        label="Сумма"
        width="300"
        show-overflow-tooltip
      />
      <el-table-column
        property="date"
        type="date"
        label="Дата"
        width="300"
        show-overflow-tooltip
      />
      <el-table-column
        property="nameProvider"
        label="Поставщик"
        show-overflow-tooltip
      />
    </el-table>
  </el-scrollbar>
</template>
<script lang="ts" setup>
import { useInvoiceTableStore } from "~~/stores/invoiceTableStore";
const storeInvoice = useInvoiceTableStore();
</script>


