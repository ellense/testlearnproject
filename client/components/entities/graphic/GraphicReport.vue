<template>
  <el-dialog v-model="useReportStore().dialogForm" title="Предварительный отчет по расчету" close-on-click-modal>
    <div class="reportTableWrapper__table">
      <!-- v-if="tableData.length > 0" -->
      <vue-excel-editor v-model="tableDataReport" :readonly="true" :disable-panel-filter="true"
        :disable-panel-setting="true" :localized-label="localizedExcelTableLabel">
        <vue-excel-column v-for="column in columnTable" :key="column.field" :field="column.field" :label="column.label"
          :type="column.type" :width="`${column.width}px`" :summary="column.summary" :init-style="column.style" />
      </vue-excel-editor>
      <div v-if="!getGraphicDone">Данных с такими параметрами нет</div>
    </div>
    <template #footer>
      <span>
        <el-button @click="useReportStore().dialogForm = false">Отмена</el-button>
        <el-button type="primary" @click="exportAsExcel()">Экспортировать в Excel</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { localizedExcelTableLabel } from "~/composables/localizedExcelTable";
import { storeToRefs } from "pinia";
import { useReportStore } from "~~/stores/reportStore";
import type { IGraphicInfo } from "~/utils/types/directoryTypes";
import { useKuStore } from "~/stores/kuStore";
import { excel, type Range } from "~/composables/excel";
import { dayjs } from "element-plus";
const { utils, writeFile, getBorderCell, getColumnById } = excel;
const {
  printReportToggle,
  graphic,
  filterValue,
  getGraphicDone,
  getGraphicInfo,
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
    field: "vendor_id",
    label: "№ накладной",
    type: "string",
    width: 100,
  },
  {
    field: "ku_id",
    label: "Дата накладной",
    type: "string",
    width: 250,
  },
  {
    field: "period",
    label: "№ закупки",
    type: "string",
    width: 250,
  },
  {
    field: "percent",
    label: "Дата закупки",
    type: "string",
    width: 130,
  },
  {
    field: "status",
    label: "Статус документа",
    type: "string",
    width: 170,
  },
  {
    field: "status",
    label: "Кол-во (шт,л,кг.)",
    type: "string",
    width: 170,
  },
  {
    field: "status",
    label: "Сумма без НДС",
    type: "string",
    width: 170,
    // summ: true,
    // summary: 'sum',
    style: { fontWeight: 'bold' }
  },
];

const tableDataReport = ref<IGraphicInfo[]>(getGraphicInfo.value);

watch(getGraphicInfo, (value) => {
  tableDataReport.value = value || [];
  console.log("Новые данные получены из хранилища:", tableDataReport.value);
});

// const tableDataReport = ref<GraphicForExcelReportInvoice[]>(getInvoiceInfo.value);

// watch(getInvoiceInfo, (value) => {
//   tableDataReport.value = value || [];
//   console.log("Новые данные получены из хранилища:", tableDataReport.value);
// });

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

    useReportStore().graphic.forEach((row) => {
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
            v: undefined, // или другое значение, которое вы хотите использовать для null
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
          f: `SUM(${columnName}${dataSheet.length - useReportStore().graphic.length + 1
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
  utils.book_append_sheet(wb, ws, "Акт сверки с поставщиками");
  writeFile(wb, "Акт сверки с поставщиками.xlsx");
}

</script>

<style scoped></style>
