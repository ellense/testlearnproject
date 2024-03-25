<template>
    <el-scrollbar height="calc(100vh - 60px)">
      <h3>Коммерческое условие {{ useKuIdStore().ku_id }}</h3>
      <FeaturesKu />
    </el-scrollbar>
  </template>
  
  <script setup lang="ts">
  import { useKuIdStore } from "~~/stores/kuIdStore";
  </script>