<template>
  <div class="directoryBar">
    <h2>Поставщики</h2>
    <div class="directoryBar_filter">
      <el-select v-model="shopLegalEntity" multiple clearable filterable collapse-tags collapse-tags-tooltip
        :max-collapse-tags="3" placeholder="Фильтр по юридическому лицу" style="width: 500px"
        @change="changeShopLegalEntity">
        <el-option v-for="item in shopLegalEntityList" :key="item" :label="item" :value="item" />
      </el-select>
      <el-input v-model="searchQuery" placeholder="Поиск" style="max-width: 400px" :prefix-icon="Search"></el-input>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, watch, ref } from "vue";
import { Search } from "@element-plus/icons-vue";
import { storeToRefs } from "pinia";
import { useVendorStore } from "~~/stores/vendorStore";

const { juristicPersons } = storeToRefs(useVendorStore());

const { filterValue } = storeToRefs(useVendorStore())
const triggerFilter = ref<boolean>(true);
const toggleTriggerFilter = () => (triggerFilter.value = !triggerFilter.value);
const shopLegalEntity = ref<string[]>(filterValue.value.entity_id || []);
const shopLegalEntityList = ref<string[]>(juristicPersons.value);


const searchQuery = ref('');
watch(searchQuery, (newValue: string) => {
  useVendorStore().performSearch(newValue);
});

const changeShopLegalEntity = () => {
  useVendorStore().pagination = null;
  useVendorStore().setFilterValue('entity_id', shopLegalEntity.value);
  console.log('shopLegalEntity.value:', shopLegalEntity.value);
  toggleTriggerFilter();
};

watch(juristicPersons, (value) => {
  shopLegalEntityList.value = value;
});

watch(triggerFilter, () => {
  useVendorStore().getVendorFromAPIWithFilter();
});

onMounted(() => {
  useVendorStore().getJuristicPersonsFromApi();
});

</script>

<style scoped></style>
