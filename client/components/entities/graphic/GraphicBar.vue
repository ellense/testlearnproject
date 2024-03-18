<template>
  <div class="directoryBar">
    <div class="directoryBar_filter">
      <el-button type="danger" plain @click="deleteGraphic()" :disabled="isDeleteButtonDisabled"
        :title="disableButtonDeleteTooltip" size="small">Удалить</el-button>
      <el-button type="success" plain @click="ApproveGraphic()" :disabled="isButtonsDisabled"
        :title="disableButtonTooltip" style="margin: 0;" size="small">Утвердить</el-button>
      <el-dropdown :disabled="isButtonsDisabled">
        <el-button type="primary" plain :disabled="isButtonsDisabled" :title="disableButtonTooltip" size="small">
          Создать акт<el-icon class="el-icon--right"><arrow-down /></el-icon>
        </el-button>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item><el-button @click="createReportInvoice()" link size="small">Акт сверки взаиморасчетов с поставщиками по
                накладным</el-button></el-dropdown-item>
            <el-dropdown-item><el-button @click="createReportProduct()" link size="small">Акт сверки взаиморасчетов с поставщиками по
                товарам</el-button></el-dropdown-item>
            <el-dropdown-item><el-button @click="" link size="small">Акт предоставления вознаграждения</el-button></el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
    <div class="directoryBar_filter">
      <el-select v-model="Ku" multiple clearable filterable collapse-tags collapse-tags-tooltip :max-collapse-tags="2"
        placeholder="Фильтр по КУ" style="width: 300px" @change="changeKu" size="small">
        <el-option v-for="item in KuList" :key="item" :label="item" :value="item" size="small"/>
      </el-select>
      <!-- <el-select v-model="LegalEntity" multiple clearable filterable collapse-tags collapse-tags-tooltip
        :max-collapse-tags="3" placeholder="Фильтр по юр. лицу" style="width: 200px" @change="changeLegalEntity">
        <el-option v-for="item in LegalEntityList" :key="item" :label="item" :value="item" />
      </el-select> -->

      <el-input v-model="searchQuery" placeholder="Фильтр по поставщику" style="width: 300px;" size="small"></el-input>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ArrowDown } from '@element-plus/icons-vue'
import { storeToRefs } from "pinia";
import { useGraphicStore } from "~~/stores/graphicStore";
import { useReportStore } from "~~/stores/reportStore";
//для поиска
const searchQuery = ref('');
watch(searchQuery, (newValue: string) => {
  useGraphicStore().performSearchGraphic(newValue);
});

//для фильтрации 
const { filterGraphicValue, legalEntity2, KuParams } = storeToRefs(useGraphicStore())
const triggerFilter = ref<boolean>(true);
const toggleTriggerFilter = () => (triggerFilter.value = !triggerFilter.value);

//для фильтрации по юр лицам
const LegalEntity = ref<string[]>(filterGraphicValue.value.entity_ids || []);
const LegalEntityList = ref<string[]>(legalEntity2.value);

const changeLegalEntity = () => {
  useGraphicStore().pagination = null;
  useGraphicStore().setFilterValue2('entity_ids', LegalEntity.value);
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
  useGraphicStore().pagination = null;
  useGraphicStore().setFilterValue2('ku_id', Ku.value);
  toggleTriggerFilter();
};

watch(KuParams, (value) => {
  KuList.value = value;
});
//для фильтрации
watch(triggerFilter, () => {
  useGraphicStore().getGraphicsFromAPIWithFilter();
});

onMounted(() => {
  useGraphicStore().getLegalEntityFilterForGraphicFromApi();
  useGraphicStore().getKuIdFilterForGraphicFromApi();
});

const createReportInvoice = async () => {
  useReportStore().dialogFormReportInvoice = true
  const selectedRows = useGraphicStore().multipleSelectionGraphic.map((row) => row.graph_id);
  console.log("selectedRows[0]:", selectedRows[0])
  useReportStore().getGraphicDetailFromApi(selectedRows[0])
  useReportStore().setFilterValueInvoices("graph_id", selectedRows[0]);
  useReportStore().fetchAllInvoices(selectedRows[0])
  // useReportStore().getInvoiceDetailForGraphicFromAPIWithFilter(selectedRows[0])

}
const createReportProduct = async () => {
  useReportStore().dialogFormReportProduct = true
  const selectedRows = useGraphicStore().multipleSelectionGraphic.map((row) => row.graph_id);
  console.log("selectedRows[0]:", selectedRows[0])
  useReportStore().getGraphicDetailFromApi(selectedRows[0])
  useReportStore().setFilterValueInvoices("graph_id", selectedRows[0]);
  useReportStore().fetchAllProducts(selectedRows[0])

}

//утверждение графика
const ApproveGraphic = async () => {
  const selectedRows = useGraphicStore().multipleSelectionGraphic
  console.log("selectedRows статус", selectedRows)
  const data = {
    graph_id: selectedRows[0].graph_id,
    ku_id: selectedRows[0].ku_id,
    status: "Утверждено",
    vendor_name: selectedRows[0].vendor_name,
    vendor_id: selectedRows[0].vendor_id,
    period: selectedRows[0].period,
    date_start: selectedRows[0].date_start,
    date_end: selectedRows[0].date_end,
    date_calc: selectedRows[0].date_calc,
    percent: selectedRows[0].percent,
    sum_calc: selectedRows[0].sum_calc,
    sum_bonus: selectedRows[0].sum_bonus,
    sum_approved: selectedRows[0].sum_bonus,
  };

  try {
    const response = await GRAPHIC.updateGraphic(data);
    console.log("Статус графика успешно обновлен :", response);
    await useGraphicStore().getGraphicsFromAPIWithFilter();
  } catch (error) {
    console.error("Ошибка при обновлении статуса грфика:", error);
  }
};

//удаление графиков
const deleteGraphic = async () => {
  const selectedRows = useGraphicStore().multipleSelectionGraphic.map((row) => row.graph_id);
  try {
    for (const graph_id of selectedRows) {
      const results = await GRAPHIC.deleteGraphic({ graph_id });
      console.log("успешно удалилось", results);
    }
  } catch (error) {
    console.error("Ошибка при удалении строк:", error);
    ElMessage.error("Ошибка при удалении графика");
  } finally {
    useGraphicStore().dataGraphic = useGraphicStore().dataGraphic.filter(
      (row) => !selectedRows.includes(row.graph_id)
    );
    useGraphicStore().multipleSelectionGraphic = [];
  }
};
const isButtonsDisabled = computed(() => {
  return useGraphicStore().multipleSelectionGraphic.length > 1 || useGraphicStore().multipleSelectionGraphic.length === 0;
});
const isDeleteButtonDisabled = computed(() => {
  return useGraphicStore().multipleSelectionGraphic.length === 0;
});
const disableButtonTooltip = computed(() => {
  return useGraphicStore().multipleSelectionGraphic.length > 1 || useGraphicStore().multipleSelectionGraphic.length === 0 ? 'Кнопка заблокирована. Для доступа выберите только один график' : '';
});
const disableButtonDeleteTooltip = computed(() => {
  return useGraphicStore().multipleSelectionGraphic.length === 0 ? 'Кнопка заблокирована. Для доступа выберите график/и' : '';
});
</script>

<style scoped></style>
