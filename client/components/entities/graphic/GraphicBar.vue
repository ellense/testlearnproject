<template>
  <div class="directoryBar">
    <div class="directoryBar_filter">
      <h3>Графики расчетов КУ поставщиков</h3>
      <el-divider direction="vertical" />
      <el-dropdown :disabled="isButtonsDisabledAct">
        <el-button type="success" plain :disabled="isButtonsDisabledAct" :title="disableButtonTooltip" size="small">
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
      <el-dropdown :disabled="isButtonsDisabled">
        <el-button type="primary" plain :disabled="isButtonsDisabled" :title="disableButtonTooltip" size="small">
          Изменить статус<el-icon class="el-icon--right"><arrow-down /></el-icon>
        </el-button>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item><el-button @click="plannedGraphic()" link type="info"
                size="small">Запланировано</el-button></el-dropdown-item>
            <el-dropdown-item><el-button @click="calculatedGraphic()" link type="warning"
                size="small">Рассчитано</el-button></el-dropdown-item>
            <el-dropdown-item><el-button @click="accruedGraphic()" link type="primary"
                size="small">Начислено</el-button></el-dropdown-item>
            <el-dropdown-item><el-button @click="approveGraphic()" link type="success"
                size="small">Утверждено</el-button></el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <el-button type="danger" plain @click="deleteGraphic()" :disabled="isDeleteButtonDisabled"
        :title="disableButtonDeleteTooltip" size="small">Удалить</el-button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ArrowDown } from '@element-plus/icons-vue'
import { storeToRefs } from "pinia";
import { useGraphicStore } from "~~/stores/graphicStore";
import { useReportStore } from "~~/stores/reportStore";

const store = useGraphicStore();
const store2 = useReportStore();

//для поиска
const searchQuery = ref('');
watch(searchQuery, (newValue: string) => {
  store.performSearchGraphic(newValue);
});

onMounted(() => {
  store.getLegalEntityFilterForGraphicFromApi();
  store.getKuIdFilterForGraphicFromApi();
});

const createReportInvoice = async () => {
  store2.dialogFormReportInvoice = true
  const selectedRows = store.multipleSelectionGraphic.map((row) => row.graph_id);
  console.log("selectedRows[0]:", selectedRows[0])
  store2.getGraphicDetailFromApi(selectedRows[0])
  store2.setFilterValueInvoices("graph_id", selectedRows[0]);
  store2.fetchAllInvoices(selectedRows[0])

}
const createReportProduct = async () => {
  store2.dialogFormReportProduct = true
  const selectedRows = store.multipleSelectionGraphic.map((row) => row.graph_id);
  console.log("selectedRows[0]:", selectedRows[0])
  store2.getGraphicDetailFromApi(selectedRows[0])
  store2.setFilterValueInvoices("graph_id", selectedRows[0]);
  store2.fetchAllProducts(selectedRows[0])

}

//запланированный график
const plannedGraphic = async () => {
  const selectedRows = store.multipleSelectionGraphic
  console.log("selectedRows статус", selectedRows)
  const data = {
    graph_id: selectedRows[0].graph_id,
    ku_id: selectedRows[0].ku_id,
    status: "Запланировано",
    entity_id: selectedRows[0].entity_id,
    entity_name: selectedRows[0].entity_name,
    vendor_name: selectedRows[0].vendor_name,
    vendor_id: selectedRows[0].vendor_id,
    period: selectedRows[0].period,
    date_start: dayjs(selectedRows[0].date_start).format("YYYY-MM-DD"),
    date_end: dayjs(selectedRows[0].date_end).format("YYYY-MM-DD"),
    date_calc: dayjs(selectedRows[0].date_calc).format("YYYY-MM-DD"),
    percent: selectedRows[0].percent,
    sum_calc: selectedRows[0].sum_calc,
    sum_bonus: selectedRows[0].sum_bonus,
    sum_approved: selectedRows[0].sum_approved,
  };

  try {
    const response = await GRAPHIC.updateGraphic(data);
    console.log("Статус графика успешно обновлен :", response);
    ElMessage.success(`Статус ${selectedRows[0].graph_id} успешно изменен на "Запланировано" `);
    store.pagination = null
    await store.getGraphicsFromAPIWithFilter();
  } catch (error) {
    console.error("Ошибка при обновлении статуса грфика:", error);
  }
};

