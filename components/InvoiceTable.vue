<template>
  <div class="buttonBar">
    <div class="buttonBar_left">
      <el-button @click="dialogFormVisible = true"> Добавить </el-button>
      <el-button @click="storeInvoice.deleteSelectedRows()">Удалить</el-button>
    </div>
    <div class="buttonBar_search">
      <el-input
        v-model="storeInvoice.search"
        placeholder="Поиск"
        style="width: 200px"
        :prefix-icon="Search"
      />
    </div>
  </div>
  <el-dialog
    v-model="dialogFormVisible"
    title="Новый поставщик"
    close-on-click-modal
    close-on-press-escape
  >
    <el-form>
      <el-form-item label="Номер:" :label-width="formLabelWidth">
        <el-input
          v-model="newNumber"
          type="number"
          min="0"
          label="Счет"
          placeholder="Введите номер"
          style="width: 300px"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="Сумма:" :label-width="formLabelWidth">
        <el-input
          v-model="newSum"
          type="number"
          min="0"
          placeholder="Введите сумму по накладной"
          style="width: 300px"
          clearable
        ></el-input>
      </el-form-item>
      <el-form-item label="Дата:" :label-width="formLabelWidth">
        <el-date-picker
          v-model="newDate"
          placeholder="Выберите дату"
          style="width: 180px"
          format="YYYY/MM/DD"
          value-format="YYYY/MM/DD"
          clearable
        ></el-date-picker>
      </el-form-item>
      <el-form-item label="Поставщик:" :label-width="formLabelWidth">
        <el-select
          v-model="ProviderName"
          clearable
          placeholder="Выберите поставщика"
        >
          <el-option
            v-for="item in options"
            :key="item.ProviderName"
            :label="item.label"
            :value="item.ProviderName"
          />
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">Отмена</el-button>
        <el-button @click="save()"> Добавить </el-button>
      </span>
    </template>
  </el-dialog>

  <el-scrollbar class="scrollTable" max-height="700">
    <el-table
      ref="multipleTableRef"
      :data="storeInvoice.searchTableData"
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
import { Search } from "@element-plus/icons-vue";
import { useInvoiceTableStore } from "~~/stores/invoiceTableStore";
import { useProviderTableStore } from "~~/stores/providerTableStore";

const storeInvoice = useInvoiceTableStore();
const storeProvider = useProviderTableStore();

storeInvoice.initializeTableData();
storeProvider.initializeTableData();

const dialogFormVisible = ref(false);
const formLabelWidth = "200px";
const options = ref<{ ProviderName: string; label: string }[]>([]);
const newNumber = ref<number | null>(null);
const newSum = ref<number | null>(null);
const newDate = ref(new Date());
const ProviderName = ref<string>("");
const messageClose = () => {
  ElMessage({
    message: "Накладная успешно добавлена",
    type: "success",
  });
};
const updateOptions = () => {
  options.value = storeProvider.tableData.map((provider) => ({
    ProviderName: provider.name,
    label: provider.name,
  }));
};

const save = () => {
  storeInvoice.addRows({
    id: storeProvider.tableData.length + 1,
    number: newNumber.value,
    summa: newSum.value,
    date: newDate.value,
    nameProvider: ProviderName.value,
  });
  dialogFormVisible.value = false;
  newNumber.value = null;
  newSum.value = null;
  newDate.value = new Date();
  ProviderName.value = "";
  messageClose();
};

updateOptions();
</script>

<style scoped>
.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>
