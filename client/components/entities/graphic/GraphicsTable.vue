<template>
  <div class="toolbarAdd"></div>
  <el-scrollbar class="scrollTable" style="border: none"  >
    <!--  для обратной сортировки в el-table :default-sort="{prop: 'graph_id', order: 'descending'}" -->
    <el-table :data="tableData" style="width: 100%"  height="calc(100vh - 185px)" border @selection-change="useKuStore().handleSelectionChange2">
      <el-table-column type="selection" width="55" />
      <el-table-column type="index" label="ID" sortable width="100" show-overflow-tooltip />
      <el-table-column property="graph_id" label="ID" sortable width="100" show-overflow-tooltip />
      <el-table-column property="ku_id" label="Koд КУ" width="100" sortable show-overflow-tooltip />
      <el-table-column property="vendor_id" label="Поставщик" width="200" sortable show-overflow-tooltip />
      <el-table-column property="period" label="Период расчета" width="150" show-overflow-tooltip />
      <el-table-column property="sum_calc" label="База расчета" show-overflow-tooltip />
      <el-table-column property="percent" label="Процент" width="120" show-overflow-tooltip />
      <el-table-column property="date_start" type="date" label="Начальная дата" width="160" sortable
        show-overflow-tooltip />
      <el-table-column property="date_end" type="date" label="Конечная дата" width="160" sortable show-overflow-tooltip />
      <el-table-column property="date_calc" type="date" label="Дата расчета" width="160" sortable show-overflow-tooltip />
      <el-table-column property="sum_bonus" label="Расчитано" show-overflow-tooltip />
      <el-table-column property="status" label="Cтатус" show-overflow-tooltip />
    </el-table>
    <div v-if="pagination?.count && pagination.count > countRowTable" class="pagination">
      <el-pagination v-model:pageSize="pageSize" :page-sizes="[50, 100, 300, 500]"
        :page-count="Math.ceil(pagination.count / pageSize)" layout="sizes, prev, pager, next"
        @size-change="handleSizeChange" @current-change="paginationChange" />
    </div>
  </el-scrollbar>
</template>
<script lang="ts" setup>
import { ref, watch, onMounted } from "vue";
import { useKuStore } from "~~/stores/kuStore";
import { storeToRefs } from "pinia";
import type { IGraphic } from "~/utils/types/directoryTypes";
const { getGraphic, pagination, countRowTable } = storeToRefs(useKuStore());

const tableData = ref<IGraphic[]>(getGraphic.value)

const pageSize = ref(countRowTable);
const handleSizeChange = async (val: number) => {
  pageSize.value = val;
  useKuStore().setCountRowTable(val);
  try {
    await useKuStore().getGraphicsFromAPIWithFilter();
  } catch (error) {
    console.error("Ошибка при загрузке данных 11", error);
  }
};

watch(getGraphic, (value) => {
  tableData.value = value || [];
});

const paginationChange = (page: number) => {
  useKuStore().fetchGraphicList(page);
};

onMounted(async () => {
  try {
    await useKuStore().fetchGraphicList();
  } catch (error) {
    console.error("Ошибка при загрузке данных", error);
  }
});

</script>
