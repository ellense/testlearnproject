<template>
  <el-dialog v-model="useReportStore().dialogFormReportActInvoice" title="Акт предоставления вознаграждения" close-on-click-modal >
    <div>
        <button @click="renderDoc">
      Скачать акт в формате docx
    </button>
    </div></el-dialog>
</template>

<script setup lang="ts">
import Docxtemplater from "docxtemplater";
import PizZip from "pizzip";
import PizZipUtils from "pizzip/utils/index.js";
import { saveAs } from "file-saver";
import { useReportStore } from "~~/stores/reportStore";

function loadFile(url: string, callback: (error: any, content: any) => void) {
  PizZipUtils.getBinaryContent(url, callback);
}

const renderDoc = () => {
  loadFile("/templates/templateOfAct.docx", (error, content) => {
    if (error) {
      throw error;
    }
    const zip = new PizZip(content);
    const doc = new Docxtemplater(zip, { paragraphLoop: true, linebreaks: true });
    doc.render({
      vendor_name: "АО ууу",
      counterparty_post: "директора",
      counterparty_name: "Силюк В.Р.",
      counterparty_docu: "документа",
      entity_name: "ООО группа",
      entity_post: "директора",
      entity_fio: "Сараевой Е.П.",
      entity_docu : "устава",
      date_start: "02.02.2024",
      date_end: "02.03.2024",
      sum_calc: "20000",
      percent: "10",
      sum_bonus: "2000",
      inn_kpp: "734736756",
      urastic_adress: "москва",
      account: "877976",
      bank_name: "сбербанк",
      bank_bik: "сбербанк",
      corr_account: "у75464558",
      inn_kpp2: "6546758",
      urastic_adress2: "Томск",
      account2: "5685685",
      bank_name2: "ВТБ",
      bank_bik2: "5845",
      corr_account2: "56365865",
    });
    
    const out = doc.getZip().generate({
      type: "blob",
      mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    });
    // Output the document using Data-URI
    saveAs(out, "Акт предоставления вознаграждения.docx");
  });
};
</script>

<style scoped>

</style>
