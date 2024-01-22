<template>
  <div class="directoryBar">
    <h2>Поставщики</h2>
    <!-- <el-input
      v-model="vendorStore.search"
      placeholder="Поиск"
      style="max-width: 400px"
      :prefix-icon="Search"
    /> -->
  </div>
</template>

<script setup lang="ts">
import { Search } from "@element-plus/icons-vue";
import { useVendorStore } from "~~/stores/vendorStore";
const vendorStore = useVendorStore();
</script>

<style scoped></style>
