<!-- <template>
  <div>
    <h1>Список данных</h1>
    <ul>
      <li v-for="item in productList" :key="item.vendorid">
        {{ item.vendorid }}
      </li>
    </ul>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useEntityTableStore } from '@/stores/entityTableStore';
import { useProductTableStore } from "~~/stores/productTableStore";
import { useVendorTableStore } from "~~/stores/vendorTableStore";
const productStore = useVendorTableStore();
const productList = ref(productStore.getVendorsNameAndId);
// const entityStore = useEntityTableStore();
// const entityList = ref(entityStore.getEntityList);

onMounted(async () => {
  try {
    await productStore.fetchVendorsNameAndId({ /* Ваши параметры запроса */ });
    // Обновление entityList не требуется, так как watchEffect следит за изменениями в сторе
  } catch (error) {
    console.error("Ошибка при загрузке данных", error);
  }
});
</script> -->
<template>
  <div>
    <h1>Список данных</h1>
    <el-select v-model="selectedVendor" placeholder="Выберите поставщика">
      <el-option
        v-for="item in productList"
        :key="item.vendorid"
        :label="item.vendorid"
        :value="item.vendorid"
      >
        {{ item.vendorid }}
      </el-option>
    </el-select>
    <p>Выбранный поставщик: {{ selectedVendor }}</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useVendorTableStore } from "~~/stores/vendorTableStore";

const productStore = useVendorTableStore();
const productList = ref(productStore.getVendorsNameAndId);
const selectedVendor = ref(null);
console.log("gigi",productList)
onMounted(async () => {
  try {
    await productStore.fetchVendorsNameAndId({ vendorid: "", name: "", });
  } catch (error) {
    console.error("Ошибка при загрузке данных", error);
  }
});
</script>





