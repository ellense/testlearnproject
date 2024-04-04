<template>
  <div class="directoryBar">
    <div class="directoryBar_filter">
      <h3>Графики расчетов</h3>
      <el-divider direction="vertical" />
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
            <el-dropdown-item><el-button @click="createReportInvoice()" link size="small">Акт сверки взаиморасчетов с
                поставщиками по
                накладным</el-button></el-dropdown-item>
            <el-dropdown-item><el-button @click="createReportProduct()" link size="small">Акт сверки взаиморасчетов с
                поставщиками по
                товарам</el-button></el-dropdown-item>
            <el-dropdown-item><el-button @click="renderDoc()" link size="small">Акт предоставления
                вознаграждения</el-button></el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
    </div>
    <!-- <div class="directoryBar_filter">
      <el-select v-model="Ku" multiple clearable filterable collapse-tags collapse-tags-tooltip :max-collapse-tags="2"
        placeholder="Фильтр по КУ" style="width: 300px" @change="changeKu" size="small">
        <el-option v-for="item in KuList" :key="item" :label="item" :value="item" size="small"/>
      </el-select>
      <el-select v-model="LegalEntity" multiple clearable filterable collapse-tags collapse-tags-tooltip
        :max-collapse-tags="3" placeholder="Фильтр по юр. лицу" style="width: 200px" @change="changeLegalEntity">
        <el-option v-for="item in LegalEntityList" :key="item" :label="item" :value="item" />
      </el-select>
      <el-input v-model="searchQuery" placeholder="Фильтр по поставщику" style="width: 300px;" size="small"></el-input>
    </div> -->
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

// //для фильтрации 
// const { filterGraphicValue, legalEntity, KuParams } = storeToRefs(useGraphicStore())
// const triggerFilter = ref<boolean>(true);
// const toggleTriggerFilter = () => (triggerFilter.value = !triggerFilter.value);

// //для фильтрации по юр лицам
// const LegalEntity = ref<string[]>(filterGraphicValue.value.entity_id || []);
// const LegalEntityList = ref<string[]>(legalEntity.value);

// const changeLegalEntity = () => {
//   useGraphicStore().pagination = null;
//   useGraphicStore().setFilterValue('entity_id', LegalEntity.value);
//   console.log('shopLegalEntity.value:', LegalEntity.value);

//   toggleTriggerFilter();
// };

// watch(legalEntity, (value) => {
//   LegalEntityList.value = value;
// });

// //для фильтрации по ку
// const Ku = ref<string[]>(filterGraphicValue.value.ku_id || []);
// const KuList = ref<string[]>(KuParams.value);

// const changeKu = () => {
//   useGraphicStore().pagination = null;
//   useGraphicStore().setFilterValue('ku_id', Ku.value);
//   toggleTriggerFilter();
// };

// watch(KuParams, (value) => {
//   KuList.value = value;
// });
// //для фильтрации
// watch(triggerFilter, () => {
//   useGraphicStore().getGraphicsFromAPIWithFilter();
// });

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
    entity_id: selectedRows[0].entity_id,
    entity_name: selectedRows[0].entity_name,
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



//для АКТА ПРЕДОСТАВЛЕНИЯ ВОЗНАГРАЖДЕНИЯ
import Docxtemplater from "docxtemplater";
import PizZip from "pizzip";
import { dayjs } from "element-plus";
import PizZipUtils from "pizzip/utils/index.js";
import { saveAs } from "file-saver";

function loadFile(url: string, callback: (error: any, content: any) => void) {
  PizZipUtils.getBinaryContent(url, callback);
}


const renderDoc = async () => {
  try {
    const selectedRows = useGraphicStore().multipleSelectionGraphic.map((row) => row.graph_id);
    console.log("selectedRows[0]:", selectedRows[0])
    await useReportStore().getGraphicDetailFromApi(selectedRows[0]);
    await useReportStore().getNumeralsGraphFromApi(selectedRows[0]);
    console.log("useReportStore().graphic[0].ku_id", useReportStore().graphic[0].ku_id)
    await useReportStore().getKuOfficialDetailFromApi(useReportStore().graphic[0].ku_id)
    // await useReportStore().getKuOfficialDetailFromApi(useReportStore().kuid)
    await useReportStore().getVendorDetailFromApi(useReportStore().vendorid)
    await useReportStore().getEntityDetailFromApi(useReportStore().entityid)
    console.log("inn_kpp", useReportStore().vendor.inn_kpp,)
    console.log("urastic_adress2", useReportStore().entity.urastic_address,)
    console.log("bank_bik2", useReportStore().entity.bank_bink,)
    const graphic = useReportStore().graphic[0];
    if (!graphic) {
      console.error("Ошибка: данные не загружены");
      return;
    }
    if (useReportStore().vendor && useReportStore().entity) {
      console.log("inn_kpp", useReportStore().vendor.inn_kpp);
      console.log("urastic_adress2", useReportStore().entity.urastic_address);
      console.log("bank_bik2", useReportStore().entity.bank_bink);
      loadFile("/templates/templateOfAct.docx", async (error, content) => {
        if (error) {
          throw error;
        }
        const zip = new PizZip(content);
        const doc = new Docxtemplater(zip, { paragraphLoop: true, linebreaks: true });
        doc.render({
          vendor_name: useReportStore().vendor.urastic_name,
          counterparty_post: useReportStore().official[0].counterparty_post, //useReportStore().official[0].counterparty_post
          counterparty_name:  useReportStore().official[0].counterparty_name,//useReportStore().official[0].counterparty_name
          counterparty_docu: useReportStore().official[0].counterparty_docu,//useReportStore().official[0].counterparty_docu
          entity_name: useReportStore().entity.urastic_name,
          entity_post: useReportStore().official[0].entity_post,//useReportStore().official[0].entity_post
          entity_fio: useReportStore().official[0].entity_name,//useReportStore().official[0].entity_fio
          entity_docu: useReportStore().official[0].entity_docu,//useReportStore().official[0].entity_docu

          date_start: dayjs(useReportStore().graphic[0].date_start).format('DD.MM.YYYY'),
          date_end: dayjs(useReportStore().graphic[0].date_end).format('DD.MM.YYYY'),
          sum_calc: useReportStore().graphic[0].sum_calc,
          percent: useReportStore().graphic[0].percent,
          sum_bonus: useReportStore().graphic[0].sum_bonus,

          inn_kpp: useReportStore().vendor.inn_kpp,
          urastic_adress: useReportStore().vendor.urastic_adress,
          account: useReportStore().vendor.account,
          bank_name: useReportStore().vendor.bank_name,
          bank_bik: useReportStore().vendor.bank_bik,
          corr_account: useReportStore().vendor.corr_account,

          inn_kpp2: useReportStore().entity.inn_kpp,
          urastic_adress2: useReportStore().entity.urastic_address,
          account2: useReportStore().entity.account,
          bank_name2: useReportStore().entity.bank_name,
          bank_bik2: useReportStore().entity.bank_bink,
          corr_account2: useReportStore().entity.corr_account,

          numerals: useReportStore().numerals,
        });

        const out = doc.getZip().generate({
          type: "blob",
          mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        });
        saveAs(out, "Акт предоставления вознаграждения.docx");
      });
    } else {
      console.log("Данные вендора или энтити ещё не загружены");
    }
  } catch (error) {
    console.error("Произошла ошибка:", error);
  }
};
</script>

<style scoped></style>