//рассчитанный график
const calculatedGraphic = async () => {
  const selectedRows = store.multipleSelectionGraphic
  console.log("selectedRows статус", selectedRows)
  const data = {
    graph_id: selectedRows[0].graph_id,
    ku_id: selectedRows[0].ku_id,
    status: "Рассчитано",
    entity_id: selectedRows[0].entity_id,
    entity_name: selectedRows[0].entity_name,
    vendor_name: selectedRows[0].vendor_name,
    vendor_id: selectedRows[0].vendor_id,
    period: selectedRows[0].period,
    date_start: dayjs(selectedRows[0].date_start).format("YYYY-MM-DD"),
    date_end: dayjs(selectedRows[0].date_end).format("YYYY-MM-DD"),
    date_calc: dayjs(selectedRows[0].date_calc).format("YYYY-MM-DD"),
    percent: selectedRows[0].percent,
    sum_calc: selectedRows[0].sum_calc,
    sum_bonus: selectedRows[0].sum_bonus,
    sum_approved: selectedRows[0].sum_approved,
  };

  try {
    const response = await GRAPHIC.updateGraphic(data);
    console.log("Статус графика успешно обновлен :", response);
    ElMessage.success(`Статус ${selectedRows[0].graph_id} успешно изменен на "Рассчитано" `);
    store.pagination = null
    await store.getGraphicsFromAPIWithFilter();
  } catch (error) {
    console.error("Ошибка при обновлении статуса грфика:", error);
  }
};

//начисление графика
const accruedGraphic = async () => {
  const selectedRows = store.multipleSelectionGraphic
  console.log("selectedRows статус", selectedRows)
  const data = {
    graph_id: selectedRows[0].graph_id,
    ku_id: selectedRows[0].ku_id,
    status: "Начислено",
    entity_id: selectedRows[0].entity_id,
    entity_name: selectedRows[0].entity_name,
    vendor_name: selectedRows[0].vendor_name,
    vendor_id: selectedRows[0].vendor_id,
    period: selectedRows[0].period,
    date_start: dayjs(selectedRows[0].date_start).format("YYYY-MM-DD"),
    date_end: dayjs(selectedRows[0].date_end).format("YYYY-MM-DD"),
    date_calc: dayjs(selectedRows[0].date_calc).format("YYYY-MM-DD"),
    percent: selectedRows[0].percent,
    sum_calc: selectedRows[0].sum_calc,
    sum_bonus: selectedRows[0].sum_bonus,
    sum_approved: selectedRows[0].sum_bonus,
  };

  try {
    const response = await GRAPHIC.updateGraphic(data);
    console.log("Статус графика успешно обновлен :", response);
    ElMessage.success(`Статус ${selectedRows[0].graph_id} успешно изменен на "Начислено" `);
    store.pagination = null
    await store.getGraphicsFromAPIWithFilter();
  } catch (error) {
    console.error("Ошибка при обновлении статуса грфика:", error);
  }
};

//утверждение графика
const approveGraphic = async () => {
  const selectedRows = store.multipleSelectionGraphic
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

    date_start: dayjs(selectedRows[0].date_start).format("YYYY-MM-DD"),
    date_end: dayjs(selectedRows[0].date_end).format("YYYY-MM-DD"),
    date_calc: dayjs(selectedRows[0].date_calc).format("YYYY-MM-DD"),
    percent: selectedRows[0].percent,
    sum_calc: selectedRows[0].sum_calc,
    sum_bonus: selectedRows[0].sum_bonus,
    sum_approved: selectedRows[0].sum_approved,
  };

  try {
    const response = await GRAPHIC.updateGraphic(data);
    console.log("Статус графика успешно обновлен :", response);
    ElMessage.success(`Статус ${selectedRows[0].graph_id} успешно изменен на "Утверждено" `);
    store.pagination = null
    await store.getGraphicsFromAPIWithFilter();
  } catch (error) {
    console.error("Ошибка при обновлении статуса грфика:", error);
  }
};




