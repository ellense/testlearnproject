<template>
  <el-scrollbar height="45vh">
    <!-- <h4>В разработке...</h4> -->
    <el-button size="small" type="primary" plain round @click="store.dialogFormManagersVisible = true"
      class="buttonAdd">Добавить</el-button>
    <el-button size="small" type="danger" plain round @click="store.tableDataManagerSelect.length = 0"
      class="buttonAdd">Удалить
      все</el-button>
    <el-table :data="tableData2" border style="width: 100%; margin-top: 10px;" height="40vh"
      empty-text="Добавьте поставщиков"  >
      <el-table-column property="group" label="Тип партнера" width="150" show-overflow-tooltip />
      <el-table-column label="Поставщик" align="center">
      <el-table-column property="discription" label="Номер счета" width="150" show-overflow-tooltip />
      <el-table-column property="discription" label="Наименование" width="200"  show-overflow-tooltip />
      <el-table-column property="discription" label="Удержание" width="100"  show-overflow-tooltip />
    </el-table-column>
      <el-table-column label="Документ"  align="center">
        <el-table-column property="discription" label="Код" width="150"  show-overflow-tooltip />
        <el-table-column property="discription" label="Заголовок" width="150" 
          show-overflow-tooltip />
        <el-table-column property="discription" label="Название" width="150"  show-overflow-tooltip />
      </el-table-column>
      <el-table-column property="discription" label="Статус" width="150"  show-overflow-tooltip />
      <el-table-column label="Юридическое лицо"  align="center">
      <el-table-column property="discription" label="Код" width="100"  show-overflow-tooltip />
      <el-table-column property="discription" label="Наименование" width="200"  show-overflow-tooltip />
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
        <el-form >
          <el_form_item label-width="130" label="Код поставщика" prop="newVendorId">
            <el-select v-model="kuMain.newVendorIdVAC" size="small" placeholder="Выберите поставщика" clearable
                filterable style="width: 300px">
                <el-option v-for="item in options2" :key="item.value" :label="item.value" :value="item.value">
                  <span style="float: left;">{{ item.value }}</span>
                  <span style="float: right; color: var(--el-text-color-secondary);
                    font-size: 13px;  margin-left: 10px;">{{ item.label }}</span>
                </el-option>
              </el-select>
          </el_form_item>
          <el-form-item label-width="130" label="Код компании" prop="newEntityId">
            <el-select v-model="kuMain.newEntityId" size="small" placeholder="Выберите код компании" clearable
              filterable style="width: 300px" @change="onEntityChange">
              <el-option v-for="item in options" :key="item.label" :label="item.value" :value="item.value">
                <span style="float: left;">{{ item.value }}</span>
                <span style="float: right; color: var(--el-text-color-secondary);
                    font-size: 13px;  margin-left: 10px;">{{ item.label }}</span>
              </el-option>
            </el-select>
          </el-form-item>
        </el-form>
      </el-scrollbar>
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
import { Delete } from '@element-plus/icons-vue'

const store = useKuAddStore();
const kuMain = store.kuAddMain
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