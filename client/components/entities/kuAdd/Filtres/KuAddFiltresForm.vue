<template>
  <el-dialog v-model="kuStore.dialogFormVisible" title="Фильтрация товаров по накладных" close-on-click-modal
    close-on-press-escape draggable>
    <el-tabs type="border-card">
      <el-tab-pane label="Производитель">
        <EntitiesKuAddFiltresProducer />
      </el-tab-pane>
      <el-tab-pane label="Торговая марка">
        <EntitiesKuAddFiltresBrand />
      </el-tab-pane>
      <el-tab-pane label="Категория">
        <EntitiesKuAddFiltresClassificator />
      </el-tab-pane>
      <el-tab-pane label="Товар">
        <EntitiesKuAddFiltresProduct />
      </el-tab-pane>
    </el-tabs>
    <el-select v-model="useKuStore().producerSelect" clearable filterable style="width: 300px" @change="onProducerChange">
              <el-option v-for="item in options" :key="item" :label="item" :value="item">
                
              </el-option>
            </el-select>
            <!-- <el-select v-model="Ku" clearable filterable  
        placeholder="Выберите производителя" style="width: 300px" @change="changeKu">
        <el-option v-for="item in KuList" :key="item" :label="item" :value="item" />
      </el-select> -->
    <el-select v-model="useKuStore().brandSelect" clearable filterable style="width: 300px" :disabled="!useKuStore().producerSelect">
      <el-option v-for="item in options2" :key="item" :label="item" :value="item">

      </el-option>
    </el-select>
    <div>
    <!-- <el-select v-model="selectedItem" placeholder="Select" @change="handleChange">
      <el-option
        v-for="item in paginatedItems"
        :key="item.value"
        :label="item.label"
        :value="item.value"
      />
    </el-select>
    <el-pagination
      v-if="totalPages > 1"
      :current-page.sync="currentPage"
      :page-size="pageSize"
      :total="items.length"
      @current-change="handlePageChange"
    /> -->
  </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="kuStore.dialogFormVisible = false">Отмена</el-button>
        <el-button @click="">Сохранить</el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script setup lang="ts">














import { storeToRefs } from "pinia";
import type { IProducer } from "~/utils/types/directoryTypes";
const { brandSelect, producerSelect, ProducerList,getProducers } = storeToRefs(useKuStore())
import { useKuStore } from "~~/stores/kuStore";

const kuStore = useKuStore();
//для фильтрации по ку
// const Ku = ref<string[]>(filterGraphicValue.value.ku_id || []);
// const KuList = ref<string[]>(KuParams.value);

// const changeKu = () => {
//   useKuStore().pagination = null;
//   useKuStore().setFilterValue2('ku_id', Ku.value);
//   toggleTriggerFilter();
// };

// watch(KuParams, (value) => {
//   KuList.value = value;
// });
//вывод данных производителя
const options = ref<string>(ProducerList.value.producer_name );
 const optionsList = ref<string[]>(producerSelect.value); // написать реф string[],когда нужно будет множественный выбор, в интерфейсе тоже
  const tableData = ref<IProducer[]>(getProducers.value)
//   const options = ref([
// "«MEGA Brands Inc.» [П2681]", "Aceites Borges Pont S.A. [П1765]", "BRITA [П168]", "Crayola [П20631]"
//   // Дополнительные элементы
// ]);
watch(getProducers, (value) => {
  tableData.value = value;
  console.log("tableData", tableData.value)
});

onMounted(() => {
  useKuStore().fetchProducerList();
  }
);
//вывод данных торговой марки
const options2 = ref<string[]>(brandSelect.value);
  watch(brandSelect, (value) => {
  options2.value = value;
});
onMounted(async () => {
  try {
    await useKuStore().fetchBrandList();
  } catch (error) {
    console.error("Ошибка при загрузке данных", error);
  }
});
const onProducerChange = async () => {
  try {
    await useKuStore().fetchBrandList(undefined);
    console.log("fetchBrandList:", useKuStore().producerSelect);
  } catch (error) {
    console.error("Ошибка при загрузке данных", error);
  }
};
// Функция сброса торговой марки
const resetBrandOnProducerChange = () => {
  useKuStore().brandSelect = [];
};
// Обработчик изменения выбранного производителя
watch(() => useKuStore().producerSelect, (newValue, oldValue) => {
  if (oldValue !== newValue) {
    resetBrandOnProducerChange();
  }
});

</script>
