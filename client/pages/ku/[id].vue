<template>
    <el-scrollbar height="calc(100vh - 45px)">
      <h3>Коммерческое условие {{ useKuIdStore().ku_id }}</h3>
      <FeaturesKu />
    </el-scrollbar>
  </template>
  
  <script setup lang="ts">
  import { useKuIdStore } from "~~/stores/kuIdStore";
  </script>
<style scoped>
h3{
  font-size: 13;
  margin: 10px;
}
</style>