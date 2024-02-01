<template>
  <div class="directoryBar">
    <div class="directoryBar_filter">
      <h2>Накладные поставок</h2>
      <!-- <el-select v-model="shopLegalEntity" multiple clearable filterable collapse-tags collapse-tags-tooltip
        :max-collapse-tags="3" placeholder="Фильтр по юридическому лицу" style="width: 300px"
        @change="changeShopLegalEntity">
        <el-option v-for="item in shopLegalEntityList" :key="item" :label="item" :value="item" />
      </el-select> -->
    </div>
    <el-input v-model="searchQuery" placeholder="Поиск" style="max-width: 400px" :prefix-icon="Search"></el-input>
  </div>
</template>

<script setup lang="ts">
import { Search } from "@element-plus/icons-vue";
import { useInvoiceStore } from "~~/stores/invoiceStore";

const searchQuery = ref('');
watch(searchQuery, (newValue: string) => {
  // Вызов метода хранилища для выполнения поиска
  useInvoiceStore().performSearch(newValue);
});
</script>

<style scoped></style>
