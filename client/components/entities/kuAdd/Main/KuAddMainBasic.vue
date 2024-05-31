<template>
  <el-scrollbar height="45vh">
    <el-form :model="kuMain" label-position="left" :rules="rules" status-icon ref="ruleFormRef" :show-message=false
      :hide-required-asterisk=true>
      <div class="kuAddMain">
        <div class="kuAddMainCol">
          <el-divider content-position="left" style=" color: #337ecc">Идентификация</el-divider>
          <el-form-item label-width="130"  label="Код компании" prop="newEntityId">
            <el-select v-model="kuMain.newEntityId" size="small" placeholder="Выберите код компании" clearable
              filterable style="width: 300px" @change="onEntityChange">
              <el-option v-for="item in options" :key="item.label" :label="item.value" :value="item.value">
                <span style="float: left;">{{ item.value }}</span>
                <span style="float: right; color: var(--el-text-color-secondary);
                    font-size: 13px;  margin-left: 10px;">{{ item.label }}</span>
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label-width="130" label="Название компании" prop="newEntityName">
            <el-input v-model="kuMain.newEntityName" size="small" style="width: 300px">
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-checkbox v-model="kuMain.newSubsidiaries" :label="labelNewSubsidiaries" size="small"
              :disabled="store.disableSubsidiaries" :title="disableSelectEntityTooltip" />
          </el-form-item>
          <el-divider content-position="left" style=" color: #337ecc">Описание</el-divider>
          <el-form-item label-width="130" label="Описание">
            <el-input v-model="kuMain.newDescription" size="small" placeholder="Введите описание" clearable
              style="width: 300px">
            </el-input>
          </el-form-item>
          <el-form-item label-width="130" label="Код поставщика" prop="newVendorId">
            <div>
              <el-select v-model="kuMain.newVendorId" size="small" placeholder="Выберите поставщика" clearable
                filterable  style="width: 300px" @change="onVendorChange" :disabled="!kuMain.newEntityId"
                :title="disableSelectVendorTooltip">
                <el-option v-for="item in options2" :key="item.value" :label="item.value" :value="item.value">
                  <span style="float: left;">{{ item.value }}</span>
                  <span style="float: right; color: var(--el-text-color-secondary);
                    font-size: 13px;  margin-left: 10px;">{{ item.label }}</span>
                </el-option>
              </el-select>
            </div>
          </el-form-item>
          <el-form-item label-width="130" label="Контракт">
            <el-input v-model="kuMain.newContract" size="small" placeholder="Введите контракт" clearable
              style="width: 300px">
            </el-input>
          </el-form-item>
          <el-form-item label-width="130" label="Тип товаров">
            <el-select v-model="kuMain.newProduct_type" size="small" clearable placeholder="Выберите тип товаров"
              style="width: 300px">
              <el-option label="Продовольственные" value="Продовольственные"></el-option>
              <el-option label="Непродовольственные" value="Непродовольственные"></el-option>
            </el-select>
          </el-form-item>
        </div>
        <div class="kuAddMainCol">
          <el-divider content-position="left" style=" color: #337ecc">Договор</el-divider>
          <el-form-item label-width="170" label="Наименование поставщика" prop="newVendorName">
            <el-input v-model="kuMain.newVendorName" size="small" style="width: 300px">
            </el-input>
          </el-form-item>
          <el-form-item label-width="170" label="Код клиента">
            <el-input v-model="kuMain.newDocu_account" size="small" clearable placeholder="Введите номер счета"
              style="width: 300px">
            </el-input>
          </el-form-item>

          <el-form-item label-width="170" label="Номер договора" prop="newDocu_number">
            <el-input v-model="kuMain.newDocu_number" size="small" clearable placeholder="Введите номер договора"
              style="width: 300px">
            </el-input>
          </el-form-item>
          <el-form-item label-width="170" label="Дата договора" prop="newDocu_date"
            :validate-status="docuDateValidation">
            <el-date-picker v-model="kuMain.newDocu_date" style="width: 300px" size="small" format="DD.MM.YYYY"
              clearable el-rowrable placeholder="Выберите дату договора"></el-date-picker>
          </el-form-item>
          <el-form-item label-width="170" label="Предмет договора">
            <el-input v-model="kuMain.newDocu_subject" style="width: 300px" clearable :rows="4" size="small"
              type="textarea" placeholder="Введите предмет договора" />
          </el-form-item>
        </div>
        <div class="kuAddMainCol">
          <el-divider content-position="left" style=" color: #337ecc">Период действия</el-divider>
          <el-form-item label-width="170" label="Тип периода" prop="newType">
            <el-select v-model="kuMain.newType" size="small" clearable placeholder="Выберите тип периода"
              style="width: 300px">
              <el-option label="Месяц" value="Месяц"></el-option>
              <el-option label="Квартал" value="Квартал"></el-option>
              <el-option label="Полгода" value="Полгода"></el-option>
              <el-option label="Год" value="Год"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item :validate-status="dateStartValidation" :error="dateStartError" style="margin-bottom: 10px;"
            label-width="170" label="Начальная дата" prop="newDateStart">
            <el-date-picker v-model="kuMain.newDateStart" style="width: 300px" size="small" format="DD.MM.YYYY"
              clearable el-rowrable placeholder="Выберите начальную дату"
              @change="onChangeAndValidateDateStart"></el-date-picker>
          </el-form-item>
          <el-form-item :validate-status="dateEndValidation" :error="dateEndError" label-width="170"
            label="Конечная дата" prop="newDateEnd">
            <el-date-picker v-model="kuMain.newDateEnd" style="width: 300px" size="small"
              placeholder="Выберите конечную дату" format="DD.MM.YYYY" clearable
              @change="onChangeAndValidateDateEnd"></el-date-picker>
          </el-form-item>
          <el-divider content-position="left" style=" color: #337ecc">Наcтройка</el-divider>
          <el-form-item>
            <el-checkbox v-model="kuMain.newTax" label="База премии включает налог" size="small" />
          </el-form-item>
          <el-form-item>
            <el-checkbox v-model="kuMain.newExclude_return" label="Исключать возвраты из расчета" size="small" />
          </el-form-item>
          <el-form-item>
            <el-checkbox v-model="kuMain.newNegative_turnover" label="Отрицательный товарооборот" size="small" />
          </el-form-item>
          <el-form-item label-width="170" label="Способ оплаты премии" prop="newPay_method">
            <el-select v-model="kuMain.newPay_method" size="small" clearable placeholder="Выберите способ оплаты"
              style="width: 300px">
              <el-option label="Оплата" value="Оплата"></el-option>
              <el-option label="Взаимозачет" value="Взаимозачет"></el-option>
            </el-select>
          </el-form-item>
        </div>
      </div>
    </el-form>
  </el-scrollbar>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import dayjs from "dayjs";
