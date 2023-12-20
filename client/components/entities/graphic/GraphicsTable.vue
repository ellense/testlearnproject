<template>
  <div class="toolbarAdd"></div>
  <el-scrollbar class="scrollTable" style="border: none">
    <el-table
      :data="storeKU.tableDataGraphic"
      style="width: 100%"
      height="calc(100vh - 120px)"
      border
    >
      <el-table-column property="ku" label="Koд КУ" show-overflow-tooltip />
      <el-table-column
        property="vendor"
        label="Поставщик"
        show-overflow-tooltip
      />
      <el-table-column
        property="period"
        label="Тип графика"
        show-overflow-tooltip
      />
      <el-table-column
        property="date_start"
        type="date"
        label="Начальная дата"
        width="140"
        show-overflow-tooltip
      />
      <el-table-column
        property="date_end"
        type="date"
        label="Конечная дата"
        show-overflow-tooltip
      />
      <el-table-column
        property="date_calc"
        type="date"
        label="Дата расчета"
        show-overflow-tooltip
      />
      <el-table-column property="sum_calc" label="База" show-overflow-tooltip />
      <el-table-column
        property="percent"
        label="Процент"
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
import { useKuTableStore } from "~~/stores/kuTableStore";

const storeKU = useKuTableStore();
</script>
