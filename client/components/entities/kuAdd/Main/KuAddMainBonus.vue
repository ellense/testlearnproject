<template>
  <el-scrollbar height="calc(100vh - 560px)">
    <el-button size="small" round @click="addRow" class="buttonAdd">Добавить</el-button>
    <el-table :data="tableData" border style="width: 700px; margin-top: 15px;" height="calc(100vh - 615px)" empty-text="Добавьте условия">
      <el-table-column prop="fix" label="Фиксированная сумма" width="200" align="center">
        <template #default="{ row }">
          <el-checkbox v-model="row.fix" @change="onFixChange(row)"></el-checkbox>
        </template>
      </el-table-column>
      <el-table-column prop="criteria" label="Критерий в руб." width="200">
        <template #default="{ row }">
          <el-input v-model="row.criteria" @change="onCriteriaChange(row)"></el-input>
        </template>
      </el-table-column>
      <el-table-column prop="percentSumma" label="Процент/Сумма за период" width="200">
        <template #default="{ row }">
          <el-input v-model="row.percentSumma" style="border: none !important" @change="onPercentSummaChange(row)"></el-input>
        </template>
      </el-table-column>
      <el-table-column fixed="right" label="Операция">
        <template #default="scope">
          <el-button link type="danger" size="small" @click.prevent="deleteRow(scope.$index)">
            Удалить
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-scrollbar>
</template>
  
<script lang="ts" setup>
import { ref } from 'vue';
import type { IPercent } from '~/utils/types/directoryTypes';
import { useKuAddStore } from "~~/stores/kuAddStore";
const store = useKuAddStore();

const tableData = ref(store.tableDataPercent);

//добавление сложного процента
const addRow = () => {
  tableData.value.push({ criteria: null, percentSumma: null, fix: false });
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
  store.tableDataPercent[rowIndex].criteria = row.criteria;
  console.log("данные 2 бонуса в хранилище изменены:", store.tableDataPercent)
};

// Обработчик изменений в проценте/сумме за период
const onPercentSummaChange = (row: IPercent) => {
  const rowIndex = tableData.value.findIndex(item => item === row);
  store.tableDataPercent[rowIndex].percentSumma = row.percentSumma;
  console.log("данные 3 бонуса в хранилище изменены:", store.tableDataPercent)
};
</script>

<style scoped>
.el-input {
  --el-input-border-color: #ffffff !important;
}
</style>