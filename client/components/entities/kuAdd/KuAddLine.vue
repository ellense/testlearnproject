<template>
  <el-scrollbar height="calc(100vh - 60px)">
    <form>
      <el-row>
        <el-col :span="5">
          <div class="custom-label">Юридическое лицо</div>
          <el-form-item>
            <el-select v-model="store.entityName" clearable filterable style="width: 300px" @change="onEntityChange">
              <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                <span style="float: left">{{ item.label }}</span>
                <span style="
                    margin-left: 10px;
                    float: right;
                    color: var(--el-text-color-secondary);
                    font-size: 13px;
                  ">{{ item.value }}</span>
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="4">
          <div class="custom-label">Период</div>
          <el-form-item>
            <el-select v-model="store.newType" clearable style="width: 214px">
              <el-option label="Неделя" value="Неделя" :disabled="true"></el-option>
              <el-option label="Месяц" value="Месяц"></el-option>
              <el-option label="Квартал" value="Квартал"></el-option>
              <el-option label="Полгода" value="Полгода"></el-option>
              <el-option label="Год" value="Год"></el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="5">
          <div class="custom-label">Начальная дата</div>
          <el-form-item :validate-status="dateStartValidation" :error="dateStartError">
            <el-date-picker v-model="store.newDateStart" style="width: 214px" format="DD.MM.YYYY"
              value-format="DD.MM.YYYY" clearable el-rowrable placeholder="Выбрать"
              @change="validateDateStart"></el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="5">
          <div class="custom-label">Поставщик</div>
          <el-form-item>
            <el-select v-model="store.vendorName" clearable filterable style="width: 300px" :disabled="!store.entityName"
              tex>
              <el-option v-for="item in options2" :key="item.value" :label="item.label" :value="item.value">
                <span style="float: left">{{ item.label }}</span>
                <span style="
                    margin-left: 10px;
                    float: right;
                    color: var(--el-text-color-secondary);
                    font-size: 13px;
                  ">{{ item.value }}</span>
              </el-option>
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <div class="custom-label">Процент</div>
          <el-form-item :validate-status="percentValidation" :error="percentError">
            <el-input placeholder="Введите" v-model="store.newPercent" clearable style="width: 214px"
              @input="validatePercent"></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="5">
          <div class="custom-label">Конечная дата</div>
          <el-form-item :validate-status="dateEndValidation" :error="dateEndError">
            <el-date-picker v-model="store.newDateEnd" style="width: 214px" format="DD.MM.YYYY" value-format="DD.MM.YYYY"
              clearable placeholder="Выбрать" @change="validateDateEnd"></el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
    </form>
    <h3>Фильтрация по товарам</h3>
    <div>
      <el-button text bg @click="onAddItem()" :disabled="isAddAllDisabled">+ Все</el-button>
      <el-button text bg @click="dialogOpen()" :disabled="isAddConditionDisabled">+ Условие по товарам</el-button>
    </div>
    <EntitiesKuAddRequirement />
    <div class="button_bottom">
      <el-button @click="addClose()">Отменить</el-button>
      <el-button type="primary" @click="addItemAndSendToBackend()" :loading="loading">Создать</el-button>
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

const store = useKuStore();
const router = useRouter();
const loading = ref(false);

//проверка полей формы
const dateStartValidation = ref<"error" | "success" | "validating" | undefined>('success');
const dateStartError = ref<string | undefined>('');
const dateEndValidation = ref<"error" | "success" | "validating" | undefined>('success');
const dateEndError = ref<string | undefined>('');
const percentValidation = ref<"error" | "success" | "validating" | undefined>('success');
const percentError = ref<string | undefined>('');


const validateDateStart = () => {
  const startDate = dayjs(store.newDateStart, 'DD.MM.YYYY');
  const endDate = dayjs(store.newDateEnd, 'DD.MM.YYYY');

  if (startDate.isAfter(endDate)) {
    dateStartValidation.value = 'error';
    dateStartError.value = 'Начальная дата не может быть позже конечной даты.';
  } else {
    dateStartValidation.value = undefined;
    dateStartError.value = undefined;
  }
};

