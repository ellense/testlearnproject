<template>
  <el-scrollbar class="scrollTable">
    <el-table :data="tableData" style="width: 100%" height="calc(100vh - 130px)" v-loading="loading" border @sort-change="handleSortChange" stripe>
      <el-table-column label="Код услуги" prop="service_code" width="400" show-overflow-tooltip sortable />
      <el-table-column prop="service_name" label="Наименование  услуги"  show-overflow-tooltip sortable />
      <el-table-column label="Операция" align="center" width="200">
        <template #default="scope">
          <el-button text type="danger" :icon="Delete" size="small"  @click.prevent="deleteRow(scope.row)"
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
import { useServiceStore } from "~~/stores/serviceStore";
import type { IService } from "~/utils/types/serviceTypes";

const store = useServiceStore()
const { getService, pagination, countRowTable } = storeToRefs(useServiceStore());
const tableData = ref<IService[]>(getService.value);

const loading = ref()
const pageSize = ref(countRowTable);

const handleSizeChange = async (val: number) => {
  pageSize.value = val;
  store.setCountRowTable(val);
  try {
    await store.getServiceFromAPIWithFilter();
  } catch (error) {
    console.error("Ошибка при загрузке данных", error);
  }
};

const paginationChange = (page: number) => {
  try {
    store.setFilterValueServices('page', page);
    store.getServiceFromAPIWithFilter(page, store.sortProp, store.sortOrder);
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
    await store.getServiceFromAPIWithFilter(page, store.sortProp, store.sortOrder);
  } catch (error) {
    console.error("Ошибка при загрузке данных", error);
  }
};

watch(getService, (value) => {
  tableData.value = value || [];
});

onMounted(async () => {
  try {
    loading.value = true; 
    await store.getServiceFromAPIWithFilter();
    loading.value = false;
  } catch (error) {
    console.error("Ошибка при загрузке данных", error);
    loading.value = false;
  }
});

const deleteRow = async (row: IService) => {
  try {
    await ElMessageBox.confirm(
      'Вы уверены, что хотите удалить этот элемент?',
      'Подтверждение удаления',
      {
        confirmButtonText: 'Да',
        cancelButtonText: 'Нет',
        type: 'warning',
      }
    );
  const id = row.id;
  if (id !== null) {
    try {
      await SERVICE.deleteService({id});
      store.tableDataService = store.tableDataService.filter(item => item.id !== id); 
      ElMessage({
          type: 'success',
          message: 'Элемент успешно удален!'
        });
    } catch (error) {
      console.error("Ошибка при удалении услуги на бэкенд:", error);
      ElMessage({
          type: 'error',
          message: 'Ошибка при удалении элемента!'
        });
    }
  } else {
    console.error("ID строки не может быть null");
  }
} catch {
    ElMessage({
      type: 'info',
      message: 'Удаление отменено'
    });
  }
}
</script>

<style scoped>
.example-showcase .el-loading-mask {
  z-index: 9;
}
</style>