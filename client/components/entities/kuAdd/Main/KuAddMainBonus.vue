<template>
  <el-scrollbar height="45vh">
    <el-button size="small" type="primary" plain round @click="addRow" class="buttonAdd">Добавить</el-button>
    <el-button size="small" type="danger" plain round @click="store.tableDataPercent.length = 0" class="buttonAdd">Удалить
      все</el-button>
    <el-table :data="tableData" border style="width: 620px; margin-top: 10px;" height="40vh"
      empty-text="Добавьте условия бонуса">
      <!-- <el-table-column prop="fix" label="Фиксированная сумма" width="200" align="center">
        <template #default="{ row }">
          <el-checkbox v-model="row.fix" @change="onFixChange(row)"></el-checkbox>
        </template>
      </el-table-column> -->
      <el-table-column prop="criterion" label="Критерий в руб." width="200">
        <template #default="{ row }">
          <el-input v-model="row.criterion" @change="onCriteriaChange(row)" clearable size="small"></el-input>
        </template>
      </el-table-column>
      <el-table-column prop="percent_sum" label="Процент" width="200">
        <template #default="{ row }">
          <el-input v-model="row.percent_sum" style="border: none !important" @change="onPercentSummaChange(row)"
            clearable size="small"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="Операция" align="center">
        <template #default="scope">
          <el-button text type="danger" :icon="Delete" size="small" @click.prevent="deleteRow(scope.$index)"
            >Удалить</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-scrollbar>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { useKuAddStore } from "~~/stores/kuAddStore";
import { Delete } from '@element-plus/icons-vue'
import type { IPercent } from '~/utils/types/tabsKuTypes';

const store = useKuAddStore();

const tableData = ref(store.tableDataPercent);

//добавление сложного процента
const addRow = () => {
  tableData.value.push({ id: null, criterion: null, percent_sum: null, fix: false });
  console.log("данные бонуса в хранилище:", store.tableDataPercent)
};

//удаление сложного процента
const deleteRow = (index: number) => {
  store.tableDataPercent.splice(index, 1);
}


// Обработчик изменений в критерии
const onCriteriaChange = (row: IPercent) => {
  const rowIndex = tableData.value.findIndex(item => item === row);
  store.tableDataPercent[rowIndex].criterion = row.criterion;
};

// Обработчик изменений в проценте/сумме за период
const onPercentSummaChange = (row: IPercent) => {
  const rowIndex = tableData.value.findIndex(item => item === row);
  store.tableDataPercent[rowIndex].percent_sum = row.percent_sum;
};
</script>

<style scoped>
.el-input {
  --el-input-border-color: #ffffff !important;
}
</style>