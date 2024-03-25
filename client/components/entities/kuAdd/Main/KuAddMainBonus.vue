<template>
  <el-scrollbar height="calc(100vh - 480px)">
    <el-button size="small" round @click="addRow" class="buttonAdd">Добавить</el-button>
    <el-table :data="tableData" border style="width: 700px; margin-top: 15px;" height="calc(100vh - 615px)"
      empty-text="Добавьте условия">
      <el-table-column prop="fix" label="Фиксированная сумма" width="200" align="center">
        <template #default="{ row }">
          <el-checkbox v-model="row.fix" @change="onFixChange(row)"></el-checkbox>
        </template>
      </el-table-column>
      <el-table-column prop="criterion" label="Критерий в руб." width="200">
        <template #default="{ row }">
          <el-input v-model="row.criterion" @change="onCriteriaChange(row)" clearable size="small"></el-input>
        </template>
      </el-table-column>
      <el-table-column prop="percent_sum" label="Процент/Сумма за период" width="200">
        <template #default="{ row }">
          <el-input v-model="row.percent_sum" style="border: none !important" @change="onPercentSummaChange(row)"
            clearable size="small"></el-input>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="Операция" align="center">
        <template #default="scope">
          <el-button plain type="danger" :icon="Delete" size="small" @click.prevent="deleteRow(scope.$index)"
            style="width: 100%; height: 100%;"></el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-scrollbar>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import type { IPercent } from '~/utils/types/directoryTypes';
import { useKuAddStore } from "~~/stores/kuAddStore";
import { Delete } from '@element-plus/icons-vue'
const store = useKuAddStore();

const tableData = ref(store.tableDataPercent);

//добавление сложного процента
const addRow = () => {
  tableData.value.push({ criterion: null, percent_sum: null, fix: false });
  console.log("данные бонуса:", tableData.value)
  console.log("данные бонуса в хранилище:", store.tableDataPercent)
};

//удаление сложного процента
const deleteRow = (index: number) => {
  store.tableDataPercent.splice(index, 1);
}

const onFixChange = (row: IPercent) => {
  const rowIndex = tableData.value.findIndex(item => item === row);
  store.tableDataPercent[rowIndex].fix = row.fix;
  console.log("данные 1 бонуса в хранилище изменены:", store.tableDataPercent)
};
// Обработчик изменений в критерии
const onCriteriaChange = (row: IPercent) => {
  const rowIndex = tableData.value.findIndex(item => item === row);
  store.tableDataPercent[rowIndex].criterion = row.criterion;
  console.log("данные 2 бонуса в хранилище изменены:", store.tableDataPercent)
};

// Обработчик изменений в проценте/сумме за период
const onPercentSummaChange = (row: IPercent) => {
  const rowIndex = tableData.value.findIndex(item => item === row);
  store.tableDataPercent[rowIndex].percent_sum = row.percent_sum;
  console.log("данные 3 бонуса в хранилище изменены:", store.tableDataPercent)
};
</script>

<style scoped>
.el-input {
  --el-input-border-color: #ffffff !important;
}
</style>