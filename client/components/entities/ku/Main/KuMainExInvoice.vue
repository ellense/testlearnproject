<template>
    <el-scrollbar height="calc(100vh - 560px)">
        <el-button size="small" round @click="store.dialogFormExInvoiceVisible = true" class="buttonAdd">Добавить</el-button>
        <el-table :data="tableData2" border style="width: 100%; margin-top: 15px;" height="calc(100vh - 615px)" empty-text="Добавьте исключенные накладные">
            <el-table-column prop="invoice_id" label="ID" width="100" sortable show-overflow-tooltip />
            <el-table-column property="invoice_number" label="Номер" width="200" show-overflow-tooltip />
            <el-table-column property="invoice_name" label="Наименование" width="200" sortable show-overflow-tooltip />
            <el-table-column property="vendor_id" label="Идентификатор" width="200" sortable show-overflow-tooltip />
            <el-table-column property="vendor_name" label="Наименование" width="500" sortable show-overflow-tooltip />
            <el-table-column property="invoice_date" type="date" label="Дата" sortable show-overflow-tooltip />
            <el-table-column property="products_amount" label="Сумма" show-overflow-tooltip />
        </el-table>
        <el-dialog v-model="store.dialogFormExInvoiceVisible" title="Выбор исключенных накладных для КУ" close-on-click-modal
    close-on-press-escape draggable>
    <el-scrollbar class="scrollTableFiltres">
      <el-table style="width: 100%" height="300" :data="tableData" @selection-change="useKuAddStore().handleSelectionChange3"
        ref="multipleTableRef" v-loading="loading">
        <el-table-column prop="invoice_id" label="ID" width="100" sortable show-overflow-tooltip />
            <el-table-column property="invoice_number" label="Номер" width="100" show-overflow-tooltip />
            <el-table-column property="invoice_name" label="Наименование" width="160" sortable show-overflow-tooltip />
            <el-table-column property="vendor_id" label="Идентификатор" width="160" sortable show-overflow-tooltip />
            <el-table-column property="vendor_name" label="Наименование" width="250" sortable show-overflow-tooltip />
            <el-table-column property="invoice_date" type="date" label="Дата" sortable show-overflow-tooltip />
            <el-table-column property="products_amount" label="Сумма" show-overflow-tooltip />
      </el-table>
    </el-scrollbar>
    <div v-if="pagination?.count" class="pagination">
      <el-pagination v-model:pageSize="pageSize" :page-sizes="[20, 50, 100, 300, 500]"
      :page-count="Math.ceil(pagination.count / pageSize)" layout="sizes, prev, pager, next"
      @size-change="handleSizeChange" @current-change="paginationChange" />
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="store.dialogFormExInvoiceVisible = false">Отмена</el-button>
        <el-button @click="AddExInvoice()">Сохранить</el-button>
      </span>
    </template>
  </el-dialog>
    </el-scrollbar>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import type { IInvoiceForKu } from "~/utils/types/directoryTypes";
import { useKuIdStore } from "~~/stores/kuIdStore";
import { useKuAddStore } from "~~/stores/kuAddStore";
import { ElTable } from 'element-plus'
const store = useKuIdStore();
const kuStore = useKuAddStore();
const { getExInvoiceAll, pagination, countRowTable } = storeToRefs(
  useKuAddStore()
);
const tableData = ref<IInvoiceForKu[]>(getExInvoiceAll.value);

const loading = ref()

watch(getExInvoiceAll, (value) => {
  tableData.value = value || [];
});

const pageSize = ref(countRowTable);
const handleSizeChange = async (val: number) => {
  pageSize.value = val;
  useKuAddStore().setCountRowTable(val);
  try {
    // await useKuAddStore().getProductFromExcludedWithFilter();
  } catch (error) {
    console.error("Ошибка при загрузке данных искл.продуктов", error);
  }
};
//пагинация
const paginationChange = (page: number) => {
//   useKuAddStore().setFilterValue9('page', page);
//   useKuAddStore().getProductFromExcludedWithFilter(page);
};



//для очистки выбора
const multipleTableRef = ref<InstanceType<typeof ElTable>>()
const toggleSelection = (rows?: IInvoiceForKu[]) => {
  if (rows) {
    rows.forEach((row) => {
      multipleTableRef.value!.toggleRowSelection(row, false)
    })
  } else {
    multipleTableRef.value!.clearSelection()
  }
}
const tableData2 = ref(store.tableDataExInvoiceSelect);
//добавление условий
const AddExInvoice = () => {
  const selectedRows = store.multipleSelectionExInvoice;

  selectedRows.forEach(row => {
    store.tableDataExInvoiceSelect.push({
        invoice_id: row.invoice_id,
        vendor_id: row.vendor_id,
        vendor_name: row.vendor_name,
        invoice_name: row.invoice_name,
        invoice_number: row.invoice_number,
        invoice_date: new Date(row.invoice_date),
        products_amount: row.products_amount,
    });
    console.log("искл.Накладные",useKuAddStore().tableDataExInvoiceSelect);
  });
  toggleSelection()
  store.dialogFormExInvoiceVisible = false;
};
</script>

<style scoped></style>