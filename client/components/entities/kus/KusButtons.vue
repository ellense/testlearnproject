<template>
  <div class="directoryBar">
    <div class="directoryBar_filter">
      <h3>Коммерческие условия клиентов</h3>
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
      <el-button type="primary" plain @click="copyKu(store.multipleSelection[0].ku_id)" :disabled="isButtonsDisabled" :title="disableButtonTooltip" size="small">
          Копировать КУ</el-button>
      <el-button type="danger" plain @click="deleteKu()" :disabled="isDeleteButtonDisabled"
        :title="disableButtonTooltip" size="small">Удалить</el-button>

    </div>
  </div>
</template>

<script setup lang="ts">
import { storeToRefs } from "pinia";
import { ArrowDown } from '@element-plus/icons-vue'
import { useKuStore } from "~~/stores/kuStore";
import { useKuIdStore } from "~~/stores/kuIdStore";
import { useRouter } from "vue-router";
import "dayjs/locale/ru";
import type { IKuList, IKuPostGraphic } from "~/utils/types/kuVendorTypes";
import { dayjs } from "element-plus";
// import { handleError } from "vue";
import type { IRequirementPost, IPercentPost, IManager } from "~/utils/types/tabsKuTypes";
const store = useKuStore();
const store2 = useKuIdStore();
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

