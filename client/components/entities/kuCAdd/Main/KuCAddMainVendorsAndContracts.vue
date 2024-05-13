<template>
  <el-scrollbar height="40vh">
    <!-- <h4>В разработке...</h4> -->
    <el-button size="small" type="primary" plain round @click="store.dialogFormManagersVisible = true"
      class="buttonAdd">Добавить</el-button>
    <el-button size="small" type="danger" plain round @click="store.tableDataManagerSelect.length = 0"
      class="buttonAdd">Удалить
      все</el-button>
    <el-table :data="tableData2" border style="width: 100%; margin-top: 10px;" height="35vh"
      empty-text="Добавьте поставщиков"  >
      <el-table-column property="group" label="Тип партнера" width="150" show-overflow-tooltip />
      <el-table-column label="Поставщик" align="center">
      <el-table-column property="discription" label="Код" width="200" show-overflow-tooltip />
      <el-table-column property="discription" label="Наименование" width="300"  show-overflow-tooltip />
      <el-table-column property="discription" label="Удержание" width="150"  show-overflow-tooltip />
      <el-table-column property="discription" label="Статус" width="200"  show-overflow-tooltip />
    </el-table-column>
      <el-table-column label="Юридическое лицо"  align="center">
      <el-table-column property="discription" label="Код" width="150"  show-overflow-tooltip />
      <el-table-column property="discription" label="Наименование" width="300"  show-overflow-tooltip />
    </el-table-column>
      <el-table-column align="center" label="Операция">
        <template #default="scope">
          <el-button text type="danger" :icon="Delete" size="small"
            @click.prevent="deleteRow(scope.$index)">Удалить</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-dialog v-model="store.dialogFormManagersVisible" title="Выбор исключенных накладных для КУ" close-on-click-modal
      close-on-press-escape draggable width="715px">
      <el-scrollbar class="scrollTableFiltres">
        <el-table style="width: 680px" height="300" :data="tableData" border
          @selection-change="store.handleSelectionChangeExInvoice" ref="multipleTableRef" v-loading="loading">
          <el-table-column type="selection" width="30" />
          <el-table-column property="group" label="Группа категорийных менеджеров" width="300" show-overflow-tooltip />
          <el-table-column property="discription" label="Описание" width="350" show-overflow-tooltip />
        </el-table>
      </el-scrollbar>
      <div v-if="pagination?.count" class="pagination">
        <el-pagination v-model:pageSize="pageSize" small :page-sizes="[20, 50, 100, 300, 500]"
          :page-count="Math.ceil(pagination.count / pageSize)" layout="sizes, prev, pager, next, total"
          @size-change="handleSizeChange" @current-change="paginationChange" :total="pagination.count" />
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
import type { IManagerForKu } from "~/utils/types/directoryTypes";
import { useKuCAddStore } from "~~/stores/kuCAddStore";
import { ElTable } from 'element-plus'
import { Delete } from '@element-plus/icons-vue'

const store = useKuCAddStore();
const { getManagerAll, pagination, countRowTable } = storeToRefs(
  store
);
const tableData = ref<IManagerForKu[]>(getManagerAll.value);

const loading = ref()

watch(getManagerAll, (value) => {
  tableData.value = value || [];
});

const pageSize = ref(countRowTable);
const handleSizeChange = async (val: number) => {
  pageSize.value = val;
  store.setCountRowTable(val);
  try {
    // await store.getProductFromExcludedWithFilter();
  } catch (error) {
    console.error("Ошибка при загрузке данных кат. менеджеров", error);
  }
};
//пагинация
const paginationChange = (page: number) => {
  // store.setFilterExInvoice('page', page);
  //   store.getProductFromExcludedWithFilter(page);
};

//для очистки выбора
const multipleTableRef = ref<InstanceType<typeof ElTable>>()
const toggleSelection = (rows?: IManagerForKu[]) => {
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
      id: null,
      group: row.group,
      discription: row.discription,
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