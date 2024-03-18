<template>
  <el-scrollbar class="scrollTable">
    <el-table :data="tableData" style="width: 100%" height="calc(100vh - 185px)" v-loading="loading" border>
      <!-- <el-table-column label="Номер" prop="external_code" width="140" show-overflow-tooltip sortable />
      <el-table-column prop="name" label="Наименование" width="220" show-overflow-tooltip sortable />
      <el-table-column prop="urastic_name" label="Полное наименование" width="300" show-overflow-tooltip sortable />
      <el-table-column label="Юридическое лицо">
        <el-table-column prop="entity_key" label="Идентификатор" width="160" show-overflow-tooltip sortable />
        <el-table-column prop="entity_name" label="Наименование" width="190" show-overflow-tooltip sortable />
      </el-table-column>
      <el-table-column prop="director_name" label="Директор" width="170" show-overflow-tooltip sortable />
      <el-table-column prop="inn_kpp" label="ИНН/КПП" width="200" show-overflow-tooltip />
      <el-table-column prop="urastic_adress" label="Адрес" show-overflow-tooltip sortable /> -->
      <el-table-column label="Номер" prop="vendor_id" width="140" show-overflow-tooltip sortable />
      <el-table-column prop="name" label="Наименование" width="220" show-overflow-tooltip sortable />
      <el-table-column prop="urasticname" label="Полное наименование" width="300" show-overflow-tooltip sortable />
      <el-table-column label="Юридическое лицо">
        <el-table-column prop="entity_id" label="Идентификатор" width="160" show-overflow-tooltip sortable />
        <el-table-column prop="entity_name" label="Наименование" width="190" show-overflow-tooltip sortable />
      </el-table-column>
      <el-table-column prop="directorname" label="Директор" width="170" show-overflow-tooltip sortable />
      <el-table-column prop="innkpp" label="ИНН/КПП" width="200" show-overflow-tooltip />
      <el-table-column prop="urasticadress" label="Адрес" show-overflow-tooltip sortable />
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
import type { IVendor } from "~/utils/types/directoryTypes";
import { useVendorStore } from "~~/stores/vendorStore";

const { getVendors, pagination, countRowTable } = storeToRefs(useVendorStore());
const tableData = ref<IVendor[]>(getVendors.value);
  const loading = ref()
const pageSize = ref(countRowTable);
const handleSizeChange = async (val: number) => {
  pageSize.value = val;
  useVendorStore().setCountRowTable(val);
  try {
    await useVendorStore().getVendorFromAPIWithFilter();
  } catch (error) {
    console.error("Ошибка при загрузке данных", error);
  }
};
const paginationChange = (page: number) => {
  try {
    useVendorStore().setFilterValue('page', page);
    useVendorStore().getVendorFromAPIWithFilter(page);
  } catch (error) {
    console.error("Ошибка при загрузке данных", error);
  }
};

watch(getVendors, (value) => {
  tableData.value = value || [];
});

onMounted(async () => {
  try {
    loading.value = true; 
    await useVendorStore().getVendorFromAPIWithFilter();
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
