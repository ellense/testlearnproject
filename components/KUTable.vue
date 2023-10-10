<template>
    <div class="toolbarAdd">
      <el-input
        v-model="store.newName"
        placeholder="Введите КУ"
        style="width: 200px"
      ></el-input>
      <!-- Добавляем поле для поиска по имени -->
      <el-input
        v-model="store.search"
        placeholder="Поиск"
        style="width: 200px"
      ></el-input>
    </div>
    <el-scrollbar class="scrollTable" max-height="400px">
      <el-table
        :data="store.filteredTableData"
        style="width: 100%"
        @selection-change="store.handleSelectionChange"
        height="400"
      >
        <el-table-column type="selection" width="55" />
        <el-table-column property="name" label="Name" width="120" />
        <el-table-column property="id" label="id" show-overflow-tooltip />
        <el-table-column property="kuNumber" label="kuNumber" />
      </el-table>
    </el-scrollbar>
    <div class="toolbarButton" style="margin-top: 20px">
      <el-button @click="store.toggleSelection">Очистить все</el-button>
      <div v-if="store.newName">
        <el-button @click="store.addItem">Добавить элемент</el-button>
      </div>
      <el-button @click="store.deleteSelectedRows">Удалить выбранные</el-button>
    </div>
  </template>
  
  <script lang="ts" setup>
  import { useKuTableStore } from "~~/stores/kuTableStore";
  
  const {
    newName,
    search,
    filteredTableData,
    addItem,
    deleteSelectedRows,
    toggleSelection,
    handleSelectionChange,
  } = useKuTableStore();
  
  const store = useKuTableStore();
  store.initializeTableData();
  </script>