<template>
  <div class="toolbarAdd">
    <el-input
      v-model="store.newName"
      placeholder="Введите наименование"
      style="width: 200px"
      clearable
    ></el-input>
  </div>
  <el-scrollbar class="scrollTable" max-height="400px">
    <el-table
      :data="store.searchTableData"
      style="width: 100%"
      @selection-change="store.handleSelectionChange"
      height="400"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column type="index" width="55" show-overflow-tooltip />
      <el-table-column property="name" label="Name" show-overflow-tooltip />
      <el-table-column>
        <template #header>
          <el-input
            v-model="store.search"
            placeholder="Поиск"
            style="width: 200px"
            :prefix-icon="Search"
          />
        </template>
      </el-table-column>
    </el-table>
  </el-scrollbar>
  <div class="toolbarButton" style="margin-top: 20px">
    <div v-if="store.newName">
      <el-button @click="store.addItem">Добавить элемент</el-button>
    </div>
    <el-button @click="store.deleteSelectedRows">Удалить выбранные</el-button>
    <el-button @click="store.toggleSelection">Очистить все</el-button>
  </div>
</template>

<script lang="ts" setup>
import { Search } from "@element-plus/icons-vue";
import { useEntityTableStore } from "~~/stores/entityTableStore";

const {
  newName,
  search,
  searchTableData,
  addItem,
  deleteSelectedRows,
  toggleSelection,
  handleSelectionChange,
} = useEntityTableStore();

const store = useEntityTableStore();
store.initializeTableData();
</script>
