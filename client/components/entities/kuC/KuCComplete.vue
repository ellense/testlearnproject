<template>
  <EntitiesKuCMain />
  <div class="button_bottom">
    <el-button @click="addClose()" size="small">Назад</el-button>
    <el-button type="primary" @click="changeKuToBackend()" :loading="loading" size="small"
      :disabled="isEditButtonDisabled">Изменить</el-button>
  </div>
</template>

<script lang="ts" setup>
import { useKuCAddStore } from "~~/stores/kuCAddStore";
import { useKuCStore } from "~~/stores/kuCStore";
import { useKuCIdStore } from "~~/stores/kuCIdStore";
import dayjs from "dayjs";
import { useRouter } from 'vue-router'
const store = useKuCIdStore();
const store2 = useKuCAddStore();
const loading = ref(false);
const progress = ref(0);
const router = useRouter()
import { onBeforeRouteLeave } from 'vue-router'
import { ElMessageBox } from 'element-plus'
import { ref } from 'vue'
import type { IManagerForKuPost,  IServiceAndArticle, IServicesPost, IVACPost } from "~/utils/types/tabsKuTypes";

const clearDataBeforeLeave = () => {
  store.clearData()
  store2.clearNewData()
}

const isEditButtonDisabled = computed(() => {
  return store.kuIdStatus !== 'Создано';
});

// Хук При попытке перехода на другую страницу или нажатии кнопки "Назад" в браузере
onBeforeRouteLeave((to, from, next) => {
  if (store.hasChanges() && store.$state.kuIdStatus === "Создано") {
    ElMessageBox.alert('Вы уверены, что хотите покинуть эту страницу? Все несохраненные данные будут потеряны.', 'Предупреждение', {
      type: 'warning'
    }).then(() => {
      clearDataBeforeLeave()
      next()
    }).catch(() => {
      next(false)
    })
  } else {
    next()
  }
})

const changeKuToBackend = async () => {
  try {
    if (!(await store2.isFormValid())) {
      // Если форма не валидна, выводим сообщение об ошибке и завершаем выполнение функции
      ElMessage({
        showClose: true,
        message: 'Не все поля заполнены.',
        duration: 10000,
        type: 'error',
      });
      return;
    }
    if (store.tableDataServiceSelect.length === 0) {
      ElMessage.error('Добавьте минимум одну услугу');
      return;
    }
    if (store.kuIdFIOСounteragent.length === 0 &&
      store.kuIdPostСounteragent.length === 0 &&
      store.kuIdDocСounteragent.length === 0 &&
      store.kuIdFIOEntity.length === 0 &&
      store.kuIdPostEntity.length === 0 &&
      store.kuIdDocEntity.length === 0) {
      ElMessage.error('Добавьте должностные лица');
      return;
    }

    loading.value = true;

    const response = await KUC.updateKu(createNewItem());
    deleteService()
    const responses = await postService(response, store.tableDataServiceSelect);
    deleteManager()
    const response2 = await postManager(response, store.tableDataManagerSelect);
    deleteVAC()
    const response3 = await postVAC(response, store.tableDataVAC);
    const response4 = await KUC.updateOfficial(createOfficialArray());

    const success = responses.every(response => response !== null);
    if (response && success) {
      handleSuccess(response, responses, response2, response3, response4);
    } else {
      handleError();
    }
  } catch (error) {

    console.error("Ошибка при отправке экземпляра на бэкенд:", error);
  } finally {
    loading.value = false;
    progress.value = 100;
  }
  clearDataBeforeLeave()
};

const createNewItem = () => {
  return {
    ku_id: store.ku_id,
    entity: store.kuIdEntityId,
    customer: store.kuIdCustomerId,
    period: store.kuIdType,
    date_start: dayjs(store.kuIdDateStart).format("YYYY-MM-DD"),
    date_end: dayjs(store.kuIdDateEnd).format("YYYY-MM-DD"),
    status: "Создано",
    description: store.kuIdDescription,
    contract: store.kuIdContract,
    docu_account: store.kuIdDocu_account,
    docu_number: store.kuIdDocu_number,
    docu_date: dayjs(store.kuIdDocu_date).format("YYYY-MM-DD"),
    docu_subject: store.kuIdDocu_subject,
    pay_sum: store.kuIdPay_sum,
    pay_method: store.kuIdPay_method,
  };
};

const postService = async (response: any, dataArray: any) => {
  const requirementsArray = dataArray.map((item: IServiceAndArticle) => ({
    ku: response.ku_id,
    service: item.service,
    article: item.article,
    ratio: item.ratio,
  }));

  return await Promise.all(requirementsArray.map(async (newItem: any) => {
    try {
      return await KUC.postKuServices(newItem);
    } catch (error) {
      console.error("Ошибка при отправке услуг на бэкенд:", error);
      return null;
    }
  }));
};

