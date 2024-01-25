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
        show-overflow-tooltip
      />
      <el-table-column
        property="vendor"
        label="Поставщик"
        sortable
        show-overflow-tooltip
      />
      <el-table-column property="period" label="Период расчета" show-overflow-tooltip />
      <el-table-column property="sum_calc" label="База расчета" show-overflow-tooltip />
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
import { useKuStore } from "~~/stores/kuStore";

const storeKU = useKuStore();

// onMounted(async () => {
//   try {
//     await storeKU.fetchKuList({
//       entityid: "",
//       ku_id: "",
//       vendor: "",
//       period: "",
//       date_start: new Date(),
//       date_end: new Date(),
//       status: "",
//       base: null,
//       percent: null,
//     });
//   } catch (error) {
//     console.error("Ошибка при загрузке данных", error);
//   }
// });
</script>
