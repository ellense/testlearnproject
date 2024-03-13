<template>
    <el-scrollbar height="calc(100vh - 560px)">
        <el-button size="small" round @click="store.dialogFormManagersVisible = true"
            class="buttonAdd">Добавить</el-button>
        <el-table :data="tableData2" border style="width: 700px; margin-top: 15px;" height="calc(100vh - 615px)"
            empty-text="Добавьте категорийных менеджеров">
            <el-table-column property="group" label="Группа категорийных менеджеров" width="300"
                show-overflow-tooltip />
            <el-table-column property="discription" label="Описание" width="400" sortable show-overflow-tooltip />
        </el-table>
        <el-dialog v-model="store.dialogFormManagersVisible" title="Выбор исключенных накладных для КУ"
            close-on-click-modal close-on-press-escape draggable>
            <el-scrollbar class="scrollTableFiltres">
                <el-table style="width: 740px" height="300" :data="tableData" border
                    @selection-change="useKuAddStore().handleSelectionChangeExInvoice" ref="multipleTableRef"
                    v-loading="loading">
                    <el-table-column type="selection" width="40" />
                    <el-table-column property="group" label="Группа категорийных менеджеров" width="300"
                        show-overflow-tooltip />
                    <el-table-column property="discription" label="Описание" width="400" sortable
                        show-overflow-tooltip />
                </el-table>
            </el-scrollbar>
            <div v-if="pagination?.count" class="pagination">
                <el-pagination v-model:pageSize="pageSize" :page-sizes="[20, 50, 100, 300, 500]"
                    :page-count="Math.ceil(pagination.count / pageSize)" layout="sizes, prev, pager, next"
                    @size-change="handleSizeChange" @current-change="paginationChange" />
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
import { useKuAddStore } from "~~/stores/kuAddStore";
import { ElTable } from 'element-plus'

const store = useKuAddStore();
const { getManagerAll, pagination, countRowTable } = storeToRefs(
  useKuAddStore()
);
const tableData = ref<IManagerForKu[]>(getManagerAll.value);

const loading = ref()

watch(getManagerAll, (value) => {
  tableData.value = value || [];
});

const pageSize = ref(countRowTable);
const handleSizeChange = async (val: number) => {
  pageSize.value = val;
  useKuAddStore().setCountRowTable(val);
  try {
    // await useKuAddStore().getProductFromExcludedWithFilter();
  } catch (error) {
    console.error("Ошибка при загрузке данных кат. менеджеров", error);
  }
};
//пагинация
const paginationChange = (page: number) => {
  useKuAddStore().setFilterExInvoice('page', page);
//   useKuAddStore().getProductFromExcludedWithFilter(page);
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
        group: row.group,
        discription: row.discription,
    });
  });
  console.log("менеджеры", useKuAddStore().tableDataManagerSelect);
  toggleSelection()
  store.dialogFormManagersVisible = false;
};
</script>

<style scoped>
.el-scrollbar__view{
    width: 740px;
}
</style>