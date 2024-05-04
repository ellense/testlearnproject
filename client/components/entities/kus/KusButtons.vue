<template>
  <div class="directoryBar">
    <div class="directoryBar_filter">
      <h3>Коммерческие условия поставщиков</h3>
      <el-divider direction="vertical" />
      <el-button type="success" plain @click="redirectToCreatePage" size="small">Создать
        КУ</el-button>
      <el-button type="success" plain @click="addGraphic()" :loading="loading" :disabled="isButtonsDisabled"
        :title="disableButtonTooltip" style="margin: 0;" size="small">Создать
        график</el-button>
      <el-dropdown :disabled="isButtonsDisabled">
        <el-button type="primary" plain :disabled="isButtonsDisabled" :title="disableButtonTooltip" size="small">
          Изменить статус<el-icon class="el-icon--right"><arrow-down /></el-icon>
        </el-button>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item><el-button @click="ApproveKu()" link type="success"
                size="small">Действует</el-button></el-dropdown-item>
            <el-dropdown-item><el-button @click="CancelKu()" link type="danger"
                size="small">Отменено</el-button></el-dropdown-item>
            <el-dropdown-item><el-button @click="СreatedKu()" link type="info"
                size="small">Создано</el-button></el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <el-button type="danger" plain @click="deleteKu()" :disabled="isDeleteButtonDisabled"
        :title="disableButtonTooltip" size="small">Удалить</el-button>

    </div>
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
const { legalEntity } = storeToRefs(store);


//для поиска
const searchQuery = ref('');
watch(searchQuery, (newValue: string) => {
  store.performSearchKu(newValue);
});


//для фильтрации
const { filterKuValue } = storeToRefs(store)
const triggerFilter = ref<boolean>(true);
const toggleTriggerFilter = () => (triggerFilter.value = !triggerFilter.value);

const LegalEntity = ref<string[]>(filterKuValue.value.entity_id || []);
const LegalEntityList = ref<string[]>(legalEntity.value);

const changeLegalEntity = () => {
  store.pagination = null;
  store.setFilterValue('entity_id', LegalEntity.value);
  console.log('shopLegalEntity.value:', LegalEntity.value);

  toggleTriggerFilter();
};

watch(legalEntity, (value) => {
  LegalEntityList.value = value;
});

watch(triggerFilter, () => {
  store.getKuFromAPIWithFilter();
});

onMounted(() => {
  store.getLegalEntityFilterForKuFromApi();
});

