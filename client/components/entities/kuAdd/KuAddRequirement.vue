<template>
  <el-scrollbar class="scrollTable">
    <el-table style="width: 100%" height="calc(100vh - 700px)" :data="kuRequirementList">
      <el-table-column
        property="number"
        label="Тип номенклатуры"
        width="200"
        show-overflow-tooltip
      />
      <el-table-column
        property="product"
        label="Товар"
        width="300"
        show-overflow-tooltip
      />
      <el-table-column
        property="category"
        label="Категория"
        width="200"
        show-overflow-tooltip
      />
      <el-table-column
        property="producer"
        label="Производитель"
        width="300"
        show-overflow-tooltip
      />
      <el-table-column
        property="brand"
        label="Торговая марка"
        width="300"
        show-overflow-tooltip
      />
      <el-table-column fixed="right" label="Операция" >
      <template #default="scope">
        <el-button
          link
          type="primary"
          size="small"
          @click.prevent="deleteRow(scope.$index),deleteVisible()"
        >
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
const isAddAllDisabled = ref(store.isAddAllDisabled);
const isAddConditionDisabled = ref(store.isAddConditionDisabled);

const deleteRow = (index: number) => {//удаление условий

  store.tableDataRequirement.splice(index, 1);
  
}
const deleteVisible = () => {
  isAddAllDisabled.value = false;
  isAddConditionDisabled.value = false;
  console.log("открыто", store.isAddAllDisabled,isAddAllDisabled.value, isAddConditionDisabled.value  )
}


</script>