const deleteKu = async () => {
  try {
    await ElMessageBox.confirm(
      'Вы действительно хотите удалить коммерческое условие без возможности восстановления?',
      'Подтверждение удаления',
      {
        confirmButtonText: 'Да',
        cancelButtonText: 'Нет',
        type: 'warning',
      }
    );
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
} catch {
    ElMessage({
      type: 'info',
      message: 'Удаление отменено'
    });
  }
}



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
    docu_number: selectedRows[0].docu_number,
    docu_date: selectedRows[0].docu_date,
    docu_subject: selectedRows[0].docu_subject,
    tax: selectedRows[0].tax,
    exclude_return: selectedRows[0].exclude_return,
    negative_turnover: selectedRows[0].negative_turnover,
    pay_method: selectedRows[0].pay_method,
  };
  try {
    const response = await KU.deleteGraphRow(data);
    console.log("строки графика успешно удалены:", response);
    const response2 = await KU.updateKu(data2);
    console.log("строки графика успешно удалены:", response2);
    ElMessage.success(`Статус ${selectedRows[0].ku_id} успешно изменен на "Отменено" `);
    store.pagination = null
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
    docu_number: selectedRows[0].docu_number,
    docu_date: selectedRows[0].docu_date,
    docu_subject: selectedRows[0].docu_subject,
    tax: selectedRows[0].tax,
    exclude_return: selectedRows[0].exclude_return,
    negative_turnover: selectedRows[0].negative_turnover,
    pay_method: selectedRows[0].pay_method,
  };

  try {
    const response = await KU.updateKu(data);
    console.log("Статус успешно обновлен:", response);
    ElMessage.success(`Статус ${selectedRows[0].ku_id} успешно изменен на "Действует" `);
    store.pagination = null
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
    docu_number: selectedRows[0].docu_number,
    docu_date: selectedRows[0].docu_date,
    docu_subject: selectedRows[0].docu_subject,
    tax: selectedRows[0].tax,
    exclude_return: selectedRows[0].exclude_return,
    negative_turnover: selectedRows[0].negative_turnover,
    pay_method: selectedRows[0].pay_method,
  };
  try {
    const response = await KU.updateKu(data);
    console.log("Статус успешно обновлен:", response);
    ElMessage.success(`Статус ${selectedRows[0].ku_id} успешно изменен на "Создано" `);
    store.pagination = null
    store.getKuFromAPIWithFilter();
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

const copyKu = async (kuId: string) => {
  await store2.getKuDetail_API(kuId)
  store2.getInRequirementForKuId_API(kuId)
  store2.getExRequirementForKuId_API(kuId)
  store2.getBonusForKuId_API(kuId)
  store2.getOfficialForKuId_API(kuId)
    
    const response = await KU.postKu(createNewItem());
    const responses = await postRequirements(response, store2.tableDataInRequirement, KU.postKuInRequirement);
    const response2 = await postRequirements(response, store2.tableDataExRequirement, KU.postKuExRequirement);
    const response3 = await postBonus(response, store2.tableDataPercent);
    const response4 = await KU.postKuOfficial(postOfficial(response));

    const success = responses.every(response => response !== null);
    if (response && success) {
      handleSuccess(response, responses, response2, response3, response4);
    } else {
      handleError();
    }
  
  store2.clearData();
};

const createNewItem = () => {
  return {
    entity_id: store2.kuIdEntityId,
    vendor_id: store2.kuIdVendorId,
    period: store2.kuIdType,
    date_start: dayjs(store2.kuIdDateStart).format("YYYY-MM-DD"),
    date_end: dayjs(store2.kuIdDateEnd).format("YYYY-MM-DD"),
    status: "Создано",
    description: store2.kuIdDescription,
    contract: store2.kuIdContract,
    product_type: store2.kuIdProduct_type,
    docu_account: store2.kuIdDocu_account,
    docu_number: store2.kuIdDocu_number,
    docu_date: dayjs(store2.kuIdDocu_date).format("YYYY-MM-DD"),
    docu_subject: store2.kuIdDocu_subject,
    tax: store2.kuIdTax,
    exclude_return: store2.kuIdExclude_return,
    negative_turnover: store2.kuIdNegative_turnover,
    pay_method: store2.kuIdPay_method,
  };
};

const postRequirements = async (response: IKuList, dataArray: any, postFunction: any) => {
  const requirementsArray = dataArray.map((item: IRequirementPost) => ({
    ku_id: response.ku_id,
    item_type: item.item_type,
    item_code: item.item_code,
    item_name: item.item_name,
    producer: item.producer,
    brand: item.brand,
  }));

  return await Promise.all(requirementsArray.map(async (newItem: any) => {
    try {
      return await postFunction(newItem);
    } catch (error) {
      console.error("Ошибка при отправке условия на бэкенд:", error);
      return null;
    }
  }));
};

const postBonus = async (response: IKuList, dataArray: any) => {
  const requirementsArray = dataArray.map((item: IPercentPost) => ({
    ku_key_id: response.ku_id,
    fix: item.fix,
    criterion: item.criterion !== null ? item.criterion : 0,
    percent_sum: item.percent_sum,
  }));

  return await Promise.all(requirementsArray.map(async (newItem: any) => {
    try {
      return await KU.postKuRequirementBonus(newItem);
    } catch (error) {
      console.error("Ошибка при отправке бонуса на бэкенд:", error);
      return null;
    }
  }));
};

const postOfficial = (response: IKuList) => {
  return {
    ku_id: response.ku_id,
    counterparty_name: store2.kuIdFIOСounteragent,
    counterparty_post: store2.kuIdPostСounteragent,
    counterparty_docu: store2.kuIdDocСounteragent,
    entity_name: store2.kuIdFIOEntity,
    entity_post: store2.kuIdPostEntity,
    entity_docu: store2.kuIdDocEntity,
  };
};

const handleSuccess = (response: IKuList, responses: any[], response2: any[], response3: any[], response4: any, ) => {
  console.log("Экземпляр КУ успешно отправлен на бэкенд:", response);
  console.log("вклУсловия успешно отправлены на бэкенд:", responses);
  console.log("исклУсловия успешно отправлены на бэкенд:", response2);
  console.log("бонус успешно отправлены на бэкенд:", response3);
  console.log("Должн. лица успешно отправлены на бэкенд:", response4);
  useKuStore().getKuFromAPIWithFilter();
  ElMessage({
    message: 'Коммерческое условие успешно скопировано.',
    duration: 5000,
    type: 'success',
  })
};

const handleError = () => {
  console.error("Не удалось отправить экземпляр или условия на бэкенд");
  ElMessage.error("Возникла ошибка. Коммерческое условие не скопировано.");
};

const disableButtonTooltip = computed(() => {
  return store.multipleSelection.length > 1 || store.multipleSelection.length === 0 ? 'Кнопка заблокирована. Для доступа выберите КУ' : '';
});
const disableButtonCreateTooltip = computed(() => {
  return store.multipleSelection.length > 0 ? 'Кнопка заблокирована. Для доступа отмените выбранные КУ' : '';
});

</script>

<style scoped></style>