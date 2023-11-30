<template>
  <el-scrollbar class="scrollTable">
    <el-table
      ref="multipleTableRef"
      :data="storeProduct.searchTableData"
      style="width: 100%"
      @selection-change="storeProduct.handleSelectionChange"
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
        property="name"
        label="Наименование"
        width="300"
        show-overflow-tooltip
      />
      <el-table-column
        property="nameProvider"
        label="Поставщик"
        width="300"
        show-overflow-tooltip
      />
      <el-table-column property="category" label="Категория" />
    </el-table>
  </el-scrollbar>
</template>

<script lang="ts" setup>
import { useProductTableStore } from "~~/stores/productTableStore";
const storeProduct = useProductTableStore();
</script>

<style scoped>
/* .el-button--text {
  margin-right: 15px;
} */
</style>
