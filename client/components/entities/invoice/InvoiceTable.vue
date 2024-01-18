<template>
  <el-scrollbar class="scrollTable">
    <el-table
      :data="tableData"
      style="width: 100%"
      height="calc(100vh - 185px)"
    >
      <el-table-column
        prop="invoice_id"
        label="ID"
        width="100"
        show-overflow-tooltip
      />
      <el-table-column
        property="invoice_number"
        label="Номер"
        width="200"
        show-overflow-tooltip
      />
      <el-table-column
        property="invoice_name"
        label="Наименование"
        width="200"
        show-overflow-tooltip
      />
      <el-table-column
        property="entity_id"
        label="Юридическое лицо"
        width="300"
        show-overflow-tooltip
      />
      <el-table-column
        property="vendor_id"
        label="Поставщик"
        width="300"
        show-overflow-tooltip
      />
      <el-table-column
        property="invoice_date"
        type="date"
        label="Дата"
        show-overflow-tooltip
      />
    </el-table>
  </el-scrollbar>
  <div v-if="pagination?.count && pagination.count > countRowTable" class="pagination">
    <el-pagination layout="prev, pager, next" :page-count="Math.ceil(pagination.count / countRowTable)"
      @current-change="paginationChange" />
  </div>
</template>
<script lang="ts" setup>
import { storeToRefs } from 'pinia'
import { ref, onMounted, watch } from "vue";
import type { IInvoice } from "~/utils/types/directoryTypes";

import { useInvoiceStore } from "~~/stores/invoiceStore";
const { getInvoices, pagination, countRowTable } = storeToRefs(useInvoiceStore());
const tableData = ref<IInvoice[]>(getInvoices.value);

watch(getInvoices, (value) => {
  console.log('Table Data:', value);
  tableData.value = value || [];
});

const scrollToTop = () => {
  window.scrollTo(0, 0);
};

const paginationChange = (page: number) => {
  useInvoiceStore().fetchInvoicesList(page);
  scrollToTop();
};

onMounted(async () => {
  try {
    await useInvoiceStore().fetchInvoicesList();
  } catch (error) {
    console.error('Ошибка при загрузке данных', error);
  }
});
</script>
