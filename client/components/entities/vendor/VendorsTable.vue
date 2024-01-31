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
  <!-- v-if="pagination?.count && pagination.count > countRowTable"  -->
  <div v-if="pagination?.count" class="pagination">
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
const pageSize = ref(countRowTable);

const paginationChange = (page: number) => {
  try {
    useVendorStore().setFilterValue('page', page);
    useVendorStore().getVendorFromAPIWithFilter(page);
  } catch (error) {
    console.error("Ошибка при загрузке данных", error);
  }
};

const handleSizeChange = async (val: number) => {
  pageSize.value = val;
  useVendorStore().setCountRowTable(val);
  try {
    await useVendorStore().getVendorFromAPIWithFilter();
  } catch (error) {
    console.error("Ошибка при загрузке данных", error);
  }
};

onMounted(() => {
  watch(getVendors, (value) => {
    tableData.value = value || [];
    console.log('Updated tableData:', tableData.value);
  });
});

onMounted(async () => {
  try {
    await useVendorStore().getVendorFromAPIWithFilter();
  } catch (error) {
    console.error("Ошибка при загрузке данных", error);
  }
});
</script>
<style scoped>
.example-showcase .el-loading-mask {
  z-index: 9;
}
</style>
