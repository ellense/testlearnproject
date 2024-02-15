<template>
  <div class="directoryBar">
    <div>
      <el-button type="primary" plain @click="redirectToCreatePage" :disabled="isCreateButtonDisabled">Создать
        КУ</el-button>
      <el-button type="primary" plain @click="addGraphic()" :loading="loading"
        :disabled="isButtonsDisabled">Создать
        график</el-button>
      <el-button type="success" plain @click="ApproveKu()" :disabled="isButtonsDisabled">Утвердить</el-button>
      <el-button type="danger" plain @click="CancelKu()" :disabled="isButtonsDisabled">Отменить</el-button>
      <el-button type="danger" plain @click="deleteKu()" :disabled="isDeleteButtonDisabled">Удалить</el-button>
    </div>
    <div class="directoryBar_filter">
      <el-select v-model="LegalEntity" multiple clearable filterable collapse-tags collapse-tags-tooltip
        :max-collapse-tags="3" placeholder="Фильтр по юридическому лицу" style="width: 400px" @change="changeLegalEntity">
        <el-option v-for="item in LegalEntityList" :key="item" :label="item" :value="item" />
      </el-select>
      <el-input v-model="searchQuery" placeholder="Фильтр по поставщику" style="width: 400px;"></el-input>
    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useKuStore } from "~~/stores/kuStore";
import { useRouter } from "vue-router";
import "dayjs/locale/ru";
import type { IKuPostGraphic } from "~/utils/types/directoryTypes";
const store = useKuStore();
const router = useRouter();
const loading = ref(false);
const { legalEntity } = storeToRefs(useKuStore());


//для поиска
const searchQuery = ref('');
watch(searchQuery, (newValue: string) => {
  useKuStore().performSearchKu(newValue);
});


//для фильтрации
const { filterKuValue } = storeToRefs(useKuStore())
const triggerFilter = ref<boolean>(true);
const toggleTriggerFilter = () => (triggerFilter.value = !triggerFilter.value);

const LegalEntity = ref<string[]>(filterKuValue.value.entity_id || []);
const LegalEntityList = ref<string[]>(legalEntity.value);

const changeLegalEntity = () => {
  useKuStore().pagination = null;
  useKuStore().setFilterValue('entity_id', LegalEntity.value);
  console.log('shopLegalEntity.value:', LegalEntity.value);

  toggleTriggerFilter();
};

watch(legalEntity, (value) => {
  LegalEntityList.value = value;
});

watch(triggerFilter, () => {
  useKuStore().getKuFromAPIWithFilter();
});

onMounted(() => {
  useKuStore().getLegalEntityFromApi();
});

//кнопка создать ку
const redirectToCreatePage = () => {
  router.push("kuAdd");
};

const isCreateButtonDisabled = computed(() => {
  return store.multipleSelection.length > 0;
});
const isButtonsDisabled = computed(() => {
  return store.multipleSelection.length > 1 || store.multipleSelection.length === 0;
});
const isDeleteButtonDisabled = computed(() => {
  return  store.multipleSelection.length === 0;
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
    status: "Отменено",
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
    await useKuStore().getKuFromAPIWithFilter();
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
    await useKuStore().getKuFromAPIWithFilter();
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
    entity_id: selectedRows[0].entity_id,
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
  await useKuStore().getKuFromAPIWithFilter();
}

</script>

<style scoped></style>
