<template>
  <vue-resizable minWidth=500 maxWidth=1350 width="1200px" active="[ 'r']" style="border: 1px solid var(--el-border-color);  height: calc(100vh - 130px);
  border-radius: 2px; ">
  <div>
      <el-table :data="tableData" height="calc(100vh - 130px)" style="width: 100%; " v-loading="loading" :border="true" @sort-change="handleSortChange" stripe>
        <el-table-column prop="itemid" label="Номер" width="90" show-overflow-tooltip sortable />
        <el-table-column prop="name" label="Наименование" width="450" show-overflow-tooltip sortable/>
        <el-table-column prop="classifier_name" label="Категория" width="400" show-overflow-tooltip />
        <el-table-column prop="brand_name" label="Бренд" show-overflow-tooltip />
      </el-table>
    <div v-if="pagination?.count && pagination.count > countRowTable" class="pagination">
      <el-pagination v-model:pageSize="pageSize" small :page-sizes="[50, 100, 300, 500]"
        :page-count="Math.ceil(pagination.count / pageSize)" layout="sizes, prev, pager, next, total"
        @size-change="handleSizeChange" @current-change="paginationChange" :total="pagination.count"/>
    </div>
  </div>
</vue-resizable>
</template>

<script lang="ts" setup>
import { storeToRefs } from "pinia";
import VueResizable from 'vue-resizable'
import { ref, onMounted, watch } from "vue";
import { useProductStore } from "~~/stores/productStore";
import type { IProduct } from "~/utils/types/productTypes";
const store = useProductStore()
const { getProducts, pagination, countRowTable } = storeToRefs(
  useProductStore()
);

const pageSize = ref(countRowTable);
const tableData = ref<IProduct[]>(getProducts.value);
const loading = ref()
const handleSizeChange = async (val: number) => {
  pageSize.value = val;
  useProductStore().setCountRowTable(val);
  try {
    await useProductStore().getProductFromAPIWithFilter();
  } catch (error) {
    console.error("Ошибка при загрузке данных", error);
  }
};

watch(getProducts, (value) => {
  tableData.value = value || [];
});

const handleSortChange = async ({ page, prop, order  }: { page: number, prop: string, order: string }) => {
  try {
    store.pagination = null
    store.sortProp = prop; // поле, по которому сортируем
    store.sortOrder = order === 'ascending' ? 'asc' : 'desc'; // порядок сортировки
    console.log("(поле, порядок) = (", store.sortProp,",", store.sortOrder, ")");
    await store.getProductFromAPIWithFilter(page, store.sortProp, store.sortOrder);
  } catch (error) {
    console.error("Ошибка при загрузке данных", error);
  }
};

const paginationChange = (page: number) => {
  useProductStore().setFilterValue('page', page);
  useProductStore().getProductFromAPIWithFilter(page, store.sortProp, store.sortOrder);
};

onMounted(async () => {
  try {
    loading.value = true;
    await useProductStore().getProductFromAPIWithFilter();
    loading.value = false;
  } catch (error) {
    loading.value = false;
    console.error("Ошибка при загрузке данных", error);
  }
});
</script>
<style scoped>
.scrollTableProduct {
  min-width: calc(100vw - 1000px);
  max-width: calc(100vw - 600px);
  margin-left: 10px;
  border: 1px solid var(--el-border-color);
  border-radius: 2px;
  height: calc(100vh - 185px);
}
</style>