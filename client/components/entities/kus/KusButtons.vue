<template>
  <div class="buttonBar">
    <div class="buttonBar_left">
      <el-button @click="redirectToCreatePage" :disabled="isCreateButtonDisabled">Создать</el-button>
      <el-button @click="addGraphic()" :loading="loading" :disabled="isCreateGraphicButtonDisabled">Создать
        график</el-button>
      <el-button @click="ApproveKu()">Утвердить</el-button>
      <el-button @click="CancelKu()">Отменить</el-button>
    </div>
    <div class="buttonBar_search">
      <el-input v-model="store.search" placeholder="Поиск по поставщику" style="width: 200px" />
    </div>
  </div>
</template>

<script setup lang="ts">
import { useKuStore } from "~~/stores/kuStore";
import { useRouter } from "vue-router";
import dayjs from "dayjs";
import "dayjs/locale/ru";
import type { IKuPostGraphic } from "~/utils/types/directoryTypes";
const store = useKuStore();
const router = useRouter();
const loading = ref(false);

const redirectToCreatePage = () => {
  router.push("kuAdd");
};

const isCreateButtonDisabled = computed(() => {
  return store.multipleSelection.length > 0;
});
const isCreateGraphicButtonDisabled = computed(() => {
  return store.multipleSelection.length > 1
});


// Функция удаления выбранных строк
const deleteKu = async () => {
  const selectedRows = store.multipleSelection.map((row) => row.ku_id);

  try {
    for (const ku_id of selectedRows) {
      const results = await KU.deleteKu({ ku_id });
      console.log("успешно удалилось", results);
    }
    if (selectedRows.length == 1)
      ElMessage.success(`Коммерческое условие ${selectedRows} удалено`);
    else ElMessage.success(`Успешно удалено: ${selectedRows.join(", ")}`);
  } catch (error) {
    console.error("Ошибка при удалении строк:", error);
    ElMessage.error("Ошибка при удалении коммерческого условия");
  } finally {
    store.tableData = store.tableData.filter(
      (row) => !selectedRows.includes(row.ku_id)
    );
    store.multipleSelection = [];
  }
};
const CancelKu = async () => {
  const selectedRows = store.multipleSelection
  const data = {
    ku_id: selectedRows[0].ku_id,
    status: "Запланировано",
  };
  const data2 = {
    ku_id: selectedRows[0].ku_id,
    status: "Отменен",
    entity_id: selectedRows[0].entity_id,
    vendor_id: selectedRows[0].vendor_id,
    period: selectedRows[0].period,
    date_start: selectedRows[0].date_start,
    date_end: selectedRows[0].date_end,
    percent: selectedRows[0].percent,
  };
  try {
    const response = await KU.deleteGraphRow(data);
    console.log("строки графика успешно удалены:", response);
    const response2 = await KU.updateKuStatus(data2);
    console.log("строки графика успешно удалены:", response2);
    await store.fetchKuList({
      entity_id: "",
      ku_id: "",
      vendor_id: "",
      period: "",
      date_start: new Date(),
      date_end: new Date(),
      graph_exists: null,
      status: "",
      base: 100,
      percent: null,
    });
  } catch (error) {
    console.error("Ошибка при удалении строк графика:", error);
  }
};

//утверждение ку
const ApproveKu = async () => {
  const selectedRows = store.multipleSelection
  const data = {
    ku_id: selectedRows[0].ku_id,
    status: "Действует",
    entity_id: selectedRows[0].entity_id,
    vendor_id: selectedRows[0].vendor_id,
    period: selectedRows[0].period,
    date_start: selectedRows[0].date_start,
    date_end: selectedRows[0].date_end,
    percent: selectedRows[0].percent,
  };

  try {
    const response = await KU.updateKuStatus(data);
    console.log("Статус успешно обновлен:", response);
    await store.fetchKuList({
      entity_id: "",
      ku_id: "",
      vendor_id: "",
      period: "",
      date_start: new Date(),
      date_end: new Date(),
      graph_exists: null,
      status: "",
      base: 100,
      percent: null,
    });
  } catch (error) {
    console.error("Ошибка при обновлении статуса:", error);
  }
};

//создание графика
const addGraphic = async () => {
  const selectedRows = store.multipleSelection
  if (selectedRows[0].status != "Действует") {
    ElMessage.error("Создать график можно только для действующего коммерческого условия");
    return;
  }
  const newItem: IKuPostGraphic = {
    ku_id: selectedRows[0].ku_id,
    entity_id: selectedRows.map((row) => row.entity_id),
    vendor_id: selectedRows[0].vendor_id,
    period: selectedRows[0].period,
    date_start: selectedRows[0].date_start,
    date_end: selectedRows[0].date_end,
    status: selectedRows[0].status,
    percent: selectedRows[0].percent,
  };
  loading.value = true;
  try {
    const response = await GRAPHIC.postGraphic(newItem);
    if (response) {
      console.log("Экземпляр успешно отправлен на бэкенд:", response);
      ElMessage.success(`График расчета для ${newItem.ku_id} успешно создан.`);
    } else {
      console.error("Не удалось отправить экземпляр на бэкенд");
      ElMessage.error("Возникла ошибка. График расчета не создан.");
    }
  } catch (error) {
    ElMessage.error("Возникла ошибка. График расчета не создан.");
    console.log("Экземпляр успешно отправлен на бэкенд:", newItem);
    console.error("Ошибка при отправке экземпляра на бэкенд:", error);
  } finally {
    loading.value = false;
  }
}

</script>

<style scoped></style>
