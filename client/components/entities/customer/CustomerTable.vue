<template>
  <el-scrollbar class="scrollTable">
    <el-table :data="tableData" style="width: 100%" height="calc(100vh - 130px)" v-loading="loading" border
      @sort-change="handleSortChange" stripe>
      <el-table-column label="Код" prop="customer_id" width="140" show-overflow-tooltip sortable />
      <el-table-column prop="name" label="Наименование" width="220" show-overflow-tooltip sortable />
      <el-table-column prop="urastic_name" label="Полное наименование" width="300" show-overflow-tooltip sortable />
      <el-table-column label="Юридическое лицо" align="center">
        <el-table-column prop="entity" label="Код" width="160" show-overflow-tooltip sortable />
        <el-table-column prop="entity_name" label="Наименование" width="190" show-overflow-tooltip />
      </el-table-column>
      <el-table-column prop="director_name" label="Директор" width="170" show-overflow-tooltip />
      <el-table-column prop="inn_kpp" label="ИНН/КПП" width="200" show-overflow-tooltip />
      <el-table-column prop="urastic_adress" label="Адрес" show-overflow-tooltip />
    </el-table>
  </el-scrollbar>
  <div v-if="pagination?.count && pagination.count > countRowTable" class="pagination">
    <el-pagination v-model:pageSize="pageSize" small :page-sizes="[50, 100, 300, 500]"
      :page-count="Math.ceil(pagination.count / pageSize)" layout="sizes, prev, pager, next, total"
      @size-change="handleSizeChange" @current-change="paginationChange" :total="pagination.count" />
  </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { ref, onMounted, watch } from "vue";
import type { ICustomerFull } from "~/utils/types/customerTypes";
import { useCustomerStore } from "~~/stores/customerStore";
const store = useCustomerStore()
const { getCustomers, pagination, countRowTable } = storeToRefs(useCustomerStore());
const tableData = ref<ICustomerFull[]>(getCustomers.value);

const loading = ref()
const pageSize = ref(countRowTable);

const handleSizeChange = async (val: number) => {
  pageSize.value = val;
  store.setCountRowTable(val);
  try {
    await store.getCustomerFromAPIWithFilter();
  } catch (error) {
    console.error("Ошибка при загрузке данных", error);
  }
};

const paginationChange = (page: number) => {
  try {
    store.setFilterValue('page', page);
    store.getCustomerFromAPIWithFilter(page, store.sortProp, store.sortOrder);
  } catch (error) {
    console.error("Ошибка при загрузке данных", error);
  }
};

const handleSortChange = async ({ page, prop, order }: { page: number, prop: string, order: string }) => {
  try {
    store.pagination = null
    store.sortProp = prop; // поле, по которому сортируем
    store.sortOrder = order === 'ascending' ? 'asc' : 'desc'; // порядок сортировки
    console.log("(поле, порядок) = (", store.sortProp, ",", store.sortOrder, ")");
    await store.getCustomerFromAPIWithFilter(page, store.sortProp, store.sortOrder);
  } catch (error) {
    console.error("Ошибка при загрузке данных", error);
  }
};

watch(getCustomers, (value) => {
  tableData.value = value || [];
});

onMounted(async () => {
  try {
    loading.value = true;
    await store.getCustomerFromAPIWithFilter();
    loading.value = false;
  } catch (error) {
    console.error("Ошибка при загрузке данных", error);
    loading.value = false;
  }
});
</script>

<style scoped>
.example-showcase .el-loading-mask {
  z-index: 9;
}
</style>