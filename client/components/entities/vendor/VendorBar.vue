<template>
  <div class="directoryBar">
    <div class="directoryBar_filter">
      <h2>Поставщики</h2>
      <el-select v-model="shopLegalEntity" multiple clearable filterable collapse-tags collapse-tags-tooltip
        :max-collapse-tags="3" placeholder="Фильтр по юридическому лицу" style="width: 300px"
        @change="changeShopLegalEntity">
        <el-option v-for="item in shopLegalEntityList" :key="item" :label="item" :value="item" />
        <!-- <el-option
    v-for="item in shopLegalEntityList"
    :key="item"
    :label="item"
    :value="item"
  /> -->
      </el-select>
    </div>
    <el-input v-model="searchQuery" placeholder="Поиск" style="max-width: 400px" :prefix-icon="Search"></el-input>
  </div>
</template>

<script setup lang="ts">
import { onMounted, watch, ref } from "vue";
import { Search } from "@element-plus/icons-vue";
import { storeToRefs } from "pinia";
import { useVendorStore } from "~~/stores/vendorStore";

const { juristicPersons,dataEntity } = storeToRefs(useVendorStore());

const { filterValue } = storeToRefs(useVendorStore())
const triggerFilter = ref<boolean>(true);
const toggleTriggerFilter = () => (triggerFilter.value = !triggerFilter.value);
const shopLegalEntity = ref<string[]>(filterValue.value.entity_id || []);
const shopLegalEntityList = ref<string[]>(juristicPersons.value);
// const shopLegalEntityList = ref<string[]>(dataEntity.value.map(item => `${item.entity_id} - ${item.name}`));

const searchQuery = ref('');

const changeShopLegalEntity = () => {
  useVendorStore().pagination = null;
  useVendorStore().setFilterValue('entity_id', shopLegalEntity.value);
  console.log('shopLegalEntity.value:', shopLegalEntity.value);
  toggleTriggerFilter();
};

// Следим за изменениями в поле поиска и автоматически выполняем поиск
watch(searchQuery, (newValue: string) => {
  // Вызов метода хранилища для выполнения поиска
  useVendorStore().performSearch(newValue);
});

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
