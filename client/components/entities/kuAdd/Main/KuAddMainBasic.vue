<template>
  <el-scrollbar height="45vh">
    <form>
      <div class="kuAddMain">
        <div class="kuAddMainCol">
          <el-divider content-position="left" style=" color: #337ecc">Идентификация</el-divider>
          <el-form-item label-width="130" label="Код компании">
            <!-- <el-text class="kuAddLabel">Код компании</el-text> -->
            <el-select v-model="store.newEntityId" size="small" placeholder="Выберите код компании" clearable filterable
              style="width: 300px" @change="onEntityChange">
              <el-option v-for="item in options" :key="item.value" :label="item.value" :value="item.value">
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
          <el-form-item label-width="130" label="Название компании">
            <el-input v-model="store.newEntityName" size="small" style="width: 300px">
            </el-input>
          </el-form-item>
          <el-divider content-position="left" style=" color: #337ecc">Описание</el-divider>
          <el-form-item label-width="130" label="Описание">
            <el-input v-model="store.newDescription" size="small" placeholder="Введите описание" clearable
              style="width: 300px">
            </el-input>
          </el-form-item>
          <el-form-item label-width="130" label="Код поставщика">
            <div>
              <el-select-v2 v-model="store.newVendorId" size="small" clearable filterable :options="options2"
                :disabled="!store.newEntityId" style="width: 300px" :title="disableSelectVendorTooltip"
                placeholder="Выберите поставщика" @change="onVendorChange">
                <template #default="{ item }" class="selectVendorInKuAdd">
                  <span style="margin-right: 8px">{{ item.label }}</span>
                </template>
              </el-select-v2>

              <!-- <el-select-v2 v-model="store.newVendorId" size="small" placeholder="Выберите код компании" clearable
                filterable style="width: 300px" @change="onVendorChange" :options="options2" value-key="value">
              </el-select-v2> -->
            </div>
          </el-form-item>
          <el-form-item label-width="130" label="Контракт">
            <el-input v-model="store.newContract" size="small" placeholder="Введите контракт" clearable
              style="width: 300px">
            </el-input>
          </el-form-item>
          <el-form-item label-width="130" label="Тип товаров">
            <el-select v-model="store.newProduct_type" size="small" clearable placeholder="Выберите тип товаров"
              style="width: 300px">
              <el-option label="Продовольственные" value="Продовольственные"></el-option>
              <el-option label="Непродовольственные" value="Непродовольственные"></el-option>
            </el-select>
          </el-form-item>
        </div>
        <div class="kuAddMainCol">
          <el-divider content-position="left" style=" color: #337ecc">Период действия</el-divider>
          <el-form-item label-width="170" label="Тип периода">
            <el-select v-model="store.newType" size="small" clearable placeholder="Выберите тип периода"
              style="width: 300px">
              <el-option label="Месяц" value="Месяц"></el-option>
              <el-option label="Квартал" value="Квартал"></el-option>
              <el-option label="Полгода" value="Полгода"></el-option>
              <el-option label="Год" value="Год"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item :validate-status="dateStartValidation" :error="dateStartError" style="margin-bottom: 10px;"
            label-width="170" label="Начальная дата">
            <el-date-picker v-model="store.newDateStart" style="width: 300px" size="small" format="DD.MM.YYYY"
              value-format="DD.MM.YYYY" clearable el-rowrable placeholder="Выберите начальную дату"
              @change="validateDateStart"></el-date-picker>
          </el-form-item>
          <el-form-item :validate-status="dateEndValidation" :error="dateEndError" label-width="170"
            label="Конечная дата">
            <el-date-picker v-model="store.newDateEnd" style="width: 300px" size="small"
              placeholder="Выберите конечную дату" format="DD.MM.YYYY" value-format="DD.MM.YYYY" clearable
              @change="validateDateEnd"></el-date-picker>
          </el-form-item>

          <el-divider content-position="left" style=" color: #337ecc">Договор</el-divider>
          <el-form-item label-width="170" label="Наименование поставщика">
            <el-input v-model="store.newVendorName" size="small" style="width: 300px">
            </el-input>
          </el-form-item>
          <el-form-item label-width="170" label="Номер счета">
            <el-input v-model="store.newDocu_account" size="small" clearable placeholder="Введите номер счета"
              style="width: 300px">
            </el-input>
          </el-form-item>
          <el-form-item label-width="170" label="Название договора">
            <el-select v-model="store.newDocu_name" size="small" clearable placeholder="Выберите название договора"
              style="width: 300px">
              <el-option label="Договор премий" value="Договор премий"></el-option>
              <el-option label="Договор услуг" value="Договор услуг"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label-width="170" label="Номер договора">
            <el-input v-model="store.newDocu_number" size="small" clearable placeholder="Введите номер договора"
              style="width: 300px">
            </el-input>
          </el-form-item>
          <el-form-item :validate-status="docuDateValidation" :error="docuDateError" label-width="170"
            label="Дата договора">
            <el-date-picker v-model="store.newDocu_date" style="width: 300px" size="small" format="DD.MM.YYYY"
              value-format="DD.MM.YYYY" clearable el-rowrable placeholder="Выберите дату договора"></el-date-picker>
          </el-form-item>
          <el-form-item label-width="170" label="Предмет договора">
            <el-input v-model="store.newDocu_subject" style="width: 300px" clearable :rows="4" size="small"
              type="textarea" placeholder="Введите предмет договора" />
          </el-form-item>
        </div>
        <div class="kuAddMainCol">
          <el-divider content-position="left" style=" color: #337ecc">Наcтройка</el-divider>
          <el-form-item>
            <el-checkbox v-model="store.newTax" label="База премии включает налог" size="small" />
          </el-form-item>
          <el-form-item>
            <el-checkbox v-model="store.newExclude_return" label="Исключать возвраты из расчета" size="small" />
          </el-form-item>
          <el-form-item>
            <el-checkbox v-model="store.newNegative_turnover" label="Отрицательный товарооборот" size="small" />
          </el-form-item>
          <el-form-item label-width="170" label="Тип коммерческого условия">
            <el-select v-model="store.newKu_type" size="small" clearable placeholder="Выберите тип КУ"
              style="width: 300px">
              <el-option label="Ретро-бонус" value="Ретро-бонус"></el-option>
              <el-option label="Услуга" value="Услуга"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label-width="170" label="Способ оплаты премии">
            <el-select v-model="store.newPay_method" size="small" clearable placeholder="Выберите способ оплаты"
              style="width: 300px">
              <el-option label="Оплата" value="Оплата"></el-option>
              <el-option label="Взаимозачет" value="Взаимозачет"></el-option>
            </el-select>
          </el-form-item>
        </div>
      </div>
    </form>
  </el-scrollbar>
