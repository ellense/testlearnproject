<template>
  <div class="toolbarAdd"></div>
  <el-scrollbar class="scrollTable" style="border: none">
    <el-table
      :data="storeKU.tableDataGraphic"
      style="width: 100%"
      height="calc(100vh - 120px)"
      border
    >
      <el-table-column
        property="ku"
        label="Koд КУ"
        sortable
        :filter-method="handleKuFilter"
        show-overflow-tooltip
      />
      <el-table-column
        property="vendor"
        label="Поставщик"
        sortable
        :filter-method="handleVendorFilter"
        show-overflow-tooltip
      />
      <el-table-column property="period" label="Период" show-overflow-tooltip />
      <el-table-column property="sum_calc" label="База" show-overflow-tooltip />
      <el-table-column
        property="percent"
        label="Процент"
        show-overflow-tooltip
      />
      <el-table-column
        property="date_start"
        type="date"
        label="Начальная дата"
        sortable
        show-overflow-tooltip
      />
      <el-table-column
        property="date_end"
        type="date"
        label="Конечная дата"
        sortable
        show-overflow-tooltip
      />
      <el-table-column
        property="date_calc"
        type="date"
        label="Дата расчета"
        sortable
        show-overflow-tooltip
      />
      <el-table-column
        property="sum_bonus"
        label="Расчитано"
        show-overflow-tooltip
      />
    </el-table>
  </el-scrollbar>
</template>
<script lang="ts" setup>
import { ref, onMounted } from "vue";
import { useKuTableStore } from "~~/stores/kuTableStore";

const storeKU = useKuTableStore();
const handleVendorFilter = (value: string) => {
  storeKU.setVendorFilter(value);
};

const searchTableData = ref(storeKU.searchTableData);

onMounted(() => {
  watchEffect(() => {
    searchTableData.value = storeKU.searchTableData;
  });
});
const handleKuFilter = (value: number | null) => {
  storeKU.setKuFilter(value);
};

onMounted(() => {
  watchEffect(() => {
    searchTableData.value = storeKU.searchTableData;
  });
});
</script>
