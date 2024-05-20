<template>
  <el-scrollbar class="scrollTable">
    <el-table style="width: 100%" height="calc(100vh - 100px)" :data="tableData" v-loading="loading" :border="true" stripe>
      <el-table-column prop="entity_id" label="ID" width="70" show-overflow-tooltip sortable />
      <el-table-column prop="name" label="Наименование" width="250" show-overflow-tooltip sortable />
      <el-table-column prop="urastic_name" label="Полное наименование" width="400" show-overflow-tooltip  />
      <el-table-column prop="director_name" label="Директор" width="400" show-overflow-tooltip  />
      <el-table-column prop="urastic_address" label="Адрес" show-overflow-tooltip />
      <el-table-column prop="merge_id" label="Связка" show-overflow-tooltip />
    </el-table>
  </el-scrollbar>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import { storeToRefs } from "pinia";
import { useEntityStore } from "@/stores/entityStore";
import type { IEntity } from "~/utils/types/entityTypes";
const { getEntities } = storeToRefs(useEntityStore());

const tableData = ref<IEntity[]>(getEntities.value);
const loading = ref()
watch(getEntities, (value) => {
  console.log("getEntities changed:", value);
  tableData.value = value || [];
  console.log("tableData:", tableData.value);
});


onMounted(async () => {
  try {
    loading.value = true; 
    console.log("onmounted", );
    await useEntityStore().getEntityFromAPIWithFilter();
    loading.value = false; 
  } catch (error) {
    loading.value = false; 
    console.error("Ошибка при загрузке данных", error);
  }
});

</script>

<style scoped></style>