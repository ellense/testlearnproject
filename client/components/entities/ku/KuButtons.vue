<template>
  <div class="buttonBar">
    <div class="buttonBar_left">
      <el-button @click="redirectToCreatePage">Добавить</el-button>
      <el-button @click="addGraphic()">Создать график</el-button>
      <el-button @click="deleteKu()">Удалить</el-button>
    </div>
    <div class="buttonBar_search">
      <el-input
        v-model="store.search"
        placeholder="Поиск по поставщику"
        style="width: 200px"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useKuTableStore } from "~~/stores/kuTableStore";

import { useRouter } from "vue-router";
import dayjs from "dayjs";
import "dayjs/locale/ru";
const store = useKuTableStore();
const router = useRouter();

const redirectToCreatePage = () => {
  router.push("kuAdd");
};

const deleteKu = () => {
  ElMessage.success("Коммерческое условвие успешно удалено");
};

const addGraphic = () => {
  const selectedRows = store.multipleSelection;
  const messageClose = () => {
    if (selectedRows.length === 1) {
      ElMessage.success("График успешно создан.");
    } else if (selectedRows.length > 1) {
      ElMessage.success("Графики успешно созданы.");
    } else if (selectedRows.length === 0) {
      ElMessage.error("Коммерческое условие не выбрано.");
    }
  };

  selectedRows.forEach((selectedRow) => {
    const dateStart = dayjs(selectedRow.date_start).toDate();
    const dateEnd = dayjs(selectedRow.date_end).toDate();
    let dateActual;

    if (dayjs(dateEnd).diff(dateStart, "years") > 2) {
      dateActual = dayjs(dateStart).add(2, "years").toDate();
    } else {
      dateActual = dayjs(dateEnd).toDate();
    }
    const numType = () => {
      if (selectedRow.period === "Месяц") {
        return 1;
      } else if (selectedRow.period === "Квартал") {
        return 3;
      } else if (selectedRow.period === "Полгода") {
        return 6;
      } else if (selectedRow.period === "Год") {
        return 12;
      } else {
        return 1;
      }
    };

    const getLastDayOfMonth = (date: dayjs.Dayjs) => {
      const lastDay = date
        .clone()
        .add(numType(), "month")
        .startOf("month")
        .subtract(1, "day");
      return lastDay;
    };

    const numMonths =
      (dateActual.getFullYear() - dateStart.getFullYear()) * 12 +
      (dateActual.getMonth() - dateStart.getMonth());

    for (let i = 0; i < numMonths / numType() + 1; i++) {
      const nextMonthFirstDay = (i: number) => {
        return dayjs(dateStart)
          .add(numType() + i, "month")
          .startOf("month")
          .format("DD.MM.YYYY");
      };
      const dateCalc1 = nextMonthFirstDay(0);

      const sumBonus1 =
        dateActual &&
        selectedRow.percent !== null &&
        selectedRow.base !== null &&
        dayjs(dateCalc1).isBefore(dayjs(), "day")
          ? (selectedRow.percent * selectedRow.base) / 100
          : null;
      if (i === 0) {
        store.addgraphic({
          graph_id: store.tableDataGraphic.length + 1,
          ku: selectedRow.ku_id,
          vendor: selectedRow.vendor,
          period: selectedRow.period,
          date_start: dayjs(selectedRow.date_start).format("DD.MM.YYYY"),
          date_end: getLastDayOfMonth(dayjs(dateStart)).format("DD.MM.YYYY"),
          date_calc: dateCalc1,
          percent: selectedRow.percent,
          sum_calc: selectedRow.base,
          sum_bonus: sumBonus1,
        });
      } else if (i > 0 && i < numMonths / numType()) {
        let updatedDateStart = dayjs(dateStart)
          .add(numType() * i, "month")
          .startOf("month");
        const dateCalc2 = nextMonthFirstDay(i);

        const sumBonus2 =
          dateActual &&
          selectedRow.percent !== null &&
          selectedRow.base !== null &&
          dayjs(dateCalc2).isBefore(dayjs(), "day")
            ? (selectedRow.percent * selectedRow.base) / 100
            : null;

        store.addgraphic({
          graph_id: store.tableDataGraphic.length + 1,
          ku: selectedRow.ku_id,
          vendor: selectedRow.vendor,
          period: selectedRow.period,
          date_start: dayjs(updatedDateStart).format("DD.MM.YYYY"),
          date_end: getLastDayOfMonth(dayjs(updatedDateStart)).format(
            "DD.MM.YYYY"
          ),
          date_calc: dateCalc2,
          percent: selectedRow.percent,
          sum_calc: selectedRow.base,
          sum_bonus: sumBonus2,
        });
      } else if (i === numMonths / numType()) {
        let updatedDateStart2 = dayjs(dateStart)
          .add(numType() * i, "month")
          .startOf("month");
        store.addgraphic({
          graph_id: store.tableDataGraphic.length + 1,
          ku: selectedRow.ku_id,
          vendor: selectedRow.vendor,
          period: selectedRow.period,
          date_start: dayjs(updatedDateStart2).format("DD.MM.YYYY"),
          date_end: dayjs(dateActual).format("DD.MM.YYYY"),
          date_calc: nextMonthFirstDay(i),
          percent: selectedRow.percent,
          sum_calc: selectedRow.base,
          sum_bonus: null,
        });
      }
    }
  });
  messageClose();
};
</script>

<style scoped></style>
