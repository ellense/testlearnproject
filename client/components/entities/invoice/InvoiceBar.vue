<template>
  <div class="directoryBar">
    <h2>Накладные поставок</h2>
    <div class="directoryBar_filter">
      <el-select v-model="LegalEntity" multiple clearable filterable collapse-tags collapse-tags-tooltip
        :max-collapse-tags="3" placeholder="Фильтр по юридическому лицу" style="max-width: 400px; min-width: 100px; width: 300px;" @change="changeLegalEntity" size="small">
        <el-option v-for="item in LegalEntityList" :key="item" :label="item" :value="item" />
      </el-select>
      <el-input v-model="searchQuery" placeholder="Фильтр по поставщику" style="max-width: 400px; min-width: 100px; width: 300px;" size="small"></el-input>
      <!-- <el-date-picker
          v-model="dateRange"
          type="daterange"
          format="DD.MM.YYYY"
          start-placeholder="Начало"
          end-placeholder="Окончание"
          :clearable="true"
          @change="changeDateRange"
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

//для фильтрации
const { filterValue } = storeToRefs(useInvoiceStore())
const triggerFilter = ref<boolean>(true);
const toggleTriggerFilter = () => (triggerFilter.value = !triggerFilter.value);

// /* Даты */ нужно на беке сделать фильт по периоду

// const dateRange = ref<[Date, Date]>([new Date(),new Date() ]);

// const changeDateRange = () => {
//   if (dateRange.value[0] && dateRange.value[1]) {
//     // Преобразование объектов Date в строки с правильным форматом
//     const startDateStr = dateRange.value[0].toISOString();
//     const endDateStr = dateRange.value[1].toISOString();

//     useInvoiceStore().setFilterValue('start_date', startDateStr);
//     useInvoiceStore().setFilterValue('end_date', endDateStr);
//   } else {
//     // Если одна из дат не выбрана, сбросьте фильтры
//     useInvoiceStore().removeFilterValue('start_date');
//     useInvoiceStore().removeFilterValue('end_date');
//   }
// };
// const dateSelectInit = () => [
//   new Date().setDate(new Date().getDate() - 60),
//   new Date().setDate(new Date().getDate() + 60),
// ]

// function stringToStringContainer(
//   str: string,
//   separator: string = ','
// ): string[] {
//   return str.split(separator).map((item) => item.trim())
// }

//  const strToDateNumberToDate = (dateStr: string) => {
//   const containerWithDate = stringToStringContainer(dateStr, '.')
//   return new Date().setFullYear(
//     parseInt(containerWithDate[2]),
//     parseInt(containerWithDate[1]) - 1,
//     parseInt(containerWithDate[0])
//   )
// }

// const getDateFromStore = (): any => {
//   if (
//     !filterValue.value.start_date ||
//     !filterValue.value.end_date
//   ) {
//     return dateSelectInit()
//   } else {
//     return [
//       new Date(
//         strToDateNumberToDate(filterValue.value.start_date)
//       ).toDateString(),
//       new Date(
//         strToDateNumberToDate(filterValue.value.end_date)
//       ).toDateString(),
//     ]
//   }
// }
// const dateSelect = ref<[string, string]>(getDateFromStore())
// // const dateSelect = ref<string>(getDateFromStore())

// const changeDateSelect = () => {
//   if (!dateSelect.value) {
//     useInvoiceStore().removeFilterValue('start_date')
//     useInvoiceStore().removeFilterValue('end_date')
//     toggleTriggerFilter()
//     return
//   }
//   useInvoiceStore().setFilterValue(
//     'start_date',
//     new Date(dateSelect.value[0]).toLocaleDateString()
//   )
//   useInvoiceStore().setFilterValue(
//     'end_date',
//     new Date(dateSelect.value[1]).toLocaleDateString()
//   )
//   toggleTriggerFilter()
// }

// onMounted(() => {
//   changeDateSelect()
// })



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
