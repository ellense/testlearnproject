<template>
    <el-scrollbar height="calc(100vh - 60px)">
        <form>
            <el-row>
                <el-col :span="5">
                    <div class="custom-label">Юридическое лицо</div>
                    <el-form-item>
                        <el-select v-model="store.kuIdEntityName.entity_name" clearable filterable style="width: 300px"
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
                        <el-select v-model="store.kuIdPeriod" clearable style="width: 214px">
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
                        <el-date-picker v-model="store.kuIdDateStart" format="DD.MM.YYYY" style="width: 214px" clearable
                            el-rowrable placeholder="Выбрать" @change="validateDateStart"></el-date-picker>
                    </el-form-item>
                </el-col>
            </el-row>

            <el-row>
                <el-col :span="5">
                    <div class="custom-label">Поставщик</div>
                    <el-form-item>
                        <el-select v-model="store.kuIdVendorName.vendor_name" clearable filterable style="width: 300px"
                            :disabled="!store.kuIdEntityName.entity_name" :title="disableSelectVendorTooltip">
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
                        <div v-if="!store.kuIdEntityName.entity_name" style="
                font-size: 12px;
                color: var(--el-text-color-secondary);
                margin-top: 5px;
              ">
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
                        <el-date-picker v-model="store.kuIdDateEnd" format="DD.MM.YYYY" style="width: 214px" clearable
                            placeholder="Выбрать" @change="validateDateEnd"></el-date-picker>
                    </el-form-item>
                </el-col>
            </el-row>

        </form>
        <h3>Условия по товарам</h3>
        <div>
            <el-button size="small" text bg @click="" :disabled="store.disableButtons" :title="disableButtonTooltip">+
                Все</el-button>
            <el-button size="small" text bg @click="" :disabled="store.disableButtons" :title="disableButtonTooltip">+
                Условие по товарам</el-button>
            <el-button size="small" text bg @click="" :disabled="store.disableButtons" :title="disableButtonTooltip">+
                Условие по категории</el-button>
        </div>
        <EntitiesKuAddRequirement />
        <div class="button_bottom">
            <el-button @click="addClose()">Отменить</el-button>
            <el-button type="primary" @click="changeKuToBackend()" :loading="loading" :disabled="isEditButtonDisabled"
                :title="disableButtonEditTooltip">Изменить</el-button>
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
import type { Action } from "element-plus";

const store = useKuIdStore();
const store2 = useKuStore();
const router = useRouter();
const loading = ref(false);

// Проверка полей формы
const dateStartValidation = ref<"error" | "success" | "validating" | undefined>(
    "success"
);
const dateStartError = ref<string | undefined>("");
const dateEndValidation = ref<"error" | "success" | "validating" | undefined>(
    "success"
);
const dateEndError = ref<string | undefined>("");
const percentValidation = ref<"error" | "success" | "validating" | undefined>(
    "success"
);
const percentError = ref<string | undefined>("");

// Периоды и их соответствующие минимальные разницы в днях
const periods: Record<string, number> = {
    Месяц: 30,
    Квартал: 90,
    Полгода: 180,
    Год: 365,
};

// Функция проверки даты начала
const validateDateStart = () => {
    // const startDate = dayjs(store.kuIdDateStart, 'DD.MM.YYYY');
    // const endDate = dayjs(store.kuIdDateEnd, 'DD.MM.YYYY');
    const startDate = dayjs(store.kuIdDateStart);
    const endDate = dayjs(store.kuIdDateEnd);
    // Проверка на минимальную разницу в зависимости от выбранного периода
    const minDiff = periods[store.kuIdPeriod];
    if (startDate.isAfter(endDate)) {
        dateStartValidation.value = "error";
        dateStartError.value = "Начальная дата не может быть позже конечной даты.";
    } else if (endDate.diff(startDate, "day") < minDiff) {
        dateStartValidation.value = "error";
        dateStartError.value = `Минимальная разница между начальной и конечной датой должна быть не менее ${minDiff} дней для выбранного периода.`;
    } else {
        dateStartValidation.value = undefined;
        dateStartError.value = undefined;
    }
};

