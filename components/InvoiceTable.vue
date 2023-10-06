<template>
  <div class="toolbarAdd">
    <el-input
      v-model="newNumber"
      type="number"
      min="0"
      label="Счет"
      placeholder="Введите номер"
      style="width: 300px"
      clearable
    ></el-input>
    <el-input
      v-model="newSum"
      type="number"
      min="0"
      placeholder="Введите сумму по накладной"
      style="width: 300px"
      clearable
    ></el-input>
    <el-date-picker
      v-model="newDate"
      placeholder="Выберите дату"
      style="width: 150px"
      format="YYYY/MM/DD"
      value-format="YYYY/MM/DD"
      clearable
    ></el-date-picker>
    <el-input
      v-model="newProvider"
      placeholder="Выберите поставщика"
      style="width: 300px"
      clearable
    ></el-input>
  </div>
  <el-scrollbar class="scrollTable" max-height="400px">
    <el-table
      ref="multipleTableRef"
      :data="tableData"
      style="width: 100%"
      @selection-change="handleSelectionChange"
      height="400"
    >
      <el-table-column property="selection" type="selection" width="55" />
      <el-table-column type="index" width="55" />
      <el-table-column property="number"  label="Номер" width="200" />
      <el-table-column property="summa" label="Сумма" width="300" />
      <el-table-column property="dateInvoice" type="date" label="Дата" width="300" />
      <el-table-column
        property="nameProvider"
        label="Поставщик"
        show-overflow-tooltip
      />
    </el-table>
  </el-scrollbar>
  <div class="toolbarButton" style="margin-top: 20px">
    <el-button @click="toggleSelection()">Очистить все</el-button>
    <div v-if="newNumber">
      <el-button @click="addRows()">Добавить</el-button>
    </div>
    <div v-if="multipleSelection.length > 0">
      <el-button @click="deleteSelectedRows()">Удалить</el-button>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import { ElTable } from "element-plus";




interface IInvoice {
  number: number;
  summa: number;
  dateInvoice: Date;
  nameProvider: string;
}
const newNumber = ref<number>();
const newSum = ref<number>();
const newDate = ref<Date>();
const newProvider = ref<string>("");

const multipleTableRef = ref<InstanceType<typeof ElTable>>();
const multipleSelection = ref<IInvoice[]>([]);

const toggleSelection = (rows?: IInvoice[]) => {
  if (rows) {
    rows.forEach((row) => {
      // TODO: improvement typing when refactor table
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      multipleTableRef.value!.toggleRowSelection(row, undefined);
    });
  } else {
    multipleTableRef.value!.clearSelection();
  }
};
const handleSelectionChange = (val: IInvoice[]) => {
  multipleSelection.value = val;
};

const tableData = ref<IInvoice[]>([
  {
    number: 34,
    summa: 3494003,
    dateInvoice: new Date(2010, 9, 1),
    nameProvider: "Brown L.K.",
  },
]);

const addRows = () => {
  if (
    newNumber.value !== undefined &&
    newSum.value !== undefined &&
    newDate.value !== undefined
  ) {
    // Добавление нового элемента на основе введенных данных
    tableData.value.push({
      number: newNumber.value,
      summa: newSum.value,
      dateInvoice: newDate.value,
      nameProvider: newProvider.value,
    });

    // Очистка полей ввода после добавления
    newNumber.value = undefined;
    newSum.value = undefined;
    newDate.value = undefined;
    newProvider.value = "";
  }
};

const deleteSelectedRows = () => {
  const selectedRows: IInvoice[] = multipleSelection.value;

  // Фильтруем tableData, оставляя только строки, которые не выбраны
  if (tableData.value) {
    tableData.value = tableData.value.filter((row: IInvoice) => {
      return !selectedRows.includes(row);
    });

    // Очищаем выбранные строки после удаления
    multipleSelection.value = [];
  }
};
</script>
