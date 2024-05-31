<template>
  <el-scrollbar height="40vh">
    <el-form :model="store" label-position="left" :rules="rules" status-icon ref="ruleFormRef" :show-message=false
      :hide-required-asterisk=true>
      <div class="kuAddMain">
        <div class="kuAddMainCol">
          <el-divider content-position="left" style=" color: #337ecc">Идентификация</el-divider>
          <el-form-item label-width="130" label="Код компании" prop="kuIdEntityId">
            <el-select v-model="store.kuIdEntityId" size="small" placeholder="Выберите код компании" clearable
              filterable style="width: 300px" @change="onEntityChange" :disabled="isEditButtonDisabled">
              <el-option v-for="item in optionsEntity" :key="item.label" :label="item.value" :value="item.value">
                <span style="float: left;">{{ item.label }}</span>
                <span style="float: right; color: var(--el-text-color-secondary);
                    font-size: 13px;  margin-left: 10px;">{{ item.value }}</span>
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label-width="130" label="Название компании" prop="kuIdEntityName">
            <el-input v-model="store.kuIdEntityName" size="small" style="width: 300px" :disabled="isEditButtonDisabled">
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-checkbox v-model="store.kuIdSubsidiaries" :label="labelNewSubsidiaries" size="small"
              :disabled="store.disableSubsidiaries" :title="disableSelectEntityTooltip" />
          </el-form-item>
          <el-divider content-position="left" style=" color: #337ecc">Описание</el-divider>
          <el-form-item label-width="130" label="Описание">
            <el-input v-model="store.kuIdDescription" size="small" placeholder="Введите описание" clearable
              style="width: 300px" :disabled="isEditButtonDisabled">
            </el-input>
          </el-form-item>
          <el-form-item label-width="130" label="Код клиента" prop="kuIdCustomerId">
            <div>
              <el-select v-model="store.kuIdCustomerId" size="small" placeholder="Выберите клинета" clearable
                filterable style="width: 300px" @change="onCustomerChange"
                :title="disableSelectCustomerTooltip" :disabled="isEditButtonDisabled">
                <el-option v-for="item in optionsCustomer" :key="item.value" :label="item.value" :value="item.value">
                  <span style="float: left;">{{ item.label }}</span>
                <span style="float: right; color: var(--el-text-color-secondary);
                    font-size: 13px;  margin-left: 10px;">{{ item.value }}</span>
                </el-option>
              </el-select>
            </div>
          </el-form-item>
          <el-form-item label-width="130" label="Контракт">
            <el-input v-model="store.kuIdContract" size="small" placeholder="Введите контракт" clearable
              style="width: 300px" :disabled="isEditButtonDisabled">
            </el-input>
          </el-form-item>
        </div>
        <div class="kuAddMainCol">
          <el-divider content-position="left" style=" color: #337ecc">Период действия</el-divider>
          <el-form-item label-width="170" label="Тип периода" prop="kuIdType">
            <el-select v-model="store.kuIdType" size="small" clearable placeholder="Выберите тип периода"
              style="width: 300px" :disabled="isEditButtonDisabled">
              <el-option label="Месяц" value="Месяц"></el-option>
              <el-option label="Квартал" value="Квартал"></el-option>
              <el-option label="Полгода" value="Полгода"></el-option>
              <el-option label="Год" value="Год"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item :validate-status="dateStartValidation" :error="dateStartError" style="margin-bottom: 10px;"
            label-width="170" label="Начальная дата" prop="kuIdDateStart">
            <el-date-picker v-model="store.kuIdDateStart" style="width: 300px" size="small" format="DD.MM.YYYY"
               clearable el-rowrable placeholder="Выберите начальную дату"
              @change="onChangeAndValidateDateStart" :disabled="isEditButtonDisabled"></el-date-picker>
          </el-form-item>
          <el-form-item :validate-status="dateEndValidation" :error="dateEndError" label-width="170"
            label="Конечная дата" prop="kuIdDateEnd">
            <el-date-picker v-model="store.kuIdDateEnd" style="width: 300px" size="small"
              placeholder="Выберите конечную дату" format="DD.MM.YYYY"  clearable
              @change="onChangeAndValidateDateEnd" :disabled="isEditButtonDisabled"></el-date-picker>
          </el-form-item>
          <el-divider content-position="left" style=" color: #337ecc">Оплата</el-divider>
          <el-form-item label-width="170" label="Общая сумма премии" prop="kuIdDocu_account">
            <el-input v-model="store.kuIdPay_sum" size="small" clearable placeholder="Введите сумму премии"
              style="width: 300px" :disabled="isEditButtonDisabled">
            </el-input>
          </el-form-item>
          <el-form-item label-width="170" label="Способ оплаты премии" prop="kuIdPay_method">
            <el-select v-model="store.kuIdPay_method" size="small" clearable placeholder="Выберите способ оплаты"
              style="width: 300px" :disabled="isEditButtonDisabled">
              <el-option label="Оплата" value="Оплата"></el-option>
              <el-option label="Взаимозачет" value="Взаимозачет"></el-option>
            </el-select>
          </el-form-item>
        </div>
        <div class="kuAddMainCol">
          <el-divider content-position="left" style=" color: #337ecc">Договор</el-divider>
          <el-form-item label-width="170" label="Наименование клиента" prop="kuIdCustomerName">
            <el-input v-model="store.kuIdCustomerName" size="small" style="width: 300px" :disabled="isEditButtonDisabled">
            </el-input>
          </el-form-item>
          <el-form-item label-width="170" label="Номер договора" prop="kuIdDocu_number">
            <el-input v-model="store.kuIdDocu_number" size="small" clearable placeholder="Введите номер договора"
              style="width: 300px" :disabled="isEditButtonDisabled">
            </el-input>
          </el-form-item>
          <el-form-item label-width="170" label="Дата договора" prop="kuIdDocu_date"
            :validate-status="docuDateValidation">
            <el-date-picker v-model="store.kuIdDocu_date" style="width: 300px" size="small" format="DD.MM.YYYY"
               clearable el-rowrable placeholder="Выберите дату договора" :disabled="isEditButtonDisabled"></el-date-picker>
          </el-form-item>
          <el-form-item label-width="170" label="Предмет договора">
            <el-input v-model="store.kuIdDocu_subject" style="width: 300px" clearable :rows="4" size="small"
              type="textarea" placeholder="Введите предмет договора" :disabled="isEditButtonDisabled" />
          </el-form-item>
        </div>
        
      </div>
    </el-form>
  </el-scrollbar>