import { useKuAddStore } from "~~/stores/kuAddStore";
import type { FormInstance, FormRules } from 'element-plus'
import type { IEntityInKu } from '~/utils/types/entityTypes';
import type { IKuAddMain } from '~/utils/types/storesTypes';
import type { IVendorIdAndName } from '~/utils/types/vendorTypes';
const store = useKuAddStore();
const kuMain = store.kuAddMain
const ruleFormRef = ref<FormInstance | null>(null);
onMounted(() => {
  store.setRuleFormRef(ruleFormRef.value);
});
const rules = reactive<FormRules<IKuAddMain>>({

  newEntityId: [
    {
      required: true,
      trigger: 'change',
    },
  ],
  newEntityName: [
    {
      required: true,
      trigger: 'change',
    },
  ],
  newVendorId: [
    {
      required: true,
      trigger: 'change',
    },
  ],
  newVendorName: [
    { required: true, trigger: 'change' },
  ],

  newType: [
    { required: true, trigger: 'change' },
  ],
  newDateEnd: [
    {

      required: true,
      trigger: 'change',
    },
  ],
  newDateStart: [
    {

      required: true,
      trigger: 'change',
    },
  ],
  newDocu_date: [
    {

      required: true,
      trigger: 'change',
    },
  ],
  newPay_method: [
    {
      required: true,
      trigger: 'change',
    },
  ],
  newDocu_number: [
    {
      required: true,
      trigger: 'change',
    },
  ],

})

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log('submit!')
      ElMessage({
        message: 'все верно.',
        duration: 5000,
        type: 'success',
      })
    } else {
      console.log('error submit!', fields)
      ElMessage.error('ошибка');
    }
  })
}

const options = ref<Array<{ label: string; value: string }>>([]);

watch(
  () => store.dataEntity,
  (dataEntity: IEntityInKu[]) => {
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
      merge_id: "",
    });
  } catch (error) {
    console.error("Ошибка при загрузке данных юр. лица", error);
  }
});

//вывод данных поставщика

const options2 = ref<Array<{ label: string; value: string }>>([]);

watch(() => store.dataVendorId, (vendors: IVendorIdAndName[]) => {
  options2.value = vendors.map(item => ({ label: item.name, value: item.vendor_id }));
});

const onEntityChange = async () => {
  //для галочки
  const entity = store.dataEntity.find(item => item.entity_id === kuMain.newEntityId);
  if (entity) {
    if (entity.merge_id) {
      kuMain.newSubsidiaries = true;
      console.log(`merge_id для выбранного юр. лица: ${entity.merge_id}`);
      store.disableSubsidiaries = false;
    } else {
      console.log('У выбранного юр. лица отсутствует merge_id');
      store.disableSubsidiaries = true;
    }
  } else {
    console.log('Выбранное юр. лицо не найдено в данных');
  }

  //для наимен. юр. лица
  kuMain.newEntityName = "";
  kuMain.newDocu_account = "";


  if (kuMain.newEntityId && kuMain.newEntityId.length > 0) {
    const selectedEntity = options.value.find(option => option.value === kuMain.newEntityId);
    if (selectedEntity) {
      kuMain.newEntityName = selectedEntity.label;
    }
  }

  //для поставщика
  store.dataVendorId = [];
  kuMain.newVendorName = "";

  store.setFilterVendor('entity_id', kuMain.newEntityId);
  if (kuMain.newEntityId) { // Проверка, что выбрано юр. лицо
    store.fetchAllVendorIdForEntity(); // Выполнить запрос с фильтром по производителям
    console.log('Выполнен запрос на получение данных поставщика по фильтру юр.лица.');
  } else {
    store.removeFilterVendor("entity_id")
    store.disableSubsidiaries = false;
    kuMain.newSubsidiaries = false;
    store.tableDataExInvoiceAll.length = 0
  }
};

