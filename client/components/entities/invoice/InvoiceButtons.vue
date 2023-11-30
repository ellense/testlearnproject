<template>
  <div class="buttonBar">
    <div class="buttonBar_left">
      <el-button @click="storeInvoice.dialogFormVisible = true">
        Добавить
      </el-button>
      <el-button @click="storeInvoice.deleteSelectedRows">Удалить</el-button>
    </div>
    <div class="buttonBar_search">
      <el-input
        v-model="storeInvoice.search"
        placeholder="Поиск"
        style="width: 200px"
        :prefix-icon="Search"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { Search } from "@element-plus/icons-vue";
import { useInvoiceTableStore } from "~~/stores/invoiceTableStore";
const storeInvoice = useInvoiceTableStore();
</script>