//удаление графиков
const deleteGraphic = async () => {
  try {
    await ElMessageBox.confirm(
      'Вы действительно хотите удалить график расчета без возможности восстановления?',
      'Подтверждение удаления',
      {
        confirmButtonText: 'Да',
        cancelButtonText: 'Нет',
        type: 'warning',
      }
    );
    const selectedRows = store.multipleSelectionGraphic.map((row) => row.graph_id);
    try {
      for (const graph_id of selectedRows) {
        const results = await GRAPHIC.deleteGraphic({ graph_id });
        if (selectedRows.length === 1) {
          ElMessage.success(`График расчета ${selectedRows} успешно удален`);
        } else {
          ElMessage.success(`Успешно удалены графики №: ${selectedRows.join(", ")}`);
        }
      }
    } catch (error) {
      console.error("Ошибка при удалении строк:", error);
      ElMessage.error("Ошибка при удалении графика");
    } finally {
      store.dataGraphic = store.dataGraphic.filter(
        (row) => !selectedRows.includes(row.graph_id)
      );
      store.multipleSelectionGraphic = [];
    }
  } catch {
    ElMessage({
      type: 'info',
      message: 'Удаление отменено'
    });
  }
}
const isButtonsDisabled = computed(() => {
  return store.multipleSelectionGraphic.length > 1 || store.multipleSelectionGraphic.length === 0;
});
const isDeleteButtonDisabled = computed(() => {
  return store.multipleSelectionGraphic.length === 0;
});
const disableButtonTooltip = computed(() => {
  return store.multipleSelectionGraphic.length > 1 || store.multipleSelectionGraphic.length === 0 ? 'Кнопка заблокирована. Для доступа выберите только один график' : '';
});
const disableButtonDeleteTooltip = computed(() => {
  return store.multipleSelectionGraphic.length === 0 ? 'Кнопка заблокирована. Для доступа выберите график/и' : '';
});

const isButtonsDisabledAct = computed(() => {
  return store.multipleSelectionGraphic.length > 1 || store.multipleSelectionGraphic.length === 0 || store.multipleSelectionGraphic[0].status !== "Утверждено";
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
    const selectedRows = store.multipleSelectionGraphic.map((row) => row.graph_id);
    console.log("выбранный график", selectedRows[0])
    await store2.getGraphicDetailFromApi(selectedRows[0]);
    await store2.getNumeralsGraphFromApi(selectedRows[0]);
    console.log("store2.graphic[0].ku_id", store2.graphic[0].ku_id)
    await store2.getKuOfficialDetailFromApi(store2.graphic[0].ku_id)
    await store2.getKuDetailFromApi(store2.graphic[0].ku_id)
    await store2.getVendorDetailFromApi(store2.vendorid)
    await store2.getEntityDetailFromApi(store2.entityid)
    console.log("inn_kpp", store2.vendor.inn_kpp,)
    console.log("urastic_adress2", store2.entity.urastic_address,)
    console.log("bank_bik2", store2.entity.bank_bink,)
    const graphic = store2.graphic[0];
    if (!graphic) {
      console.error("Ошибка: данные не загружены");
      return;
    }
    if (store2.vendor && store2.entity) {
      console.log("inn_kpp", store2.vendor.inn_kpp);
      console.log("urastic_adress2", store2.entity.urastic_address);
      console.log("bank_bik2", store2.entity.bank_bink);

      loadFile("/templates/templateOfAct.docx", async (error, content) => {
        if (error) {
          throw error;
        }
        const zip = new PizZip(content);
        const doc = new Docxtemplater(zip, { paragraphLoop: true, linebreaks: true });
        doc.render({
          vendor_name: store2.vendor.urastic_name,
          counterparty_post: store2.official[0].counterparty_post,
          counterparty_name: store2.official[0].counterparty_name,
          counterparty_docu: store2.official[0].counterparty_docu,
          entity_name: store2.entity.urastic_name,
          entity_post: store2.official[0].entity_post,
          entity_fio: store2.official[0].entity_name,
          entity_docu: store2.official[0].entity_docu,

          date_start: dayjs(store2.graphic[0].date_start).format('DD.MM.YYYY'),
          date_end: dayjs(store2.graphic[0].date_end).format('DD.MM.YYYY'),
          sum_calc: store2.graphic[0].sum_calc,
          percent: store2.graphic[0].percent,
          sum_approved: store2.graphic[0].sum_approved,

          inn_kpp: store2.vendor.inn_kpp,
          urastic_adress: store2.vendor.urastic_adress,
          account: store2.vendor.account,
          bank_name: store2.vendor.bank_name,
          bank_bik: store2.vendor.bank_bik,
          corr_account: store2.vendor.corr_account,

          inn_kpp2: store2.entity.inn_kpp,
          urastic_adress2: store2.entity.urastic_address,
          account2: store2.entity.account,
          bank_name2: store2.entity.bank_name,
          bank_bik2: store2.entity.bank_bink,
          corr_account2: store2.entity.corr_account,

          numerals: store2.numerals,
          sumQty: store2.sumQty,
          product_type: store2.kuId.product_type,
          docu_number: store2.kuId.docu_number,
          docu_date: dayjs(store2.kuId.docu_date).format('DD.MM.YYYY'),
        });

        const out = doc.getZip().generate({
          type: "blob",
          mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
        });
        saveAs(out, "Акт предоставления вознаграждения по " + store2.kuid + " поставщика " + store2.vendor.urastic_name + ".docx");
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
