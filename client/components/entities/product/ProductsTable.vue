<template>
  <el-scrollbar class="scrollTable">
    <el-table :data="tableData" style="width: 100%" height="calc(100vh - 185px)">
      <el-table-column prop="itemid" label="Номер" width="100" show-overflow-tooltip />
      <el-table-column prop="name" label="Наименование" width="500" show-overflow-tooltip />
      <el-table-column prop="classifier_name" label="Категория" width="400" show-overflow-tooltip />
      <el-table-column prop="brand_name" label="Бренд" />
    </el-table>
  </el-scrollbar>
  <div v-if="pagination?.count && pagination.count > countRowTable" class="pagination">
    <el-pagination v-model:pageSize="pageSize" :page-sizes="[50, 100, 300, 500]"
      :page-count="Math.ceil(pagination.count / pageSize)" layout="sizes, prev, pager, next"
      @size-change="handleSizeChange" @current-change="paginationChange" />
  </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { ref, onMounted, watch } from "vue";
import type { IProduct } from "~/utils/types/directoryTypes";
import { useProductStore } from "~~/stores/productStore";

const { getProducts, pagination } = storeToRefs(
  useProductStore()
);
const { countRowTable } = useProductStore();
const pageSize = ref(countRowTable);
const tableData = ref<IProduct[]>(getProducts.value);

const handleSizeChange = async (val: number) => {
  pageSize.value = val;
  useProductStore().setCountRowTable(val);
  try {
    await useProductStore().fetchProductsList();
  } catch (error) {
    console.error("Ошибка при загрузке данных", error);
  }
};

watch(getProducts, (value) => {
  tableData.value = value || [];
});

const paginationChange = (page: number) => {
  useProductStore().fetchProductsList(page);
};

onMounted(async () => {
  try {
    await useProductStore().fetchProductsList();
  } catch (error) {
    console.error("Ошибка при загрузке данных", error);
  }
});
</script>
