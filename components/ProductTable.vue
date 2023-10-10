<template>
  <div class="toolbarAdd">
    <el-input
      v-model="storeProduct.newName"
      label="Наименование"
      placeholder="Введите наименование"
      style="width: 200px"
      clearable
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
      clearable
    ></el-input>
  </div>
  <el-scrollbar class="scrollTable" max-height="400px">
    <el-table
      ref="multipleTableRef"
      :data="storeProduct.searchTableData"
      style="width: 100%"
      @selection-change="storeProduct.handleSelectionChange"
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
        property="name"
        label="Наименование"
        width="300"
        show-overflow-tooltip
      />
      <el-table-column
        property="nameProvider"
        label="Поставщик"
        width="300"
        show-overflow-tooltip
      />
      <el-table-column property="category" label="Категория" />
      <el-table-column>
        <template #header>
          <el-input
            v-model="storeProduct.search"
            placeholder="Поиск"
            style="width: 200px"
            :prefix-icon="Search"
          />
        </template>
      </el-table-column>
    </el-table>
  </el-scrollbar>

  <div class="toolbarButton" style="margin-top: 20px">
    <div v-if="storeProduct.newName">
      <el-button @click="storeProduct.addRows">Добавить</el-button>
    </div>
    <div v-if="storeProduct.multipleSelection.length > 0">
      <el-button @click="storeProduct.deleteSelectedRows">Удалить</el-button>
    </div>
    <el-button @click="storeProduct.toggleSelection">Очистить все</el-button>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { Search } from "@element-plus/icons-vue";
import { useProviderTableStore } from "~~/stores/providerTableStore";
import { useProductTableStore } from "~~/stores/productTableStore";

const options = ref<{ ProviderName: string; label: string }[]>([]);

const storeProvider = useProviderTableStore();
const {
  newName,
  search,
  searchTableData,
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

<style scoped>
.el-table td {
  height: 10px;
}
</style>
