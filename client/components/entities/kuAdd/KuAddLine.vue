<template>
  <el-scrollbar height="calc(100vh - 60px)">
    <form label-width="120px" label-position="top">
      <el-row>
        <el-col :span="5">
          <div class="custom-label">Юридическое лицо</div>
          <el-form-item>
            <el-select
              v-model="store.vendorName"
              clearable
              filterable
              style="width: 214px"
            >
              <el-option
                v-for="item in options"
                :key="item.vendorName"
                :label="item.label"
                :value="item.vendorName"
              />
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="5">
          <div class="custom-label">Период</div>
          <el-form-item>
            <el-select v-model="store.newType" clearable style="width: 214px">
              <el-option
                label="Неделя"
                value="Неделя"
                :disabled="true"
              ></el-option>
              <el-option label="Месяц" value="Месяц"></el-option>
              <el-option label="Квартал" value="Квартал"></el-option>
              <el-option label="Полгода" value="Полгода"></el-option>
              <el-option label="Год" value="Год"></el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="5">
          <div class="custom-label">Начальная дата</div>
          <el-form-item>
            <el-date-picker
              v-model="store.newDateStart"
              style="width: 214px"
              format="DD.MM.YYYY"
              value-format="DD.MM.YYYY"
              clearable
            ></el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="5">
          <div class="custom-label">Поставщик</div>
          <el-form-item>
            <el-select
              v-model="store.vendorName"
              clearable
              filterable
              style="width: 214px"
            >
              <el-option
                v-for="item in options"
                :key="item.vendorName"
                :label="item.label"
                :value="item.vendorName"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <div class="custom-label">Процент</div>
          <el-form-item>
            <el-input
              placeholder="Введите"
              v-model="store.newPercent"
              clearable
              style="width: 214px"
            ></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="5">
          <div class="custom-label">Конечная дата</div>
          <el-form-item>
            <el-date-picker
              v-model="store.newDateEnd"
              style="width: 214px"
              format="DD.MM.YYYY"
              value-format="DD.MM.YYYY"
              clearable
            ></el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
    </form>
    <h3>Условия по товарам</h3>
    <div>
      <el-button text bg @click="">+ Все</el-button>
      <el-button text bg @click="dialogOpen()">+ Условие по товарам</el-button>
    </div>
    <EntitiesKuAddRequirement />
    <div class="button_bottom">
      <el-button @click="addClose()">Назад</el-button>
      <el-button type="primary" @click="addItemAndSendToBackend()"
        >Создать</el-button
      >
    </div>
  </el-scrollbar>
</template>

<script lang="ts" setup>
import { ref } from "vue";

import { useKuTableStore } from "~~/stores/kuTableStore";
import { useVendorTableStore } from "~~/stores/vendorTableStore";
import { useRouter } from "vue-router";
import dayjs from "dayjs";

const vendorStore = useVendorTableStore();
const store = useKuTableStore();
const router = useRouter();
const options = ref<{ vendorName: string; label: string }[]>([]);
console.log("list", vendorStore.vendorList);
const messageClose = () => {
  ElMessage({
    message: "Коммерческое условие успешно добавлено",
    type: "success",
  });
};

const dialogOpen = () => {
  store.dialogFormVisible = true;
};

const updateOptions = () => {
  options.value = vendorStore.vendorList.map((vendor) => ({
    vendorName: vendor.vendorid,
    label: vendor.vendorid,
  }));
};
updateOptions();

const addClose = () => {
  router.push("ku");
};

const addItemAndSendToBackend = async () => {
  const newItem = {
    ku_id: store.tableData.length + 20,
    vendor: store.vendorName,
    period: store.newType,
    date_start: dayjs(store.newDateStart, "DD.MM.YYYY").format("YYYY-MM-DD"),
    date_end: dayjs(store.newDateEnd, "DD.MM.YYYY").format("YYYY-MM-DD"),
    status: "Создано",
    date_actual: dayjs(store.newDateActual, "DD.MM.YYYY").format("YYYY-MM-DD"),
    base: 15000 + store.tableData.length * store.tableData.length,
    percent: store.newPercent,
  };

  try {
    const response = await KU.postKu(newItem);

    if (response) {
      console.log("Экземпляр успешно отправлен на бэкенд:", response);
      router.push("ku");
      messageClose();
    } else {
      console.error("Не удалось отправить экземпляр на бэкенд");
    }

    router.push("ku");
  } catch (error) {
    console.error("Ошибка при отправке экземпляра на бэкенд:", error);
  }
};
</script>

<style scoped>
.custom-label {
  display: block;
  margin-bottom: 4px;
  font-size: 14px;
}

.button_bottom {
  margin: 20px 10px 0 0;
  display: flex;
  justify-content: flex-start;
}
</style>
