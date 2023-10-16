<template>
  <div class="toolbarAdd">
    <el-input
      v-model="storeInvoice.newNumber"
      type="number"
      min="0"
      label="Счет"
      placeholder="Введите номер"
      style="width: 300px"
      clearable
    ></el-input>
    <el-input
      v-model="storeInvoice.newSum"
      type="number"
      min="0"
      placeholder="Введите сумму по накладной"
      style="width: 300px"
      clearable
    ></el-input>
    <el-date-picker
      v-model="storeInvoice.newDate"
      placeholder="Выберите дату"
      style="width: 180px"
      format="YYYY/MM/DD"
      value-format="YYYY/MM/DD"
      clearable
    ></el-date-picker>

    <el-select
      v-model="storeInvoice.ProviderName"
      clearable
      placeholder="Выберите поставщика"
    >
      <el-option
        v-for="item in options"
        :key="item.ProviderName"
        :label="item.label"
        :value="item.ProviderName"
      />
    </el-select>
  </div>
  <el-scrollbar class="scrollTable" max-height="400">
    <el-table
      ref="multipleTableRef"
      :data="storeInvoice.searchTableData"
      style="width: 100%"
      @selection-change="storeInvoice.handleSelectionChange"
      height="400"
    >
      <el-table-column
        property="selection"
        type="selection"
        width="55"
        show-overflow-tooltip
      />
      <el-table-column type="index" width="55" show-overflow-tooltip />
      <el-table-column
        property="number"
        label="Номер"
        width="200"
        show-overflow-tooltip
      />
      <el-table-column
        property="summa"
        label="Сумма"
        width="300"
        show-overflow-tooltip
      />
      <el-table-column
        property="date"
        type="date"
        label="Дата"
        width="300"
        show-overflow-tooltip
      />
      <el-table-column
        property="nameProvider"
        label="Поставщик"
        show-overflow-tooltip
      />
      <el-table-column>
        <template #header>
          <el-input
            v-model="storeInvoice.search"
            placeholder="Поиск"
            style="width: 200px"
            :prefix-icon="Search"
          />
        </template>
      </el-table-column>
    </el-table>
  </el-scrollbar>
  <div class="toolbarButton" style="margin-top: 20px">
    <div v-if="storeInvoice.newNumber">
      <el-button @click="storeInvoice.addRows()">Добавить</el-button>
    </div>
    <div v-if="storeInvoice.multipleSelection.length > 0">
      <el-button @click="storeInvoice.deleteSelectedRows()">Удалить</el-button>
    </div>
    <el-button @click="storeInvoice.toggleSelection()">Очистить все</el-button>
  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import { Search } from "@element-plus/icons-vue";
import { useProviderTableStore } from "~~/stores/providerTableStore";
import { useInvoiceTableStore } from "~~/stores/invoiceTableStore";

const options = ref<{ ProviderName: string; label: string }[]>([]);

const storeProvider = useProviderTableStore();
const {
  newNumber,
  newSum,
  newDate,
  search,
  searchTableData,
  multipleSelection,
  multipleTableRef,
  addRows,
  deleteSelectedRows,
  toggleSelection,
  handleSelectionChange,
  ProviderName,
} = useInvoiceTableStore();

const storeInvoice = useInvoiceTableStore();

const updateOptions = () => {
  options.value = storeProvider.tableData.map((provider) => ({
    ProviderName: provider.name,
    label: provider.name,
  }));
};

updateOptions();
</script>
