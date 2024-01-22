<template>
    <div class="buttonBar_search">
        <el-input
          placeholder="Поиск"
          style="width: 200px"
          :prefix-icon="Search"
        />
      </div>
    <el-scrollbar class="scrollTableFiltres">
      
      <el-table style="width: 100%" height="300" :data="tableData">
        <el-table-column
          property="selection"
          type="selection"
          width="55"
          show-overflow-tooltip
        />
        <el-table-column
        prop="itemid"
        label="ID"
        width="100"
        show-overflow-tooltip
      />
      <el-table-column
        prop="name"
        label="Наименование"
        width="100"
        show-overflow-tooltip
      />
      <el-table-column
        prop="classifier_name"
        label="Категория"
        width="100"
        show-overflow-tooltip
      />
      <el-table-column prop="brand_name" label="Бренд" />
      </el-table>
      
    </el-scrollbar>
    <div
    v-if="pagination?.count && pagination.count > countRowTable"
    class="pagination"
  >
    <el-pagination
      layout="prev, pager, next"
      :page-count="Math.ceil(pagination.count / countRowTable)"
      @current-change="paginationChange"
    />
  </div>
  </template>
  
  <script setup lang="ts">
import { Search } from "@element-plus/icons-vue";
import { storeToRefs } from "pinia";
import { ref, onMounted, watch } from "vue";
import type { IProduct } from "~/utils/types/directoryTypes";

import { useKuStore } from "~~/stores/kuStore";
const { getProduct, pagination, countRowTable } = storeToRefs(
  useKuStore()
);
const tableData = ref<IProduct[]>(getProduct.value);

watch(getProduct, (value) => {
  tableData.value = value || [];
});

const paginationChange = (page: number) => {
  useKuStore().fetchProductKuList(page);
};

onMounted(async () => {
  try {
    await useKuStore().fetchProductKuList();
  } catch (error) {
    console.error("Ошибка при загрузке данных", error);
  }
});
  </script>
  
  <style scoped></style>