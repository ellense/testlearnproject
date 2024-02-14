<template>
  <div >
    <el-scrollbar class="scrollTableProduct">
      <!-- <el-table :data="tableData" style="width:calc(100% - 510px);" height="calc(100vh - 185px) " border> -->
        <el-table :data="tableData"  height="calc(100vh - 185px)" style=" width: 100%" >

        <el-table-column prop="itemid" label="Номер" width="90" show-overflow-tooltip />
        <el-table-column prop="name" label="Наименование" width="500" show-overflow-tooltip />
        <el-table-column prop="classifier_name" label="Категория" width="300" show-overflow-tooltip />
        <el-table-column prop="brand_name" label="Бренд" width="200" show-overflow-tooltip />

      </el-table>
    </el-scrollbar>
    <div v-if="pagination?.count && pagination.count > countRowTable" class="pagination">
      <el-pagination v-model:pageSize="pageSize" :page-sizes="[50, 100, 300, 500]"
        :page-count="Math.ceil(pagination.count / pageSize)" layout="sizes, prev, pager, next"
        @size-change="handleSizeChange" @current-change="paginationChange" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { ref, onMounted, watch } from "vue";
import type { IProduct } from "~/utils/types/directoryTypes";
import { useProductStore } from "~~/stores/productStore";

const { getProducts, pagination, countRowTable } = storeToRefs(
  useProductStore()
);

const pageSize = ref(countRowTable);
const tableData = ref<IProduct[]>(getProducts.value);

const handleSizeChange = async (val: number) => {
  pageSize.value = val;
  useProductStore().setCountRowTable(val);
  try {
    await useProductStore().getProductFromAPIWithFilter();
  } catch (error) {
    console.error("Ошибка при загрузке данных", error);
  }
};

watch(getProducts, (value) => {
  tableData.value = value || [];
});

const paginationChange = (page: number) => {
  useProductStore().setFilterValue('page', page);
  useProductStore().getProductFromAPIWithFilter(page);
};

onMounted(async () => {
  try {
    await useProductStore().getProductFromAPIWithFilter();
  } catch (error) {
    console.error("Ошибка при загрузке данных", error);
  }
});
</script>
<style scoped>
.scrollTableProduct {
  min-width: calc(100% - 90px); 
  margin-left: 10px; 
  border: 1px solid var(--el-border-color);
  border-radius: 2px;
  height: calc(100vh - 185px);
}
</style>