//кнопка создать ку
const redirectToCreatePage = () => {
  router.push("kuVAdd");
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
// const deleteKu = async () => {
//   const selectedRows = store.multipleSelection.map((row) => row.ku_id);

//   try {
//     for (const ku_id of selectedRows) {
//       const results = await KU.deleteKu({ ku_id });
//       console.log("КУ успешно удалилось", results);
//       store.tableData = store.tableData.filter(
//         (row) => !selectedRows.includes(row.ku_id)
//       );
//       store.multipleSelection = [];
//     }
//     if (selectedRows.length == 1)
//       ElMessage.success(`Коммерческое условие ${selectedRows} удалено`);
//     else ElMessage.success(`Успешно удалены: ${selectedRows.join(", ")}`);
//   } catch (error) {
//     console.error("Ошибка при удалении ку:", error);
//     ElMessage.error("Ошибка при удалении коммерческого условия");
//   }

// };
const deleteKu = async () => {
  const selectedRows = store.multipleSelection.map((row) => row.ku_id);

  try {
    for (const ku_id of selectedRows) {
      const kuDetails = await KU.getInfoKu({ ku_id }); // Получаем детали КУ
      if (kuDetails.status !== 'Создано') {
        // Если статус не равен "Создано", выводим сообщение об ошибке и пропускаем удаление
        const message = `В статусе "${kuDetails.status}" удалить КУ невозможно`;
        console.error(message);
        ElMessage.error(message);
        return
      }

      // Если есть несохраненные данные, показываем диалоговое окно для подтверждения от пользователя
      const confirmResult = await ElMessageBox.confirm(
        'Вы действительно хотите удалить коммерческое условие без возможности восстановления?',
        'Предупреждение',
        {
          type: 'warning',
          confirmButtonText: 'Да',
          cancelButtonText: 'Нет',
        }
      );

      if (!confirmResult) {
        // Если пользователь отказался от удаления, пропускаем текущую итерацию цикла
        return
      }

      // Удаляем КУ
      const results = await KU.deleteKu({ ku_id });
      console.log("КУ успешно удалено", results);
      // Обновляем данные в таблице и сбрасываем выделение
      store.tableData = store.tableData.filter(
        (row) => !selectedRows.includes(row.ku_id)
      );
      store.multipleSelection = [];
      // Выводим сообщение об успешном удалении
      if (selectedRows.length === 1) {
        ElMessage.success(`Коммерческое условие ${selectedRows} удалено`);
      } else {
        ElMessage.success(`Успешно удалены: ${selectedRows.join(", ")}`);
      }
    }
  } catch (error) {
    console.error("Ошибка при удалении ку:", error);
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
    description: selectedRows[0].description,
    contract: selectedRows[0].contract,
    product_type: selectedRows[0].product_type,
    docu_account: selectedRows[0].docu_account,
    docu_name: selectedRows[0].docu_name,
    docu_number: selectedRows[0].docu_number,
    docu_date: selectedRows[0].docu_date,
    docu_subject: selectedRows[0].docu_subject,
    tax: selectedRows[0].tax,
    exclude_return: selectedRows[0].exclude_return,
    negative_turnover: selectedRows[0].negative_turnover,
    ku_type: selectedRows[0].ku_type,
    pay_method: selectedRows[0].pay_method,
  };
  try {
    const response = await KU.deleteGraphRow(data);
    console.log("строки графика успешно удалены:", response);
    const response2 = await KU.updateKu(data2);
    console.log("строки графика успешно удалены:", response2);
    await store.getKuFromAPIWithFilter();
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
    description: selectedRows[0].description,
    contract: selectedRows[0].contract,
    product_type: selectedRows[0].product_type,
    docu_account: selectedRows[0].docu_account,
    docu_name: selectedRows[0].docu_name,
    docu_number: selectedRows[0].docu_number,
    docu_date: selectedRows[0].docu_date,
    docu_subject: selectedRows[0].docu_subject,
    tax: selectedRows[0].tax,
    exclude_return: selectedRows[0].exclude_return,
    negative_turnover: selectedRows[0].negative_turnover,
    ku_type: selectedRows[0].ku_type,
    pay_method: selectedRows[0].pay_method,
  };

  try {
    const response = await KU.updateKu(data);
    console.log("Статус успешно обновлен:", response);
    await store.getKuFromAPIWithFilter();
  } catch (error) {
    console.error("Ошибка при обновлении статуса:", error);
  }
};

//статус создано 
const СreatedKu = async () => {
  const selectedRows = store.multipleSelection
  const data = {
    ku_id: selectedRows[0].ku_id,
    status: "Создано",
    entity_id: selectedRows[0].entity_id,
    vendor_id: selectedRows[0].vendor_id,
    period: selectedRows[0].period,
    date_start: selectedRows[0].date_start,
    date_end: selectedRows[0].date_end,
    description: selectedRows[0].description,
    contract: selectedRows[0].contract,
    product_type: selectedRows[0].product_type,
    docu_account: selectedRows[0].docu_account,
    docu_name: selectedRows[0].docu_name,
    docu_number: selectedRows[0].docu_number,
    docu_date: selectedRows[0].docu_date,
    docu_subject: selectedRows[0].docu_subject,
    tax: selectedRows[0].tax,
    exclude_return: selectedRows[0].exclude_return,
    negative_turnover: selectedRows[0].negative_turnover,
    ku_type: selectedRows[0].ku_type,
    pay_method: selectedRows[0].pay_method,
  };

  try {
    const response = await KU.updateKu(data);
    console.log("Статус успешно обновлен:", response);
    await store.getKuFromAPIWithFilter();
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
    graph_exists: selectedRows[0].graph_exists,
  };
  loading.value = true;
  try {
    const response = await GRAPHIC.postGraphic(newItem);
    await store.getKuFromAPIWithFilter();
    if (response) {
      await store.getKuFromAPIWithFilter();
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
