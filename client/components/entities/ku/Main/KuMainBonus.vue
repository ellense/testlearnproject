<template>
  <el-scrollbar height="45vh">
    <el-button size="small" type="primary" plain round @click="addRow" class="buttonAdd"
      :disabled="isEditButtonDisabled">Добавить</el-button>
    <el-button size="small" type="danger" plain round @click="store.tableDataPercent.length = 0"
      :disabled="isEditButtonDisabled" class="buttonAdd">Удалить все</el-button>
    <el-table :data="tableData" border style="width: 720px; margin-top: 10px;" height="40vh"
      empty-text="Добавьте условия бонуса">
      <!-- <el-table-column prop="fix" label="Фиксированная сумма" width="200" align="center">
        <template #default="{ row }">
          <el-checkbox v-model="row.fix" @change="onFixChange(row)" :disabled="isEditButtonDisabled"></el-checkbox>
        </template>
      </el-table-column> -->
      <el-table-column prop="criterion" label="Критерий в руб." width="200">
        <template #default="{ row }">
          <el-input v-model="row.criterion" @change="onCriteriaChange(row)" clearable size="small"
            :disabled="isEditButtonDisabled"></el-input>
        </template>
      </el-table-column>
      <el-table-column prop="percent_sum" label="Процент/Сумма за период" width="200">
        <template #default="{ row }">
          <el-input v-model="row.percent_sum" style="border: none !important" @change="onPercentSummaChange(row)"
            clearable size="small" :disabled="isEditButtonDisabled"></el-input>
        </template>
      </el-table-column>
      <el-table-column label="Операция" align="center">
        <template #default="scope">
          <el-button text type="danger" :icon="Delete" size="small" @click.prevent="deleteRow(scope.$index)"
            :disabled="isEditButtonDisabled">Удалить</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-scrollbar>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import { storeToRefs } from "pinia";
import { useKuIdStore } from "~~/stores/kuIdStore";
import { Delete } from '@element-plus/icons-vue'
import type { IPercent } from '~/utils/types/tabsKuTypes';
const { getPercent } = storeToRefs(
  useKuIdStore()
);
const store = useKuIdStore();

const isEditButtonDisabled = computed(() => {
  return store.kuIdStatus !== 'Создано';
});

const tableData = ref<IPercent[]>(getPercent.value);
watch(getPercent, (value) => {
  tableData.value = value || [];
});

//добавление сложного процента
const addRow = () => {
  tableData.value.push({ id: null, criterion: null, percent_sum: null, fix: false });
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