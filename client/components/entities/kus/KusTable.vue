<template>
  <el-scrollbar class="scrollTable" style="border: none">
    <el-table :data="tableData" style="width: 100%" @selection-change="useKuStore().handleSelectionChange"
      height="calc(100vh - 208px)" @row-dblclick="row => rowDblclick(row.ku_id)" v-loading="loading" stripe border
      cellspacing="0" cellpadding="0">
      <el-table-column type="selection" width="40" fixed />
      <el-table-column property="ku_id" label="Код КУ" width="100" fixed sortable show-overflow-tooltip />
      <el-table-column property="contract" label="Контракт" width="200" fixed show-overflow-tooltip />
      <el-table-column property="description" label="Описание" width="250" show-overflow-tooltip />
      <el-table-column label="Юридическое лицо">
        <el-table-column property="entity_id" label="Код" width="90" sortable show-overflow-tooltip />
        <el-table-column property="entity_name" label="Наименование" width="170" sortable show-overflow-tooltip />
      </el-table-column>
      <el-table-column label="Поставщик">
        <el-table-column property="vendor_id" label="Код" width="140" sortable show-overflow-tooltip />
        <el-table-column property="vendor_name" label="Наименование" width="250" sortable show-overflow-tooltip />
      </el-table-column>
      <el-table-column property="date_start" type="date" sortable label="Начальная дата" width="110"
        show-overflow-tooltip />
      <el-table-column property="date_end" type="date" sortable label="Конечная дата" width="110"
        show-overflow-tooltip />
      <el-table-column prop="graph_exists" label="График расчета" width="80" align="center" fixed="right">
        <template #default="scope4">
          <el-icon v-if="scope4.row.graph_exists" name="check"><Select style="color: #55940e;" /></el-icon>
          <el-icon v-else name="close">
            <SemiSelect style="color: #8a8a8a;" />
          </el-icon>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="Статус" :filters="[
      { text: 'Действует', value: 'Действует' },
      { text: 'Создано', value: 'Создано' },
      { text: 'Закрыто', value: 'Закрыто' },
      { text: 'Отменено', value: 'Отменено' },
    ]" :filter-method="filterStatus" filter-placement="bottom-end" fixed="right">
        <template #default="scope3">
          <span :style="{ color: getStatusColor(scope3.row.status) }">{{ scope3.row.status }}</span>
        </template>
      </el-table-column>
    </el-table>
  </el-scrollbar>
  <div v-if="pagination?.count" class="pagination">
    <el-pagination v-model:pageSize="pageSize" :page-sizes="[50, 100, 300, 500]"
      :page-count="Math.ceil(pagination.count / pageSize)" layout="sizes, prev, pager, next"
      @size-change="handleSizeChange" @current-change="paginationChange" size="small" />
  </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { Select, SemiSelect } from '@element-plus/icons-vue'
import { ref, onMounted, watch } from "vue";
import type { IKuList } from "~/utils/types/directoryTypes";
import { useKuStore } from "~~/stores/kuStore";
import { useKuIdStore } from "~~/stores/kuIdStore";

const { getKu, pagination, countRowTable } = storeToRefs(
  useKuStore()
);
const tableData = ref<IKuList[]>(getKu.value);

const loading = ref()

//открывание и редактитрование ку
const rowDblclick = async (kuId: string) => {
  const router = useRouter();
  useKuIdStore().getKuDetailFromApi(kuId)
  useKuIdStore().getKuRequirementDetailFromApi(kuId)


  router.push({ path: `/ku/${kuId}` });
};

//пагинация
const pageSize = ref(countRowTable);
const handleSizeChange = async (val: number) => {
  pageSize.value = val;
  useKuStore().setCountRowTable(val);
  try {
    await useKuStore().getKuFromAPIWithFilter();
  } catch (error) {
    console.error("Ошибка при загрузке данных ку1", error);
  }
};
const paginationChange = (page: number) => {
  try {
    useKuStore().setFilterValue('page', page);
    useKuStore().getKuFromAPIWithFilter(page);
  } catch (error) {
    console.error("Ошибка при загрузке данных ку2", error);
  }
};

//монтирование и отслеживание таблицы
watch(getKu, (value) => {
  tableData.value = value || [];
});



onMounted(async () => {
  try {
    loading.value = true;
    await useKuStore().getKuFromAPIWithFilter();
    loading.value = false;
  } catch (error) {
    loading.value = false;
    console.error("Ошибка при загрузке данных ку3", error);
  }
});

//фильтры в таблице
const filterGraphic = (value: boolean, row: IKuList) => {
  // return row.graph_exists === value
  const graphExistsString = row.graph_exists.toString();
  return graphExistsString === value.toString();
}

const filterPeriod = (value: string, row: IKuList) => {
  return row.period === value
}

const filterStatus = (value: string, row: IKuList) => {
  return row.status === value
}

const getStatusColor = (status: string) => {
  switch (status) {
    case 'Действует':
      return '#55940e';
    case 'Создано':
      return '#117ba5';
    case 'Закрыто':
      return '#3a3838';
    case 'Отменено':
      return '#f7745c';
    default:
      return '#000';
  }
}

</script>
