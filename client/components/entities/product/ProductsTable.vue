<template>
  <el-scrollbar class="scrollTable">
    <el-table
      :data="filteredProductList"
      style="width: 100%"
      height="calc(100vh - 130px)"
    >
      <el-table-column prop="itemid" label="ID" width="100" show-overflow-tooltip />
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

watch(() => productStore.searchProductsList, () => {
  filteredProductList.value = productStore.searchProductsList;
});

onMounted(async () => {
  try {
    await productStore.fetchProductsList({
      itemid: "",
      classifier_id: "",
      brand_id: "",
      name: "",
    });
  } catch (error) {
    console.error("Ошибка при загрузке данных", error);
  }
});
</script>

<style scoped></style>
