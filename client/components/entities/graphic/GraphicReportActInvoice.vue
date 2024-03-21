<template>
    <div>
        <button @click="renderDoc">
      Render docx template
    </button>
    </div>
</template>

<script setup lang="ts">
import Docxtemplater from "docxtemplater";
import PizZip from "pizzip";
import PizZipUtils from "pizzip/utils/index.js";
import { saveAs } from "file-saver";

function loadFile(url: string, callback: (error: any, content: any) => void) {
  PizZipUtils.getBinaryContent(url, callback);
}

const renderDoc = () => {
  loadFile("/templates/contract-template.docx", (error, content) => {
    if (error) {
      throw error;
    }
    const zip = new PizZip(content);
    const doc = new Docxtemplater(zip, { paragraphLoop: true, linebreaks: true });
    doc.render({
      first_name: "John",
      last_name: "Doe",
      phone: "0652455478",
      description: "New Website"
    });
    
    const out = doc.getZip().generate({
      type: "blob",
      mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    });
    // Output the document using Data-URI
    saveAs(out, "output.docx");
  });
};
</script>

<style scoped>

</style>
