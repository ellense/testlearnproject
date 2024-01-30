<template>
  <div class="directoryBar">
    <div class="directoryBar_filter">
      <h2>Поставщики</h2>
      <!-- multiple collapse-tags collapse-tags-tooltip -->
      <!-- <el-select v-model="vendorStore.entityName" clearable filterable placeholder="Фильтр по юридическому лицу"  style="width: 300px" @change="onEntityChange">
        <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
          <span style="float: left">{{ item.label }}</span>
          <span style="
              margin-left: 10px;
              float: right;
              color: var(--el-text-color-secondary);
              font-size: 13px;
            ">{{ item.value }}</span>
        </el-option>
      </el-select> -->
      <el-select
        v-model="shopLegalEntity"
        multiple
        collapse-tags
        size="small"
        placeholder="Юридическое лицо"
        style="width: 160px"
        @change="changeShopLegalEntity"
      >
        <el-option
          v-for="item in shopLegalEntityList"
          :key="item"
          :label="item"
          :value="item"
        />
      </el-select>
    </div>
    <!-- <el-input v-model="vendorStore.search" placeholder="Поиск" style="max-width: 400px" :prefix-icon="Search" /> -->
  </div>
</template>

<script setup lang="ts">
import { onMounted, watch, ref } from "vue";
import { storeToRefs } from "pinia";
import { useVendorStore } from "~~/stores/vendorStore";
import { EntityId, IEntityIdAndName } from "~/utils/types/directoryTypes";

const { juristicPersons } = storeToRefs(useVendorStore());
const triggerFilter = ref<boolean>(true);
const toggleTriggerFilter = () => (triggerFilter.value = !triggerFilter.value);
const shopLegalEntity = ref<string[]>([]);
const shopLegalEntityList = ref<string[]>(juristicPersons.value);

onMounted(() => {
  // Вызываем действие, чтобы получить юридические лица при монтировании компонента
  useVendorStore().getJuristicPersonsFromApi();
});

// watch(juristicPersons, (value) => {
//   // Используем map для извлечения значений entity_id
//   shopLegalEntityList.value = value.map((entity) => entity.entity_id);
//   console.log('Updated shopLegalEntityList:', shopLegalEntityList.value);
// });
watch(juristicPersons, (value) => {
  shopLegalEntityList.value = value;
  console.log('Updated shopLegalEntityList:', shopLegalEntityList.value);
});

const changeShopLegalEntity = () => {
  useVendorStore().setFilterValue('entity_id', shopLegalEntity.value);
  console.log('shopLegalEntity.value:', shopLegalEntity.value);
  toggleTriggerFilter();
};

watch(triggerFilter, () => {
  useVendorStore().getVendorFromAPIWithFilter();
});



// import { onMounted, watch, ref } from "vue";
// import { storeToRefs } from "pinia";
// import { useVendorStore } from "~~/stores/vendorStore";
// import { EntityId, IEntityIdAndName } from "~/utils/types/directoryTypes";

// const { juristicPersons } =
//   storeToRefs(useVendorStore())
// const triggerFilter = ref<boolean>(true)
// const toggleTriggerFilter = () => (triggerFilter.value = !triggerFilter.value)
// const shopLegalEntity = ref<string[]>([])
// const shopLegalEntityList = ref<string[]>(juristicPersons.value)
// watch(juristicPersons, (value) => {
//   shopLegalEntityList.value = value;
//   console.log('Updated shopLegalEntityList:', shopLegalEntityList.value);
// });

// const changeShopLegalEntity = () => {
//   useVendorStore().setFilterValue(
//     'entity_id',
//     shopLegalEntity.value
//   )
//   toggleTriggerFilter()
// }

// watch(triggerFilter, () => {
//   useVendorStore().getVendorFromAPIWithFilter()
// })











// import { Search } from "@element-plus/icons-vue";
// import type { IEntityIdAndName } from "~/utils/types/directoryTypes";
// const vendorStore = useVendorStore();
// const options = ref<Array<{ label: string; value: string }>>([]);

// watch(
//   () => vendorStore.dataEntity,
//   (dataEntity: IEntityIdAndName[]) => {
//     options.value = dataEntity.map((item) => ({
//       label: item.name,
//       value: item.entity_id,
//     }));
//   }
// );

// onMounted(async () => {
//   try {
//     await vendorStore.fetchVendorEntity({
//       entity_id: "",
//       name: "",
//     });
//   } catch (error) {
//     console.error("Ошибка при загрузке данных", error);
//   }
// });


// const onEntityChange = async () => {
//   try {
//     vendorStore.pagination = null;
//     await vendorStore.fetchVendorsListForEntity(undefined);
//   } catch (error) {
//     console.error("Ошибка при загрузке данных", error);
//   }
// };



</script>

<style scoped></style>
