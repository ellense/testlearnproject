<template>
  <div>
    <h1>Список данных</h1>
    <ul>
      <li v-for="item in productList" :key="item.itemid">
        {{ item.name }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useEntityTableStore } from '@/stores/entityTableStore';
import { useProductTableStore } from "~~/stores/productTableStore";
const productStore = useProductTableStore();
const productList = ref(productStore.getProductList);
// const entityStore = useEntityTableStore();
// const entityList = ref(entityStore.getEntityList);

onMounted(async () => {
  try {
    await productStore.fetchProductsList({ /* Ваши параметры запроса */ });
    // Обновление entityList не требуется, так как watchEffect следит за изменениями в сторе
  } catch (error) {
    console.error("Ошибка при загрузке данных", error);
  }
});
</script>





