<template>
  <el-scrollbar class="scrollTable">
    <el-table
    v-loading="loading"
      element-loading-text="Загрузка"
      :data="filteredInvoicesList"
      style="width: 100%"
      height="calc(100vh - 130px)"
    >
      <el-table-column prop="invoice_id" label="ID" width="100" show-overflow-tooltip />
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
</template>
<script lang="ts" setup>
import { ref, onMounted, watch } from "vue";
import { useInvoiceTableStore } from "~~/stores/invoiceTableStore";
const storeInvoice = useInvoiceTableStore();

const filteredInvoicesList = ref(storeInvoice.searchInvoicesList);

let loading = ref(true);

watch(
  () => storeInvoice.searchInvoicesList,
  () => {
    filteredInvoicesList.value = storeInvoice.searchInvoicesList;
    loading.value = false;
  }
);

onMounted(async () => {
  try {
    await storeInvoice.fetchInvoicesList({
      invoice_id: null,
      entity_id: "",
      vendor_id: "",
      invoice_number: "",
      invoice_name: "",
      invoice_date: new Date(),
    });
  } catch (error) {
    loading.value = false;
    console.error("Ошибка при загрузке данных", error);
  }
});
</script>


