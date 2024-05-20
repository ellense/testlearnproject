<template>
  <el-scrollbar height="45vh">
    <h4>Код поставщика: <span style="font-weight: 400;">{{ store.kuIdVendorId }}</span></h4>
    <h4 style="margin-bottom:10px;">Наименование поставщика: <span style="font-weight: 400;">{{
      store.kuIdVendorName }}</span></h4>
    <el-button size="small" type="primary" plain round @click="store.dialogFormExInvoiceVisible = true" 
      :disabled="isEditButtonDisabled">Добавить</el-button>
      <el-button size="small" type="danger" plain round @click="store.tableDataExInvoiceSelect.length = 0" :disabled="isEditButtonDisabled"
      >Удалить все</el-button>
    <el-table :data="tableData2" border style="width: 1200px; margin-top: 10px;" height="33vh"
      empty-text="Добавьте исключенные накладные" v-loading="loading">
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
    <el-dialog v-model="store.dialogFormExInvoiceVisible" title="Выбор исключенных накладных для КУ"
      close-on-click-modal close-on-press-escape draggable>
      <h4>Код поставщика: <span>{{ useKuIdStore().kuIdVendorId }}</span></h4>
      <h4>Наименование поставщика: <span>{{ useKuIdStore().kuIdVendorName }}</span></h4>
      <div class="directoryBar">
        <div class="directoryBar_filter">
          <el-input v-model="searchQuery" placeholder="Фильтр по номеру накладной" clearable
            style="max-width: 300px; min-width: 100px; width: 200px;" size="small"></el-input>
          <el-date-picker v-model="dateRange" type="daterange" format="DD.MM.YYYY" start-placeholder="Начало"
            end-placeholder="Окончание" :clearable="true" size="small" @change="changeDateRange" />
        </div>
      </div>
      <el-scrollbar class="scrollTableFiltres">
        <el-table style="width: 100%" height="300" :data="tableData"
          @selection-change="store.handleSelectionChangeExInvoice" ref="multipleTableRef" v-loading="loading">
          <el-table-column type="selection" width="40" />
          <el-table-column prop="invoice_id" label="ID" width="90" sortable show-overflow-tooltip />
          <el-table-column property="invoice_number" label="Номер" width="150" sortable show-overflow-tooltip />
          <el-table-column property="invoice_name" label="Наименование" width="150" sortable show-overflow-tooltip />
          <el-table-column property="invoice_date" type="date" label="Дата" width="100" sortable
            show-overflow-tooltip />
          <el-table-column property="product_amount" label="Сумма" width="100" show-overflow-tooltip />
          <el-table-column property="docid" label="Документ" show-overflow-tooltip />
        </el-table>
      </el-scrollbar>
      <div v-if="pagination?.count" class="pagination">
        <el-pagination v-model:pageSize="pageSize" small :page-sizes="[20, 50, 100, 300, 500]"
          :page-count="Math.ceil(pagination.count / pageSize)" layout="sizes, prev, pager, next, total"
          @size-change="handleSizeChange" @current-change="paginationChange" :total="pagination.count" />
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
import type { IExInvoiceForKu } from "~/utils/types/directoryTypes";
import { useKuIdStore } from "~~/stores/kuIdStore";
import { useKuAddStore } from "~~/stores/kuAddStore";
import { ElTable } from 'element-plus'
import dayjs from "dayjs";
import { Delete } from '@element-plus/icons-vue'
const { getExInvoiceAll, pagination, countRowTable } = storeToRefs(
  useKuAddStore()
);
const { getIExInvoiceForKu } = storeToRefs(
  useKuIdStore()
);

const store = useKuIdStore();
const kuStore = useKuAddStore();

const isEditButtonDisabled = computed(() => {
  return store.kuIdStatus !== 'Создано';
});

const tableData = ref<IExInvoiceForKu[]>(getExInvoiceAll.value);
const loading = ref()

watch(getExInvoiceAll, (value) => {
  tableData.value = value || [];
});

const pageSize = ref(countRowTable);
const handleSizeChange = async (val: number) => {
  pageSize.value = val;
  kuStore.setCountRowTable(val);
  try {
    loading.value = true;
    await kuStore.getInvoicesFromAPIWithFilter();
    loading.value = false;
  } catch (error) {
    console.error("Ошибка при загрузке данных искл.продуктов", error);
  }
};
//пагинация
const paginationChange = (page: number) => {
  kuStore.setFilterExInvoice('page', page);
  loading.value = true;
  kuStore.getInvoicesFromAPIWithFilter(page);
  loading.value = false;;
};
//для поиска
const searchQuery = ref('');
watch(searchQuery, (newValue: string) => {
  kuStore.performSearchOfInvoice(newValue);
});

//для фильтрации по дате
const dateRange = ref()
const formatDate = (date: Date) => dayjs(date).format('YYYY-MM-DD');// Функция для форматирования даты в формат "YYYY-MM-DD"
const changeDateRange = (newDateRange: Date[]) => {
  if (newDateRange && Array.isArray(newDateRange) && newDateRange.length === 2) {
    const [startDate, endDate] = newDateRange;
    if (!startDate || !endDate) {
      // Если даты не выбраны (то есть сброшены), сбрасываем фильтр
      kuStore.removeFilterExInvoice('start_date');
      kuStore.removeFilterExInvoice('end_date');
    } else {
      // Иначе, форматируем даты и устанавливаем их в фильтр
      const startFormatted = formatDate(startDate);
      const endFormatted = formatDate(endDate);
      kuStore.setFilterExInvoice('start_date', startFormatted);
      kuStore.setFilterExInvoice('end_date', endFormatted);
    }
    kuStore.getInvoicesFromAPIWithFilter(); // Вызовите метод хранилища для загрузки данных с учетом выбранного диапазона дат
  } else {
    // Если даты не выбраны, сбрасываем фильтр
    kuStore.removeFilterExInvoice('start_date');
    kuStore.removeFilterExInvoice('end_date');
    kuStore.getInvoicesFromAPIWithFilter(); // Вызовите метод хранилища для загрузки данных без учета фильтрации по датам
  }
};


//для очистки выбора
const multipleTableRef = ref<InstanceType<typeof ElTable>>()
const toggleSelection = (rows?: IExInvoiceForKu[]) => {
  if (rows) {
    rows.forEach((row) => {
      multipleTableRef.value!.toggleRowSelection(row, false)
    })
  } else {
    multipleTableRef.value!.clearSelection()
  }
}
const tableData2 = ref(store.tableDataExInvoiceSelect);
watch(getIExInvoiceForKu, (value) => {
  tableData2.value = value || [];
});

//добавление условий
const AddExInvoice = () => {
  const selectedRows = store.multipleSelectionExInvoice;
  console.log("selectedRows", selectedRows);

  selectedRows.forEach(row => {
    store.tableDataExInvoiceSelect.push({
      id: null,
      invoice_id: row.invoice_id,
      vendor_id: row.vendor_id,
      vendor_name: row.vendor_name,
      invoice_name: row.invoice_name,
      invoice_number: row.invoice_number,
      invoice_date: dayjs(row.invoice_date).format("DD.MM.YYYY"),
      product_amount: row.product_amount,
      docid: row.docid,

    });
    console.log("искл.Накладные", store.tableDataExInvoiceSelect);
  });
  toggleSelection()
  store.dialogFormExInvoiceVisible = false;
};
//удаление искл. накладных
const deleteRow = (index: number) => {
  store.tableDataExInvoiceSelect.splice(index, 1);
}
</script>

<style scoped></style>