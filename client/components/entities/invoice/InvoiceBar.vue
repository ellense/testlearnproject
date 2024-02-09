<template>

  <div class="directoryBar">
    <h2>Накладные поставок</h2>
    <div class="directoryBar_filter">
      <el-select v-model="LegalEntity" multiple clearable filterable collapse-tags collapse-tags-tooltip
        :max-collapse-tags="3" placeholder="Фильтр по юридическому лицу" style="width: 400px" @change="changeLegalEntity">
        <el-option v-for="item in LegalEntityList" :key="item" :label="item" :value="item" />
      </el-select>
      <!-- <el-select v-model="Vendor"  clearable filterable collapse-tags collapse-tags-tooltip
        placeholder="Фильтр по поставщику" style="width: 400px" @change="changeVendor">

        <el-option v-for="item in VendorList" :key="item" :label="item" :value="item" />
      </el-select> -->
      <el-input v-model="searchQuery" placeholder="Фильтр по поставщику" style="width: 400px;" ></el-input>
    </div> 
  </div>
</template>

<script setup lang="ts">
import { Search } from "@element-plus/icons-vue";
import { storeToRefs } from "pinia";
import type { IVendorId } from "~/utils/types/directoryTypes";
import { useInvoiceStore } from "~~/stores/invoiceStore";
import { useKuStore } from "~~/stores/kuStore";
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