</template>

<script setup lang="ts">
import { reactive, ref } from 'vue'
import dayjs from "dayjs";
import { useKuCAddStore } from "~~/stores/kuCAddStore";
import { useKuCIdStore } from "~~/stores/kuCIdStore";
import type { FormInstance, FormRules } from 'element-plus'
import type { ICustomerIdAndName } from '~/utils/types/customerTypes';
import type { IEntityInKu } from '~/utils/types/entityTypes';
import type { IKuCIdStore } from '~/utils/types/storesTypes';

const store = useKuCIdStore();
const store2 = useKuCAddStore();

const isEditButtonDisabled = computed(() => {
  return store.kuIdStatus !== 'Создано';
});

const ruleFormRef = ref<FormInstance | null>(null);
onMounted(() => {
  store2.setRuleFormRef(ruleFormRef.value);
});
const rules = reactive<FormRules<IKuCIdStore>>({

  kuIdEntityId: [
    {
      required: true,
      trigger: 'change',
    },
  ],
  kuIdEntityName: [
    {
      required: true,
      trigger: 'change',
    },
  ],
  kuIdCustomerId: [
    {
      required: true,
      trigger: 'change',
    },
  ],
  kuIdCustomerName: [
    { required: true, trigger: 'change' },
  ],
  kuIdType: [
    { required: true, trigger: 'change' },
  ],
  kuIdDateEnd: [
    {
      required: true,
      trigger: 'change',
    },
  ],
  kuIdDateStart: [
    {
      required: true,
      trigger: 'change',
    },
  ],
  kuIdDocu_date: [
    {
      required: true,
      trigger: 'change',
    },
  ],
  kuIdPay_method: [
    {
      required: true,
      trigger: 'change',
    },
  ],
  kuIdDocu_account: [
    {
      required: true,
      trigger: 'change',
    },
  ],
  kuIdPay_sum: [
    {
      required: true,
      trigger: 'change',
    },
  ],
  kuIdDocu_number: [
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

//вывод данных юридического лица
const optionsEntity = ref<Array<{ label: string; value: string }>>([]);
watch(
  () => store2.dataEntity,
  (dataEntity: IEntityInKu[]) => {
    optionsEntity.value = dataEntity.map((item) => ({
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
      merge_id: "",
    });
  } catch (error) {
    console.error("Ошибка при загрузке данных юр. лица", error);
  }
});

//вывод данных клинета
const optionsCustomer = ref<Array<{ label: string; value: string }>>([]);
watch(() => store2.dataCustomerId, (customers: ICustomerIdAndName[]) => {
  optionsCustomer.value = customers.map(item => ({ label: item.name, value: item.customer_id }));
});

const onEntityChange = async () => {
  //для галочки
  const entity = store2.dataEntity.find(item => item.entity_id === store.kuIdEntityId);
  if (entity) {
    if (entity.merge_id) {
      store.kuIdSubsidiaries = true;
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
  store.kuIdEntityName = "";

  if (store.kuIdEntityId && store.kuIdEntityId.length > 0) {
    const selectedEntity = optionsEntity.value.find(option => option.value === store.kuIdEntityId);
    if (selectedEntity) {
      store.kuIdEntityName = selectedEntity.label;
    }
  }

  //для клиента
  store2.dataCustomerId = [];
  store.kuIdCustomerName = "";

  store2.setFilterCustomer('entity_id', store.kuIdEntityId);
  if (store.kuIdEntityId) { // Проверка, что выбрано юр. лицо
    store2.fetchAllCustomerIdForEntity(); // Выполнить запрос с фильтром по производителям
    console.log('Выполнен запрос на получение данных клиента по фильтру юр.лица.');
  } else {
    store2.removeFilterCustomer("entity_id")
    store.disableSubsidiaries = false;
    store.kuIdSubsidiaries = false;
  }
};

const labelNewSubsidiaries = computed(() => {
  const entity = store2.dataEntity.find(item => item.entity_id === store.kuIdEntityId);

  if (entity && entity.merge_id) {
    return `Включить дочернии компании: ${entity.merge_id}`;
  }
  return 'Включить дочернии компании';
});

const onCustomerChange = async () => {
  store.kuIdCustomerName = "";
  if (store.kuIdCustomerId && store.kuIdCustomerId.length > 0) {
    store2.setFilterCustomer('customer_id', store.kuIdCustomerId);
    store2.getCustomerNameFromAPIWithFilter()
    
  } else {
    store2.setFilterCustomer("entity_id", store.kuIdEntityId)
    await store2.fetchAllCustomerIdForEntity();
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
  const startDate = dayjs(store.kuIdDateStart, 'DD.MM.YYYY');
  const endDate = dayjs(store.kuIdDateEnd, 'DD.MM.YYYY');

  // Проверка на минимальную разницу в зависимости от выбранного периода
  const minDiff = periods[store.kuIdType];
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
  const startDate = dayjs(store.kuIdDateStart, 'DD.MM.YYYY');
  const endDate = dayjs(store.kuIdDateEnd, 'DD.MM.YYYY');
  // Проверка на минимальную разницу в зависимости от выбранного периода
  const minDiff = periods[store.kuIdType];
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
  if (!store.kuIdDocu_date) {
    // Если поле не заполнено
    docuDateValidation.value = 'error';
  } else {
    docuDateValidation.value = 'success'; // Может быть 'error', 'validating' или undefined
  }
};

watch(() => store.kuIdDocu_date, validateDocuDate);
// Функция сброса дат при изменении периода
const resetDatesOnPeriodChange = () => {

  store.kuIdDateStart = "";
  store.kuIdDateEnd = "";
};
// Функция сброса клиента
const resetCustomerOnEntityChange = () => {
  store.kuIdCustomerId = "";
};
// Обработчик изменения выбранного периода
watch(() => store.kuIdType, (kuIdValue, oldValue) => {
  if (oldValue !== kuIdValue) {
    resetDatesOnPeriodChange();
  }
});
// Обработчик изменения выбранного юр.лица
watch(() => store.kuIdEntityId, (kuIdValue, oldValue) => {
  if (oldValue !== kuIdValue) {
    resetCustomerOnEntityChange();
  }
});


const disableSelectCustomerTooltip = computed(() => {
  return !store.kuIdEntityId ? 'Выбор заблокирован. Для доступа сначала выберите юридическое лицо' : '';
});
const disableSelectEntityTooltip = computed(() => {
  return store.disableSubsidiaries ? 'У выбранной компании нет дочерних компаний' : '';
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
  margin: 0 !important;
}

.vendorPopper {
  width: 520px !important;
}
</style>