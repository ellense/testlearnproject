<template>
  <div class="directoryBar">
    <h2>Накладные поставок</h2>
    <div class="directoryBar_filter">
      <el-select v-model="LegalEntity" multiple clearable filterable collapse-tags collapse-tags-tooltip
        :max-collapse-tags="3" placeholder="Фильтр по юридическому лицу" style="width: 400px" @change="changeLegalEntity">
        <el-option v-for="item in LegalEntityList" :key="item" :label="item" :value="item" />
      </el-select>
      <el-input v-model="searchQuery" placeholder="Фильтр по поставщику" style="width: 400px;"></el-input>
      <!-- <el-date-picker
          v-model="dateSelect"
          type="daterange"
          format="DD.MM.YYYY"
          start-placeholder="Начало"
          end-placeholder="Окончание"
          :clearable="true"
          @change="changeDateSelect"
        /> -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useInvoiceStore } from "~~/stores/invoiceStore";
const { legalEntity, vendor } = storeToRefs(useInvoiceStore());

//для поиска
const searchQuery = ref('');
watch(searchQuery, (newValue: string) => {
  useInvoiceStore().performSearch(newValue);
});

// /* Даты */ нужно на беке сделать фильт по периоду

// const dateSelectInit = () => [
//   new Date().setDate(new Date().getDate() - 60),
//   new Date().setDate(new Date().getDate() + 60),
// ]
// const getDateFromStore = (): any[] => {
//   if (
//     !filterValue.value.vacancy_date_from ||
//     !filterValue.value.vacancy_date_to
//   ) {
//     return dateSelectInit()
//   } else {
//     return [
//       new Date(
//         strToDateNumberToDate(filterValue.value.vacancy_date_from)
//       ).toDateString(),
//       new Date(
//         strToDateNumberToDate(filterValue.value.vacancy_date_to)
//       ).toDateString(),
//     ]
//   }
// }
// const dateSelect = ref<any[]>(getDateFromStore())

// const changeDateSelect = () => {
//   if (!dateSelect.value) {
//     useVacanciesStore().removeFilterValue('vacancy_date_from')
//     useVacanciesStore().removeFilterValue('vacancy_date_to')
//     toggleTriggerFilter()
//     return
//   }
//   useVacanciesStore().setFilterValue(
//     'vacancy_date_from',
//     new Date(dateSelect.value[0]).toLocaleDateString()
//   )
//   useVacanciesStore().setFilterValue(
//     'vacancy_date_to',
//     new Date(dateSelect.value[1]).toLocaleDateString()
//   )
//   toggleTriggerFilter()
// }

// onMounted(() => {
//   changeDateSelect()
// })

//для фильтрации
const { filterValue } = storeToRefs(useInvoiceStore())
const triggerFilter = ref<boolean>(true);
const toggleTriggerFilter = () => (triggerFilter.value = !triggerFilter.value);

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
