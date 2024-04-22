<template>
    <el-scrollbar height="calc(100vh - 45px)"> 
      <FeaturesGraphicV/>
    </el-scrollbar>
  </template>

  <script setup lang="ts">
  definePageMeta({
    title: 'График платежей',
    useInMainMenu: true,
    displayOrder: 2,
    permission: ['all'],
  })
  </script>
  <style scoped>
  h2 {
    margin-bottom: 0;
  }
  </style>