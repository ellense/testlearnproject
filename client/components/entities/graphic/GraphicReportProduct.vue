<template>
    <el-dialog v-model="useReportStore().dialogFormReportProduct" title="Предварительный отчет по расчету c поставщиком по товарам" close-on-click-modal>
      <div class="reportTableWrapper__table" >
        <vue-excel-editor v-model="tableDataReport" 
        :localized-label="localizedExcelTableLabel"  height="500px">
          <vue-excel-column v-for="column in columnTable" :key="column.field" :field="column.field" :label="column.label"
            :type="column.type" :width="`${column.width}px`" :summary="column.summary" :init-style="column.style"  />
        </vue-excel-editor>
        <div v-if="!getGraphicDone">Данных с такими параметрами нет</div>
      </div>
      <template #footer>
        <span>
          <el-button @click="useReportStore().dialogFormReportProduct = false">Отмена</el-button>
          <el-button type="primary" @click="exportAsExcel()">Экспортировать в Excel</el-button>
        </span>
      </template>
    </el-dialog>
  </template>
  
  <script setup lang="ts">
  import { localizedExcelTableLabel } from "~/composables/localizedExcelTable";
  import { storeToRefs } from "pinia";
  import { useReportStore } from "~~/stores/reportStore";
  import type { GraphicForExcelReportProduct, } from "~/utils/types/directoryTypes";
  import { excel, type Range } from "~/composables/excel";
  import { dayjs } from "element-plus";
  const { utils, writeFile, getBorderCell, getColumnById } = excel;
  const {
    getGraphicDone,
    getProductInfo,
  } = storeToRefs(useReportStore());
  interface ColumnTable {
    field: string;
    label: string;
    type: string;
    width: number;
    summ?: boolean;
    summary?: "sum" | "min" | "max" | "avg" | "count";
    style?: Object;
  }
  const columnTable: ColumnTable[] = [
  {
      field: "category_name",
      label: "Категория",
      type: "string",
      width: 300,
    },
    {
      field: "product_id",
      label: "Код товара",
      type: "string",
      width: 100,
    },
    {
      field: "product_name",
      label: "Наименование товара",
      type: "string",
      width: 300,
    },
    {
      field: "producer_name",
      label: "Производитель",
      type: "string",
      width: 200,
    },
    {
      field: "product_qty",
      label: "Количество",
      type: "number",
      width: 100,
      summ: true,
      summary: 'sum',
      style: { fontWeight: 'bold' }
    },
    {
      field: "amount",
      label: "Сумма без НДС",
      type: "number",
      width: 150,
      summ: true,
      summary: 'sum',
      style: { fontWeight: 'bold' }
    },
  ];

  const tableDataReport = ref<GraphicForExcelReportProduct[]>(getProductInfo.value);
  
  watch(getProductInfo, (value) => {
    tableDataReport.value = value || [];
    console.log("Новые данные invoices получены из хранилища:", tableDataReport.value);
  });
  
  function exportAsExcel() {
    const dataSheet: CellObject[][] = [];
    const header = [
      {
        name: "Дата отчета:",
        value: dayjs().format('DD.MM.YYYY'),
      },
      { name: "Период:", value: "" },
      { name: "Контрагент:", value: "" },
      { name: "Поставщик:", value: "" },
      { name: "КУ:", value: "" },
    ];
  
    // Установим значения в header из хранилища перед экспортом
    const graphicData = useReportStore().graphic[0]; // Первый элемент массива graphic
    if (graphicData) {
      const period = `${dayjs(graphicData.date_start).format('DD.MM.YYYY')} - ${dayjs(graphicData.date_end).format('DD.MM.YYYY')}`;
      header[1].value = period;
      header[2].value = graphicData.vendor_name;
      header[3].value = graphicData.vendor_id;
      header[4].value = graphicData.ku_id;
    }
  
    function initDataSheet() {
      header.forEach((item, index) => {
        dataSheet.push([
          {
            v: item.name,
            t: "s",
          },
          {
            v: item.value?.toString(),
            t: "s",
          },
        ]);
      });
      dataSheet.push([]);
  
      const columnHeader: CellObject[] = [];
  
      columnTable.forEach((column) => {
        columnHeader.push({
          v: column.label,
          t: "s",
          s: {
            border: getBorderCell("trbl"),
            fill: { fgColor: { rgb: "e9ecef" } },
          },
        });
      });
      dataSheet.push(columnHeader);
  
      useReportStore().products.forEach((row) => {
        const newRow: CellObject[] = [];
        columnTable.forEach((column) => {
          const cellValue = row[column.field as keyof typeof row];
          if (cellValue !== null && cellValue !== undefined) {
            if (column.summ) {
              newRow.push({
                v: parseFloat(cellValue as string),
                t: "n",
              });
            } else {
              newRow.push({
                v: cellValue as string,
                t: "s",
              });
            }
          } else {
            newRow.push({
              v: "!!", // или другое значение, которое вы хотите использовать для null
              t: "s",
            });
          }
        });
        dataSheet.push(newRow);
      });
  
      const summRow: CellObject[] = [];
      columnTable.forEach((column, index) => {
        if (column.summ) {
          const columnName = getColumnById(index + 1);
          summRow.push({
            t: "n",
            f: `SUM(${columnName}${dataSheet.length - useReportStore().products.length + 1
              }:${columnName}${dataSheet.length})`,
            s: {
              font: { bold: true },
              border: getBorderCell("t", "000000"),
            },
          });
        } else {
          summRow.push({
            v: "",
            t: "s",
          });
        }
      });
      dataSheet.push(summRow);
    }
  
    initDataSheet();
  
    const wb = utils.book_new();
    const ws = utils.aoa_to_sheet(dataSheet);
    const cellMerges: Range[] = [];
    header.forEach((item, index) => {
      cellMerges.push({
        s: { c: 1, r: index },
        e: { c: columnTable.length - 1, r: index },
      });
    });
    ws["!merges"] = cellMerges;
    const colsInfo: ColInfo[] = [];
    columnTable.forEach((column, index) => {
      colsInfo.push({ wch: column.width / 6 });
    });
    ws["!cols"] = colsInfo; // размеры колонок
    utils.book_append_sheet(wb, ws, "Акт с поставщиком по товарам");
    writeFile(wb, "Акт сверки взаиморасчетов с "+ graphicData.vendor_name + " по товарам " + graphicData.ku_id + ".xlsx");
  }
  
  </script>
  
  <style scoped></style>
  