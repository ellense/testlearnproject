<template>
  <el-scrollbar height="45vh">
    <h4>Код поставщика: <span style="font-weight: 400;">{{ store.kuAddMain.newVendorId }}</span></h4>
    <h4 style="margin-bottom:10px;">Наименование поставщика: <span style="font-weight: 400;">{{
      store.kuAddMain.newVendorName }}</span></h4>
    <el-button size="small" type="primary" plain round
      @click="ExInvoice()">Добавить</el-button>
    <el-button size="small" type="danger" plain round @click="store.tableDataExInvoiceSelect.length = 0">Удалить
      все</el-button>
    <el-table :data="tableData2" border style="width: 1200px; margin-top: 10px;" height="33vh"
      empty-text="Добавьте исключенные накладные">
      <el-table-column prop="invoice_id" label="ID" width="90" sortable show-overflow-tooltip />
      <el-table-column property="invoice_number" label="Номер" width="200" show-overflow-tooltip />
      <el-table-column property="invoice_name" label="Наименование" width="200"  show-overflow-tooltip />
      <el-table-column property="invoice_date" type="date" label="Дата" width="140"  show-overflow-tooltip />
      <el-table-column property="product_amount" label="Сумма" width="120" show-overflow-tooltip />
      <el-table-column property="docid" label="Документ" width="300" show-overflow-tooltip />
      <el-table-column label="Операция" width="150" align="center">
        <template #default="scope">
          <el-button text type="danger" :icon="Delete" size="small"
            @click.prevent="deleteRow(scope.$index)">Удалить</el-button>
        </template>
      </el-table-column>
    </el-table>
    <entities-ku-add-main-dialog-ex-invoice />
  </el-scrollbar>
</template>

<script setup lang="ts">
import { useKuAddStore } from "~~/stores/kuAddStore";
import { ElTable } from 'element-plus'
import dayjs from "dayjs";
import { Delete } from '@element-plus/icons-vue'

const store = useKuAddStore();
const kuMain = store.kuAddMain

//получение накладных
const ExInvoice = async () => {
  if(kuMain.newDateStart || kuMain.newDateEnd) {
    kuMain.newVendorIdExInvoice = kuMain.newVendorId
    kuMain.newVendorNameExInvoice = kuMain.newVendorName
    store.setFilterExInvoice('start_date', dayjs(kuMain.newDateStart).format("YYYY-MM-DD"));
    store.setFilterExInvoice('end_date', dayjs(kuMain.newDateEnd).format("YYYY-MM-DD"));
    store.setFilterExInvoice('vendor_id', kuMain.newVendorId);
    await store.getInvoicesFromAPIWithFilter();
    store.dialogFormExInvoiceVisible = true
  } else{
    ElMessage.error("Выберите даты действия КУ на вкладке 'Основное'")
  }
}

const tableData2 = ref(store.tableDataExInvoiceSelect);

//удаление искл. накладных
const deleteRow = (index: number) => {
  store.tableDataExInvoiceSelect.splice(index, 1);
}

</script>

<style scoped></style>