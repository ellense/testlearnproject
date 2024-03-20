<template>
  <div class="directoryBar">
    <h2>Накладные поставок</h2>
    <div class="directoryBar_filter">
      <el-select v-model="LegalEntity" multiple clearable filterable collapse-tags collapse-tags-tooltip
        :max-collapse-tags="3" placeholder="Фильтр по юридическому лицу"
        style="max-width: 400px; min-width: 100px; width: 300px;" @change="changeLegalEntity" size="small">
        <el-option v-for="item in LegalEntityList" :key="item" :label="item" :value="item" />
      </el-select>
      <el-input v-model="searchQuery" clearable placeholder="Фильтр по поставщику"
        style="max-width: 400px; min-width: 100px; width: 300px;" size="small"></el-input>
      <el-date-picker v-model="dateRange" type="daterange" format="DD.MM.YYYY" start-placeholder="Начало"
        end-placeholder="Окончание" :clearable="true" size="small" @change="changeDateRange" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useInvoiceStore } from "~~/stores/invoiceStore";
import dayjs from 'dayjs';
const { legalEntity, vendor } = storeToRefs(useInvoiceStore());
//для поиска
const searchQuery = ref('');
watch(searchQuery, (newValue: string) => {
  useInvoiceStore().performSearch(newValue);
});

//для фильтрации
const { filterValue } = storeToRefs(useInvoiceStore())
const triggerFilter = ref<boolean>(true);
const toggleTriggerFilter = () => (triggerFilter.value = !triggerFilter.value);

//для фильтрации по дате
const dateRange = ref()

const formatDate = (date: Date) => dayjs(date).format('YYYY-MM-DD');// Функция для форматирования даты в формат "YYYY-MM-DD"

const changeDateRange = (newDateRange: Date[]) => {
  if (newDateRange && Array.isArray(newDateRange) && newDateRange.length === 2) {
    const [startDate, endDate] = newDateRange;
    if (!startDate || !endDate) {
      // Если даты не выбраны (то есть сброшены), сбрасываем фильтр
      useInvoiceStore().removeFilterValue('start_date');
      useInvoiceStore().removeFilterValue('end_date');
    } else {
      // Иначе, форматируем даты и устанавливаем их в фильтр
      const startFormatted = formatDate(startDate);
      const endFormatted = formatDate(endDate);
      useInvoiceStore().setFilterValue('start_date', startFormatted);
      useInvoiceStore().setFilterValue('end_date', endFormatted);
    }
    useInvoiceStore().getInvoicesFromAPIWithFilter(); // Вызовите метод хранилища для загрузки данных с учетом выбранного диапазона дат
  } else {
    // Если даты не выбраны, сбрасываем фильтр
    useInvoiceStore().removeFilterValue('start_date');
    useInvoiceStore().removeFilterValue('end_date');
    useInvoiceStore().getInvoicesFromAPIWithFilter(); // Вызовите метод хранилища для загрузки данных без учета фильтрации по датам
  }
};
//фильтр по юр. лицу
const LegalEntity = ref<string[]>(filterValue.value.entity_id || []);
const LegalEntityList = ref<string[]>(legalEntity.value);

const changeLegalEntity = () => {
  useInvoiceStore().pagination = null;
  useInvoiceStore().setFilterValue('entity_id', LegalEntity.value);
  console.log('shopLegalEntity.value:', LegalEntity.value);

  toggleTriggerFilter();
};

watch(legalEntity, (value) => {
  LegalEntityList.value = value;
});

watch(triggerFilter, () => {
  useInvoiceStore().getInvoicesFromAPIWithFilter();
});

onMounted(() => {
  useInvoiceStore().getLegalEntityFromApi();
});

</script>

<style scoped></style>
