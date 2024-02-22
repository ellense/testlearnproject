<template>
  <div class="toolbarAdd"></div>
  <el-scrollbar class="scrollTable" style="border: none">
    <!--  для обратной сортировки в el-table :default-sort="{prop: 'graph_id', order: 'descending'}" -->
    <el-table :data="tableData" style="width: 100%" height="calc(100vh - 225px)" border
      @selection-change="useKuStore().handleSelectionChange2">
      <el-table-column fixed type="selection" width="40" />
      <!-- <el-table-column type="index" label="ID" sortable width="80" show-overflow-tooltip /> -->
      <el-table-column fixed property="ku_id" label="Koд КУ" width="100" sortable show-overflow-tooltip />
      <el-table-column label="Юридическое лицо">
        <el-table-column property="entity_id" label="Код" width="80" sortable show-overflow-tooltip />
        <el-table-column property="entity_name" label="Наименование" width="170" sortable show-overflow-tooltip />
      </el-table-column>
      <el-table-column label="Поставщик">
        <el-table-column property="vendor_id" label="Код" width="135" sortable show-overflow-tooltip />
        <el-table-column property="vendor_name" label="Наименование" width="180" sortable show-overflow-tooltip />
      </el-table-column>
      <el-table-column prop="period" label="Период расчета" width="105" :filters="[
        { text: 'Месяц', value: 'Месяц' },
        { text: 'Квартал', value: 'Квартал' },
        { text: 'Полгода', value: 'Полгода' },
        { text: 'Год', value: 'Год' },
      ]" :filter-method="filterTag2" filter-placement="bottom-end">
        <template #default="scope2">
          {{ scope2.row.period }}
        </template>
      </el-table-column>
      <el-table-column property="sum_calc" label="База расчета" width="120" show-overflow-tooltip />
      <el-table-column property="percent" label="Процент" width="90" show-overflow-tooltip />
      <el-table-column property="date_start" type="date" label="Начальная дата" width="105" sortable
        show-overflow-tooltip />
      <el-table-column property="date_end" type="date" label="Конечная дата" width="105" sortable show-overflow-tooltip />
      <el-table-column property="date_calc" type="date" label="Дата расчета" width="105" sortable show-overflow-tooltip />
      <el-table-column fixed="right" property="sum_bonus" label="Расчитано" width="100" show-overflow-tooltip />
      <el-table-column fixed="right" property="sum_bonus" label="Утверждено" width="110" show-overflow-tooltip />
      <el-table-column  fixed="right" prop="status" label="Статус" :filters="[
        { text: 'Запланировано', value: 'Запланировано' },
        { text: 'Рассчитано', value: 'Рассчитано' },
        { text: 'Утверждено', value: 'Утверждено' },
      ]" :filter-method="filterTag" filter-placement="bottom-end">
        <template #default="scope">
          <el-tag :type="getStatusTagType(scope.row.status)" disable-transitions>{{ scope.row.status }}</el-tag>
        </template>
      </el-table-column>
    </el-table>
    <!-- v-if="pagination?.count && pagination.count > countRowTable" -->
  </el-scrollbar>
  <div  class="pagination">
      <el-pagination v-if="pagination?.count" v-model:pageSize="pageSize" :page-sizes="[20, 50, 100, 300, 500]"
        :page-count="Math.ceil(pagination.count / pageSize)" layout="sizes, prev, pager, next"
        @size-change="handleSizeChange" @current-change="paginationChange" />
    </div>
</template>
<script lang="ts" setup>
import { ref, watch, onMounted } from "vue";
import { useKuStore } from "~~/stores/kuStore";
import { storeToRefs } from "pinia";
import type { IGraphic } from "~/utils/types/directoryTypes";
const { getGraphic, pagination, countRowTable } = storeToRefs(useKuStore());

const tableData = ref<IGraphic[]>(getGraphic.value)

const filterTag = (value: string, row: IGraphic) => {
  return row.status === value
}
const filterTag2 = (value: string, row: IGraphic) => {
  return row.period === value
}
const getStatusTagType = (status: string) => {
  switch (status) {
    case 'Запланировано':
      return 'primary';
    case 'Рассчитано':
      return 'warning';
    case 'Утверждено':
      return 'success';
    default:
      return 'info';
  }
};

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
  useKuStore().getGraphicsFromAPIWithFilter(page);
};

onMounted(async () => {
  try {
    await useKuStore().getGraphicsFromAPIWithFilter();
  } catch (error) {
    console.error("Ошибка при загрузке данных", error);
  }
});

</script>
