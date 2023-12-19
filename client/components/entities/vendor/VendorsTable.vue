<template>
  <el-scrollbar class="scrollTable">
    <el-table
      v-loading="loading"
      element-loading-text = "Загрузка"
      :data="filteredEntityList"
      style="width: 100%"
      height="calc(100vh - 130px)"
    >
      <el-table-column
        label="Номер"
        prop="vendorid"
        width="150"
        show-overflow-tooltip
      />
      <el-table-column
        prop="name"
        label="Наименование"
        width="200"
        show-overflow-tooltip
      />
      <el-table-column
        prop="urasticname"
        label="Полное наименование"
        width="300"
        show-overflow-tooltip
      />
      <el-table-column
        prop="directorname"
        label="Директор"
        width="200"
        show-overflow-tooltip
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
      />
    </el-table>
  </el-scrollbar>
</template>

<script lang="ts" setup>
import { ref, onMounted, watch } from "vue";
import { useVendorTableStore } from "~~/stores/providerTableStore";
const vendorStore = useVendorTableStore();
const filteredEntityList = ref(vendorStore.searchVendorList);

let loading = ref(true);

watch(
  () => vendorStore.searchVendorList,
  () => {
    filteredEntityList.value = vendorStore.searchVendorList;
    loading.value = false;
  }
  
);
onMounted(async () => {
  try {
    await vendorStore.fetchVendorsList({
      vendorid: "",
      name: "",
      urasticname: "",
      directorname: "",
      urasticadress: "",
      inn_kpp: "",
      entityid: "",
    });
  } catch (error) {
    loading.value = false;
    console.error("Ошибка при загрузке данных", error);
  }
});
</script>
<style scoped>
.example-showcase .el-loading-mask {
  z-index: 9;
}
</style>
