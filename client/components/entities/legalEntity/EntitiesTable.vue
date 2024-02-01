<template>
  <el-scrollbar class="scrollTable">
    <el-table style="width: 100%" height="calc(100vh - 130px)" :data="tableData">
      <el-table-column prop="entity_id" label="ID" width="70" show-overflow-tooltip sortable />
      <el-table-column prop="name" label="Наименование" width="250" show-overflow-tooltip sortable />
      <el-table-column prop="urasticname" label="Полное наименование" width="400" show-overflow-tooltip sortable />
      <el-table-column prop="directorname" label="Директор" width="400" show-overflow-tooltip sortable />
      <el-table-column prop="urasticaddress" label="Адрес" show-overflow-tooltip />
    </el-table>
  </el-scrollbar>
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import { storeToRefs } from "pinia";
import { useEntityTableStore } from "@/stores/entityTableStore";
import type { IEntity } from "~/utils/types/directoryTypes";
const { getEntities } = storeToRefs(useEntityTableStore());

const tableData = ref<IEntity[]>(getEntities.value);

watch(getEntities, (value) => {
  console.log("getEntities changed:", value);
  tableData.value = value || [];
  console.log("tableData:", tableData.value);
});


onMounted(async () => {
  try {
    console.log("Before API call");
    await useEntityTableStore().getEntityFromAPIWithFilter();
    console.log("After API call");
  } catch (error) {
    console.error("Ошибка при загрузке данных", error);
  }
});

</script>

<style scoped></style>
