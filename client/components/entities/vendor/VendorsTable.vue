<template>
  <el-scrollbar class="scrollTable">
    <!-- v-loading="loading" element-loading-text="Загрузка" :data="filteredEntityList" -->
    <el-table :data="tableData" style="width: 100%"
      height="calc(100vh - 180px)" >
      <el-table-column label="Номер" prop="vendorid" width="150" show-overflow-tooltip sortable />
      <el-table-column prop="name" label="Наименование" width="200" show-overflow-tooltip sortable />
      <el-table-column prop="urasticname" label="Полное наименование" width="300" show-overflow-tooltip sortable />
      <el-table-column prop="directorname" label="Директор" width="200" show-overflow-tooltip sortable />
      <el-table-column prop="inn_kpp" label="ИНН/КПП" width="200" show-overflow-tooltip />
      <el-table-column prop="urasticadress" label="Адрес" show-overflow-tooltip sortable />
    </el-table>

  </el-scrollbar>
     <div v-if="pagination?.count && pagination.count > countRowTable" class="pagination">
       1
          <el-pagination
            layout="prev, pager, next"
            :page-count="Math.ceil(pagination.count / countRowTable)"
            @current-change="paginationChange"
          />
        </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { ref, onMounted, watch } from "vue";
// let loading = ref(true);
import type { IVendor } from "~/utils/types/directoryTypes";

import { useVendorStore } from "~~/stores/vendorStore";
const { getVendors, pagination, countRowTable } = storeToRefs(useVendorStore());
  const tableData = ref<IVendor[]>(getVendors.value);

  // Наблюдение за изменениями данных вакансий и обновление реактивных данных
  watch(getVendors, (value) => {
  console.log('Table Data:', value);
  tableData.value = value || [];
});

  
  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  // Обработчик изменения страницы пагинации
  const paginationChange = (value: any) => {
    console.log(1)
  debugger; // добавьте эту строку
  // Вызов метода хранилища для загрузки вакансий с учетом новой страницы
  useVendorStore().fetchVendorsList(value);
  // Прокрутка страницы вверх
  scrollToTop();
};




</script>
<style scoped>
.example-showcase .el-loading-mask {
  z-index: 9;
}
.pagination{
  padding: 10px;
  display: flex;
  justify-content: center;
}
</style>
