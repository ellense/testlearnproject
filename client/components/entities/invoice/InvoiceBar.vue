<template>
  <div class="directoryBar">
    <h3>Накладные поставок</h3>
    <div class="directoryBar_filter">
        <el-input v-model="searchQuery" placeholder="Фильтр по номеру накладной" clearable
            style="max-width: 300px; min-width: 100px; width: 200px;" size="small"></el-input>
      <!-- <el-date-picker v-model="dateRange" type="daterange" format="DD.MM.YYYY" start-placeholder="Начало"
        end-placeholder="Окончание" :clearable="true" size="small" @change="changeDateRange" /> -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useInvoiceStore } from "~~/stores/invoiceStore";
// const { legalEntity, vendor } = storeToRefs(useInvoiceStore());
const store = useInvoiceStore();
//для поиска
// const searchQuery = ref('');
// watch(searchQuery, (newValue: string) => {
//   useInvoiceStore().performSearch(newValue);
// });

// //для фильтрации
// const { filterValue } = storeToRefs(useInvoiceStore())
// const triggerFilter = ref<boolean>(true);
// const toggleTriggerFilter = () => (triggerFilter.value = !triggerFilter.value);



//для поиска
const searchQuery = ref('');
  watch(searchQuery, (newValue: string) => {
    store.performSearch(newValue);
  });

// //фильтр по юр. лицу
// const LegalEntity = ref<string[]>(filterValue.value.entity_id || []);
// const LegalEntityList = ref<string[]>(legalEntity.value);

// const changeLegalEntity = () => {
//   useInvoiceStore().pagination = null;
//   useInvoiceStore().setFilterValue('entity_id', LegalEntity.value);
//   console.log('shopLegalEntity.value:', LegalEntity.value);

//   toggleTriggerFilter();
// };

// watch(legalEntity, (value) => {
//   LegalEntityList.value = value;
// });

// watch(triggerFilter, () => {
//   useInvoiceStore().getInvoicesFromAPIWithFilter();
// });

// onMounted(() => {
//   useInvoiceStore().getLegalEntityFromApi();
// });

</script>

<style scoped></style>