const labelNewSubsidiaries = computed(() => {
  const entity = store.dataEntity.find(item => item.entity_id === kuMain.newEntityId);

  if (entity && entity.merge_id) {
    return `Включить дочернии компании: ${entity.merge_id}`;
  }
  return 'Включить дочернии компании';
});

const onVendorChange = async () => {
  kuMain.newVendorName = "";
  kuMain.newVendorNameExInvoice = "";
  kuMain.newDocu_account = "";
  if (kuMain.newVendorId && kuMain.newVendorId.length > 0) {
    store.setFilterVendor('vendor_id', kuMain.newVendorId);
    store.getVendorNameFromAPIWithFilter()
    store.getCustomerCodeFromAPIWithFilter(kuMain.newVendorId) //получение связанного клиента через dirparty
    kuMain.newVendorIdExInvoice = kuMain.newVendorId

    try {
      console.log("поставщик:", kuMain.newVendorId);
      store.setFilterProductInRequirement('vendor_id', kuMain.newVendorId);
      store.setFilterProducer('vendor_id', kuMain.newVendorId);
      store.setFilterBrand('vendor_id', kuMain.newVendorId);
      store.setFilterCategory('vendor_id', kuMain.newVendorId);
      store.setFilterExInvoice('vendor_id', kuMain.newVendorId);
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
    store.removeFilterExInvoice("vendor_id")
    store.tableDataExInvoiceAll.length = 0
  }
};

// Проверка полей формы
const dateStartValidation = ref<"error" | "success" | "validating" | undefined>('success');
const dateStartError = ref<string | undefined>('');
const dateEndValidation = ref<"error" | "success" | "validating" | undefined>('success');
const dateEndError = ref<string | undefined>('');
const docuDateValidation = ref<"error" | "success" | "validating" | undefined>('success');

// Периоды и их соответствующие минимальные разницы в днях
const periods: Record<string, number> = {
  'Месяц': 30,
  'Квартал': 90,
  'Полгода': 180,
  'Год': 365
};

// Функция проверки даты начала
const onChangeAndValidateDateStart = async () => {
  store.setFilterExInvoice('start_date', dayjs(kuMain.newDateStart).format("YYYY-MM-DD"));
  await store.getInvoicesFromAPIWithFilter();
  const startDate = dayjs(kuMain.newDateStart, 'DD.MM.YYYY');
  const endDate = dayjs(kuMain.newDateEnd, 'DD.MM.YYYY');

  // Проверка на минимальную разницу в зависимости от выбранного периода
  const minDiff = periods[kuMain.newType];
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
const onChangeAndValidateDateEnd = async () => {
  store.setFilterExInvoice('end_date', dayjs(kuMain.newDateEnd).format("YYYY-MM-DD"));
  await store.getInvoicesFromAPIWithFilter();
  const startDate = dayjs(kuMain.newDateStart, 'DD.MM.YYYY');
  const endDate = dayjs(kuMain.newDateEnd, 'DD.MM.YYYY');
  // Проверка на минимальную разницу в зависимости от выбранного периода
  const minDiff = periods[kuMain.newType];
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
  if (!kuMain.newDocu_date) {
    // Если поле не заполнено
    docuDateValidation.value = 'error';
  } else {
    docuDateValidation.value = 'success';
  }
};

watch(() => kuMain.newDocu_date, validateDocuDate);
// Функция сброса дат при изменении периода
const resetDatesOnPeriodChange = () => {

  kuMain.newDateStart = "";
  kuMain.newDateEnd = "";
};
// Функция сброса поставщика
const resetVendorOnEntityChange = () => {
  kuMain.newVendorId = "";
};
// Обработчик изменения выбранного периода
watch(() => kuMain.newType, (newValue, oldValue) => {
  if (oldValue !== newValue) {
    resetDatesOnPeriodChange();
  }
});
// Обработчик изменения выбранного юр.лица
watch(() => kuMain.newEntityId, (newValue, oldValue) => {
  if (oldValue !== newValue) {
    resetVendorOnEntityChange();
  }
});


const disableSelectVendorTooltip = computed(() => {
  return !kuMain.newEntityId ? 'Выбор заблокирован. Для доступа сначала выберите юридическое лицо' : '';
});
const disableSelectEntityTooltip = computed(() => {
  return store.disableSubsidiaries ? 'У выбранной компании нет дочерних компаний' : '';
});

const filterMethod = (query: string, item: { label: string }) => { //функция для фильтрации в локапе по наименованию (не работала на момент написания)
  return item.label.toLowerCase().includes(query.toLowerCase())
}
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
  margin: 0 !important;
}

.vendorPopper {
  width: 520px !important;
}
</style>