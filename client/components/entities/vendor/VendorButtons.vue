<template>
  <div class="buttonBar">
    <div class="buttonBar_left">
      <el-button @click="storeProvider.dialogFormVisible = true">
        Добавить
      </el-button>
      <el-button @click="storeProvider.deleteSelectedRows">Удалить</el-button>
    </div>
    <div class="buttonBar_search">
      <el-input
        v-model="storeProvider.search"
        placeholder="Поиск"
        style="width: 200px"
        :prefix-icon="Search"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { Search } from "@element-plus/icons-vue";
import { useVendorTableStore } from "~~/stores/providerTableStore";
const storeProvider = useVendorTableStore();
</script>
