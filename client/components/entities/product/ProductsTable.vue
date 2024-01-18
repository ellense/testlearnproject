<template>
  <el-scrollbar class="scrollTable">
    <el-table
      :data="tableData"
      style="width: 100%"
      height="calc(100vh - 185px)"
    >
      <el-table-column
        prop="itemid"
        label="ID"
        width="100"
        show-overflow-tooltip
      />
      <el-table-column
        prop="name"
        label="Наименование"
        width="500"
        show-overflow-tooltip
      />
      <el-table-column
        prop="classifier_name"
        label="Категория"
        width="400"
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

<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { ref, onMounted, watch } from "vue";
import type { IProduct } from "~/utils/types/directoryTypes";

import { useProductStore } from "~~/stores/productStore";
const { getProducts, pagination, countRowTable } = storeToRefs(
  useProductStore()
);
const tableData = ref<IProduct[]>(getProducts.value);

watch(getProducts, (value) => {
  console.log("Table Data:", value);
  tableData.value = value || [];
});

const scrollToTop = () => {
  window.scrollTo(0, 0);
};

const paginationChange = (page: number) => {
  useProductStore().fetchProductsList(page);
  scrollToTop();
};

onMounted(async () => {
  try {
    await useProductStore().fetchProductsList();
  } catch (error) {
    console.error("Ошибка при загрузке данных", error);
  }
});
</script>

<style scoped></style>
