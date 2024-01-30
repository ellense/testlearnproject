<template>
  <el-scrollbar class="scrollTable">
    <el-table :data="tableData" style="width: 100%" height="calc(100vh - 185px)">
      <el-table-column prop="invoice_id" label="ID" width="100" sortable show-overflow-tooltip />
      <el-table-column property="invoice_number" label="Номер" width="200" show-overflow-tooltip />
      <el-table-column property="invoice_name" label="Наименование" width="200" sortable show-overflow-tooltip />
      <el-table-column property="entity_id" label="Юр. лицо" width="130" sortable show-overflow-tooltip />
      <el-table-column property="entity_name" label="Наименование" width="200" sortable show-overflow-tooltip />
      <el-table-column property="vendor_id" label="Поставщик" width="150" sortable show-overflow-tooltip />
      <el-table-column property="vendor_name" label="Наименование" width="300" sortable show-overflow-tooltip />
      <el-table-column property="invoice_date" type="date" label="Дата" sortable show-overflow-tooltip />
    </el-table>
  </el-scrollbar>
  <div v-if="pagination?.count && pagination.count > countRowTable" class="pagination">
    <!-- <el-pagination layout="prev, pager, next" :page-count="Math.ceil(pagination.count / countRowTable)"
      @current-change="paginationChange" /> -->
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

const pageSize = ref(countRowTable);
const tableData = ref<IInvoice[]>(getInvoices.value);

const handleSizeChange = async (val: number) => {
  pageSize.value = val;
  useInvoiceStore().setCountRowTable(val);
  try {
    await useInvoiceStore().fetchInvoicesList();
  } catch (error) {
    console.error("Ошибка при загрузке данных", error);
  }
};

watch(getInvoices, (value) => {
  tableData.value = value || [];
});

const paginationChange = (page: number) => {
  useInvoiceStore().fetchInvoicesList(page);
};

onMounted(async () => {
  try {
    await useInvoiceStore().fetchInvoicesList();
  } catch (error) {
    console.error("Ошибка при загрузке данных", error);
  }
});
</script>
