<template>
  <div class="toolbarAdd">
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
    <el-button @click="store.deleteSelectedRows">Удалить выбранные</el-button>
    <el-button @click="redirectToCreatePage">Добавить</el-button>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { useKuTableStore } from "~~/stores/kuTableStore";
import { useRouter } from "vue-router";

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
const router = useRouter();

const redirectToCreatePage = () => {
  // Используйте router.push для перехода на другую страницу
  router.push("/addKu");
};


store.initializeTableData();
</script>
