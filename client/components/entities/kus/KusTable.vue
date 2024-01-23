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
        property="entityid"
        label="Юр.лицо"
        width="200"
        sortable
        show-overflow-tooltip
      />
      <el-table-column
        property="vendor"
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
        width="200"
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
      <el-table-column property="base" label="База" />
      <el-table-column property="status" label="Статус" />
    </el-table>
  </el-scrollbar>
</template>

<script lang="ts" setup>
import { ref, onMounted, watch } from "vue";

import { useKuStore } from "~~/stores/kuStore";
const store = useKuStore();

onMounted(async () => {
  try {
    await store.fetchKuList({
      entityid: "",
      ku_id: "",
      vendor: "",
      period: "",
      date_start: new Date(),
      date_end: new Date(),
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
