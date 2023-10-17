<template>
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
</template>

<script setup>
import { ref } from "vue";
import { useInvoiceTableStore } from "~~/stores/invoiceTableStore";

const storeInvoice = useInvoiceTableStore();

const dialogFormVisible = ref(false);
const formLabelWidth = "200px";
const save = () => {
  storeInvoice.addRows({
    id: storeProvider.tableData.length + 1,
    number: newNumber.value,
    summa: newSum.value,
    date: newDate.value,
    nameProvider: ProviderName.value,
  });
  dialogFormVisible.value = false;
  messageClose();
  newNumber.value = null;
  newSum.value = null;
  newDate.value = new Date();
  ProviderName.value = "";
};

</script>
