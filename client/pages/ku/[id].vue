<template>
    <el-scrollbar height="calc(100vh - 60px)">
      <h2 >Коммерческое условие {{ useKuIdStore().ku_id }}</h2>
      <FeaturesKu />
    </el-scrollbar>
  </template>
  <script setup lang="ts">
  import { useKuIdStore } from "~~/stores/kuIdStore";

  
  </script>