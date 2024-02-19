<template>
  <el-select-v2 v-model="store.vendorName" clearable filterable style="width: 300px" placeholder="выберете поставщика"
    :options="options" >
    <template #option="{ option }">
      <span>{{ option.label }}</span>
      <span style="
              margin-left: 10px;
              float: right;
              color: var(--el-text-color-secondary);
              font-size: 13px;
            ">{{ option.value }}</span>
    </template>
  </el-select-v2>
 
</template>
  
<script lang="ts" setup>
import { ref, watch, onMounted } from 'vue';
import { useKuStore } from '~~/stores/kuStore';
import type {  IVendorIdAndName} from '~/utils/types/directoryTypes';

const store = useKuStore();

const options = ref<Array<{ label: string; value: string }>>([]);
  watch(() => store.dataVendor, (dataVendors: IVendorIdAndName[]) => {
  options.value = dataVendors.map((item) => ({
    label: item.name,
    value: item.vendor_id,
  }));
});

onMounted(async () => {
  try {
    await store.fetchAllVendorsForEntity2();

  } catch (error) {
    console.error('Ошибка при загрузке данных производителя и бренда', error);
  }
});
</script>