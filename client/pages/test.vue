<template>
  <div>
    <h1>Список данных</h1>
    <ul>
      <li v-for="item in entityList" :key="item.id">
        {{ item.name }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, watchEffect } from 'vue';
import { useEntityTableStore } from '@/stores/entityTableStore';

// Используйте стор
const entityStore = useEntityTableStore();

// Связываем данные из стора с компонентом
const entityList = ref(entityStore.getEntityList);

// Опционально: Запускаем функцию для получения данных с сервера
entityStore.fetchEntitiesList({ /* Ваши параметры запроса */ });

// Обновляем entityList при изменении в сторе
watchEffect(() => {
  entityList.value = entityStore.getEntityList;
});
</script>



