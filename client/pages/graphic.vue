<template>
    <el-scrollbar height="calc(100vh - 60px)"> 
      
      <FeaturesGraphic/>
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