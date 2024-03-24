<template>
  <div class="directoryBar">
    <div class="directoryBar_filter">
      <el-button type="primary" plain @click="redirectToCreatePage" size="small" 
       >Создать
        КУ</el-button>
      <el-button type="primary" plain @click="addGraphic()" :loading="loading" :disabled="isButtonsDisabled"
        :title="disableButtonTooltip" style="margin: 0;" size="small">Создать
        график</el-button>
      <el-dropdown :disabled="isButtonsDisabled">
        <el-button type="primary" plain :disabled="isButtonsDisabled" :title="disableButtonTooltip" size="small">
          Изменить статус<el-icon class="el-icon--right"><arrow-down /></el-icon>
        </el-button>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item><el-button @click="ApproveKu()" link type="success" size="small">Утвердить</el-button></el-dropdown-item>
            <el-dropdown-item><el-button @click="CancelKu()" link type="danger" size="small">Отменить</el-button></el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <el-button type="danger" plain @click="deleteKu()" :disabled="isDeleteButtonDisabled"
        :title="disableButtonTooltip" size="small">Удалить</el-button>

    </div>
    <!-- <div class="directoryBar_filter">
      <el-select v-model="LegalEntity" multiple clearable filterable collapse-tags collapse-tags-tooltip
        :max-collapse-tags="3" placeholder="Фильтр по юр. лицу" style="width: 300px" @change="changeLegalEntity" size="small">
        <el-option v-for="item in LegalEntityList" :key="item" :label="item" :value="item" />
      </el-select>
      <el-input v-model="searchQuery" placeholder="Фильтр по поставщику" style="width: 300px;" size="small"></el-input>
    </div> -->
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { ArrowDown } from '@element-plus/icons-vue'
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
  useKuStore().getLegalEntityFilterForKuFromApi();
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
  return store.multipleSelection.length === 0;
});

// Функция удаления выбранных строк
const deleteKu = async () => {
  const selectedRows = store.multipleSelection.map((row) => row.ku_id);

  try {
    for (const ku_id of selectedRows) {
      const results = await KU.deleteKu({ ku_id });
      console.log("успешно удалилось", results);
      store.tableData = store.tableData.filter(
        (row) => !selectedRows.includes(row.ku_id)
      );
      store.multipleSelection = [];
    }
    if (selectedRows.length == 1)
      ElMessage.success(`Коммерческое условие ${selectedRows} удалено`);
    else ElMessage.success(`Успешно удалено: ${selectedRows.join(", ")}`);
  } catch (error) {
    console.error("Ошибка при удалении строк:", error);
    ElMessage.error("Ошибка при удалении коммерческого условия");
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
  };
  try {
    const response = await KU.deleteGraphRow(data);
    console.log("строки графика успешно удалены:", response);
    const response2 = await KU.updateKu(data2);
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
    date_end: selectedRows[0].date_end
  };

  try {
    const response = await KU.updateKu(data);
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
    graph_exists:selectedRows[0].graph_exists,
  };
  loading.value = true;
  try {
    const response = await GRAPHIC.postGraphic(newItem);
    await useKuStore().getKuFromAPIWithFilter();
    if (response) {
      await useKuStore().getKuFromAPIWithFilter();
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


const disableButtonTooltip = computed(() => {
  return store.multipleSelection.length > 1 || store.multipleSelection.length === 0 ? 'Кнопка заблокирована. Для доступа выберите КУ' : '';
});
const disableButtonCreateTooltip = computed(() => {
  return store.multipleSelection.length > 0 ? 'Кнопка заблокирована. Для доступа отмените выбранные КУ' : '';
});

</script>

<style scoped></style>
