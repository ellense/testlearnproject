<template>
  <div class="directoryBar">
    <h3>Поставщики</h3>
    <div class="directoryBar_filter">
      <el-select v-model="LegalEntity" multiple clearable filterable collapse-tags collapse-tags-tooltip
                :max-collapse-tags="1" placeholder="Фильтр по юр. лицу" style="width: 300px" @change="changeLegalEntity"
                size="small">
                <el-option v-for="item in optionsLegalEntity" :key="item.value" :label="item.label" :value="item.value">
                  <span style="float: left">{{ item.label }}</span>
                  <span style="
                    margin-left: 10px;
                    float: right;
                    color: var(--el-text-color-secondary);
                    font-size: 13px;
                  ">{{ item.value }}</span>
                </el-option>
              </el-select>
      <el-input v-model="searchQuery" placeholder="Поиск" style="max-width: 400px; min-width: 100px; width: 300px;" :prefix-icon="Search" size="small"></el-input>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, watch, ref } from "vue";
import { Search } from "@element-plus/icons-vue";
import { storeToRefs } from "pinia";
import { useVendorStore } from "~~/stores/vendorStore";
import { useKuAddStore } from "~~/stores/kuAddStore";
import type { IEntityInKu } from "~/utils/types/directoryTypes";

const { juristicPersons } = storeToRefs(useVendorStore());

const { filterValue } = storeToRefs(useVendorStore())
const triggerFilter = ref<boolean>(true);
const toggleTriggerFilter = () => (triggerFilter.value = !triggerFilter.value);
// const shopLegalEntity = ref<string[]>(filterValue.value.entity_ids || []);
// const shopLegalEntityList = ref<string[]>(juristicPersons.value);


const searchQuery = ref('');
watch(searchQuery, (newValue: string) => {
  useVendorStore().pagination = null;
  useVendorStore().performSearch(newValue);
});

// const changeShopLegalEntity = () => {
//   useVendorStore().pagination = null;
//   useVendorStore().setFilterValue('entity_ids', shopLegalEntity.value);
//   console.log('shopLegalEntity.value:', shopLegalEntity.value);
//   toggleTriggerFilter();
// };

// watch(juristicPersons, (value) => {
//   shopLegalEntityList.value = value;
// });

watch(triggerFilter, () => {
  useVendorStore().getVendorFromAPIWithFilter();
});

// onMounted(() => {
//   useVendorStore().getJuristicPersonsFromApi();
// });
const LegalEntity = ref<string[]>(filterValue.value.entity_ids || []);
const optionsLegalEntity = ref<Array<{ label: string; value: string }>>([]);
const changeLegalEntity = () => {
  useVendorStore().pagination = null;
  useVendorStore().setFilterValue('entity_ids', LegalEntity.value);
  toggleTriggerFilter();
};
watch(() => useKuAddStore().dataEntity, (dataEntity: IEntityInKu[]) => {
    optionsLegalEntity.value = dataEntity.map((item) => ({label: item.name,value: item.entity_id,}));
});
onMounted(async () => {
  try {
    await useKuAddStore().fetchKuEntity({
      entity_id: "",
      name: "",
      merge_id: "",
    });
  } catch (error) {
    console.error("Ошибка при загрузке данных юр. лица", error);
  }
});

</script>

<style scoped></style>
