<template>


  <el-scrollbar class="scrollTable" max-height="700">
    <el-table
      ref="multipleTableRef"
      :data="tableData"
      style="width: 100%"
      @selection-change="storeInvoice.handleSelectionChange"
      height="700"
    >
      <el-table-column
        property="selection"
        type="selection"
        width="55"
        show-overflow-tooltip
      />
      <el-table-column type="index" width="55" show-overflow-tooltip />
      <el-table-column
        property="number"
        label="Номер"
        width="200"
        show-overflow-tooltip
      />
      <el-table-column
        property="summa"
        label="Сумма"
        width="300"
        show-overflow-tooltip
      />
      <el-table-column
        property="date"
        type="date"
        label="Дата"
        width="300"
        show-overflow-tooltip
      />
      <el-table-column
        property="nameProvider"
        label="Поставщик"
        show-overflow-tooltip
      />
    </el-table>
  </el-scrollbar>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import { useInvoiceTableStore } from "~~/stores/invoiceTableStore";

const storeInvoice = useInvoiceTableStore();

const tableData = ref(storeInvoice.searchTableData);



// import { ref } from "vue";
// import { useInvoiceTableStore } from "~~/stores/invoiceTableStore";
// import { useProviderTableStore } from "~~/stores/providerTableStore";

// const storeInvoice = useInvoiceTableStore();
// const storeProvider = useProviderTableStore();

// const dialogFormVisible = ref(false);

// const options = ref<{ ProviderName: string; label: string }[]>([]);
// const newNumber = ref<number | null>(null);
// const newSum = ref<number | null>(null);
// const newDate = ref(new Date());
// const ProviderName = ref<string>("");
// const messageClose = () => {
//   ElMessage({
//     message: "Накладная №" + newNumber.value + " успешно добавлена",
//     type: "success",
//   });
// };
// const updateOptions = () => {
//   options.value = storeProvider.tableData.map((provider) => ({
//     ProviderName: provider.name,
//     label: provider.name,
//   }));
// };



// updateOptions();
</script>

<style scoped>
.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>
