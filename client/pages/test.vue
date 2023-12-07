<template>
  <div>
    <h1>Список данных</h1>
    <input v-model="search" placeholder="Поиск" />
    <ul>
      <li v-for="item in filteredEntityList" :key="item.id">
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
const search = ref(entityStore.search);
const filteredEntityList = ref(entityStore.searchEntityList);

// Обновляем filteredEntityList при изменении поискового запроса
watchEffect(() => {
  entityStore.fetchEntitiesList({ /* Ваши параметры запроса */ });
  filteredEntityList.value = entityStore.searchEntityList;
});

// Опционально: Запускаем функцию для получения данных с сервера
entityStore.fetchEntitiesList({  });
</script>



