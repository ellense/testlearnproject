<template>
    <div>
      <el-button size="small" round @click="addRow">Добавить</el-button>
      <el-table :data="tableData" border style="width: 600px; margin-top: 10px;" height="calc(100vh - 700px)">
        <el-table-column prop="value3" label="Фиксированная сумма" width="200" align="center">
          <template #default="{ row }">
            <el-checkbox v-model="row.value3"></el-checkbox>
          </template>
        </el-table-column>
        <el-table-column prop="value" label="Критерий в руб." width="200">
          <template #default="{ row }">
            <el-input v-model="row.value"></el-input>
          </template>
        </el-table-column>
        <el-table-column prop="value2" label="Процент/Сумма за период" width="200">
          <template #default="{ row }">
            <el-input v-model="row.value2" style="border: none !important"></el-input>
          </template>
        </el-table-column>
        
      </el-table>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { ref } from 'vue';
  
  const tableData = ref([{ value: '' , value2: "", value3: false}]);
  
  const addRow = () => {
    tableData.value.push({ value: '', value2: "", value3: false });
  };
  </script>
  <style scoped>
  .el-input  {
    --el-input-border-color: #ffffff !important;
  }
  </style>