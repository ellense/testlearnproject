<template>
  <el-scrollbar height="calc(100vh - 60px)">
    <div class="toolbarAdd">
      <el-input
        v-model="store.newPercent"
        type="number"
        placeholder="Введите процент"
        clearable
        style="width: 200px"
      ></el-input>
      <el-select
        v-model="store.providerName"
        clearable
        placeholder="Выберите поставщика"
      >
        <el-option
          v-for="item in options"
          :key="item.providerName"
          :label="item.label"
          :value="item.providerName"
        />
      </el-select>
      <el-select
        v-model="store.newType"
        placeholder="Выберите тип графика"
        clearable
      >
        <el-option label="Неделя" value="Неделя" :disabled="true"></el-option>
        <el-option label="Месяц" value="Месяц"></el-option>
        <el-option label="Квартал" value="Квартал"></el-option>
        <el-option label="Полгода" value="Полгода"></el-option>
        <el-option label="Год" value="Год"></el-option>
      </el-select>
      <el-date-picker
        v-model="store.newDateStart"
        placeholder="Выберите начальную дату"
        style="width: 220px"
        format="DD.MM.YYYY"
        value-format="DD.MM.YYYY"
        clearable
      ></el-date-picker>
      <el-date-picker
        v-model="store.newDateEnd"
        placeholder="Выберите конечную дату"
        style="width: 220px"
        format="DD.MM.YYYY"
        value-format="DD.MM.YYYY"
        clearable
      ></el-date-picker>
      <el-date-picker
        v-model="store.newDateActual"
        placeholder="Выберите дату актуальности"
        style="width: 220px"
        format="DD.MM.YYYY"
        value-format="DD.MM.YYYY"
        clearable
      ></el-date-picker>
      <el-button @click="addItemAndNavigate()">Добавить</el-button>
    </div>
  
  </el-scrollbar>
</template>

<script lang="ts" setup>
import { ref } from "vue";

import { ElInput } from "element-plus";
import dayjs from "dayjs";
import "dayjs/locale/ru";
require('dayjs/locale/ru');


import { useKuTableStore } from "~~/stores/kuTableStore";
import { useProviderTableStore } from "~~/stores/providerTableStore";

import { useRouter } from "vue-router";

const providerStore = useProviderTableStore();
const store = useKuTableStore();
const router = useRouter();
const options = ref<{ providerName: string; label: string }[]>([]);

const messageClose = () => {
  ElMessage({
    message: "Коммерческое условие успешно добавлено",
    type: "success",
  });
};
const addItemAndNavigate = () => {
  store.addItem();
  // После выполнения действия, перейдите на другую страницу
  router.push("/");
  messageClose();
};

const updateOptions = () => {
  options.value = providerStore.tableData.map((provider) => ({
    providerName: provider.name,
    label: provider.name,
  }));
};
updateOptions();
</script>

<style scoped>
.toolbarAdd {
  display: flex;

  gap: 10px;
}
</style>
