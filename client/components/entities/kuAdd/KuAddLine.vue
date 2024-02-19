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
              :title="disableSelectVendorTooltip">
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
            <div v-if="!store.entityName"
              style="font-size: 12px; color: var(--el-text-color-secondary); margin-top: 5px;">
              Сначала выберите юридическое лицо
            </div>
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
    <h3>Условия по товарам</h3>
    <div>
      <el-button size="small" text bg @click="onAddItem()" :disabled="store.disableButtons"
        :title="disableButtonTooltip">+ Все</el-button>
      <el-button size="small" text bg @click="dialogOpenProduct()" :disabled="store.disableButtons"
        :title="disableButtonTooltip">+ Условие по
        товарам</el-button>
      <el-button size="small" text bg @click="dialogOpenCategory()" :class="{ 'loading-cursor': categoryDialogLoading }"
        :loading="categoryDialogLoading" :disabled="store.disableButtons" :title="disableButtonTooltip">+ Условие по
        категории</el-button>
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
import type {
  IEntityIdAndName,
  ITree,
  IVendorIdAndName,
} from "~/utils/types/directoryTypes";
import type { Action, ElTree } from 'element-plus'

const store = useKuStore();
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

const disableSelectVendorTooltip = computed(() => {
  return !store.entityName ? 'Выбор заблокирован. Для доступа сначала выберите юридическое лицо' : '';
});

const disableButtonTooltip = computed(() => {
  return store.disableButtons ? 'Кнопка заблокирована. Для доступа удалите условие "Все".' : '';
});

//добавление условия "все"
const onAddItem = () => {
  if (store.tableDataRequirement.length === 0) {
    store.tableDataRequirement.push({
      item_type: "Все",
      item_code: "",
      item_name: "",
      producer: "",
      brand: "",
    });
    console.log("store.tableDataRequirementВСЕ", store.tableDataRequirement);

  }
  else {
    ElMessageBox.alert('При добавлении условия "Все", предыдущие условия удалятся', 'Вы точно хотите удалить условия?', {
      confirmButtonText: 'OK',
      callback: (action: Action) => {
        if (action === 'confirm') { // Проверяем, что пользователь подтвердил удаление
          store.tableDataRequirement.length = 0;// Очищаем массив
          store.tableDataRequirement.push({
            item_type: "Все",
            item_code: "",
            item_name: "",
            producer: "",
            brand: "",
          });
          ElMessage({
            type: 'info',
            message: 'Предыдущие условия удалены. Условие "Все" добавлено', // Сообщение о том, что условия удалены
          });
        }
      },
    });

  }
  // disableButtons.value = true;
  store.disableButtons = true;
};
const treeData = ref<ITree[]>([]);
const treeRef = ref<InstanceType<typeof ElTree>>()
const categoryDialogLoading = ref(false);
const buildTree = (nodes: ITree[], parentCode: string | null = null): ITree[] => {
  const parentNode = nodes.filter(node => node.parent_code === parentCode);
  if (!parentNode.length) return []; // Если узел родителя не существует, вернуть пустой массив

  return parentNode.map(node => {
    const children = buildTree(nodes, node.classifier_code.toString());
    if (children.length) {
      node.children = children;
    }
    return node;
  });
};

