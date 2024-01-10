<template>
  <el-scrollbar class="scrollTable">
    <el-table :data="filteredKuList" style="width: 100%" @selection-change="store.handleSelectionChange"
      height="calc(100vh - 160px)" @row-dblclick="rowDblclick">
      <el-table-column type="selection" width="55" />
      <el-table-column property="ku_id" label="Номер КУ" width="150" sortable :filter-method="handleKuFilter"
        :filters="kuFilterOptions" show-overflow-tooltip />

      <el-table-column property="vendor" label="Поставщик" width="200" sortable show-overflow-tooltip />
      <el-table-column property="percent" label="Процент" width="120" show-overflow-tooltip />
      <el-table-column property="period" label="Период" width="200" show-overflow-tooltip />
      <el-table-column property="date_start" sortable label="Начальная дата" width="160" />
      <el-table-column property="date_end" sortable label="Конечная дата" width="160" show-overflow-tooltip />
      <el-table-column property="base" label="База" />
      <el-table-column property="status" label="Статус" />
    </el-table>
  </el-scrollbar>
</template>

<script lang="ts" setup>
import { ref, onMounted, watch } from "vue";

import { useKuTableStore } from "~~/stores/kuTableStore";
const store = useKuTableStore();
// watch(
//   () => store.searchTableData,
//   () => {
//     filteredKuList.value = store.searchTableData;
//   }
// );
onMounted(async () => {
  try {
    await store.fetchKuList({
      ku_id: null,
      vendor: "",
      period: "",
      date_start: new Date(),
      date_end: new Date(),
      status: "",
      base: null,
      percent: null,
     
    });
  } catch (error) {
    console.error("Ошибка при загрузке данных", error);
  }
});

//фильтры
const filteredKuList = ref(store.searchTableData);

const handleKuFilter = (value: number | null) => {
  store.setKuFilter(value);
};

const kuFilterOptions = ref<Array<{ text: string; value: string }>>([]);

watchEffect(() => {
  filteredKuList.value = store.searchTableData;
  kuFilterOptions.value = Array.from(
    new Set(store.tableData.map((item) => item.ku_id))
  ).map((value) => ({ text: String(value), value: String(value) }));
});

//открывание ку
const rowDblclick = (kuId: number) => {
  console.log("success");
  useRouter().push({ path: `/ku/${kuId}` });
};


</script>
