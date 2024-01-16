<template>
  <div class="buttonBar_search">
    <el-input placeholder="Поиск" style="width: 200px" :prefix-icon="Search" />
  </div>
  <el-scrollbar class="scrollTableFiltres">
    <el-table v-if="tableData.length > 0" style="width: 100%" height="300" :data="tableData">
      <el-table-column
        property="selection"
        type="selection"
        width="55"
        show-overflow-tooltip
      />
      <el-table-column
        prop="brand_name"
        label="Наименование"
        show-overflow-tooltip
      >
        <template v-slot="{ row }">
          {{ row.brand_name }}
        </template>
      </el-table-column>
    </el-table>
    <div v-else>
      Нет данных для отображения.
    </div>
  </el-scrollbar>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from "vue";
import { Search } from "@element-plus/icons-vue";
import { storeToRefs } from "pinia";
import { useKuTableStore } from "~~/stores/kuTableStore";
const { getBrands } = storeToRefs(useKuTableStore());
import type { IBrand } from "~/utils/types/directoryTypes";
const tableData = ref<IBrand[]>([]);
watch(
  () => getBrands.value,
  (value) => {
    tableData.value = value || [];
    console.log('ccccccccccc', tableData)
  }
);
onMounted(async () => {
  try {
    await useKuTableStore().fetchBrandList({
      brand_name: "",
    });
  } catch (error) {
    console.error("Ошибка при загрузке данных", error);
  }
});
</script>