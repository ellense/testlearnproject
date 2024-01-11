<template>
  <el-scrollbar class="scrollTable">
    <el-table v-loading="loading" element-loading-text="Загрузка" :data="filteredEntityList" style="width: 100%"
      height="calc(100vh - 180px)" >
      <el-table-column label="Номер" prop="vendorid" width="150" show-overflow-tooltip sortable />
      <el-table-column prop="name" label="Наименование" width="200" show-overflow-tooltip sortable />
      <el-table-column prop="urasticname" label="Полное наименование" width="300" show-overflow-tooltip sortable />
      <el-table-column prop="directorname" label="Директор" width="200" show-overflow-tooltip sortable />
      <el-table-column prop="inn_kpp" label="ИНН/КПП" width="200" show-overflow-tooltip />
      <el-table-column prop="urasticadress" label="Адрес" show-overflow-tooltip sortable />
    </el-table>

  </el-scrollbar>
  <!-- <div class="pagination"><el-pagination background layout="prev, pager, next" :total="total" :hide-on-single-page="isSinglePage"
      style="margin-top: 4px" @current-change="handleCurrentChange" />
     </div> -->
     <div v-if="pagination?.count && pagination.count > countRowTable" class="pagination">
          <!-- Элемент пагинации из библиотеки Element UI -->
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
import { useVendorTableStore } from "~~/stores/vendorTableStore";
import type { IVendor } from "~/utils/types/directoryTypes";
const { getVacancies, pagination, countRowTable } = storeToRefs(useVendorTableStore());
const vendorStore = useVendorTableStore();
const filteredEntityList = ref(vendorStore.vendorList);
let loading = ref(true);
// const filteredEntityList = computed(() => vendorStore.getVendorList);
const { getVendorList, getCountPage, countPage, getUseFilterVendor } = storeToRefs(
  useVendorTableStore()
)
// const total = ref<number>(0)
// const isSinglePage = ref<boolean>(true)

// const handleCurrentChange = (val: number) => {
//   if (!getUseFilterVendor.value) {
//     // Вызываем метод для запроса данных с учетом новой страницы
//     vendorStore.getPage(val)
//     console.log("val ",val)
//   }
// }

onMounted(async () => {
  try {
    // Загружаем данные для первой страницы при инициализации компонента
    await vendorStore.fetchVendorsList({
      vendorid: "",
      name: "",
      urasticname: "",
      directorname: "",
      urasticadress: "",
      inn_kpp: "",
      entityid: "",
      page: 1,
      page_size: 100,
    }).then(() => loading.value = false)

  }
  catch (error) {
    loading.value = false;
    console.error("Ошибка при загрузке данных", error);
  }
});
  // Функция для прокрутки страницы вверх
  const scrollToTop = () => {
    window.scrollTo(0, 0);
  };

  // Обработчик изменения страницы пагинации
  const paginationChange = (value: any) => {
    // Вызов метода хранилища для загрузки вакансий с учетом новой страницы
    useVacanciesStore().getVacanciesFromAPIWithFilter(value);
    // Прокрутка страницы вверх
    scrollToTop();
  };
   // Реактивное значение для данных таблицы
   const tableData = ref<IVendor[]>(getVacancies.value);

// Наблюдение за изменениями данных вакансий и обновление реактивных данных
watch(getVacancies, (value) => {
  tableData.value = value || [];
});
// Следим за изменениями в данных пагинации и в данных таблицы
// watch(countPage, (value) => {
//   total.value = value || 0
//   console.log("total ", value)
// })
// watch(getVendorList, (value) => {
//   filteredEntityList.value = value
// })
// watch(() => vendorStore.getVendorList, (value) => {
//   filteredEntityList.value = value;
// }, { immediate: true });

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
