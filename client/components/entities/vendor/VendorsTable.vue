<template>
  <el-scrollbar class="scrollTable">
    <el-table :data="tableData" style="width: 100%" height="calc(100vh - 185px)">
      <el-table-column label="Номер" prop="vendor_id" width="150" show-overflow-tooltip sortable />
      <el-table-column prop="name" label="Наименование" width="200" show-overflow-tooltip sortable />
      <el-table-column prop="urasticname" label="Полное наименование" width="300" show-overflow-tooltip sortable />
      <el-table-column prop="entity_id" label="Юр.лицо" width="120" show-overflow-tooltip sortable />
      <el-table-column prop="entity_name" label="Наименование" width="200" show-overflow-tooltip sortable />
      <el-table-column prop="directorname" label="Директор" width="200" show-overflow-tooltip sortable />
      <el-table-column prop="inn_kpp" label="ИНН/КПП" width="200" show-overflow-tooltip />
      <el-table-column prop="urasticadress" label="Адрес" show-overflow-tooltip sortable />
    </el-table>
  </el-scrollbar>
  <div v-if="pagination?.count && pagination.count > countRowTable" class="pagination">
    <el-pagination layout="prev, pager, next" :page-count="Math.ceil(pagination.count / countRowTable)"
      @current-change="paginationChange" />
  </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { ref, onMounted, watch } from "vue";
import type { IVendor } from "~/utils/types/directoryTypes";

import { useVendorStore } from "~~/stores/vendorStore";
const { getVendors, pagination, countRowTable } = storeToRefs(useVendorStore());
const tableData = ref<IVendor[]>(getVendors.value);

onMounted(() => {
  watch(getVendors, (value) => {
    console.log('Table Data:', value);
    tableData.value = value || [];
  });
});

const paginationChange = (page: number) => {
  useVendorStore().fetchVendorsList(page);
};

onMounted(async () => {
  try {
    await useVendorStore().fetchVendorsList();
  } catch (error) {
    console.error('Ошибка при загрузке данных', error);
  }
});
</script>
<style scoped>
.example-showcase .el-loading-mask {
  z-index: 9;
}
</style>
