<template>
    <div class="buttonBar_search">
        <el-input
          placeholder="Поиск"
          style="width: 200px"
          :prefix-icon="Search"
        />
      </div>
    <el-scrollbar class="scrollTableFiltres">
      
      <el-table style="width: 100%" height="300" :data="tableData">
        <el-table-column
          property="selection"
          type="selection"
          width="55"
          show-overflow-tooltip
        />
        <el-table-column
          prop="id"
          label="Id"
          width="100"
          show-overflow-tooltip
        />
        <el-table-column
          prop="name"
          label="Наименование"
          show-overflow-tooltip
        />
      </el-table>
    </el-scrollbar>
  </template>
  
  <script setup lang="ts">
  import { Search } from "@element-plus/icons-vue";
  import type { IBrand } from '~/utils/types/directoryTypes';
  const getProduser = () => {
    const data: IBrand[] = []
    for (let i = 0; i < 50; i++) {
      data.push({
        id: i,
        name: `Товар-${i}`,
      })
    }
    return data
  }
  
  const tableData = ref<IBrand[]>(getProduser())
  </script>
  
  <style scoped></style>