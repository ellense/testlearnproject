<template>
  <el-scrollbar class="scrollTable">
    <el-table style="width: 100%" height="calc(100vh - 600px)" :data="kuRequirementList">
      <el-table-column property="type_item" label="Тип номенклатуры" width="200" show-overflow-tooltip />
      <el-table-column property="item_id" label="Связь с номенклатурой / категорией" width="150" show-overflow-tooltip />
      <el-table-column property="item_name" label="Наименование" width="300" show-overflow-tooltip />
      <el-table-column property="producer_name" label="Производитель" width="300" show-overflow-tooltip />
      <el-table-column property="brand_name" label="Торговая марка" width="300" show-overflow-tooltip />
      <el-table-column fixed="right" label="Операция">
        <template #default="scope">
          <el-button link type="primary" size="small" @click.prevent="deleteRow(scope.$index), deleteVisible()">
            Удалить
          </el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-scrollbar>
</template>
<script lang="ts" setup>
import { ref } from "vue";

import { useKuStore } from "~~/stores/kuStore";
const store = useKuStore();
const kuRequirementList = ref(store.tableDataRequirement);

//удаление условий
const deleteRow = (index: number) => {
  store.tableDataRequirement.splice(index, 1);
}

//скрытие кнопок (не работает, пока и не надо)
const isAddAllDisabled = ref(store.isAddAllDisabled);
const isAddConditionDisabled = ref(store.isAddConditionDisabled);
const deleteVisible = () => {
  isAddAllDisabled.value = false;
  isAddConditionDisabled.value = false;
  console.log("открыто", store.isAddAllDisabled, isAddAllDisabled.value, isAddConditionDisabled.value)
}

</script>
