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
      <el-table-column property="kuNumber" label="kuNumber" width="120" />
      <el-table-column property="percent" label="percent" width="120" />
      <el-table-column property="provider" label="provider" width="120" />
      <el-table-column property="id" label="id" show-overflow-tooltip />
      <el-table-column> </el-table-column>
    </el-table>
  </el-scrollbar>
  <div class="toolbarButton" style="margin-top: 20px">
    <el-button @click="store.toggleSelection">Очистить все</el-button>
    <el-button @click="store.deleteSelectedRows">Удалить выбранные</el-button>
    <el-button @click="redirectToCreatePage">Добавить</el-button>
  </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { useKuTableStore } from "~~/stores/kuTableStore";
import { useRouter } from "vue-router";
import { useEntityTableStore } from "~~/stores/entityTableStore";
import { useProviderTableStore } from "~~/stores/providerTableStore";

const store = useKuTableStore();
const router = useRouter();

const storeEntity = useEntityTableStore();
const storeProvider = useProviderTableStore();

storeEntity.initializeTableData();
storeProvider.initializeTableData();

const redirectToCreatePage = () => {
  router.push("/addKu");
};

store.initializeTableData();
</script>
