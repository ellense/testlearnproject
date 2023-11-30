<template>
  <el-scrollbar class="scrollTable">
    <el-table
      :data="store.filteredTableData"
      style="width: 100%"
      @selection-change="store.handleSelectionChange"
      height="calc(100vh - 160px)"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column property="id" label="" width="50" />
      <el-table-column property="kuNumber" label="Номер КУ" width="120" />
      <el-table-column property="percent" label="Процент" width="120" />
      <el-table-column property="provider" label="Поставщик" width="120" />
      <el-table-column property="type" label="Тип графика" width="120" />
      <el-table-column
        property="dateStart"
        label="Начальная дата"
        width="140"
      />
      <el-table-column property="dateEnd" label="Конечная дата" width="130" />
      <el-table-column
        property="dateActual"
        label="Дата актуальности"
        width="160"
      />
      <el-table-column property="base" label="База" />
    </el-table>
  </el-scrollbar>
</template>

<script lang="ts" setup>
import { useKuTableStore } from "~~/stores/kuTableStore";
const store = useKuTableStore();
</script>
