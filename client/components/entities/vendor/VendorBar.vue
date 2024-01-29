<template>
  <div class="directoryBar">
    <div class="directoryBar_filter">
      <h2>Поставщики</h2>
      <el-select v-model="vendorStore.entityName" clearable filterable placeholder="Фильтр по юридическому лицу"
        style="width: 300px" @change="onEntityChange">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
          <span style="float: left">{{ item.label }}</span>
          <span style="
              margin-left: 10px;
              float: right;
              color: var(--el-text-color-secondary);
              font-size: 13px;
            ">{{ item.value }}</span>
        </el-option>
      </el-select>
    </div>
    <el-input v-model="vendorStore.search" placeholder="Поиск" style="max-width: 400px" :prefix-icon="Search" />
  </div>
</template>

<script setup lang="ts">
import { Search } from "@element-plus/icons-vue";
import store from "element-plus/es/components/table/src/store";
import type { IEntityIdAndName } from "~/utils/types/directoryTypes";
import { useVendorStore } from "~~/stores/vendorStore";
const vendorStore = useVendorStore();

const options = ref<Array<{ label: string; value: string }>>([]);

watch(
  () => vendorStore.dataEntity,
  (dataEntity: IEntityIdAndName[]) => {
    options.value = dataEntity.map((item) => ({
      label: item.name,
      value: item.entity_id,
    }));
  }
);

onMounted(async () => {
  try {
    await vendorStore.fetchVendorEntity({
      entity_id: "",
      name: "",
    });
  } catch (error) {
    console.error("Ошибка при загрузке данных", error);
  }
});

const onEntityChange = async () => {
  try {
    vendorStore.pagination = null;
    await vendorStore.fetchVendorsListForEntity(undefined);
  } catch (error) {
    console.error("Ошибка при загрузке данных", error);
  }
};
</script>

<style scoped></style>