</template>

<script setup lang="ts">
import { ref } from "vue";
import dayjs from "dayjs";
import { useKuAddStore } from "~~/stores/kuAddStore";
import type {
  IEntityIdAndName,
  IVendorId,
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

watch(() => store.dataVendorId, (vendors: IVendorId[]) => {
  options2.value = vendors.map(item => ({ label: item.vendor_id, value: item.vendor_id }));
});

const onEntityChange = async () => {
  //для наимен. юр. лица
  store.newEntityName = "";

  if (store.newEntityId && store.newEntityId.length > 0) {
    const selectedEntity = options.value.find(option => option.value === store.newEntityId);
    if (selectedEntity) {
      store.newEntityName = selectedEntity.label;
    }
  }
  //для поставщика
  store.dataVendorId = [];
  store.newVendorName = "";

  store.setFilterValue6('entity_id', store.newEntityId);
  if (store.newEntityId) { // Проверка, что выбрано юр. лицо
    useKuAddStore().fetchAllVendorIdForEntity(); // Выполнить запрос с фильтром по производителям
    console.log('Выполнен запрос на получение данных поставщика по фильтру юр.лица.');
  } else {
    useKuAddStore().setFilterValue6('entity_id', undefined); // Сбросить фильтр
    useKuAddStore().removeFilterExInvoice("vendor_id")
    useKuAddStore().tableDataExInvoiceAll.length = 0
  }
  // useKuAddStore().removeFilterExInvoice("vendor_id")
};

const onVendorChange = async () => {
  store.newVendorName = "";
  if (store.newVendorId && store.newVendorId.length > 0) {
    store.setFilterValue6('vendor_id', store.newVendorId);
    store.getVendorNameFromAPIWithFilter()

    try {
      console.log("поставщик:", store.newVendorId);
      store.setFilterProductInRequirement('vendor_id', store.newVendorId);
      store.setFilterProducer('vendor_id', store.newVendorId);
      store.setFilterBrand('vendor_id', store.newVendorId);
      store.setFilterExInvoice('vendor_id', store.newVendorId);
      store.setFilterCategory('vendor_id', store.newVendorId);
      store.setFilterExInvoice('vendor_id', store.newVendorId);
      await store.fetchCategories();
      await store.getProductFromIncludedWithFilter();
      await store.fetchAllProducersForInclided();
      await store.fetchAllBrandsForIncluded();
      await store.getProductFromExcludedWithFilter();
      await store.getInvoicesFromAPIWithFilter();
    } catch (error) {
      console.error("Ошибка при загрузке данных товаров/производителей/брендов по фильтру поставщика", error);
    }
  } else {
    useKuAddStore().removeFilterExInvoice("vendor_id")
    useKuAddStore().tableDataExInvoiceAll.length = 0
  }


};

// Проверка полей формы
const dateStartValidation = ref<"error" | "success" | "validating" | undefined>('success');
const dateStartError = ref<string | undefined>('');
const dateEndValidation = ref<"error" | "success" | "validating" | undefined>('success');
const dateEndError = ref<string | undefined>('');
  const docuDateValidation = ref<"error" | "success" | "validating" | undefined>('success');
const docuDateError = ref<string | undefined>('');
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
    dateStartError.value = `Мин. разница между датами не менее ${minDiff} дней.`;
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
    dateEndError.value = `Мин. разница между датами не менее ${minDiff} дней.`;
  } else {
    dateEndValidation.value = undefined;
    dateEndError.value = undefined;
  }
};

