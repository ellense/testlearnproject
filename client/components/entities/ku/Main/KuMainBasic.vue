<template>
  <el-scrollbar height="45vh">
    <el-form label-position="left">
      <div class="kuAddMain">
        <div class="kuAddMainCol">
          <el-divider content-position="left" style=" color: #337ecc">Идентификация</el-divider>
          <el-form-item label-width="130" label="Код компании">
            <el-select v-model="store.kuIdEntityId" size="small" clearable filterable style="width: 300px"
              @change="onEntityChange" :disabled="isEditButtonDisabled">
              <el-option v-for="item in options" :key="item.value" :label="item.value" :value="item.value">
                <span style="float: left;">{{ item.value }}</span>
                  <span style="float: right; color: var(--el-text-color-secondary);
                    font-size: 13px;  margin-left: 10px;">{{ item.label }}</span>
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item label-width="130" label="Название компании">
            <el-input v-model="store.kuIdEntityName" size="small" style="width: 300px" :disabled="isEditButtonDisabled">
            </el-input>
          </el-form-item>
          <el-form-item>
            <el-checkbox v-model="store.kuIdSubsidiaries" size="small" :label="labelNewSubsidiaries"
              :disabled="isEditButtonDisabled" />
          </el-form-item>
          <el-divider content-position="left" style=" color: #337ecc">Описание</el-divider>
          <el-form-item label-width="130" label="Описание">
            <el-input v-model="store.kuIdDescription" size="small" style="width: 300px"
              :disabled="isEditButtonDisabled">
            </el-input>
          </el-form-item>
          <el-form-item label-width="130" label="Код поставщика">
            <div>
              <el-select v-model="store.kuIdVendorId" size="small" placeholder="Выберите поставщика" clearable
                filterable style="width: 300px" @change="onVendorChange" :disabled="isEditButtonDisabled"
                :title="disableSelectVendorTooltip">
                <el-option v-for="item in options2" :key="item.value" :label="item.value" :value="item.value">
                  <span style="float: left;">{{ item.value }}</span>
                  <span style="float: right; color: var(--el-text-color-secondary);
                    font-size: 13px;  margin-left: 10px;">{{ item.label }}</span>
                </el-option>
              </el-select>
            </div>
          </el-form-item>
          <el-form-item label-width="130" label="Статус премии">
            <el-input v-model="store.kuIdStatus" size="small" style="width: 300px" :disabled="isEditButtonDisabled">
            </el-input>
          </el-form-item>
          <el-form-item label-width="130" label="Контракт">
            <el-input v-model="store.kuIdContract" size="small" style="width: 300px" :disabled="isEditButtonDisabled">
            </el-input>
          </el-form-item>
          <el-form-item label-width="130" label="Тип товаров">
            <el-select v-model="store.kuIdProduct_type" size="small" clearable style="width: 300px"
              :disabled="isEditButtonDisabled" placeholder=''>
              <el-option label="Продовольственные" value="Продовольственные"></el-option>
              <el-option label="Непродовольственные" value="Непродовольственные"></el-option>
            </el-select>
          </el-form-item>
        </div>
        <div class="kuAddMainCol">

          <el-divider content-position="left" style=" color: #337ecc">Договор</el-divider>
          <el-form-item label-width="170" label="Наименование поставщика">
            <el-input v-model="store.kuIdVendorName" size="small" style="width: 300px" :disabled="isEditButtonDisabled">
            </el-input>
          </el-form-item>
          <el-form-item label-width="170" label="Номер счета">
            <el-input v-model="store.kuIdDocu_account" size="small" style="width: 300px"
              :disabled="isEditButtonDisabled">
            </el-input>
          </el-form-item>
          <el-form-item label-width="170" label="Название договора">
            <el-select v-model="store.kuIdDocu_name" size="small" clearable style="width: 300px"
              :disabled="isEditButtonDisabled" placeholder="">
              <el-option label="Договор премий" value="Договор премий"></el-option>
              <el-option label="Договор услуг" value="Договор услуг"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label-width="170" label="Номер договора">
            <el-input v-model="store.kuIdDocu_number" size="small" style="width: 300px"
              :disabled="isEditButtonDisabled">
            </el-input>
          </el-form-item>
          <el-form-item label-width="170" label="Дата договора">
            <el-date-picker v-model="store.kuIdDocu_date" style="width: 300px" size="small" format="DD.MM.YYYY"
              clearable :disabled="isEditButtonDisabled"></el-date-picker>
          </el-form-item>
          <el-form-item label-width="170" label="Предмет договора">
            <el-input v-model="store.kuIdDocu_subject" style="width: 300px" :rows="4" size="small" type="textarea"
              :disabled="isEditButtonDisabled" />
          </el-form-item>
        </div>
        <div class="kuAddMainCol">
          <el-divider content-position="left" style=" color: #337ecc">Период действия</el-divider>
          <el-form-item label-width="170" label="Тип периода">
            <el-select v-model="store.kuIdType" size="small" clearable style="width: 300px"
              :disabled="isEditButtonDisabled" placeholder=''>
              <el-option label="Месяц" value="Месяц"></el-option>
              <el-option label="Квартал" value="Квартал"></el-option>
              <el-option label="Полгода" value="Полгода"></el-option>
              <el-option label="Год" value="Год"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item :validate-status="dateStartValidation" :error="dateStartError" style="margin-bottom: 10px;"
            label-width="170" label="Начальная дата">
            <el-date-picker v-model="store.kuIdDateStart" style="width: 300px" size="small" format="DD.MM.YYYY"
              clearable el-rowrable @change="validateDateStart" :disabled="isEditButtonDisabled"></el-date-picker>
          </el-form-item>
          <el-form-item :validate-status="dateEndValidation" :error="dateEndError" label-width="170"
            label="Конечная дата">
            <el-date-picker v-model="store.kuIdDateEnd" style="width: 300px" size="small" format="DD.MM.YYYY" clearable
              @change="validateDateEnd" :disabled="isEditButtonDisabled"></el-date-picker>
          </el-form-item>
          <el-divider content-position="left" style=" color: #337ecc">Наcтройка</el-divider>
          <el-form-item>
            <el-checkbox v-model="store.kuIdTax" label="База премии включает налог" size="small"
              :disabled="isEditButtonDisabled" />
          </el-form-item>
          <el-form-item>
            <el-checkbox v-model="store.kuIdExclude_return" label="Исключать возвраты из расчета" size="small"
              :disabled="isEditButtonDisabled" />
          </el-form-item>
          <el-form-item>
            <el-checkbox v-model="store.kuIdNegative_turnover" label="Отрицательный товарооборот" size="small"
              :disabled="isEditButtonDisabled" />
          </el-form-item>
          <el-form-item label-width="170" label="Тип коммерческого условия">
            <el-select v-model="store.kuIdKu_type" size="small" clearable style="width: 300px"
              :disabled="isEditButtonDisabled" placeholder="">
              <el-option label="Ретро-бонус" value="Ретро-бонус"></el-option>
              <el-option label="Услуга" value="Услуга"></el-option>
            </el-select>
          </el-form-item>
          <el-form-item label-width="170" label="Способ оплаты премии">
            <el-select v-model="store.kuIdPay_method" size="small" clearable style="width: 300px"
              :disabled="isEditButtonDisabled" placeholder="">
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
import { ref } from "vue";
import dayjs from "dayjs";
import { useKuAddStore } from "~~/stores/kuAddStore";
import { useKuIdStore } from "~~/stores/kuIdStore";
import type {
  IEntityInKu,
  IVendorId,
  IVendorIdAndName,
} from "~/utils/types/directoryTypes";

