<template>
  <el-scrollbar class="scrollTable">
    <el-table
      ref="multipleTableRef"
      :data="VendorList"
      style="width: 100%"
      @selection-change="vendorStore.handleSelectionChange"
      height="calc(100vh - 160px)"
    >
      <el-table-column
        property="selection"
        type="selection"
        width="40"
        show-overflow-tooltip
      />
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
import { useVendorTableStore } from "~~/stores/providerTableStore";
const vendorStore = useVendorTableStore();
const VendorList = ref(vendorStore.getVendorList);
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
    // Обновление entityList не требуется, так как watchEffect следит за изменениями в сторе
  } catch (error) {
    console.error("Ошибка при загрузке данных", error);
  }
});
</script>
