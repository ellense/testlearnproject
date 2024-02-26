<template>
  <el-scrollbar class="scrollTable" style="border: none">
    <el-table :data="tableData" style="width: 100%" @selection-change="useKuStore().handleSelectionChange"
      height="calc(100vh - 225px)" @row-dblclick="row => rowDblclick(row.ku_id)" v-loading="loading">
      <el-table-column type="selection" width="55" />
      <el-table-column property="ku_id" label="Код КУ" width="150" sortable show-overflow-tooltip />
      <el-table-column label="Юридическое лицо">
        <el-table-column property="entity_id" label="Идентификатор" width="160" sortable show-overflow-tooltip />
        <el-table-column property="entity_name" label="Наименование" width="170" sortable show-overflow-tooltip />
      </el-table-column>
      <el-table-column label="Поставщик">
        <el-table-column property="vendor_id" label="Идентификатор" width="160" sortable show-overflow-tooltip />
        <el-table-column property="vendor_name" label="Наименование" width="250" sortable show-overflow-tooltip />
      </el-table-column>
      <el-table-column property="percent" label="Процент" width="120" show-overflow-tooltip />
      <el-table-column prop="period" label="Период расчета" width="110" :filters="[
        { text: 'Месяц', value: 'Месяц' },
        { text: 'Квартал', value: 'Квартал' },
        { text: 'Полгода', value: 'Полгода' },
        { text: 'Год', value: 'Год' },
      ]" :filter-method="filterPeriod" filter-placement="bottom-end">
        <template #default="scope">
          {{ scope.row.period }}
        </template>
      </el-table-column>
      <el-table-column property="date_start" type="date" sortable label="Начальная дата" width="110"
        show-overflow-tooltip />
      <el-table-column property="date_end" type="date" sortable label="Конечная дата" width="110" show-overflow-tooltip />
      <!-- <el-table-column prop="graph_exists" label="График расчета" :filters="[
        { text: 'Есть', value: 'true' },
        { text: 'Нет', value: 'null' },
      ]" :filter-method="filterStatus" filter-placement="bottom-end">
        <template #default="scope2">
          <el-tag  disable-transitions :type="getStatusTagTypeGraphic(scope2.row.graph_exists)">{{ scope2.row.graph_exists }}</el-tag>
        </template>
      </el-table-column> -->
      <el-table-column prop="graph_exists" label="График расчета" width="100">
        <template #default="scope4">
          <el-checkbox :checked="scope4.row.graph_exists" disabled></el-checkbox>
        </template>
      </el-table-column>
      <el-table-column prop="status" label="Статус" :filters="[
        { text: 'Действует', value: 'Действует' },
        { text: 'Создано', value: 'Создано' },
        { text: 'Закрыто', value: 'Закрыто' },
        { text: 'Отменено', value: 'Отменено' },
      ]" :filter-method="filterStatus" filter-placement="bottom-end">
        <template #default="scope3">
          <!-- getStatusTagType(scope.row.status) -->
          <!-- :type="statusTagType" -->
          <el-tag  disable-transitions :type="getStatusTagType(scope3.row.status)">{{ scope3.row.status }}</el-tag>

        </template>
      </el-table-column>
    </el-table>
  </el-scrollbar>
  <div v-if="pagination?.count" class="pagination">
    <el-pagination v-model:pageSize="pageSize" :page-sizes="[20, 50, 100, 300, 500]"
      :page-count="Math.ceil(pagination.count / pageSize)" layout="sizes, prev, pager, next"
      @size-change="handleSizeChange" @current-change="paginationChange" />
  </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from "pinia";
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
const getStatusTagType = (status: string) => {
  switch (status) {
    case 'Создано':
      return "";
    case 'Действует':
      return "success";
    case 'Закрыто':
      return "info";
    case "danger":
      return 'danger';
    default:
      return "info"; 
  }
};


const getStatusTagTypeGraphic = (status: string) => {
  switch (status) {
    case 'Есть':
      return "success";
    case 'Нет':
      return "info";
    default:
      return "info"; 
  }
};
</script>
