<template>
  <el-scrollbar class="scrollTable">
    <el-table
      v-loading="loading"
      element-loading-text="Загрузка"
      :data="filteredEntityList"
      style="width: 100%"
      height="calc(100vh - 130px)"
    >
      <el-table-column
        label="Номер"
        prop="vendorid"
        width="150"
        show-overflow-tooltip
        sortable
      />
      <el-table-column
        prop="name"
        label="Наименование"
        width="200"
        show-overflow-tooltip
        sortable
      />
      <el-table-column
        prop="urasticname"
        label="Полное наименование"
        width="300"
        show-overflow-tooltip
        sortable
      />
      <el-table-column
        prop="directorname"
        label="Директор"
        width="200"
        show-overflow-tooltip
        sortable
      />
      <el-table-column
        prop="inn_kpp"
        label="ИНН/КПП"
        width="200"
        show-overflow-tooltip
      />
      <el-table-column
        prop="urasticadress"
        label="Адрес"
        show-overflow-tooltip
        sortable
      />
    </el-table>
    <!-- <el-pagination
    @size-change="sizeChange"
    @current-change="currentChange"
    v-model:currentPage="currentPage"
    :page-sizes="[20, 40, 80, 100]"
    :page-size="pageSize"
    layout="total, sizes, prev, pager, next, jumper"
    :total="totalNum" background>
    :pager-count="7">
    </el-pagination> -->
    <!-- <el-pagination
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
      :current-page="currentPage"
      :page-sizes="[10, 20, 30, 40]"
      :page-size="pageSize"
      layout="total, sizes, prev, pager, next, jumper"
      :total="totalItems"
    /> -->
    <el-pagination
      background
      layout="prev, pager, next"
      :total="total"
      :hide-on-single-page="isSinglePage"
      style="margin-top: 4px"
      @current-change="handleCurrentChange"
    />
  </el-scrollbar>
</template>

<script lang="ts" setup>
import { ref, onMounted, watch } from "vue";
import { useVendorTableStore } from "~~/stores/providerTableStore";
const vendorStore = useVendorTableStore();
const filteredEntityList = ref(vendorStore.searchVendorList);

let loading = ref(true);

// const currentPage = ref(1);
// const pageSize = ref(10); // Установить начальный размер страницы
// const totalItems = ref(0);
// const isSinglePage = ref<boolean>(true)
  const total = ref(0);
const isSinglePage = ref(true);


onMounted(async () => {
  try {
    await fetchData();
  } catch (error) {
    console.error('Ошибка при загрузке данных', error);
  }
});

watch(() => vendorStore.searchVendorList, async () => {
  try {
    await fetchData();
  } catch (error) {
    console.error('Ошибка при загрузке данных', error);
  }
});

const handleCurrentChange = (val:number) => {
  vendorStore.setPage(val);
};

const fetchData = async () => {
  try {
    await vendorStore.fetchVendorsList({
      vendorid: '',
      name: '',
      urasticname: '',
      directorname: '',
      urasticadress: '',
      inn_kpp: '',
      entityid: '',
      page: 1, 
      page_size: 500,
    });
    filteredEntityList.value = vendorStore.searchVendorList;
    total.value = vendorStore.totalItems;
  } catch (error) {
    console.error('Ошибка при загрузке данных', error);
  }
};





// watch(
//   () => vendorStore.searchVendorList,
//   () => {
//     filteredEntityList.value = vendorStore.searchVendorList;
//     loading.value = false;
//   }
// );
// onMounted(async () => {
//   try {
//     await vendorStore.fetchVendorsList({
//       vendorid: "",
//       name: "",
//       urasticname: "",
//       directorname: "",
//       urasticadress: "",
//       inn_kpp: "",
//       entityid: "",
//       page: 1, 
//       page_size: 500,
//     });
//   } catch (error) {
//     loading.value = false;
//     console.error("Ошибка при загрузке данных", error);
//   }
// });

// const handleSizeChange = (val: number) => {
//   pageSize.value = val;
//   currentPage.value = 1; // Сброс текущей страницы при изменении размера страницы
//   fetchData();
// };
// const handleCurrentChange = (val: number) => {
//   if (!getUseFilterProduct.value) useProductData().getPage(val)
// }
// const handleCurrentChange = (val: number) => {
//   currentPage.value = val;
//   fetchData();
// };

// const fetchData = async () => {
//   loading.value = true;
//   try {
//     await vendorStore.fetchVendorsList({
//       vendorid: "",
//       name: "",
//       urasticname: "",
//       directorname: "",
//       urasticadress: "",
//       inn_kpp: "",
//       entityid: "",
//     });
//     totalItems.value = vendorStore.totalItems;
//     loading.value = false;
//   } catch (error) {
//     loading.value = false;
//     console.error("Ошибка при загрузке данных", error);
//   }
// };
//Помните, что для реализации серверной пагинации вам потребуется 
// доработать метод fetchVendorsList вашего API, чтобы он принимал 
// параметры page и pageSize и возвращал только необходимую порцию данных.
</script>
<style scoped>
.example-showcase .el-loading-mask {
  z-index: 9;
}
</style>