// Функция проверки даты окончания
const validateDateEnd = () => {
    // const startDate = dayjs(store.kuIdDateStart, 'DD.MM.YYYY');
    // const endDate = dayjs(store.kuIdDateEnd, 'DD.MM.YYYY');
    const startDate = dayjs(store.kuIdDateStart);
    const endDate = dayjs(store.kuIdDateEnd);
    // Проверка на минимальную разницу в зависимости от выбранного периода
    const minDiff = periods[store.kuIdPeriod];
    if (startDate.isAfter(endDate)) {
        dateEndValidation.value = "error";
        dateEndError.value = "Конечная дата не может быть раньше начальной даты.";
    } else if (endDate.diff(startDate, "day") < minDiff) {
        dateEndValidation.value = "error";
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
        percentValidation.value = "error";
        percentError.value = "Введите корректный процент от 1 до 100.";
    } else {
        percentValidation.value = undefined;
        percentError.value = undefined;
    }
};

watch(() => store.kuIdPercent, validatePercent);
watch(() => store.kuIdDateStart, validateDateStart);
watch(() => store.kuIdDateEnd, validateDateEnd);

// переменная для отслеживания первого изменения kuIdPeriod
let isFirstPeriodChange = true;

// Функция сброса дат при изменении периода
const resetDatesOnPeriodChange = () => {
    // Проверяем, не первое ли это изменение kuIdPeriod
    if (!isFirstPeriodChange) {
        store.kuIdDateStart = new Date("");
        store.kuIdDateEnd = new Date("");
    } else {
        isFirstPeriodChange = false;
    }
};

// Обработчик изменения выбранного периода
watch(
    () => store.kuIdPeriod,
    (newValue, oldValue) => {
        if (oldValue !== newValue) {
            resetDatesOnPeriodChange();
        }
    }
);
//  переменная для отслеживания первого изменения kuIdEntityName
let isFirstEntityChange = true;

// Функция сброса поставщика
const resetVendorOnEntityChange = () => {
    // Проверяем, не первое ли это изменение kuIdEntityName
    if (!isFirstEntityChange) {
        store.kuIdVendorName = {
            vendor_id: "",
            vendor_name: "",
        };
    } else {
        isFirstEntityChange = false;
    }
};

// Обработчик изменения выбранного юр.лица
watch(
    () => store.kuIdEntityName,
    (newValue, oldValue) => {
        if (oldValue !== newValue) {
            resetVendorOnEntityChange();
        }
    }
);

