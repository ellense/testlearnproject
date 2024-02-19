<template>
    <div>
        <el-button>Добавить</el-button>
    </div>
    <el-scrollbar height="calc(100vh - 60px)">
        <form>
            <el-row>
                <el-col :span="5">
                    <div class="custom-label">Юридическое лицо</div>
                    <el-form-item>
                        <el-select v-model="store.kuIdEntityName" clearable filterable style="width: 300px"
                            @change="onEntityChange">
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
                        <el-select v-model="store.kuIdType" clearable style="width: 214px">
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
                        <el-date-picker v-model="store.kuIdDateStart" style="width: 214px" format="DD.MM.YYYY"
                            value-format="DD.MM.YYYY" clearable el-rowrable placeholder="Выбрать"
                            @change="validateDateStart"></el-date-picker>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-row>
                <el-col :span="5">
                    <div class="custom-label">Поставщик</div>
                    <el-form-item>
                        <el-select v-model="store.kuIdVendorName" clearable filterable style="width: 300px"
                            :disabled="!store.kuIdEntityName" :title="disableSelectVendorTooltip">
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
                        <div v-if="!store.kuIdEntityName"
                            style="font-size: 12px; color: var(--el-text-color-secondary); margin-top: 5px;">
                            Сначала выберите юридическое лицо
                        </div>
                    </el-form-item>
                </el-col>
                <el-col :span="4">
                    <div class="custom-label">Процент</div>
                    <el-form-item :validate-status="percentValidation" :error="percentError">
                        <el-input placeholder="Введите" v-model="store.kuIdPercent" clearable style="width: 214px"
                            @input="validatePercent"></el-input>
                    </el-form-item>
                </el-col>

                <el-col :span="5">
                    <div class="custom-label">Конечная дата</div>
                    <el-form-item :validate-status="dateEndValidation" :error="dateEndError">
                        <el-date-picker v-model="store.kuIdDateEnd" style="width: 214px" format="DD.MM.YYYY"
                            value-format="DD.MM.YYYY" clearable placeholder="Выбрать"
                            @change="validateDateEnd"></el-date-picker>
                    </el-form-item>
                </el-col>
            </el-row>
        </form>
        <h3>Условия по товарам</h3>
        <div>
            <el-button size="small" text bg @click="" :disabled="store.disableButtons" :title="disableButtonTooltip">+
                Все</el-button>
            <el-button size="small" text bg @click="" :disabled="store.disableButtons" :title="disableButtonTooltip">+
                Условие по
                товарам</el-button>
            <el-button size="small" text bg @click="" :disabled="store.disableButtons" :title="disableButtonTooltip">+
                Условие по
                категории</el-button>
        </div>
        <EntitiesKuAddRequirement />
        <div class="button_bottom">
            <el-button @click="addClose()">Отменить</el-button>
            <el-button type="primary" @click="" :loading="loading">Создать</el-button>
        </div>

    </el-scrollbar>
</template>

<script lang="ts" setup>
import { ref } from "vue";

import dayjs from "dayjs";
import { useRouter } from "vue-router";
import { useKuIdStore } from "~~/stores/kuIdStore";
import { useKuStore } from "~~/stores/kuStore";
import type {
    IEntityIdAndName,
    IVendorIdAndName,
} from "~/utils/types/directoryTypes";
import type { Action } from 'element-plus'

const store = useKuIdStore();
const store2 = useKuStore();
const router = useRouter();
const loading = ref(false);

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
    const startDate = dayjs(store.kuIdDateStart, 'DD.MM.YYYY');
    const endDate = dayjs(store.kuIdDateEnd, 'DD.MM.YYYY');

    // Проверка на минимальную разницу в зависимости от выбранного периода
    const minDiff = periods[store.kuIdType];
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
    const startDate = dayjs(store.kuIdDateStart, 'DD.MM.YYYY');
    const endDate = dayjs(store.kuIdDateEnd, 'DD.MM.YYYY');
    // Проверка на минимальную разницу в зависимости от выбранного периода
    const minDiff = periods[store.kuIdType];
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
    const percent = parseFloat(String(store.kuIdPercent));
    if (isNaN(percent) || percent < 1 || percent > 100) {
        percentValidation.value = 'error';
        percentError.value = 'Введите корректный процент от 1 до 100.';
    } else {
        percentValidation.value = undefined;
        percentError.value = undefined;
    }
};

watch(() => store.kuIdPercent, validatePercent);
watch(() => store.kuIdDateStart, validateDateStart);
watch(() => store.kuIdDateEnd, validateDateEnd);

// Функция сброса дат при изменении периода
const resetDatesOnPeriodChange = () => {

    store.kuIdDateStart = new Date()
    store.kuIdDateEnd = new Date();
};
// Функция сброса поставщика
const resetVendorOnEntityChange = () => {
    store.kuIdVendorName = "";
};
// Обработчик изменения выбранного периода
watch(() => store.kuIdType, (newValue, oldValue) => {
    if (oldValue !== newValue) {
        resetDatesOnPeriodChange();
    }
});
// Обработчик изменения выбранного юр.лица
watch(() => store.kuIdEntityName, (newValue, oldValue) => {
    if (oldValue !== newValue) {
        resetVendorOnEntityChange();
    }
});

//проверка полей формы
const isFormValid = () => {
    const isEmpty = (value: any) => {
        if (Array.isArray(value)) {
            return value.some((item) => item === null || item.trim() === '');
        } else {
            return value === null || String(value).trim() === '';
        }
    };

    // Проверка для каждого поля
    const isEntityNameValid = !isEmpty(store.kuIdEntityName);
    const isNewTypeValid = !isEmpty(store.kuIdType);
    const isNewDateStartValid = !isEmpty(store.kuIdDateStart);
    const isNewDateEndValid = !isEmpty(store.kuIdDateEnd);
    const isVendorNameValid = !isEmpty(store.kuIdVendorName);
    const isNewPercentValid = !isEmpty(store.kuIdPercent);

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
    () => store2.dataEntity,
    (dataEntity: IEntityIdAndName[]) => {
        options.value = dataEntity.map((item) => ({
            label: item.name,
            value: item.entity_id,
        }));
    }
);
onMounted(async () => {
    try {
        await store2.fetchKuEntity({
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
    () => store2.dataVendor,
    (dataVendor: IVendorIdAndName[]) => {
        options2.value = dataVendor.map((item) => ({
            label: item.name,
            value: item.vendor_id,
        }));
    }
);
onMounted(async () => {
    try {
        await store2.fetchVendorsListForEntity();
    } catch (error) {
        console.error("Ошибка при загрузке данных", error);
    }
});
const onEntityChange = async () => {
    try {
        await store2.fetchVendorsListForEntity(undefined);
        console.log("fetchVendorsListForEntity:", store2.entityName);
    } catch (error) {
        console.error("Ошибка при загрузке данных", error);
    }
};

const disableSelectVendorTooltip = computed(() => {
    return !store.kuIdEntityName ? 'Выбор заблокирован. Для доступа сначала выберите юридическое лицо' : '';
});

const disableButtonTooltip = computed(() => {
    return store.disableButtons ? 'Кнопка заблокирована. Для доступа удалите условие "Все".' : '';
});
const addClose = () => {
    router.push({ path: '/' })
    store.tableDataRequirement.length = 0;
    store.kuIdEntityName = [];
    store.kuIdVendorName = "";
    store.kuIdType = "";
    store.kuIdDateStart = new Date();
    store.kuIdDateEnd = new Date();
    store.kuIdPercent = null;
    store.disableButtons = false
};
</script>

<style  scoped></style>