// Функция для получения данных с бэкэнда и установки полученных данных в переменную treeData
const fetchData = async (data: ITree) => {
  try {
    const result = await CATEGORY.getCategory(data);

    if (Array.isArray(result)) {
      treeData.value = buildTree(result, '0');
      console.log("treeData", treeData.value);
      treeRef.value && treeRef.value.updateKeyChildren(data.classifier_code, treeData.value);
    } else {
      treeData.value = [];
      console.error("Данные не получены или не являются массивом");
    }
  } catch (error) {
    console.error("Произошла ошибка при получении данных категорий", error);
  }
};
const dialogOpenCategory = async () => {
  try {
    categoryDialogLoading.value = true;

    // Выполните асинхронные запросы для получения данных перед открытием диалогового окна
    await store.fetchAllProducers();
    await store.fetchAllBrands();
    await fetchData({
      name: "string",
      classifier_code: 1,
      children: [],
      parent_code: "",
    });

    // После завершения загрузки данных установите флаг dialogFormCategoryVisible в true
    store.dialogFormCategoryVisible = true;
  } catch (error) {
    console.error('Ошибка при загрузке данных для диалогового окна:', error);
    ElMessage.error('Ошибка при загрузке данных для диалогового окна:');
  } finally {
    categoryDialogLoading.value = false;
  }
}
const dialogOpenProduct = () => {
  store.dialogFormProductVisible = true;
};
// const dialogOpenCategory = () => {
//   store.dialogFormCategoryVisible = true;

// };
const addClose = () => {
  router.push("ku");
  store.tableDataRequirement.length = 0;
  store.entityName = [];
  store.vendorName = "";
  store.newType = "";
  store.newDateStart = new Date();
  store.newDateEnd = new Date();
  store.newPercent = null;
  store.disableButtons = false
};

//отправка ку на бэк
const addItemAndSendToBackend = async () => {
  // Проверяем валидность формы
  if (!isFormValid()) {
    ElMessage.error('Не все поля заполнены корректно.');
    return;
  }
  // Проверяем наличие хотя бы одного условия по товарам
  if (store.tableDataRequirement.length === 0) {
    ElMessage.error('Добавьте минимум одно условие по товарам');
    return;
  }

  loading.value = true;

  try {
    // Создаем объект newItem для отправки на бэкенд
    const newItem = {
      entity_id: store.entityName,
      vendor_id: store.vendorName,
      period: store.newType,
      date_start: dayjs(store.newDateStart, "DD.MM.YYYY").format("YYYY-MM-DD"),
      date_end: dayjs(store.newDateEnd, "DD.MM.YYYY").format("YYYY-MM-DD"),
      status: "Создано",
      percent: store.newPercent,
    };

    // Отправляем запрос на создание нового элемента на бэкенд
    const response = await KU.postKu(newItem);

    // Создаем массив объектов для каждого элемента из tableDataRequirement
    const requirementsArray = store.tableDataRequirement.map(item => ({
      ku_id: response.ku_id, // используем ku_id из ответа на предыдущий запрос
      item_type: item.item_type,
      item_code: item.item_code,
      item_name: item.item_name,
      producer: item.producer,
      brand: item.brand,
    }));

    // Отправляем каждый объект из массива на бэкенд
    const responses = await Promise.all(requirementsArray.map(newItem2 => KU.postKuRequirement(newItem2)));

    // Проверяем успешность отправки всех объектов
    const allSuccess = responses.every(response => response !== undefined);

    if (response && allSuccess) {
      console.log("Экземпляр успешно отправлен на бэкенд:", response);
      console.log("Условия успешно отправлены на бэкенд:", responses);
      router.push("ku");
      ElMessage.success("Коммерческое условие успешно создано.");
    } else {
      console.error("Не удалось отправить экземпляр или условия на бэкенд");
      ElMessage.error("Возникла ошибка. Коммерческое условие не создано.");
    }
  } catch (error) {
    ElMessage.error("Возникла ошибка. Коммерческое условие не создано.");
    console.error("Ошибка при отправке экземпляра или условий на бэкенд:", error);
  } finally {
    loading.value = false;
    // Очищаем поля и таблицу условий
    store.tableDataRequirement.length = 0;
    store.entityName = [];
    store.vendorName = "";
    store.newType = "";
    store.newDateStart = new Date();
    store.newDateEnd = new Date();
    store.newPercent = null;
    store.disableButtons = false;
  }
};

</script>

<style scoped>
.button_bottom {
  margin: 20px 10px 0 0;
  display: flex;
  justify-content: flex-start;
}

.loading-cursor {
  cursor: wait;
  /* Установка курсора в виде элемента загрузки */
}
</style>
