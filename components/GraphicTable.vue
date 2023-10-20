<template>
  <div class="toolbarAdd"></div>
  <el-scrollbar class="scrollTable" style="border: none;">
    <el-table :data="storeKU.tableDataGraphic" style="width: 100%" height="calc(100vh - 120px)" border>
      <el-table-column property="kuNumber" label="Koд КУ" show-overflow-tooltip />
      <el-table-column
        property="provider"
        label="Поставщик"
        show-overflow-tooltip
      />
      <el-table-column
        property="type"
        label="Тип графика"
        show-overflow-tooltip
      />
      <el-table-column 
        property="dateStart"
        type="date"
        label="Начальная дата"
        width="140"
        show-overflow-tooltip
      />
      <el-table-column
        property="dateEnd"
        type="date"
        label="Конечная дата"
        show-overflow-tooltip
      />
      <el-table-column
        property="dateCalc"
        type="date"
        label="Дата расчета"
        show-overflow-tooltip
      />
      <el-table-column property="base" label="База" show-overflow-tooltip />
      <el-table-column
        property="percent"
        label="Процент"
        show-overflow-tooltip
      />
      <el-table-column
        property="calculated"
        label="Рассчитано"
        show-overflow-tooltip
      />
      <el-table-column
        property="approved"
        label="Утверждено"
        show-overflow-tooltip
      />
    </el-table>
  </el-scrollbar>
</template>
<script lang="ts" setup>
import { useKuTableStore } from "~~/stores/kuTableStore";

const storeKU = useKuTableStore();

</script>