const validateDocuDate = () => {
  if (!store.newDocu_date) {
    // Если поле не заполнено
    docuDateValidation.value = 'error';
    docuDateError.value = 'Пожалуйста, укажите дату договора.';
  } else {
    docuDateValidation.value = 'success'; // Может быть 'error', 'validating' или undefined
    docuDateError.value = undefined; // Сообщение об ошибке обнуляется
  }
};

watch(() => store.newDocu_date, validateDocuDate);

watch(() => store.newDateStart, validateDateStart);
watch(() => store.newDateEnd, validateDateEnd);

// Функция сброса дат при изменении периода
const resetDatesOnPeriodChange = () => {

  store.newDateStart = "";
  store.newDateEnd = "";
};
// Функция сброса поставщика
const resetVendorOnEntityChange = () => {
  store.newVendorId = "";
};
// Обработчик изменения выбранного периода
watch(() => store.newType, (newValue, oldValue) => {
  if (oldValue !== newValue) {
    resetDatesOnPeriodChange();
  }
});
// Обработчик изменения выбранного юр.лица
watch(() => store.newEntityId, (newValue, oldValue) => {
  if (oldValue !== newValue) {
    resetVendorOnEntityChange();
  }
});


const disableSelectVendorTooltip = computed(() => {
  return !store.newEntityId ? 'Выбор заблокирован. Для доступа сначала выберите юридическое лицо' : '';
});


</script>

<style scoped>
.kuAddMain {
  display: flex;
  width: 100%;
  gap: 100px;
}

.kuAddMainCol {
  display: flex;
  flex-direction: column;


}

.el-form-item {
  margin: 2px;
}

.kuAddLabel {
  margin-right: 10px;
  font-size: 13px;
  color: #1f1f1f;
}
</style>