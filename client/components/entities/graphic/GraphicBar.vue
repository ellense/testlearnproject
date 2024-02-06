<template>
<div class="buttonBar">
    <div class="buttonBar_left">
      <el-button @click="deleteGraphic()">Удалить</el-button>
    </div>
    <div class="buttonBar_search">
    </div>
  </div>
</template>

<script setup lang="ts">
import { useKuStore } from "~~/stores/kuStore";
const store = useKuStore();
const deleteGraphic = async () => {
  const selectedRows = store.multipleSelection2.map((row) => row.graph_id);

  try {
    for (const graph_id of selectedRows) {
      const results = await GRAPHIC.deleteGraphic({ graph_id });
      console.log("успешно удалилось", results);
    }
    
  } catch (error) {
    console.error("Ошибка при удалении строк:", error);
    ElMessage.error("Ошибка при удалении графика");
  } finally {
    store.dataGraphic = store.dataGraphic.filter(
      (row) => !selectedRows.includes(row.graph_id)
    );
    store.multipleSelection2 = [];
  }
};
</script>

<style scoped>

</style>