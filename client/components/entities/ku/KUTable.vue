<template>
  <el-scrollbar class="scrollTable">
    <el-table
      :data="store.filteredTableData"
      style="width: 100%"
      @selection-change="store.handleSelectionChange"
      height="calc(100vh - 160px)"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column property="ku_id" label="Номер КУ" width="120" show-overflow-tooltip/>
      <el-table-column property="vendor" label="Поставщик" width="200" show-overflow-tooltip/>
      <el-table-column property="period" label="Тип графика" width="120" show-overflow-tooltip/>
      <el-table-column
        property="date_start"
        label="Начальная дата"
        width="140"
      />
      <el-table-column property="date_end" label="Конечная дата"  />
      <!-- <el-table-column
        property="date_end"
        label="Дата актуальности"
        width="160"
        show-overflow-tooltip
      />
      <el-table-column property="base" label="База" /> -->
    </el-table>
  </el-scrollbar>
</template>

<script lang="ts" setup>
import { useKuTableStore } from "~~/stores/kuTableStore";
const store = useKuTableStore();
</script>
