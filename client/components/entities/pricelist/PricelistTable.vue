<template>
  <el-scrollbar class="scrollTable">
    <el-table :data="tableData" style="width: 100%" height="calc(100vh - 130px)" v-loading="loading" border @sort-change="handleSortChange" stripe>
      <el-table-column label="Действует с" prop="vendor_id" width="200" show-overflow-tooltip sortable />
      <el-table-column label="Истечение срока" prop="vendor_id" width="200" show-overflow-tooltip sortable />
      <el-table-column label="Код статьи услуги" prop="vendor_id" width="200" show-overflow-tooltip sortable />
      <el-table-column prop="name" label="Наименование  статьи услуги"  width="500" show-overflow-tooltip sortable />
      <el-table-column label="Стоимость" prop="vendor_id" width="200" show-overflow-tooltip sortable />
      <el-table-column label="Единица измерения" prop="vendor_id"  show-overflow-tooltip sortable />
      <el-table-column label="Операция" align="center" width="200">
        <template #default="scope">
          <el-button text type="danger" :icon="Delete" size="small"  @click.prevent="deleteRow(scope.$index)"
            >Удалить</el-button>
        </template>
      </el-table-column>
    </el-table>
  </el-scrollbar>
  <div v-if="pagination?.count && pagination.count > countRowTable" class="pagination">
    <el-pagination v-model:pageSize="pageSize" small :page-sizes="[50, 100, 300, 500]"
      :page-count="Math.ceil(pagination.count / pageSize)" layout="sizes, prev, pager, next, total"
      @size-change="handleSizeChange" @current-change="paginationChange" :total="pagination.count"/>
  </div>
</template>

<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { Delete } from '@element-plus/icons-vue'
import { ref, onMounted, watch } from "vue";
import type { IPricelist } from "~/utils/types/directoryTypes";
import { useServiceStore } from "~~/stores/serviceStore";

const store = useServiceStore()
const { getPricelist, pagination, countRowTable } = storeToRefs(useServiceStore());
const tableData = ref<IPricelist[]>(getPricelist.value);

const loading = ref()
const pageSize = ref(countRowTable);

const handleSizeChange = async (val: number) => {
  pageSize.value = val;
  store.setCountRowTable(val);
  try {
    await store.getPricelistFromAPIWithFilter();
  } catch (error) {
    console.error("Ошибка при загрузке данных", error);
  }
};

const paginationChange = (page: number) => {
  try {
    store.setFilterValuePricelist('page', page);
    store.getPricelistFromAPIWithFilter(page, store.sortProp, store.sortOrder);
  } catch (error) {
    console.error("Ошибка при загрузке данных", error);
  }
};

const handleSortChange = async ({ page, prop, order  }: { page: number, prop: string, order: string }) => {
  try {
    store.pagination = null
    store.sortProp = prop; // поле, по которому сортируем
    store.sortOrder = order === 'ascending' ? 'asc' : 'desc'; // порядок сортировки
    console.log("(поле, порядок) = (", store.sortProp,",", store.sortOrder, ")");
    await store.getPricelistFromAPIWithFilter(page, store.sortProp, store.sortOrder);
  } catch (error) {
    console.error("Ошибка при загрузке данных", error);
  }
};

watch(getPricelist, (value) => {
  tableData.value = value || [];
});

onMounted(async () => {
  try {
    loading.value = true; 
    await store.getPricelistFromAPIWithFilter();
    loading.value = false;
  } catch (error) {
    console.error("Ошибка при загрузке данных", error);
    loading.value = false;
  }
});

const deleteRow = (index: number) => {
  store.tableDataPricelist.splice(index, 1);
}
</script>

<style scoped>
.example-showcase .el-loading-mask {
  z-index: 9;
}
</style>
