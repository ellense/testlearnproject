<template>
  <el-scrollbar height="calc(100vh - 60px)">
    <h2>Юридические лица</h2>
    <FeaturesEntity/>
  </el-scrollbar>
</template>

<script setup lang="ts">
definePageMeta({
  title: 'Юр. лица',
  useInMainMenu: true,
  displayOrder: 3,
  permission: ['all'],
})
</script>
