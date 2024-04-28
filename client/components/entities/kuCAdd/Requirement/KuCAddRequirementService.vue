<template>
    <el-button size="small" type="primary" plain round @click="store.dialogFormServiceVisible = true"
        >Добавить</el-button>
    <el-button size="small" type="danger" plain round @click="store.tableDataManagerSelect.length = 0"
        >Удалить
        все</el-button>
    <div class="scrollTableRequirement">
        <el-table :data="tableData2" border style="width: 100%; height:30vh" height="30vh"
            empty-text="Добавьте услуги">
            <el-table-column label="Услуга" align="center">
                <el-table-column property="discription" label="Код" width="200" show-overflow-tooltip />
                <el-table-column property="discription" label="Наименование" width="400" show-overflow-tooltip />
            </el-table-column>
            <el-table-column label="Статья услуги" align="center">
                <el-table-column property="discription" label="Код" width="200" show-overflow-tooltip />
                <el-table-column property="discription" label="Наименование" width="400" show-overflow-tooltip />
            </el-table-column>
            <el-table-column prop="percent_sum" label="Коэффициент" width="200"/>
            <el-table-column align="center" label="Операция">
                <template #default="scope">
                    <el-button text type="danger" :icon="Delete" size="small"
                        @click.prevent="deleteRow(scope.$index)">Удалить</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
    <el-dialog v-model="store.dialogFormServiceVisible" title="Выбор исключенных накладных для КУ" close-on-click-modal
      close-on-press-escape draggable width="715px">
      <el-scrollbar class="scrollTableFiltres">
        <el-form >
          <el-form-item label-width="130" label="Услуга">
            <el-select v-model="store.valueService_id" size="small" placeholder="Выберите услугу" clearable
                filterable style="width: 300px">
                <el-option v-for="item in options" :key="item.value" :label="item.value" :value="item.value">
                  <span style="float: left;">{{ item.value }}</span>
                  <span style="float: right; color: var(--el-text-color-secondary);
                    font-size: 13px;  margin-left: 10px;">{{ item.label }}</span>
                </el-option>
              </el-select>
          </el-form-item>
          <el-form-item label-width="130" label="Статья услуги" >
            <el-select v-model="store.valueArticle_id" size="small" placeholder="Выберите статью" clearable
                filterable style="width: 300px">
                <el-option v-for="item in options2" :key="item.value" :label="item.value" :value="item.value">
                  <span style="float: left;">{{ item.value }}</span>
                  <span style="float: right; color: var(--el-text-color-secondary);
                    font-size: 13px;  margin-left: 10px;">{{ item.label }}</span>
                </el-option>
              </el-select>
          </el-form-item>
          <el-form-item label-width="130" label="Коэффициент" >
            <el-input v-model="store.valueRatio" size="small" clearable placeholder="Введите коэффициент"
              style="width: 300px">
            </el-input>
          </el-form-item>
        </el-form>
      </el-scrollbar>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="store.dialogFormServiceVisible = false">Отмена</el-button>
          <el-button @click="saveRow()">Сохранить</el-button>
        </span>
      </template>
    </el-dialog>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import type { IArticle, IService, IServiceAndArticle, } from "~/utils/types/directoryTypes";
import { useKuCAddStore } from "~~/stores/kuCAddStore";
import { ElTable } from 'element-plus'
import { Delete } from '@element-plus/icons-vue'

const store = useKuCAddStore();
const { getServiceAll, pagination, countRowTable } = storeToRefs(
    store
);
const tableData = ref<IService[]>(getServiceAll.value);

const loading = ref()

watch(getServiceAll, (value) => {
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
const toggleSelection = (rows?: IServiceAndArticle[]) => {
    if (rows) {
        rows.forEach((row) => {
            multipleTableRef.value!.toggleRowSelection(row, false)
        })
    } else {
        multipleTableRef.value!.clearSelection()
    }
}
const tableData2 = ref(store.tableDataServiceSelect);

const options = ref<Array<{ label: string; value: string }>>([]);
watch(() => store.tableDataServiceAll, (vendors: IService[]) => {
  options2.value = vendors.map(item => ({ label: item.service_name, value: item.service_id }));
});

const options2 = ref<Array<{ label: string; value: string }>>([]);
watch(() => store.tableDataArticleAll, (vendors: IArticle[]) => {
  options2.value = vendors.map(item => ({ label: item.article_name, value: item.service_id }));
});
//добавление условий
const saveRow = () => {
    const selectedRows = store.multipleSelectionServiceSelect;

    selectedRows.forEach(row => {
        store.tableDataServiceSelect.push({
            service_id: row.service_id,
            service_name: row.service_name,
            article_id: row.service_name,
            article_name: row.service_name,
            ratio: row.ratio,
        });
    });
    console.log("менеджеры", store.tableDataServiceSelect);
    toggleSelection()
    store.dialogFormManagersVisible = false;
};
//удаление менеджеров
const deleteRow = (index: number) => {
    store.tableDataServiceSelect.splice(index, 1);
}

</script>

<style scoped>
.el-scrollbar__view {
    width: 740px;
}
</style>