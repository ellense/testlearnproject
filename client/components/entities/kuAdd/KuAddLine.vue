<template>
  <el-scrollbar height="calc(100vh - 60px)">
    <form label-width="120px" label-position="top">
      <el-row>
        <el-col :span="5">
          <div class="custom-label">Юридическое лицо</div>
          <el-form-item>
            <el-select
              v-model="store.entityName"
              clearable
              filterable
              style="width: 300px"
              @change="onEntityChange"
            >
              <el-option
                v-for="item in options"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
                <span style="float: left">{{ item.label }}</span>
                <span
                  style="
                    margin-left: 10px;
                    float: right;
                    color: var(--el-text-color-secondary);
                    font-size: 13px;
                  "
                  >{{ item.value }}</span
                >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="4">
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
              el-rowrable
              placeholder="Выбрать"
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
              style="width: 300px"
            >
              <el-option
                v-for="item in options2"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
                <span style="float: left">{{ item.label }}</span>
                <span
                  style="
                    margin-left: 10px;
                    float: right;
                    color: var(--el-text-color-secondary);
                    font-size: 13px;
                  "
                  >{{ item.value }}</span
                >
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="4">
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
              placeholder="Выбрать"
            ></el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
    </form>
    <h3>Фильтрация по товарам</h3>
    <div>
      <el-button text bg @click="onAddItem()" :disabled="isAddAllDisabled"
        >+ Все</el-button
      >
      <el-button
        text
        bg
        @click="dialogOpen()"
        :disabled="isAddConditionDisabled"
        >+ Условие по товарам</el-button
      >
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

import dayjs from "dayjs";
import { useRouter } from "vue-router";
import { useKuStore } from "~~/stores/kuStore";
import { useEntityTableStore } from "~~/stores/entityTableStore";
import type {
  IEntityIdAndName,
  IVendorIdAndName,
} from "~/utils/types/directoryTypes";

const entityStore = useEntityTableStore();
const store = useKuStore();
const router = useRouter();

const options = ref<Array<{ label: string; value: string }>>([]);

watch(
  () => store.dataEntity,
  (dataEntity: IEntityIdAndName[]) => {
    options.value = dataEntity.map((item) => ({
      label: item.name,
      value: item.entityid,
    }));
  }
);

onMounted(async () => {
  try {
    await store.fetchKuEntity({
      entityid: "",
      name: "",
    });
  } catch (error) {
    console.error("Ошибка при загрузке данных", error);
  }
});

const options2 = ref<Array<{ label: string; value: string }>>([]);

watch(
  () => store.dataVendor,
  (dataVendor: IVendorIdAndName[]) => {
    options2.value = dataVendor.map((item) => ({
      label: item.name,
      value: item.vendorid,
    }));
  }
);

onMounted(async () => {
  try {
    await store.fetchVendorsListForEntity();
  } catch (error) {
    console.error("Ошибка при загрузке данных", error);
  }
});

const onEntityChange = async () => {
  try {
    await store.fetchVendorsListForEntity(undefined, store.entityName);
    console.log("fetchVendorsListForEntity:", store.entityName);
  } catch (error) {
    console.error("Ошибка при загрузке данных", error);
  }
};

const isAddAllDisabled = ref(store.isAddAllDisabled);
const isAddConditionDisabled = ref(store.isAddConditionDisabled);

const onAddItem = () => {
  store.tableDataRequirement.push({
    number: "Все",
    product: "",
    category: "",
    producer: "",
    brand: "",
  });
};

const dialogOpen = () => {
  store.dialogFormVisible = true;
};

const addClose = () => {
  router.push("ku");
};

const addItemAndSendToBackend = async () => {
  const newItem = {
    entityid: store.entityName,
    vendor: store.vendorName,
    period: store.newType,
    date_start: dayjs(store.newDateStart, "DD.MM.YYYY").format("YYYY-MM-DD"),
    date_end: dayjs(store.newDateEnd, "DD.MM.YYYY").format("YYYY-MM-DD"),
    status: "Создано",
    percent: store.newPercent,
  };

  try {
    const response = await KU.postKu(newItem);
    if (response) {
      console.log("Экземпляр успешно отправлен на бэкенд:", response);
      router.push("ku");
      ElMessage.success("Коммерческое условие успешно создано.");
    } else {
      console.error("Не удалось отправить экземпляр на бэкенд");
      ElMessage.error("Возникла ошибка. Коммерческое условие не создано.");
    }
  } catch (error) {
    console.log("Экземпляр успешно отправлен на бэкенд:", newItem);
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
