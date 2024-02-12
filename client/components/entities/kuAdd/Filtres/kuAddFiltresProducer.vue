<template>
  <!-- <div class="buttonBar_search">
    <el-input placeholder="Поиск" style="width: 200px" :prefix-icon="Search" />
  </div>
  <el-scrollbar class="scrollTableFiltres">

    <el-table v-if="tableData.length > 0" style="width: 100%" height="300" :data="tableData">
      <el-table-column property="selection" type="selection" width="55" show-overflow-tooltip />
      <el-table-column prop="producer_name" label="Наименование" show-overflow-tooltip />
    </el-table>
  </el-scrollbar>
  <div v-if="pagination?.count && pagination.count > countRowTable" class="pagination">
    <el-pagination layout="prev, pager, next" :page-count="Math.ceil(pagination.count / countRowTable)"
      @current-change="paginationChange" />
  </div> -->
</template>

<script setup lang="ts">
// import { ref, watch, onMounted } from "vue";
// import { Search } from "@element-plus/icons-vue";
// import { storeToRefs } from "pinia";
// import { useKuStore } from "~~/stores/kuStore";
// import type { IProducer } from '~/utils/types/directoryTypes';
// const { getProducers, pagination, countRowTable } = storeToRefs(useKuStore());

// const tableData = ref<IProducer[]>(getProducers.value)

// watch(getProducers, (value) => {
//   tableData.value = value || [];
// });

// const paginationChange = (page: number) => {
//   useKuStore().fetchProducerList(page);
// };

// onMounted(async () => {
//   try {
//     await useKuStore().fetchProducerList();
//   } catch (error) {
//     console.error("Ошибка при загрузке данных", error);
//   }
// });
</script>

<style scoped></style>
