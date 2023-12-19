<template>
  <el-dialog
    v-model="kuStore.dialogFormVisible"
    title="Фильтрация товаров по накладных"
    close-on-click-modal
    close-on-press-escape
    draggable
  >
    <el-tabs type="border-card">
      <el-tab-pane label="Производитель">
        <EntitiesKuAddFiltresProduser/>
        
      </el-tab-pane>
      <el-tab-pane label="Торговая марка">
        <EntitiesKuAddFiltresBrand/>
      </el-tab-pane>
      <el-tab-pane label="Категория">
        <EntitiesKuAddFiltresClassificator/>
      </el-tab-pane>
      <el-tab-pane label="Товар">
         <EntitiesKuAddFiltresProduct/>
      </el-tab-pane>
    </el-tabs>

    <template #footer>
      <span class="dialog-footer">
        <el-button @click="kuStore.dialogFormVisible = false">Отмена</el-button>
        <el-button @click="">Сохранить</el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script setup lang="ts">
import { ref } from "vue";
import { useKuTableStore } from "~~/stores/kuTableStore";

const kuStore = useKuTableStore();
import { useEntityTableStore } from "@/stores/entityTableStore";

const entityStore = useEntityTableStore();
const filteredEntityList = ref(entityStore.searchEntityList);

// Обновляем filteredEntityList при изменении searchEntityList
watch(
  () => entityStore.searchEntityList,
  () => {
    filteredEntityList.value = entityStore.searchEntityList;
  }
);
</script>
