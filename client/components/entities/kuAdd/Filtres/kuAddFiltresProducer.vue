<template>
  <div class="buttonBar_search">
    <el-input placeholder="Поиск" style="width: 200px" :prefix-icon="Search" />
  </div>
  <el-scrollbar class="scrollTableFiltres">

    <el-table v-if="tableData.length > 0" style="width: 100%" height="300" :data="tableData" highlight-current-row @current-change="handleCurrentChange">
      <!-- <el-table-column property="selection" type="selection" width="55" show-overflow-tooltip /> -->
      <el-table-column prop="producer_name" label="Наименование" show-overflow-tooltip />
    </el-table>
  </el-scrollbar>
  <el-button @click="setCurrent()">Очистить выбор</el-button>
  <div v-if="pagination?.count && pagination.count > countRowTable" class="pagination">
    <el-pagination layout="prev, pager, next" :page-count="Math.ceil(pagination.count / countRowTable)"
      @current-change="paginationChange" />
  </div>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from "vue";
import { Search } from "@element-plus/icons-vue";
import { storeToRefs } from "pinia";
import { useKuStore } from "~~/stores/kuStore";
import type { IProducer } from '~/utils/types/directoryTypes';
import { ElTable } from 'element-plus'
const { getProducers, pagination, countRowTable } = storeToRefs(useKuStore());

const tableData = ref<IProducer[]>(getProducers.value)


const currentRow = ref()
const singleTableRef = ref<InstanceType<typeof ElTable>>()
const setCurrent = (row?: IProducer) => {
  singleTableRef.value!.setCurrentRow(row)
}

const triggerFilter = ref<boolean>(true);
const toggleTriggerFilter = () => (triggerFilter.value = !triggerFilter.value);

const handleCurrentChange = (val: IProducer | undefined) => {
  currentRow.value = val
  console.log("currentRow.value", currentRow.value)
  useKuStore().setFilterValue5('producer_name', currentRow.value);
}

watch(triggerFilter, () => {
  useKuStore().fetchBrandList();
});



watch(getProducers, (value) => {
  tableData.value = value || [];
});

const paginationChange = (page: number) => {
  // useKuStore().setFilterValue4('page', page);
  useKuStore().fetchProducerList(page);
};

onMounted(async () => {
  try {
    await useKuStore().fetchProducerList();
  } catch (error) {
    console.error("Ошибка при загрузке данных", error);
  }
});
</script>

<style scoped></style>
