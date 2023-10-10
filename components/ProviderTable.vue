<template>
  <div class="toolbarAdd">
    <el-input
      v-model="storeProvider.newScore"
      label="Счет"
      placeholder="Введите счет"
      style="width: 200px"
    ></el-input>
    <el-input
      v-model="storeProvider.newName"
      placeholder="Введите имя поставщика"
      style="width: 200px"
    ></el-input>
    <el-select
      v-model="storeProvider.EntityName"
      clearable
      placeholder="Выберите Юр.Лицо"
    >
      <el-option
        v-for="item in options"
        :key="item.EntityName"
        :label="item.label"
        :value="item.EntityName"
      />
    </el-select>
    <el-input
      v-model="storeProvider.search"
      placeholder="Поиск"
      style="width: 200px"
      :prefix-icon="Search"
    ></el-input>
  </div>
  <el-scrollbar class="scrollTable" max-height="400px">
    <el-table
      ref="multipleTableRef"
      :data="storeProvider.tableData"
      style="width: 100%"
      @selection-change="storeProvider.handleSelectionChange"
      height="400"
    >
      <el-table-column property="selection" type="selection" width="55" />
      <el-table-column type="index" width="55" />
      <el-table-column property="score" label="Счет" width="200" />
      <el-table-column property="name" label="Наименование" width="300" />
      <el-table-column
        property="nameEntity"
        label="Юридическое лицо"
        show-overflow-tooltip
      />
    </el-table>
  </el-scrollbar>

  <div class="toolbarButton" style="margin-top: 20px">
    <el-button @click="storeProvider.toggleSelection">Очистить все</el-button>
    <div v-if="storeProvider.newScore">
      <el-button @click="storeProvider.addRows">Добавить</el-button>
    </div>
    <div v-if="storeProvider.multipleSelection.length > 0">
      <el-button @click="storeProvider.deleteSelectedRows">Удалить</el-button>
    </div>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
//import { ElTable } from "element-plus";
import { Search } from "@element-plus/icons-vue";
import { useEntityTableStore } from "~~/stores/entityTableStore";
import { useProviderTableStore } from "~~/stores/providerTableStore";

const options = ref<{ EntityName: string; label: string }[]>([]);

const storeEntity = useEntityTableStore();
const {
  newName,
  search,
  filteredTableData,
  addRows,
  deleteSelectedRows,
  toggleSelection,
  handleSelectionChange,
  EntityName,
} = useProviderTableStore();
const storeProvider = useProviderTableStore();
storeEntity.initializeTableData();
storeProvider.initializeTableData();

const updateOptions = () => {
  options.value = storeEntity.tableData.map((entity) => ({
    EntityName: entity.name,
    label: entity.name,
  }));
};

// Вызываем метод для обновления options при создании компонента
updateOptions();
</script>

<style scoped></style>
