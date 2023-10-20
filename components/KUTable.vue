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
      <el-table-column property="id" label="" width="120" />
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
      <el-table-column property="dateActual" label="Дата актуальности" />
    </el-table>
  </el-scrollbar>
</template>

<script lang="ts" setup>
import { useKuTableStore } from "~~/stores/kuTableStore";
import { useRouter } from "vue-router";
import moment from "moment";
const store = useKuTableStore();
const router = useRouter();

const redirectToCreatePage = () => {
  router.push("/addKu");
};

const messageClose = () => {
  ElMessage({
    message: "График успешно создан",
    type: "success",
  });
};

const getLastDayOfMonth = (date: string | Date) => {
  const lastDay = new Date(date); // Создаем копию исходной даты
  lastDay.setMonth(lastDay.getMonth() + 1, 1); // Устанавливаем день в 1 числа следующего месяца
  lastDay.setDate(lastDay.getDate() - 1); // Вычитаем 1 день, чтобы получить последний день текущего месяца
  return lastDay;
};

const addGraphic = () => {
  const selectedRows = store.multipleSelection; // Получаем выделенные элементы

  selectedRows.forEach((selectedRow) => {
    const dateStart = moment(selectedRow.dateStart, "DD.MM.YYYY").toDate();
    const dateActual = moment(selectedRow.dateActual, "DD.MM.YYYY").toDate();

    const numMonths =
      (dateActual.getFullYear() - dateStart.getFullYear()) * 12 +
      (dateActual.getMonth() - dateStart.getMonth());

    for (let i = 0; i < numMonths + 1; i++) {
      const nextMonthFirstDay = (i: moment.DurationInputArg1) => {return moment(dateStart)
        .add(i, "month")
        .startOf("month")
        .format("DD.MM.YYYY");}

      if (i == 0) {//1 строка цикла
        store.addgraphic({
          id: store.tableDataGraphic.length + 1,
          kuNumber: selectedRow.kuNumber,
          provider: selectedRow.provider,
          type: selectedRow.type,
          dateStart: selectedRow.dateStart,
          dateEnd: getLastDayOfMonth(dateStart).toLocaleDateString("rus"),
          dateCalc: nextMonthFirstDay(1),
          percent: selectedRow.percent,
          base: null,
          calculated: null,
          approved: null,
        });
      } else if (i > 0 && i < numMonths) {//середина цикла
        dateStart.setMonth(dateStart.getMonth() + 1);
        dateStart.setDate(1);
        store.addgraphic({
          id: store.tableDataGraphic.length + 1,
          kuNumber: selectedRow.kuNumber,
          provider: selectedRow.provider,
          type: selectedRow.type,
          dateStart: dateStart.toLocaleDateString("rus"),
          dateEnd: getLastDayOfMonth(dateStart).toLocaleDateString("rus"),
          dateCalc: nextMonthFirstDay(1),
          percent: selectedRow.percent,
          base: null,
          calculated: null,
          approved: null,
        });
      } else if (i == numMonths) { // последняя строка цикла
        store.addgraphic({
          id: store.tableDataGraphic.length + 1,
          kuNumber: selectedRow.kuNumber,
          provider: selectedRow.provider,
          type: selectedRow.type,
          dateStart: dateStart.toLocaleDateString("rus"),
          dateEnd: selectedRow.dateActual,
          dateCalc: nextMonthFirstDay(2),
          percent: selectedRow.percent,
          base: null,
          calculated: null,
          approved: null,
        });
      }
    }
    store.addgraphic({ //пустая строка для визуального разделения, потом можно разделение реализовать по-другому
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
    messageClose();
  });


};

store.initializeTableData();
</script>
