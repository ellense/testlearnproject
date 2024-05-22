<template>
  <el-scrollbar height="45vh">
    <h4>Код поставщика: <span style="font-weight: 400;">{{ store.kuIdVendorIdExInvoice }}</span></h4>
    <h4 style="margin-bottom:10px;">Наименование поставщика: <span style="font-weight: 400;">{{
      store.kuIdVendorNameExInvoice }}</span></h4>
    <el-button size="small" type="primary" plain round @click="ExInvoice()" 
      :disabled="isEditButtonDisabled">Добавить</el-button>
      <el-button size="small" type="danger" plain round @click="store.tableDataExInvoiceSelect.length = 0" :disabled="isEditButtonDisabled"
      >Удалить все</el-button>
    <el-table :data="tableData2" border style="width: 1200px; margin-top: 10px;" height="33vh"
      empty-text="Добавьте исключенные накладные">
      <el-table-column prop="invoice_id" label="ID" width="90" sortable show-overflow-tooltip />
      <el-table-column property="invoice_number" label="Номер" width="200" show-overflow-tooltip />
      <el-table-column property="invoice_name" label="Наименование" width="200" sortable show-overflow-tooltip />
      <el-table-column property="invoice_date" type="date" label="Дата" width="140" sortable show-overflow-tooltip />
      <el-table-column property="product_amount" label="Сумма" width="120" show-overflow-tooltip />
      <el-table-column property="docid" label="Документ" width="300"show-overflow-tooltip />
      <el-table-column label="Операция" width="150" align="center">
        <template #default="scope">
          <el-button text type="danger" :icon="Delete" size="small" @click.prevent="deleteRow(scope.$index)"
           :disabled="isEditButtonDisabled">Удалить</el-button>
        </template>
      </el-table-column>
    </el-table>
    <EntitiesKuMainDialogExInvoice/>
  </el-scrollbar>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useKuIdStore } from "~~/stores/kuIdStore";
import { useKuAddStore } from "~~/stores/kuAddStore";
import { ElTable } from 'element-plus'
import dayjs from "dayjs";
import { Delete } from '@element-plus/icons-vue'

const { getIExInvoiceForKu } = storeToRefs(
  useKuIdStore()
);

const store = useKuIdStore();
const store2 = useKuAddStore();

const isEditButtonDisabled = computed(() => {
  return store.kuIdStatus !== 'Создано';
});

const tableData2 = ref(store.tableDataExInvoiceSelect);
watch(getIExInvoiceForKu, (value) => {
  tableData2.value = value || [];
});

//получение накладных
const ExInvoice = async () => {
  if(store.kuIdDateStart || store.kuIdDateEnd) {
    store.kuIdVendorIdExInvoice = store.kuIdVendorId
    store.kuIdVendorNameExInvoice = store.kuIdVendorName
    store2.setFilterExInvoice('start_date', dayjs(store.kuIdDateStart).format("YYYY-MM-DD"));
    store2.setFilterExInvoice('end_date', dayjs(store.kuIdDateEnd).format("YYYY-MM-DD"));
    store2.setFilterExInvoice('vendor_id', store.kuIdVendorId);
    await store2.getInvoicesFromAPIWithFilter();
    store.dialogFormExInvoiceVisible = true
  } else{
    ElMessage.error("Выберите даты действия КУ на вкладке 'Основное'")
  } 
}
//удаление искл. накладных
const deleteRow = (index: number) => {
  store.tableDataExInvoiceSelect.splice(index, 1);
}
</script>

<style scoped></style>