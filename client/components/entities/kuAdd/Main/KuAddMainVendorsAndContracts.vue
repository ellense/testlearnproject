<template>
  <el-scrollbar height="45vh">
    <!-- <h4>В разработке...</h4> -->
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
      draggable width="715px">
      <el-scrollbar class="scrollTableFiltres">
        <el-form>
          <el_form_item label-width="130" label="Код поставщика">
            <el-select v-model="kuMain.newVendorIdVAC" size="small" placeholder="Выберите поставщика" clearable
              filterable style="width: 300px">
              <el-option v-for="item in optionsVendor" :key="item.value" :label="item.value" :value="item.value">
                <span style="float: left;">{{ item.value }}</span>
                <span style="float: right; color: var(--el-text-color-secondary);
                    font-size: 13px;  margin-left: 10px;">{{ item.label }}</span>
              </el-option>
            </el-select>
          </el_form_item>
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
import type { IVendorIdAndName } from "~/utils/types/directoryTypes";
import { useKuAddStore } from "~~/stores/kuAddStore";
import { ElTable } from 'element-plus'
import { Delete } from '@element-plus/icons-vue'

const store = useKuAddStore();
const kuMain = store.kuAddMain

onMounted(async () => {
    try {
        await store.fetchAllVendorIdForEntity();
    } catch (error) {
        console.error("Ошибка при загрузке данных поставщиков для VAC", error);
    }
});

const optionsVendor = ref<Array<{ label: string; value: string }>>([]);
watch(() => store.dataVendorId, (vendors: IVendorIdAndName[]) => {
  optionsVendor.value = vendors.map(item => ({ label: item.name, value: item.vendor_id }));
});

const tableData = ref(store.tableDataVAC);

//добавление строк
const AddManagers = async () => {
  const selectedRows = kuMain.newVendorIdVAC
    console.log("выбранный поставщик", selectedRows)
    await store.getVendorDetailFromApi(selectedRows);
    store.tableDataVAC.push({
      type_partner: "Поставщик",
      vendor_id: kuMain.newVendorIdVAC,
      vendor_name: store.valueVendorInfo[0].urastic_name,
      vendor_retention: "Все",
      vendor_status: "На удержании",
      entity_id: store.valueVendorInfo[0].entity_id,
      entity_name: store.valueVendorInfo[0].entity_name,
    });
    kuMain.newVendorIdVAC = "";
  store.dialogFormVACVisible = false;
};
//удаление строк
const deleteRow = (index: number) => {
  store.tableDataVAC.splice(index, 1);
}
</script>

<style scoped>
.el-scrollbar__view {
  width: 740px;
}
</style>