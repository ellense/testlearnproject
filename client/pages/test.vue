<template>
  <div>
    <h1>Список данных</h1>
    <ul>
      <li v-for="item in entityList" :key="item.entityid">
        {{ item.name }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useEntityTableStore } from '@/stores/entityTableStore';

const entityStore = useEntityTableStore();
const entityList = ref(entityStore.getEntityList);

onMounted(async () => {
  try {
    await entityStore.fetchEntitiesList({ /* Ваши параметры запроса */ });
    // Обновление entityList не требуется, так как watchEffect следит за изменениями в сторе
  } catch (error) {
    console.error("Ошибка при загрузке данных", error);
  }
});
</script>





