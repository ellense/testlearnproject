<template>
  <el-scrollbar height="calc(100vh - 60px)">
    <el-row>
      <el-col :span="5">
        <el-input
          v-model="store.newPercent"
          type="number"
          placeholder="Процент"
          clearable
          style="width: 214px"
        ></el-input>
      </el-col>
      <el-col :span="5">
        <el-date-picker
          v-model="store.newDateStart"
          placeholder="Начальная дата"
          style="width: 214px"
          format="DD.MM.YYYY"
          value-format="DD.MM.YYYY"
          clearable
        ></el-date-picker>
      </el-col>
      <el-col :span="5">
        <el-button type="primary" @click="addItemAndNavigate()"
          >Добавить</el-button
        >
      </el-col>
    </el-row>

    <el-row>
      <el-col :span="5">
        <el-select
          v-model="store.providerName"
          clearable
          placeholder="Поставщик"
          style="width: 214px"
        >
          <el-option
            v-for="item in options"
            :key="item.providerName"
            :label="item.label"
            :value="item.providerName"
          />
        </el-select>
      </el-col>
      <el-col :span="5">
        <el-date-picker
          v-model="store.newDateEnd"
          placeholder="Конечная дата"
          style="width: 214px"
          format="DD.MM.YYYY"
          value-format="DD.MM.YYYY"
          clearable
        ></el-date-picker>
      </el-col>
      <!-- <el-col :span="5">
          <el-button type="primary" @click="addItemInvoice()">Добавить накладные</el-button>
        </el-col> -->
    </el-row>

    <el-row>
      <el-col :span="5">
        <el-select
          v-model="store.newType"
          placeholder="Тип графика"
          clearable
          style="width: 214px"
        >
          <el-option label="Неделя" value="Неделя" :disabled="true"></el-option>
          <el-option label="Месяц" value="Месяц"></el-option>
          <el-option label="Квартал" value="Квартал"></el-option>
          <el-option label="Полгода" value="Полгода"></el-option>
          <el-option label="Год" value="Год"></el-option>
        </el-select>
      </el-col>
      <el-col :span="5">
        <el-date-picker
          v-model="store.newDateActual"
          placeholder="Дата актуальности"
          style="width: 214px"
          format="DD.MM.YYYY"
          value-format="DD.MM.YYYY"
          clearable
        ></el-date-picker>
      </el-col>
    </el-row>
    <el-table
      ref="multipleTableRef"
      :data="invoiceStore.searchTableData"
      style="width: 100%"
      @selection-change="invoiceStore.handleSelectionChange"
      height="calc(100vh - 160px)"
    >
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

import { useKuTableStore } from "~~/stores/kuTableStore";
import { useVendorTableStore } from "~~/stores/providerTableStore";
import { useInvoiceTableStore } from "~~/stores/invoiceTableStore";
import { useRouter } from "vue-router";

const providerStore = useVendorTableStore();
const store = useKuTableStore();
const invoiceStore = useInvoiceTableStore();
const router = useRouter();
const options = ref<{ providerName: string; label: string }[]>([]);

const messageClose = () => {
  ElMessage({
    message: "Коммерческое условие успешно добавлено",
    type: "success",
  });
};

const updateOptions = () => {
  options.value = providerStore.tableData.map((provider) => ({
    providerName: provider.name,
    label: provider.name,
  }));
};
updateOptions();

const addItemAndNavigate = () => {
  store.addItem();
  router.push("/");
  messageClose();
};
</script>

<style scoped>
.el-row {
  margin-bottom: 20px;
}
.el-row:last-child {
  margin-bottom: 0;
}
.el-col {
  border-radius: 4px;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
</style>
