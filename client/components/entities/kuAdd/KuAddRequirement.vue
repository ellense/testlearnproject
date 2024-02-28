<template>
  <el-scrollbar class="scrollTable">
    <el-table style="width: 100%" height="calc(100vh - 600px)" :data="kuRequirementList" border empty-text="Добавьте условия">
      <el-table-column property="item_type" label="Тип номенклатуры" width="150" show-overflow-tooltip />
      <el-table-column property="item_code" label="Связь с номенклатурой / категорией" width="150" show-overflow-tooltip />
      <el-table-column property="item_name" label="Наименование" width="400" show-overflow-tooltip />
      <el-table-column property="producer" label="Производитель" width="400" show-overflow-tooltip />
      <el-table-column property="brand" label="Торговая марка" width="400" show-overflow-tooltip />
      <el-table-column fixed="right" label="Операция">
        <template #default="scope">
          <el-button link type="danger" size="small" @click.prevent="deleteRow(scope.$index)">
            Удалить
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-scrollbar>
</template>
<script lang="ts" setup>
import { ref } from "vue";

import { useKuAddStore } from "~~/stores/kuAddStore";
const store = useKuAddStore();
const kuRequirementList = ref(store.tableDataRequirement);

//удаление условий
const deleteRow = (index: number) => {
  store.tableDataRequirement.splice(index, 1);
  store.disableButtons = false;
}
</script>
