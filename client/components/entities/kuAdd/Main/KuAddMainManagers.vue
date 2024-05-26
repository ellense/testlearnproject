<template>
  <el-scrollbar height="45vh">
    <el-button size="small" type="primary" plain round @click="store.dialogFormManagersVisible = true" class="buttonAdd">Добавить</el-button>
    <el-button size="small" type="danger" plain round @click="store.tableDataManagerSelect.length = 0" class="buttonAdd">Удалить
      все</el-button>
    <el-table :data="tableData2" border style="width: 920px; margin-top: 10px;" height="40vh"
      empty-text="Добавьте категорийных менеджеров">
      <el-table-column property="id" label="Код" width="100" show-overflow-tooltip />
      <el-table-column prop="group" label="Группа категорийных менеджеров" width="300" show-overflow-tooltip />
      <el-table-column prop="description" label="Описание" width="400" sortable show-overflow-tooltip />
      <el-table-column align="center" label="Операция">
        <template #default="scope">
          <el-button text type="danger" :icon="Delete" size="small" @click.prevent="deleteRow(scope.$index)">Удалить</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog v-model="store.dialogFormManagersVisible" title="Выбор категорийныйх менеджеров для КУ" close-on-click-modal
      close-on-press-escape draggable width="715px">
      <el-scrollbar class="scrollTableFiltres">
        <el-table style="width: 780px" height="300" :data="tableData" border
          @selection-change="store.handleSelectionChangeManager" ref="multipleTableRef" v-loading="loading">
          <el-table-column type="selection" width="30" />
          <el-table-column property="id" label="Код" width="100" show-overflow-tooltip />
          <el-table-column prop="group" label="Группа категорийных менеджеров" width="300" show-overflow-tooltip />
          <el-table-column prop="description" label="Описание" width="350" show-overflow-tooltip />
        </el-table>
      </el-scrollbar>
      <div v-if="pagination?.count" class="pagination">
        <el-pagination v-model:pageSize="pageSize" small :page-sizes="[20, 50, 100, 300, 500]"
          :page-count="Math.ceil(pagination.count / pageSize)" layout="sizes, prev, pager, next, total"
          @size-change="handleSizeChange" @current-change="paginationChange" :total="pagination.count"/>
      </div>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="store.dialogFormManagersVisible = false">Отмена</el-button>
          <el-button @click="AddManagers()">Сохранить</el-button>
        </span>
      </template>
    </el-dialog>
  </el-scrollbar>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useKuAddStore } from "~~/stores/kuAddStore";
import { ElTable } from 'element-plus'
import { Delete } from '@element-plus/icons-vue'
import type { IManager, IManagerForKu } from "~/utils/types/tabsKuTypes";

const store = useKuAddStore();
const { getManagerAll, pagination, countRowTable } = storeToRefs(
  store
);
const tableData = ref<IManager[]>(getManagerAll.value);

const loading = ref()

onMounted(async () => {
  try {
    await store.getManagersFromAPIWithFilter();
  } catch (error) {
    console.error("Ошибка при загрузке данных менеджеров", error);
  }
});
watch(getManagerAll, (value) => {
  tableData.value = value || [];
});

const pageSize = ref(countRowTable);
const handleSizeChange = async (val: number) => {
  pageSize.value = val;
  store.setCountRowTable(val);
  try {
    await store.getManagersFromAPIWithFilter();
  } catch (error) {
    console.error("Ошибка при загрузке данных кат. менеджеров", error);
  }
};
//пагинация
const paginationChange = (page: number) => {
  store.setFilterManager('page', page);
    store.getManagersFromAPIWithFilter(page);
};

//для очистки выбора
const multipleTableRef = ref<InstanceType<typeof ElTable>>()
const toggleSelection = (rows?: IManager[]) => {
  if (rows) {
    rows.forEach((row) => {
      multipleTableRef.value!.toggleRowSelection(row, false)
    })
  } else {
    multipleTableRef.value!.clearSelection()
  }
}
const tableData2 = ref(store.tableDataManagerSelect);

//добавление условий
const AddManagers = () => {
  const selectedRows = store.multipleSelectionManager;

  selectedRows.forEach(row => {
    store.tableDataManagerSelect.push({
      id: row.id,
      group: row.group,
      description: row.description,
    });
  });
  console.log("менеджеры", store.tableDataManagerSelect);
  toggleSelection()
  store.dialogFormManagersVisible = false;
};
//удаление менеджеров
const deleteRow = (index: number) => {
  store.tableDataManagerSelect.splice(index, 1);
}
</script>

<style scoped>
.el-scrollbar__view {
  width: 740px;
}
</style>