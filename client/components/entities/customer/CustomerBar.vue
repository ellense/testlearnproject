<template>
  <div class="directoryBar">
    <h3>Клиенты</h3>
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
      <el-input v-model="searchQuery" placeholder="Поиск" style="max-width: 400px; min-width: 100px; width: 300px;"
        :prefix-icon="Search" size="small"></el-input>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, watch, ref } from "vue";
import { Search } from "@element-plus/icons-vue";
import { storeToRefs } from "pinia";
import { useCustomerStore } from "~~/stores/customerStore";
import { useKuCAddStore } from "~~/stores/kuCAddStore";
import type { IEntityInKu } from "~/utils/types/entityTypes";

const { juristicPersons } = storeToRefs(useCustomerStore());

const { filterValue } = storeToRefs(useCustomerStore())
const triggerFilter = ref<boolean>(true);
const toggleTriggerFilter = () => (triggerFilter.value = !triggerFilter.value);
const shopLegalEntity = ref<string[]>(filterValue.value.entity_id || []);
const shopLegalEntityList = ref<string[]>(juristicPersons.value);


const searchQuery = ref('');
watch(searchQuery, (newValue: string) => {
  useCustomerStore().pagination = null;
  useCustomerStore().performSearch(newValue);
});

const changeShopLegalEntity = () => {
  useCustomerStore().pagination = null;
  useCustomerStore().setFilterValue('entity_id', shopLegalEntity.value);
  console.log('shopLegalEntity.value:', shopLegalEntity.value);
  toggleTriggerFilter();
};

watch(juristicPersons, (value) => {
  shopLegalEntityList.value = value;
});

watch(triggerFilter, () => {
  useCustomerStore().getCustomerFromAPIWithFilter();
});

onMounted(() => {
  useCustomerStore().getJuristicPersonsFromApi();
});
const LegalEntity = ref<string[]>(filterValue.value.entity_id || []);
const optionsLegalEntity = ref<Array<{ label: string; value: string }>>([]);
const changeLegalEntity = () => {
  useCustomerStore().pagination = null;
  useCustomerStore().setFilterValue('entity_id', LegalEntity.value);
  toggleTriggerFilter();
};
watch(() => useKuCAddStore().dataEntity, (dataEntity: IEntityInKu[]) => {
  optionsLegalEntity.value = dataEntity.map((item) => ({ label: item.name, value: item.entity_id, }));
});
onMounted(async () => {
  try {
    await useKuCAddStore().fetchKuEntity({
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