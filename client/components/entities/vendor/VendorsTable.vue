<template>
  <el-scrollbar class="scrollTable">
    <el-table
      ref="multipleTableRef"
      :data="storeProvider.searchTableData"
      style="width: 100%"
      @selection-change="storeProvider.handleSelectionChange"
      height="calc(100vh - 160px)"
    >
      <el-table-column
        property="selection"
        type="selection"
        width="55"
        show-overflow-tooltip
      />
      <el-table-column type="index" width="55" show-overflow-tooltip />
      <el-table-column
        property="score"
        label="Счет"
        width="200"
        show-overflow-tooltip
      />
      <el-table-column
        property="name"
        label="Наименование"
        width="300"
        show-overflow-tooltip
      />
      <el-table-column
        property="nameEntity"
        label="Юридическое лицо"
        show-overflow-tooltip
      />
    </el-table>
  </el-scrollbar>
</template>

<script lang="ts" setup>
import { useProviderTableStore } from "~~/stores/providerTableStore";
const storeProvider = useProviderTableStore();
</script>
