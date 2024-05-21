<template>
    <el-scrollbar height="calc(100vh - 45px)">
      <h3>Коммерческое условие клиента {{ useKuCIdStore().ku_id }}</h3>
      <FeaturesKuC />
    </el-scrollbar>
  </template>
  
  <script setup lang="ts">
  import { useKuCIdStore } from "~~/stores/kuCIdStore";
  </script>
<style scoped>
h3{
  font-size: 13;
  margin: 10px;
}
</style>