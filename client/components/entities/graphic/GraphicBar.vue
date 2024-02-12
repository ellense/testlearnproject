<template>
  <div class="directoryBar">
    <div>
      <el-button @click="deleteGraphic()">Удалить</el-button>
      <el-button @click="useReportStore().dialogForm = true">Создать отчет</el-button>
    </div>
    <div class="directoryBar_filter">
      <el-select v-model="Ku" multiple clearable filterable collapse-tags collapse-tags-tooltip :max-collapse-tags="3"
        placeholder="Фильтр по КУ" style="width: 300px" @change="changeKu">
        <el-option v-for="item in KuList" :key="item" :label="item" :value="item" />
      </el-select>
      <el-select v-model="LegalEntity" multiple clearable filterable collapse-tags collapse-tags-tooltip
        :max-collapse-tags="3" placeholder="Фильтр по юридическому лицу" style="width: 400px" @change="changeLegalEntity">
        <el-option v-for="item in LegalEntityList" :key="item" :label="item" :value="item" />
      </el-select>

      <el-input v-model="searchQuery" placeholder="Фильтр по поставщику" style="width: 400px;"></el-input>
    </div>
  </div>
</template>

<script setup lang="ts">

import { storeToRefs } from "pinia";
import { useKuStore } from "~~/stores/kuStore";
import { useReportStore } from "~~/stores/reportStore";
//для поиска
const searchQuery = ref('');
watch(searchQuery, (newValue: string) => {
  useKuStore().performSearchGraphic(newValue);
});

//для фильтрации 
const { filterGraphicValue, legalEntity2, KuParams } = storeToRefs(useKuStore())
const triggerFilter = ref<boolean>(true);
const toggleTriggerFilter = () => (triggerFilter.value = !triggerFilter.value);

//для фильтрации по юр лицам
const LegalEntity = ref<string[]>(filterGraphicValue.value.entity_id || []);
const LegalEntityList = ref<string[]>(legalEntity2.value);

const changeLegalEntity = () => {
  useKuStore().pagination = null;
  useKuStore().setFilterValue2('entity_id', LegalEntity.value);
  console.log('shopLegalEntity.value:', LegalEntity.value);

  toggleTriggerFilter();
};

watch(legalEntity2, (value) => {
  LegalEntityList.value = value;
});

//для фильтрации по ку
 const Ku = ref<string[]>(filterGraphicValue.value.ku_id || []);
const KuList = ref<string[]>(KuParams.value);

const changeKu = () => {
  useKuStore().pagination = null;
  useKuStore().setFilterValue2('ku_id', Ku.value);
  toggleTriggerFilter();
};

watch(KuParams, (value) => {
  KuList.value = value;
});
//для фильтрации
watch(triggerFilter, () => {
  useKuStore().getGraphicsFromAPIWithFilter();
});

onMounted(() => {
  useKuStore().getLegalEntityFromApi2();
  useKuStore().getKuIdFromApi();
});

//удаление графиков
const deleteGraphic = async () => {
  const selectedRows = useKuStore().multipleSelection2.map((row) => row.graph_id);
  try {
    for (const graph_id of selectedRows) {
      const results = await GRAPHIC.deleteGraphic({ graph_id });
      console.log("успешно удалилось", results);
    }
  } catch (error) {
    console.error("Ошибка при удалении строк:", error);
    ElMessage.error("Ошибка при удалении графика");
  } finally {
    useKuStore().dataGraphic = useKuStore().dataGraphic.filter(
      (row) => !selectedRows.includes(row.graph_id)
    );
    useKuStore().multipleSelection2 = [];
  }
};
</script>

<style scoped></style>