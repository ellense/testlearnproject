<template>
  <div class="toolbarAdd">
    <el-input
      v-model="storeProduct.newName"
      label="Наименование"
      placeholder="Введите наименование"
      style="width: 200px"
    ></el-input>
    <el-select
      v-model="storeProduct.ProviderName"
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
    <el-input
      v-model="storeProduct.newCategory"
      placeholder="Введите категорию товара"
      style="width: 200px"
    ></el-input>

    <el-input
      v-model="storeProduct.search"
      placeholder="Поиск"
      style="width: 200px"
      :prefix-icon="Search"
    ></el-input>
  </div>
  <el-scrollbar class="scrollTable" max-height="400px">
    <el-table
      ref="multipleTableRef"
      :data="storeProduct.filteredTableData"
      style="width: 100%"
      @selection-change="storeProduct.handleSelectionChange"
      height="400"
    >
      <el-table-column property="selection" type="selection" width="55" />
      <el-table-column type="index" width="55" />
      <el-table-column property="name" label="Наименование" width="300" />
      <el-table-column
        property="nameProvider"
        label="Поставщик"
        show-overflow-tooltip
      />
      <el-table-column property="category" label="Категория" width="300" />
    </el-table>
  </el-scrollbar>

  <div class="toolbarButton" style="margin-top: 20px">
    <el-button @click="storeProduct.toggleSelection">Очистить все</el-button>
    <div v-if="storeProduct.newName">
      <el-button @click="storeProduct.addRows">Добавить</el-button>
    </div>
    <div v-if="storeProduct.multipleSelection.length > 0">
      <el-button @click="storeProduct.deleteSelectedRows">Удалить</el-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { ElTable } from "element-plus";
import { Search } from "@element-plus/icons-vue";
import { useProviderTableStore } from "~~/stores/providerTableStore";
import { useProductTableStore } from "~~/stores/productTableStore";

const options = ref<{ ProviderName: string; label: string }[]>([]);

const storeProvider = useProviderTableStore();
const {
  newName,
  search,
  filteredTableData,
  addRows,
  deleteSelectedRows,
  toggleSelection,
  handleSelectionChange,
  ProviderName,
} = useProductTableStore();
const storeProduct = useProductTableStore();
storeProvider.initializeTableData();
storeProduct.initializeTableData();

const updateOptions = () => {
  options.value = storeProvider.tableData.map((provider) => ({
    ProviderName: provider.name,
    label: provider.name,
  }));
};

// Вызываем метод для обновления options при создании компонента
updateOptions();
</script>
