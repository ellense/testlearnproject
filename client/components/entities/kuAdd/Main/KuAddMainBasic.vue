<template>
    <form>
      <el-row>
        <el-col :span="5">
          <div class="custom-label">Юридическое лицо</div>
          <el-form-item>
            <el-select v-model="store.entityName" size="small" clearable filterable style="width: 300px" @change="onEntityChange">
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
            <el-select v-model="store.newType" size="small" clearable style="width: 214px">
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
            <el-date-picker v-model="store.newDateStart" style="width: 214px" size="small" format="DD.MM.YYYY"
              value-format="DD.MM.YYYY" clearable el-rowrable placeholder="Выбрать"
              @change="validateDateStart"></el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>

      <el-row>
        <el-col :span="5">
          <div class="custom-label">Поставщик</div>
          <el-form-item>
            <el-select-v2 v-model="store.vendorName" size="small" clearable filterable :options="options2" :disabled="!store.entityName"
               style="width: 300px" :title="disableSelectVendorTooltip" placeholder="Выберите поставщика" @change="onVendorChange" >
              <template #default="{ item }" class="selectVendorInKuAdd">
                <span style="margin-right: 8px">{{ item.label }}</span>
                <span style="color: var(--el-text-color-secondary); font-size: 12px; margin-left: 10px;
                    float: right;">
                  {{ item.value }}
                </span>
              </template>
            </el-select-v2>
            <div v-if="!store.entityName"
              style="font-size: 12px; color: var(--el-text-color-secondary); margin-top: 5px;">
              Сначала выберите юридическое лицо
            </div>
          </el-form-item>
        </el-col>
        <el-col :span="4">
          <div class="custom-label">Процент</div>
          <el-form-item :validate-status="percentValidation" :error="percentError">
            <el-input placeholder="Введите" v-model="store.newPercent" size="small" clearable style="width: 214px"
              @input="validatePercent"></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="5">
          <div class="custom-label">Конечная дата</div>
          <el-form-item :validate-status="dateEndValidation" :error="dateEndError">
            <el-date-picker v-model="store.newDateEnd" style="width: 214px" size="small" format="DD.MM.YYYY" value-format="DD.MM.YYYY"
              clearable placeholder="Выбрать" @change="validateDateEnd"></el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
    </form>
</template>

<script setup lang="ts">
import { ref } from "vue";
import dayjs from "dayjs";
import { useKuAddStore } from "~~/stores/kuAddStore";
import type {
    IEntityIdAndName,
    ITree,
    IVendorIdAndName,
} from "~/utils/types/directoryTypes";
const store = useKuAddStore();
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
        console.error("Ошибка при загрузке данных юр. лица", error);
    }
});

//вывод данных поставщика

const options2 = ref<Array<{ label: string; value: string }>>([]);

watch(() => store.dataVendor, (vendors: IVendorIdAndName[]) => {
    options2.value = vendors.map(item => ({ label: item.name, value: item.vendor_id }));
});

const onEntityChange = async () => {
    store.dataVendor = [];
    store.setFilterValue6('entity_id', store.entityName);
    if (store.entityName) { // Проверка, что выбрана торговая маркка
        useKuAddStore().fetchAllVendorsListForEntity(); // Выполнить запрос с фильтром по производителям
        console.log('Выполнен запрос на получение данных производителей.');
    } else {
        useKuAddStore().setFilterValue6('entity_id', undefined); // Сбросить фильтр
        console.log('Сброшен фильтр производителей:', useKuAddStore().filterBrandValue);
    }
};

const onVendorChange = async () => {
    try {
        console.log("поставщик:", store.vendorName);
        store.setFilterValue3('vendor_id', store.vendorName);
        store.setFilterValue4('vendor_id', store.vendorName);
        store.setFilterValue5('vendor_id', store.vendorName);
        await store.getProductFromAPIWithFilter();
        await store.fetchAllProducers();
        await store.fetchAllBrands();
    } catch (error) {
        console.error("Ошибка при загрузке данных товаров/производителей/брендов по фильтру поставщика", error);
    }
};


// Проверка полей формы
const dateStartValidation = ref<"error" | "success" | "validating" | undefined>('success');
const dateStartError = ref<string | undefined>('');
const dateEndValidation = ref<"error" | "success" | "validating" | undefined>('success');
const dateEndError = ref<string | undefined>('');
const percentValidation = ref<"error" | "success" | "validating" | undefined>('success');
const percentError = ref<string | undefined>('');

// Периоды и их соответствующие минимальные разницы в днях
const periods: Record<string, number> = {
    'Месяц': 30,
    'Квартал': 90,
    'Полгода': 180,
    'Год': 365
};

// Функция проверки даты начала
const validateDateStart = () => {
    const startDate = dayjs(store.newDateStart, 'DD.MM.YYYY');
    const endDate = dayjs(store.newDateEnd, 'DD.MM.YYYY');

    // Проверка на минимальную разницу в зависимости от выбранного периода
    const minDiff = periods[store.newType];
    if (startDate.isAfter(endDate)) {
        dateStartValidation.value = 'error';
        dateStartError.value = 'Начальная дата не может быть позже конечной даты.';
    } else if (endDate.diff(startDate, 'day') < minDiff) {
        dateStartValidation.value = 'error';
        dateStartError.value = `Минимальная разница между начальной и конечной датой должна быть не менее ${minDiff} дней для выбранного периода.`;
    } else {
        dateStartValidation.value = undefined;
        dateStartError.value = undefined;
    }
};

// Функция проверки даты окончания
const validateDateEnd = () => {
    const startDate = dayjs(store.newDateStart, 'DD.MM.YYYY');
    const endDate = dayjs(store.newDateEnd, 'DD.MM.YYYY');
    // Проверка на минимальную разницу в зависимости от выбранного периода
    const minDiff = periods[store.newType];
    if (startDate.isAfter(endDate)) {
        dateEndValidation.value = 'error';
        dateEndError.value = 'Конечная дата не может быть раньше начальной даты.';
    } else if (endDate.diff(startDate, 'day') < minDiff) {
        dateEndValidation.value = 'error';
        dateEndError.value = `Минимальная разница между начальной и конечной датой должна быть не менее ${minDiff} дней для выбранного периода.`;
    } else {
        dateEndValidation.value = undefined;
        dateEndError.value = undefined;
    }
};



// Функция проверки процента
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

watch(() => store.newPercent, validatePercent);
watch(() => store.newDateStart, validateDateStart);
watch(() => store.newDateEnd, validateDateEnd);

// Функция сброса дат при изменении периода
const resetDatesOnPeriodChange = () => {

    store.newDateStart = new Date()
    store.newDateEnd = new Date();
};
// Функция сброса поставщика
const resetVendorOnEntityChange = () => {
    store.vendorName = "";
};
// Обработчик изменения выбранного периода
watch(() => store.newType, (newValue, oldValue) => {
    if (oldValue !== newValue) {
        resetDatesOnPeriodChange();
    }
});
// Обработчик изменения выбранного юр.лица
watch(() => store.entityName, (newValue, oldValue) => {
    if (oldValue !== newValue) {
        resetVendorOnEntityChange();
    }
});


const disableSelectVendorTooltip = computed(() => {
    return !store.entityName ? 'Выбор заблокирован. Для доступа сначала выберите юридическое лицо' : '';
});


</script>

<style scoped>

</style>