<template>
  <el-dialog
    v-model="storeInvoice.dialogFormVisible"
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
        <el-button @click="storeInvoice.dialogFormVisible = false"
          >Отмена</el-button
        >
        <!-- <el-button @click="save()"> Добавить </el-button> -->
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useInvoiceTableStore } from "~~/stores/invoiceTableStore";
import { useVendorTableStore } from "~~/stores/providerTableStore";

const storeInvoice = useInvoiceTableStore();
const storeProvider = useVendorTableStore();

const formLabelWidth = "200px";

const options = ref<{ ProviderName: string; label: string }[]>([]);

const newNumber = ref<number | null>(null);
const newSum = ref<number | null>(null);
const newDate = ref(new Date());
const ProviderName = ref<string>("");

const messageClose = () => {
  ElMessage({
    message: "Накладная №" + newNumber.value + " успешно добавлена",
    type: "success",
  });
};

// const updateOptions = () => {
//   options.value = storeProvider.tableData.map((provider) => ({
//     ProviderName: provider.name,
//     label: provider.name,
//   }));
// };

// const save = () => {
//   storeInvoice.addRows({
//     id: storeProvider.tableData.length + 1,
//     number: newNumber.value,
//     summa: newSum.value,
//     date: newDate.value,
//     nameProvider: ProviderName.value,
//   });
//   storeInvoice.dialogFormVisible = false;
//   messageClose();
//   newNumber.value = null;
//   newSum.value = null;
//   newDate.value = new Date();
//   ProviderName.value = "";
// };

// updateOptions();
</script>


