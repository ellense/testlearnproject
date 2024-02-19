<template>
    <el-scrollbar height="calc(100vh - 60px)">
      <h2 >Коммерческое условие {{ ku_id }}</h2>
      <FeaturesKu />
    </el-scrollbar>
  </template>
  <script setup lang="ts">
  import { ref, onMounted } from 'vue';
  import { useRoute } from 'vue-router';
  
  const ku_id = ref<string | string[]>("");
  const route = useRoute(); // Получаем объект текущего маршрута из Vue Router
  
  // Используйте хук onMounted для выполнения операций после монтирования компонента
  onMounted(() => {
    // Получаем параметр из URL с именем "ku_id"
    // ku_id.value = route.params.ku_id || null;
    // console.log("ku_id.value",ku_id.value)
});

  </script>