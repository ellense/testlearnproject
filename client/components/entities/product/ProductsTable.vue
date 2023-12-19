<template>
  <el-scrollbar class="scrollTable">
    <el-table
      v-loading="loading"
      element-loading-text="Загрузка"
      :data="filteredProductList"
      style="width: 100%"
      height="calc(100vh - 130px)"
    >
      <el-table-column
        prop="itemid"
        label="ID"
        width="100"
        show-overflow-tooltip
      />
      <el-table-column
        prop="name"
        label="Наименование"
        width="500"
        show-overflow-tooltip
      />
      <el-table-column
        prop="classifier_id"
        label="Категория"
        width="200"
        show-overflow-tooltip
      />
      <el-table-column prop="brand_id" label="Бренд" />
    </el-table>
  </el-scrollbar>
</template>

<script lang="ts" setup>
import { ref, onMounted, watch } from "vue";
import { useProductTableStore } from "~~/stores/productTableStore";

const productStore = useProductTableStore();
const filteredProductList = ref(productStore.searchProductsList);

let loading = ref(true);

watch(
  () => productStore.searchProductsList,
  () => {
    filteredProductList.value = productStore.searchProductsList;
    loading.value = false;
  }
);

onMounted(async () => {
  try {
    await productStore.fetchProductsList({
      itemid: "",
      classifier_id: "",
      brand_id: "",
      name: "",
    });
  } catch (error) {
    loading.value = false;
    console.error("Ошибка при загрузке данных", error);
  }
});
</script>

<style scoped></style>
