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
        <el-table-column property="vendor_name" label="Наименование" width="200" show-overflow-tooltip />
        <el-table-column property="vendor_retention" label="Удержание" width="100" show-overflow-tooltip />
      </el-table-column>
      <el-table-column property="vendor_status" label="Статус" width="150" show-overflow-tooltip />
      <el-table-column label="Юридическое лицо" align="center">
        <el-table-column property="entity_id" label="Код" width="100" show-overflow-tooltip />
        <el-table-column property="entity_name" label="Наименование" width="200" show-overflow-tooltip />
      </el-table-column>
      <el-table-column align="center" label="Операция">
        <template #default="scope">
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
            <el-select v-model="store.kuIdEntityIdVAC" size="small" placeholder="Выберите код компании" clearable
              filterable style="width: 300px" @change="onEntityChange">
              <el-option v-for="item in optionsEntity" :key="item.label" :label="item.value" :value="item.value">
                <span style="float: left;">{{ item.value }}</span>
                <span style="float: right; color: var(--el-text-color-secondary);
                    font-size: 13px;  margin-left: 10px;">{{ item.label }}</span>
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label-width="130" label="Код поставщика">
            <el-select v-model="store.kuIdVendorIdVAC" size="small" placeholder="Выберите поставщика" clearable
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
  </el-scrollbar>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import type { IEntityInKu, IVendorIdAndName } from "~/utils/types/directoryTypes";
import { useKuAddStore } from "~~/stores/kuAddStore";
import { useKuIdStore } from "~~/stores/kuIdStore";
import { ElTable } from 'element-plus'
import { Delete } from '@element-plus/icons-vue'
const { getVAC } = storeToRefs(
  useKuIdStore()
);
const store = useKuIdStore();
const kuStore = useKuAddStore();

const optionsEntity = ref<Array<{ label: string; value: string }>>([]);
watch(
  () => kuStore.dataEntity,
  (dataEntity: IEntityInKu[]) => {
    optionsEntity.value = dataEntity.map((item) => ({
      label: item.name,
      value: item.entity_id,
    }));
  }
);
onMounted(async () => {
  try {
    await kuStore.fetchKuEntity({
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
  kuStore.dataVendorId = [];
  kuStore.setFilterVendor('entity_id', store.kuIdEntityIdVAC);
  if (store.kuIdEntityIdVAC) { 
    kuStore.fetchAllVendorIdForEntity(); 
    console.log('Выполнен запрос на получение данных поставщика по фильтру юр.лица.');
  } else {
    kuStore.removeFilterVendor("entity_id")
  }
};

const optionsVendor = ref<Array<{ label: string; value: string }>>([]);
watch(() => kuStore.dataVendorId, (vendors: IVendorIdAndName[]) => {
  optionsVendor.value = vendors.map(item => ({ label: item.name, value: item.vendor_id }));
});

const tableData = ref(store.tableDataVAC);
watch(getVAC, (value) => {
  tableData.value = value || [];
});

//добавление строк
const AddManagers = async () => {
  const selectedEntity = optionsEntity.value.find(option => option.value === store.kuIdEntityIdVAC);
  const entityName = selectedEntity ? selectedEntity.label : '';

  const selectedVendor = optionsVendor.value.find(option => option.value === store.kuIdVendorIdVAC);
  const vendorName = selectedVendor ? selectedVendor.label : '';

    kuStore.tableDataVAC.push({
      id: null,
      type_partner: "Поставщик",
      vendor_id: store.kuIdVendorIdVAC,
      vendor_name: vendorName,
      vendor_retention: "Все",
      vendor_status: "На удержании",
      entity_id: store.kuIdEntityIdVAC,
      entity_name: entityName
    });
    store.kuIdEntityIdVAC = "";
    store.kuIdVendorIdVAC = "";
    store.dialogFormVACVisible = false;
};
//удаление строк
const deleteRow = (index: number) => {
  store.tableDataVAC.splice(index, 1);
}
</script>

<style scoped>

</style>