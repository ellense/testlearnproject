<template>
  <el-scrollbar class="scrollTable">
    <el-table
      :data="filteredKuList"
      style="width: 100%"
      @selection-change="store.handleSelectionChange"
      height="calc(100vh - 160px)"
      @row-dblclick="rowDblclick"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column
        property="ku_id"
        label="Номер КУ"
        width="150"
        sortable
        show-overflow-tooltip
      />
      <el-table-column
        property="entity_id"
        label="Юр.лицо"
        width="200"
        sortable
        show-overflow-tooltip
      />
      <el-table-column
        property="vendor_id"
        label="Поставщик"
        width="200"
        sortable
        show-overflow-tooltip
      />
      <el-table-column
        property="percent"
        label="Процент"
        width="120"
        show-overflow-tooltip
      />
      <el-table-column
        property="period"
        label="Период"
        width="120"
        show-overflow-tooltip
      />
      <el-table-column
        property="date_start"
        type="date"
        sortable
        label="Начальная дата"
        width="160"
        show-overflow-tooltip
      />
      <el-table-column
        property="date_end"
        type="date"
        sortable
        label="Конечная дата"
        width="160"
        show-overflow-tooltip
      />
      <el-table-column property="graph_exists" label="График расчета" width="100"/>
      <el-table-column
      prop="status"
      label="Статус"
      :filters="[
        { text: 'Действует', value: 'Действует' },
        { text: 'Создан', value: 'Создан' },
      ]"
      :filter-method="filterTag"
      filter-placement="bottom-end"
    >
      <template #default="scope">
        <el-tag
        :type="getStatusTagType(scope.row.status)"
          disable-transitions
          >{{ scope.row.status }}</el-tag
        >
      </template>
    </el-table-column>
    </el-table>
  </el-scrollbar>
</template>

<script lang="ts" setup>
import { ref, onMounted, watch } from "vue";
import type { IKuList } from "~/utils/types/directoryTypes";

import { useKuStore } from "~~/stores/kuStore";
const store = useKuStore();

const filterTag = (value: string, row: IKuList) => {
  return row.status === value
}
const getStatusTagType = (status: string) => {
  switch (status) {
    case 'Создан':
      return '';
    case 'Действует':
      return 'success';
    case 'Закрыт':
      return 'info';
    case 'Отменен':
      return 'danger';
    default:
      return '';
  }
};
onMounted(async () => {
  try {
    await store.fetchKuList({
      entity_id: "",
      ku_id: "",
      vendor_id: "",
      period: "",
      date_start: new Date(),
      date_end: new Date(),
      graph_exists: null,
      status: "",
      base: 100,
      percent: null,
    });
  } catch (error) {
    console.error("Ошибка при загрузке данных", error);
  }
});

//фильтры
const filteredKuList = ref(store.searchTableData);

watchEffect(() => {
  filteredKuList.value = store.searchTableData;
});

//открывание ку
const rowDblclick = (kuId: number) => {
  console.log("success");
  useRouter().push({ path: `/ku/${kuId}` });
};
</script>
