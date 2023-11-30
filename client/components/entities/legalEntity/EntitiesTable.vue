<template>
  <el-scrollbar class="scrollTable">
    <el-table
      :data="storeEntity.searchTableData"
      style="width: 100%"
      @selection-change="storeEntity.handleSelectionChange"
      height="calc(100vh - 160px)"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column type="index" width="55" show-overflow-tooltip />
      <el-table-column property="name" label="Name" show-overflow-tooltip />
    </el-table>
  </el-scrollbar>
</template>

<script lang="ts" setup>
import { useEntityTableStore } from "~~/stores/entityTableStore";

const storeEntity = useEntityTableStore();
</script>