const validateDateEnd = () => {
  const startDate = dayjs(store.newDateStart, 'DD.MM.YYYY');
  const endDate = dayjs(store.newDateEnd, 'DD.MM.YYYY');

  if (startDate.isAfter(endDate)) {
    dateEndValidation.value = 'error';
    dateEndError.value = 'Конечная дата не может быть раньше начальной даты.';
  } else {
    dateEndValidation.value = undefined;
    dateEndError.value = undefined;
  }
};

const validatePercent = () => {
  const percent = parseFloat(String(store.newPercent));

  if (isNaN(percent) || percent < 1 || percent > 100) {
    percentValidation.value = 'error';
    percentError.value = 'Введите корректный процент от 1 до 100.';
  } else {
    percentValidation.value = undefined;
    percentError.value = undefined;
  }
};
watch(() => store.newDateStart, validateDateStart);
watch(() => store.newDateEnd, validateDateEnd);
watch(() => store.newPercent, validatePercent);

const isFormValid = () => {
  const isEmpty = (value: any) => {
    if (Array.isArray(value)) {
      return value.some((item) => item === null || item.trim() === '');
    } else {
      return value === null || String(value).trim() === '';
    }
  };

  // Проверка для каждого поля
  const isEntityNameValid = !isEmpty(store.entityName);
  const isNewTypeValid = !isEmpty(store.newType);
  const isNewDateStartValid = !isEmpty(store.newDateStart);
  const isNewDateEndValid = !isEmpty(store.newDateEnd);
  const isVendorNameValid = !isEmpty(store.vendorName);
  const isNewPercentValid = !isEmpty(store.newPercent);

  // Возвращаем результат общей проверки
  return (
    isEntityNameValid &&
    isNewTypeValid &&
    isNewDateStartValid &&
    isNewDateEndValid &&
    isVendorNameValid &&
    isNewPercentValid
  );
};

//вывод данных юридического лица
const options = ref<Array<{ label: string; value: string }>>([]);
watch(
  () => store.dataEntity,
  (dataEntity: IEntityIdAndName[]) => {
    options.value = dataEntity.map((item) => ({
      label: item.name,
      value: item.entity_id,
    }));
  }
);
onMounted(async () => {
  try {
    await store.fetchKuEntity({
      entity_id: "",
      name: "",
    });
  } catch (error) {
    console.error("Ошибка при загрузке данных", error);
  }
});

//вывод данных поставщика
const options2 = ref<Array<{ label: string; value: string }>>([]);
watch(
  () => store.dataVendor,
  (dataVendor: IVendorIdAndName[]) => {
    options2.value = dataVendor.map((item) => ({
      label: item.name,
      value: item.vendor_id,
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
    await store.fetchVendorsListForEntity(undefined);
    console.log("fetchVendorsListForEntity:", store.entityName);
  } catch (error) {
    console.error("Ошибка при загрузке данных", error);
  }
};

// хз надо или нет
let isAddAllDisabled = ref(store.isAddAllDisabled);
let isAddConditionDisabled = ref(store.isAddConditionDisabled);

//таблица условий
const onAddItem = () => {
  store.tableDataRequirement.push({
    number: "Все",
    product: "",
    category: "",
    producer: "",
    brand: "",
  });
  isAddAllDisabled = ref(true)
};
const dialogOpen = () => {
  store.dialogFormVisible = true;
};
const addClose = () => {
  router.push("ku");
};

//отправка ку на бэк
const addItemAndSendToBackend = async () => {
  if (!isFormValid()) {
    // Если форма не валидна, выполните соответствующие действия, например, выведите сообщение об ошибке.
    ElMessage.error('Не все поля заполнены корректно.');
    return;
  }
  const newItem = {
    entity_id: store.entityName,
    vendor_id: store.vendorName,
    period: store.newType,
    date_start: dayjs(store.newDateStart, "DD.MM.YYYY").format("YYYY-MM-DD"),
    date_end: dayjs(store.newDateEnd, "DD.MM.YYYY").format("YYYY-MM-DD"),
    status: "Создано",
    percent: store.newPercent,
  };
  loading.value = true;
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
    ElMessage.error("Возникла ошибка. Коммерческое условие не создано.");
    console.log("Экземпляр успешно отправлен на бэкенд:", newItem);
    console.error("Ошибка при отправке экземпляра на бэкенд:", error);
  } finally {
    loading.value = false;
  }
  router.push("ku");
};
</script>

<style scoped>
.button_bottom {
  margin: 20px 10px 0 0;
  display: flex;
  justify-content: flex-start;
}
</style>
