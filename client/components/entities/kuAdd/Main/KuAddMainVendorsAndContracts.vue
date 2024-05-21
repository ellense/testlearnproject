<template>
  <el-scrollbar height="45vh">
    <el-button size="small" type="primary" plain round @click="store.dialogFormVACVisible = true"
      class="buttonAdd">Добавить</el-button>
    <el-button size="small" type="danger" plain round @click="store.tableDataVAC.length = 0" class="buttonAdd">Удалить
      все</el-button>
    <el-table :data="tableData" border style="width: 100%; margin-top: 10px;" height="40vh"
      empty-text="Добавьте поставщиков">
      <el-table-column property="type_partner" label="Тип партнера" width="150" show-overflow-tooltip />
      <el-table-column label="Поставщик" align="center">
        <el-table-column property="vendor_id" label="Код" width="150" show-overflow-tooltip />
        <el-table-column property="vendor_name" label="Наименование" width="300" show-overflow-tooltip />
        <el-table-column property="vendor_retention" label="Удержание" width="100" show-overflow-tooltip />
      </el-table-column>
      <el-table-column property="vendor_status" label="Статус" width="150" show-overflow-tooltip />
      <el-table-column label="Юридическое лицо" align="center">
        <el-table-column property="entity_id" label="Код" width="100" show-overflow-tooltip />
        <el-table-column property="entity_name" label="Наименование" width="300" show-overflow-tooltip />
      </el-table-column>
      <el-table-column align="center" label="Операция">
        <template #default="scope">
          <el-button text type="success" :icon="DocumentRemove" size="small"
            @click.prevent="ExInvoice(scope.row)">Исключить накладные</el-button>
          <el-button text type="danger" :icon="Delete" size="small"
            @click.prevent="deleteRow(scope.$index)">Удалить</el-button>
            
        </template>
      </el-table-column>
    </el-table>
    <el-dialog v-model="store.dialogFormVACVisible" title="Выбор поставщика" close-on-click-modal close-on-press-escape
      draggable width="455px">
      <el-scrollbar class="scrollTableFiltres">
        <el-form>
          <el-form-item label-width="130" label="Код компании" prop="newEntityId">
            <el-select v-model="kuMain.newEntityIdVAC" size="small" placeholder="Выберите код компании" clearable
              filterable style="width: 300px" @change="onEntityChange">
              <el-option v-for="item in optionsEntity" :key="item.label" :label="item.value" :value="item.value">
                <span style="float: left;">{{ item.value }}</span>
                <span style="float: right; color: var(--el-text-color-secondary);
                    font-size: 13px;  margin-left: 10px;">{{ item.label }}</span>
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label-width="130" label="Код поставщика">
            <el-select v-model="kuMain.newVendorIdVAC" size="small" placeholder="Выберите поставщика" clearable
              filterable style="width: 300px">
              <el-option v-for="item in optionsVendor" :key="item.value" :label="item.value" :value="item.value">
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
          <el-button @click="store.dialogFormVACVisible = false">Отмена</el-button>
          <el-button @click="AddManagers()">Сохранить</el-button>
        </span>
      </template>
    </el-dialog>
    <entities-ku-add-main-dialog-ex-invoice />
  </el-scrollbar>
</template>

<script setup lang="ts">
import { useKuAddStore } from "~~/stores/kuAddStore";
import { ElTable } from 'element-plus'
import { Delete, DocumentRemove } from '@element-plus/icons-vue'
import dayjs from "dayjs";
import type { IEntityInKu } from "~/utils/types/entityTypes";
import type { IVendorAndContract } from "~/utils/types/tabsKuTypes";
import type { IVendorIdAndName } from "~/utils/types/vendorTypes";

const store = useKuAddStore();
const kuMain = store.kuAddMain

const optionsEntity = ref<Array<{ label: string; value: string }>>([]);
watch(
  () => store.dataEntity,
  (dataEntity: IEntityInKu[]) => {
    optionsEntity.value = dataEntity.map((item) => ({
      label: item.name,
      value: item.entity_id,
    }));
  }
);
onMounted(async () => {
  try {
    await store.fetchKuEntity({
      entity_id: "",
      name: "",
      merge_id: "",
    });
  } catch (error) {
    console.error("Ошибка при загрузке данных юр. лица", error);
  }
});
const onEntityChange = async () => {
  //для поставщика
  store.dataVendorId = [];
  store.setFilterVendor('entity_id', kuMain.newEntityIdVAC);
  if (kuMain.newEntityIdVAC) {
    store.fetchAllVendorIdForEntity();
    console.log('Выполнен запрос на получение данных поставщика по фильтру юр.лица.');
  } else {
    store.removeFilterVendor("entity_id")
  }
};

const optionsVendor = ref<Array<{ label: string; value: string }>>([]);
watch(() => store.dataVendorId, (vendors: IVendorIdAndName[]) => {
  optionsVendor.value = vendors.map(item => ({ label: item.name, value: item.vendor_id }));
});

const tableData = ref(store.tableDataVAC);

//добавление строк
const AddManagers = async () => {
  const selectedEntity = optionsEntity.value.find(option => option.value === kuMain.newEntityIdVAC);
  const entityName = selectedEntity ? selectedEntity.label : '';

  const selectedVendor = optionsVendor.value.find(option => option.value === kuMain.newVendorIdVAC);
  const vendorName = selectedVendor ? selectedVendor.label : '';

  store.tableDataVAC.push({
    id: null,
    type_partner: "Поставщик",
    vendor_id: kuMain.newVendorIdVAC,
    vendor_name: vendorName,
    vendor_retention: "Все",
    vendor_status: "На удержании",
    entity_id: kuMain.newEntityIdVAC,
    entity_name: entityName
  });
  kuMain.newEntityIdVAC = "";
  kuMain.newVendorIdVAC = "";
  store.dialogFormVACVisible = false;
};
//удаление строк
const deleteRow = (index: number) => {
  store.tableDataVAC.splice(index, 1);
}

//получение накладных
const ExInvoice = async (row: IVendorAndContract) => {
  if(kuMain.newDateStart || kuMain.newDateEnd) {
    kuMain.newVendorIdExInvoice = row.vendor_id
    kuMain.newVendorNameExInvoice = row.vendor_name
    store.setFilterExInvoice('start_date', dayjs(kuMain.newDateStart, "DD.MM.YYYY").format("YYYY-MM-DD"));
    store.setFilterExInvoice('end_date', dayjs(kuMain.newDateEnd, "DD.MM.YYYY").format("YYYY-MM-DD"));
    store.setFilterExInvoice('vendor_id', row.vendor_id);
    await store.getInvoicesFromAPIWithFilter();
    store.dialogFormExInvoiceVisible = true
  } else{
    ElMessage.error("Выберите даты действия КУ на вкладке 'Основное'")
  } 
}
</script>

<style scoped></style>