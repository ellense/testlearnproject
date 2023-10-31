<template>
  <div class="buttonBar">
    <div class="buttonBar_left">
      <el-button @click="redirectToCreatePage">Добавить</el-button>
      <el-button @click="addGraphic()">Создать график</el-button>
      <el-button @click="store.deleteSelectedRows">Удалить</el-button>
    </div>
    <div class="buttonBar_search">
      <el-input
        v-model="store.search"
        placeholder="Поиск по поставщику"
        style="width: 200px"
      />
    </div>
  </div>
  <el-scrollbar class="scrollTable">
    <el-table
      :data="store.filteredTableData"
      style="width: 100%"
      @selection-change="store.handleSelectionChange"
      height="calc(100vh - 160px)"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column property="id" label="" width="50" />
      <el-table-column property="kuNumber" label="Номер КУ" width="120" />
      <el-table-column property="percent" label="Процент" width="120" />
      <el-table-column property="provider" label="Поставщик" width="120" />
      <el-table-column property="type" label="Тип графика" width="120" />
      <el-table-column
        property="dateStart"
        label="Начальная дата"
        width="140"
      />
      <el-table-column property="dateEnd" label="Конечная дата" width="130" />
      <el-table-column property="dateActual" label="Дата актуальности" width="160"/>
      <el-table-column property="base" label="База" />
    </el-table>
  </el-scrollbar>
</template>

<script lang="ts" setup>
import { useKuTableStore } from "~~/stores/kuTableStore";

import { useRouter } from "vue-router";
import dayjs from "dayjs";
import "dayjs/locale/ru";
const store = useKuTableStore();
const router = useRouter();

const redirectToCreatePage = () => {
  router.push("/addKu");
};

const addGraphic = () => {
  const selectedRows = store.multipleSelection;
  const messageClose = () => {
    if (selectedRows.length === 1) {
      ElMessage({
        message: "График успешно создан.",
        type: "success",
      });
    } else if (selectedRows.length > 1) {
      ElMessage({
        message: "Графики успешно создан.",
        type: "success",
      });
    } else if (selectedRows.length === 0) {
      ElMessage.error("Коммерческое условие не выбрано.");
    }
  };

  selectedRows.forEach((selectedRow) => {
    const dateStart = dayjs(selectedRow.dateStart, "DD.MM.YYYY");
    const dateActual = dayjs(selectedRow.dateActual, "DD.MM.YYYY");
    const dateEnd = dayjs(selectedRow.dateEnd, "DD.MM.YYYY");

    const numType = () => {
      if (selectedRow.type === "Месяц") {
        return 1;
      } else if (selectedRow.type === "Квартал") {
        return 3;
      } else if (selectedRow.type === "Полгода") {
        return 6;
      } else if (selectedRow.type === "Год") {
        return 12;
      } else {
        return 1;
      }
    };

    const getLastDayOfMonth = (date: dayjs.Dayjs) => {
      const lastDay = date.clone().add(numType(), "month").startOf("month").subtract(1, "day");
      return lastDay;
    };

    const numMonths =
      (dateActual.year() - dateStart.year()) * 12 +
      (dateActual.month() - dateStart.month());

    for (let i = 0; i < numMonths / numType() + 1; i++) {
      const nextMonthFirstDay = (i: number) => {
        return dateStart.add(numType() + i, "month").startOf("month").format("DD.MM.YYYY");
      };

      if (i === 0) {
        store.addgraphic({
          id: store.tableDataGraphic.length + 1,
          kuNumber: selectedRow.kuNumber,
          provider: selectedRow.provider,
          type: selectedRow.type,
          dateStart: selectedRow.dateStart,
          dateEnd: getLastDayOfMonth(dateStart).format("DD.MM.YYYY"),
          dateCalc: nextMonthFirstDay(0),
          percent: selectedRow.percent,
          base: selectedRow.base,
          calculated: null,
          approved: null,
        });
      } else if (i > 0 && i < numMonths / numType()) {
        dateStart.add(numType(), "month").startOf("month");
        store.addgraphic({
          id: store.tableDataGraphic.length + 1,
          kuNumber: selectedRow.kuNumber,
          provider: selectedRow.provider,
          type: selectedRow.type,
          dateStart: dateStart.format("DD.MM.YYYY"),
          dateEnd: getLastDayOfMonth(dateStart).format("DD.MM.YYYY"),
          dateCalc: nextMonthFirstDay(0),
          percent: selectedRow.percent,
          base: selectedRow.base,
          calculated: null,
          approved: null,
        });
      } else if (i === numMonths / numType()) {
        store.addgraphic({
          id: store.tableDataGraphic.length + 1,
          kuNumber: selectedRow.kuNumber,
          provider: selectedRow.provider,
          type: selectedRow.type,
          dateStart: dateStart.format("DD.MM.YYYY"),
          dateEnd: selectedRow.dateActual,
          dateCalc: nextMonthFirstDay(1),
          percent: selectedRow.percent,
          base: selectedRow.base,
          calculated: null,
          approved: null,
        });
      }
    }

    store.addgraphic({
      id: 0,
      kuNumber: "",
      provider: "",
      type: "",
      dateStart: "",
      dateEnd: "",
      dateCalc: "",
      percent: null,
      base: null,
      calculated: null,
      approved: null,
    });
  });
  messageClose();
};

</script>