//проверка полей формы
const isFormValid = () => {
    const isEmpty = (value: any) => {
        if (Array.isArray(value)) {
            return value.some((item) => item === null || item.trim() === "");
        } else {
            return value === null || String(value).trim() === "";
        }
    };

    // Проверка для каждого поля
    const isEntityNameValid = !isEmpty(store.kuIdEntityName);
    const isNewTypeValid = !isEmpty(store.kuIdPeriod);
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
    () => store.dataVendor,
    (dataVendor: IVendorIdAndName[]) => {
        options2.value = dataVendor.map((item) => ({
            label: item.vendor_id,
            value: item.name,
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
    } catch (error) {
        console.error("Ошибка при загрузке данных", error);
    }
};

const disableSelectVendorTooltip = computed(() => {
    return !store.kuIdEntityName
        ? "Выбор заблокирован. Для доступа сначала выберите юридическое лицо"
        : "";
});

const disableButtonTooltip = computed(() => {
    return store.disableButtons
        ? 'Кнопка заблокирована. Для доступа удалите условие "Все".'
        : "";
});

const isEditButtonDisabled = computed(() => {
    return store.kuIdStatus !== 'Создано';
});

const disableButtonEditTooltip = computed(() => {
    return store.kuIdStatus !== 'Создано'
        ? 'Вы можете изменить только КУ в статусе "создано".'
        : "";
});
const addClose = () => {
    router.push({ path: "/" });
    store.tableDataRequirement.length = 0;
    store.ku_id = "";
    store.kuIdEntityName = {
        entity_id: [],
        entity_name: "",
    };
    store.kuIdVendorName = {
        vendor_id: "",
        vendor_name: "",
    };
    store.kuIdPeriod = "";
    store.kuIdDateStart = new Date();
    store.kuIdDateEnd = new Date();
    store.kuIdPercent = null;
    store.disableButtons = false;
};
const changeKuToBackend = async () => {
    // Проверяем валидность формы
    if (!isFormValid()) {
        ElMessage.error('Не все поля заполнены корректно.');
        return;
    }
    // Проверяем наличие хотя бы одного условия по товарам
    // if (store.tableDataRequirement.length === 0) {
    //     ElMessage.error('Добавьте минимум одно условие по товарам');
    //     return;
    // }

    loading.value = true;

    try {
        // Создаем объект newItem для отправки на бэкенд
        const newItem = {
            ku_id: store.ku_id,
            entity_id: store.kuIdEntityName.entity_id[0],
            vendor_id: store.kuIdVendorName.vendor_id,
            period: store.kuIdPeriod,
            date_start: dayjs(store.kuIdDateStart).format("YYYY-MM-DD"),
            date_end: dayjs(store.kuIdDateEnd).format("YYYY-MM-DD"),
            status: "Создано",
            percent: store.kuIdPercent,
        };
        console.log("newItem", newItem)
        // Отправляем запрос на создание нового элемента на бэкенд
        const response = await KU.updateKu(newItem);

        // // Создаем массив объектов для каждого элемента из tableDataRequirement
        // const requirementsArray = store.tableDataRequirement.map(item => ({
        //   ku_id: response.ku_id, // используем ku_id из ответа на предыдущий запрос
        //   item_type: item.item_type,
        //   item_code: item.item_code,
        //   item_name: item.item_name,
        //   producer: item.producer,
        //   brand: item.brand,
        // }));

        // // Отправляем каждый объект из массива на бэкенд
        // const responses = await Promise.all(requirementsArray.map(newItem2 => KU.postKuRequirement(newItem2)));

        // Проверяем успешность отправки всех объектов
        // const allSuccess = responses.every(response => response !== undefined);
        // && allSuccess
        if (response) {
            console.log("Экземпляр успешно отправлен на бэкенд:", response);
            //   console.log("Условия успешно отправлены на бэкенд:", responses);
            router.push("ku");
            ElMessage.success("Коммерческое условие успешно изменено.");
        } else {
            console.error("Не удалось отправить экземпляр или условия на бэкенд из-за проверок");
            ElMessage.error("Возникла ошибка. Коммерческое условие не изменено.");
        }

    } catch (error) {
        ElMessage.error("Возникла ошибка. Коммерческое условие не изменено.");
        console.error("Ошибка при отправке экземпляра или условий на бэкенд:", error);
    } finally {
        loading.value = false;
        // Очищаем поля и таблицу условий
        store.tableDataRequirement.length = 0;
        store.kuIdEntityName = {
            entity_id: [],
            entity_name: "",
        };;
        store.kuIdVendorName = {
            vendor_id: "",
            vendor_name: "",
        };
        store.kuIdPeriod = "";
        store.kuIdDateStart = new Date();
        store.kuIdDateEnd = new Date();
        store.kuIdPercent = null;
        store.disableButtons = false;
    }
    router.push({ path: "/" });
}
</script>

<style scoped>
.button_bottom {
    margin: 20px 10px 0 0;
    display: flex;
    justify-content: flex-start;
}
</style>