const store = useKuIdStore();
const store2 = useKuAddStore();
const isEditButtonDisabled = computed(() => {
  return store.kuIdStatus !== 'Создано';
});


//вывод данных юридического лица
const options = ref<Array<{ label: string; value: string }>>([]);
watch(
  () => store2.dataEntity,
  (dataEntity: IEntityInKu[]) => {
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
      merge_id: "",
    });
  } catch (error) {
    console.error("Ошибка при загрузке данных юр. лица", error);
  }
});

//вывод данных поставщика

const options2 = ref<Array<{ label: string; value: string }>>([]);
watch(() => store2.dataVendorId, (vendors: IVendorIdAndName[]) => {
  options2.value = vendors.map(item => ({ label: item.name, value: item.vendor_id }));
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
  store.kuIdSubsidiaries = true;
  if (store.kuIdEntityId && store.kuIdEntityId.length > 0) {
    const selectedEntity = options.value.find(option => option.value === store.kuIdEntityId);
    if (selectedEntity) {
      store.kuIdEntityName = selectedEntity.label;
    }
  }
  //для поставщика
  store2.dataVendorId = [];
  store.kuIdVendorId = "";
  store.kuIdVendorName = "";
  store2.setFilterVendor('entity_id', store.kuIdEntityId);
  if (store.kuIdEntityId) { // Проверка, что выбрана торговая маркка
    useKuAddStore().fetchAllVendorIdForEntity(); // Выполнить запрос с фильтром по производителям
    console.log('Выполнен запрос на получение данных поставщика по фильтру юр.лица.');
  } else {
    store2.removeFilterVendor("entity_id")
    store2.tableDataExInvoiceAll.length = 0
  }
};
const labelNewSubsidiaries = computed(() => {
  const entity = store2.dataEntity.find(item => item.entity_id === store.kuIdEntityId);

  if (entity && entity.merge_id) {
    return `Включить дочернии компании: ${entity.merge_id}`;
  }
  return 'Включить дочернии компании';
});
const onVendorChange = async () => {
  store.kuIdVendorName = "";
  if (store.kuIdVendorId && store.kuIdVendorId.length > 0) {
    store2.setFilterVendor('vendor_id', store.kuIdVendorId);
    store2.getVendorNameFromAPIWithFilter()
    try {
      console.log("поставщик:", store.kuIdVendorId);
      store2.setFilterProductInRequirement('vendor_id', store.kuIdVendorId);
      store2.setFilterProducer('vendor_id', store.kuIdVendorId);
      store2.setFilterBrand('vendor_id', store.kuIdVendorId);
      store2.setFilterExInvoice('vendor_id', store.kuIdVendorId);
      store2.setFilterCategory('vendor_id', store.kuIdVendorId);
      store2.setFilterExInvoice('vendor_id', store.kuIdVendorId);
      store2.fetchCategories();
      store2.getProductFromIncludedWithFilter();
      store2.fetchAllProducersForInclided();
      store2.fetchAllBrandsForIncluded();
      store2.getProductFromExcludedWithFilter();
      store2.getInvoicesFromAPIWithFilter();
    } catch (error) {
      console.error("Ошибка при загрузке данных товаров/производителей/брендов по фильтру поставщика", error);
    }
  } else {
    useKuAddStore().removeFilterExInvoice("vendor_id")
    useKuAddStore().tableDataExInvoiceAll.length = 0
  }
};
const onTypeChange = async () => {

}

// Проверка полей формы
const dateStartValidation = ref<"error" | "success" | "validating" | undefined>('success');
const dateStartError = ref<string | undefined>('');
const dateEndValidation = ref<"error" | "success" | "validating" | undefined>('success');
const dateEndError = ref<string | undefined>('');

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
    dateStartError.value = `Мин. разница между датами не менее ${minDiff} дней.`;
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
    dateEndError.value = `Мин. разница между датами не менее ${minDiff} дней.`;
  } else {
    dateEndValidation.value = undefined;
    dateEndError.value = undefined;
  }
};


watch(() => store.kuIdDateStart, validateDateStart);
watch(() => store.kuIdDateEnd, validateDateEnd);



const disableSelectVendorTooltip = computed(() => {
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
</style>