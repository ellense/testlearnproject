<template>
  <div class="buttonBar">
    <div class="buttonBar_left">
      <el-button @click="storeProduct.dialogFormVisible = true">
        Добавить
      </el-button>
      <el-button @click="storeProduct.deleteSelectedRows">Удалить</el-button>
    </div>
    <div class="buttonBar_search">
      <el-input
        v-model="storeProduct.search"
        placeholder="Поиск"
        style="width: 200px"
        :prefix-icon="Search"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useProductTableStore } from "~~/stores/productTableStore";
import { Search } from "@element-plus/icons-vue";
const storeProduct = useProductTableStore();
</script>

<style scoped></style>
