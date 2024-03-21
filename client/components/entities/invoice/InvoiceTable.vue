<template>
  <el-scrollbar class="scrollTable">
    <el-table :data="tableData" style="width: 100%" height="calc(100vh - 185px)" v-loading="loading" border>
      <el-table-column prop="invoice_id" label="ID" width="100" sortable show-overflow-tooltip/>
      <el-table-column property="invoice_number" label="Номер" width="200" show-overflow-tooltip/>
      <el-table-column property="invoice_name" label="Наименование" width="160" sortable show-overflow-tooltip />
      <el-table-column label="Юридическое лицо">
        <el-table-column property="entity_id" label="Идентификатор" width="160" sortable show-overflow-tooltip />
        <el-table-column property="entity_name" label="Наименование" width="170" sortable show-overflow-tooltip />
      </el-table-column>
      <el-table-column label="Поставщик">
        <el-table-column property="vendor_id" label="Идентификатор" width="160" sortable show-overflow-tooltip />
        <el-table-column property="vendor_name" label="Наименование" width="250" sortable show-overflow-tooltip />
      </el-table-column>
      <el-table-column property="invoice_date" type="date" label="Дата" sortable show-overflow-tooltip />
      <el-table-column property="product_amount" label="Сумма" show-overflow-tooltip />
    </el-table>
  </el-scrollbar>
  <div v-if="pagination?.count && pagination.count > countRowTable" class="pagination">
    <el-pagination v-model:pageSize="pageSize" :page-sizes="[50, 100, 300, 500]"
      :page-count="Math.ceil(pagination.count / pageSize)" layout="sizes, prev, pager, next"
      @size-change="handleSizeChange" @current-change="paginationChange" />
  </div>
</template>
<script lang="ts" setup>
import { storeToRefs } from "pinia";
import { ref, onMounted, watch } from "vue";
import type { IInvoice } from "~/utils/types/directoryTypes";
import { useInvoiceStore } from "~~/stores/invoiceStore";

const { getInvoices, pagination, countRowTable } = storeToRefs(
  useInvoiceStore()
);
const tableData = ref<IInvoice[]>(getInvoices.value);

const loading = ref()

const pageSize = ref(countRowTable);
const handleSizeChange = async (val: number) => {
  pageSize.value = val;
  useInvoiceStore().setCountRowTable(val);
  try {
    await useInvoiceStore().getInvoicesFromAPIWithFilter();
  } catch (error) {
    console.error("Ошибка при загрузке данных 11", error);
  }
};
const paginationChange = (page: number) => {
  try {
    useInvoiceStore().setFilterValue('page', page);
    useInvoiceStore().getInvoicesFromAPIWithFilter(page);
  } catch (error) {
    console.error("Ошибка при загрузке данных", error);
  }
};

watch(getInvoices, (value) => {
  tableData.value = value || [];
});

onMounted(async () => {
  try {
    loading.value = true; 
    await useInvoiceStore().getInvoicesFromAPIWithFilter();
    loading.value = false; 
  } catch (error) {
    loading.value = false; 
    console.error("Ошибка при загрузке данных 22", error);
  }
});
</script>
