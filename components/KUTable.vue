<template>
  <div class="buttonBar">
    <div class="buttonBar_left">
      <el-button @click="redirectToCreatePage">Добавить</el-button>
      <el-button>Создать график</el-button>
      <el-button @click="store.deleteSelectedRows">Удалить</el-button>
    </div>
    <div class="buttonBar_search">
      <el-input
        v-model="store.search"
        placeholder="Поиск по поставщику"
        style="width: 200px"
      />
    </div>
  </div>
  <el-scrollbar class="scrollTable" max-height="400px">
    <el-table
      :data="store.filteredTableData"
      style="width: 100%"
      @selection-change="store.handleSelectionChange"
      height="400"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column property="id" label="" width="120" />
      <el-table-column property="kuNumber" label="Номер КУ" width="120" />
      <el-table-column property="percent" label="Процент" width="120" />
      <el-table-column property="provider" label="Поставщик" width="120" />
      <el-table-column property="type" label="Тип графика" width="120" />
      <el-table-column> </el-table-column>
    </el-table>
  </el-scrollbar>
</template>

<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { useKuTableStore } from "~~/stores/kuTableStore";
import { useRouter } from "vue-router";
import { useEntityTableStore } from "~~/stores/entityTableStore";
import { useProviderTableStore } from "~~/stores/providerTableStore";

const store = useKuTableStore();
const router = useRouter();

const redirectToCreatePage = () => {
  router.push("/addKu");
};

store.initializeTableData();
</script>