const postManager = async (response: any, dataArray: any) => {
  const itemsArray = dataArray.map((item: IManagerForKuPost) => ({
    ku: response.ku_id,
    manager: item.manager,
  }));

  return await Promise.all(itemsArray.map(async (newItem: any) => {
    try {
      return await KUC.postKuManager(newItem);
    } catch (error) {
      console.error("Ошибка при отправке данных на бэкенд:", error);
      return null;
    }
  }));
};

const postVAC = async (response: any, dataArray: any) => {
  const requirementsArray = dataArray.map((item: IVACPost) => ({
    ku: response.ku_id,
    type_partner: item.type_partner,
    vendor: item.vendor,
    vendor_name: item.vendor_name,
    retention: item.retention,
    status: item.status,
    entity: item.entity,
    entity_name: item.entity_name,
  }));

  return await Promise.all(requirementsArray.map(async (newItem: any) => {
    try {
      return await KUC.postKuVAC(newItem);
    } catch (error) {
      console.error("Ошибка при отправке VAC на бэкенд:", error);
      return null;
    }
  }));
};

const createOfficialArray = () => {
  return {
    id: store.officialId,
    ku_id: store.ku_id,
    counterparty_name: store.kuIdFIOСounteragent,
    counterparty_post: store.kuIdPostСounteragent,
    counterparty_docu: store.kuIdDocСounteragent,
    entity_name: store.kuIdFIOEntity,
    entity_post: store.kuIdPostEntity,
    entity_docu: store.kuIdDocEntity,
  };
};

const handleSuccess = (response: any, responses: any[], response2: any[], response3: any[], response4: any) => {
  router.push({ path: "/kuC" });
  console.log("КУ клиентов успешно отправлен на бэкенд:", response);
  console.log("услуги успешно отправлены на бэкенд:", responses);
  console.log("Кат. менеджеры успешно отправлены на бэкенд:", response2);
  console.log("Поставщики и договоры успешно отправлены на бэкенд:", response3);
  console.log("Должн. лица успешно отправлены на бэкенд:", response4);
  useKuCStore().getKuFromAPIWithFilter();
  router.push({ path: "/kuC" });
  ElMessage({
    message: 'Коммерческое условие успешно изменено.',
    duration: 5000,
    type: 'success',
  })
  clearDataBeforeLeave
};

//удаление услуг
const deleteService = () => {
  const selectedRows = store.initialState.tableDataServiceSelect.map((row) => row.id);
  const deletePromises = selectedRows.map(async (id) => {
    try {
      const results = await KUC.deleteService({ id });
      return results;
    } catch (error) {
      console.error("Ошибка при удалении строки:", error);
      throw error;
    }
  });
  return Promise.all(deletePromises);
};
//удаление поставщиков и договоров
const deleteVAC = () => {
  const selectedRows = store.initialState.tableDataVAC.map((row) => row.id);
  const deletePromises = selectedRows.map(async (id) => {
    try {
      const results = await KUC.deleteVAC({ id });
      return results;
    } catch (error) {
      console.error("Ошибка при удалении строки:", error);
      throw error;
    }
  });
  return Promise.all(deletePromises);
};
//удаление менеджеров
const deleteManager = () => {
  const selectedRows = store.initialState.tableDataManagerSelect.map((row) => row.id);
  const deletePromises = selectedRows.map(async (id) => {
    try {
      const results = await KUC.deleteManager({ id });
      return results;
    } catch (error) {
      console.error("Ошибка при удалении строки:", error);
      throw error;
    }
  });
  return Promise.all(deletePromises);
};

const handleError = () => {
  console.error("Не удалось изменить экземпляр или условия на бэкенде");
  ElMessage.error("Возникла ошибка. Коммерческое условие не изменено.");
};


//отменить
const addClose = () => {
  if (store.hasChanges() && store.$state.kuIdStatus === "Создано") {
    // Если есть несохраненные данные, показываем диалоговое окно для подтверждения от пользователя
    ElMessageBox.alert(
      'Вы уверены, что хотите покинуть эту страницу? Все несохраненные данные будут потеряны.',
      'Предупреждение',
      {
        type: 'warning',
        confirmButtonText: 'OK',
        cancelButtonText: 'Отмена',
      }
    ).then(() => {
      // router.push("kuC");
      router.push({ path: "/kuC" });
      clearDataBeforeLeave
    }).catch(() => {
    });
  } else {
    router.push({ path: "/kuC" });
    clearDataBeforeLeave
  }
};
</script>

<style scoped>
.button_bottom {
  margin: 20px 10px 0 0;
  display: flex;
  justify-content: flex-start;
}

.loading-cursor {
  cursor: wait;
  /* Установка курсора в виде элемента загрузки */
}

.el-popper {
  min-width: 600px !important
}

.el-vl__window {
  width: 100% !important
}
</style>
