<template>
  <div class="toolbarAdd">
    <el-input
      v-model="storeProvider.newScore"
      label="Счет"
      placeholder="Введите счет"
      style="width: 200px"
      clearable
    ></el-input>
    <el-input
      v-model="storeProvider.newName"
      placeholder="Введите имя поставщика"
      style="width: 200px"
      clearable
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
  </div>





  <div class="toolbarButton" style="margin-top: 20px">
    <div v-if="storeProvider.newScore">
      <el-button @click="storeProvider.addRows">Добавить</el-button>
    </div>
    <div v-if="storeProvider.multipleSelection.length > 0">
      <el-button @click="storeProvider.deleteSelectedRows">Удалить</el-button>
      <el-button @click="storeProvider.toggleSelection">Очистить все</el-button>
    </div>
  </div>
  <el-scrollbar class="scrollTable" max-height="400px">
    <el-table
      ref="multipleTableRef"
      :data="storeProvider.searchTableData"
      style="width: 100%"
      @selection-change="storeProvider.handleSelectionChange"
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
        property="score"
        label="Счет"
        width="200"
        show-overflow-tooltip
      />
      <el-table-column
        property="name"
        label="Наименование"
        width="300"
        show-overflow-tooltip
      />
      <el-table-column
        property="nameEntity"
        label="Юридическое лицо"
        show-overflow-tooltip
      />
      <el-table-column>
        <template #header>
          <el-input
            v-model="storeProvider.search"
            placeholder="Поиск"
            style="width: 200px"
            :prefix-icon="Search"
          />
        </template>
      </el-table-column>
    </el-table>
  </el-scrollbar>











  
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { Search } from "@element-plus/icons-vue";
import { useEntityTableStore } from "~~/stores/entityTableStore";
import { useProviderTableStore } from "~~/stores/providerTableStore";








const options = ref<{ EntityName: string; label: string }[]>([]);

const storeEntity = useEntityTableStore();
const storeProvider = useProviderTableStore();

const updateOptions = () => {
  options.value = storeEntity.tableData.map((entity) => ({
    EntityName: entity.name,
    label: entity.name,
  }));
};

updateOptions();
</script>

<style scoped>
.dialog-footer button:first-child {
  margin-right: 10px;
}</style>
