<template>
  <EntitiesKuCAddMain />
  <div class="button_bottom">
    <el-button @click="addClose()" size="small">Отменить</el-button>
    <!-- <el-progress type="dashboard" :color="colors" :percentage="progress" v-if="progress !== 100" size="small" />/ -->
    <el-button type="primary" @click="createKU()" :loading="loading" size="small">Создать</el-button>
    <!-- <el-button plain @click="open"> уведомление </el-button> -->
  </div>
</template>

<script lang="ts" setup>
import { useKuCAddStore } from "~~/stores/kuCAddStore";
import { useKuCStore } from "~~/stores/kuCStore";
import dayjs from "dayjs";
import type { IExInvoiceForKuPost, IKuCList, IKuList, IManagerForKuPost, IOfficialForKuPost, IServiceAndArticle } from "~/utils/types/directoryTypes";
import { useRouter } from 'vue-router'
const store = useKuCAddStore();
const loading = ref(false);
const progress = ref(0);
const router = useRouter()
const kuMain = store.kuAddMain
import { onBeforeRouteLeave } from 'vue-router'
import { ElMessageBox } from 'element-plus'
import { ref } from 'vue'

const clearDataBeforeLeave = () => {
  store.clearNewData()
}

// Хук При попытке перехода на другую страницу или нажатии кнопки "Назад" в браузере
onBeforeRouteLeave((to, from, next) => {
  if (
    store.tableDataServiceSelect.length > 0 ||
    store.tableDataManagerSelect.length > 0 ||
    store.tableDataContract.length > 0 ||
    kuMain.newType !== '' ||
    kuMain.newEntityId !== '' ||
    kuMain.newEntityName !== '' ||
    kuMain.newCustomerId !== '' ||
    kuMain.newCustomerName !== '' ||
    kuMain.newDateStart !== '' ||
    kuMain.newDateEnd !== '' ||
    kuMain.newDateActual !== '' ||
    kuMain.newDescription !== '' ||
    kuMain.newContract !== '' ||
    kuMain.newDocu_account !== '' ||
    kuMain.newDocu_number !== '' ||
    kuMain.newDocu_date !== '' ||
    kuMain.newDocu_subject !== '' ||
    kuMain.newPay_sum !== null ||
    kuMain.newPay_method !== '' ||
    store.newOfFIOСounteragent !== '' ||
    store.newOfPostСounteragent !== '' ||
    store.newOfDocСounteragent !== '' ||
    store.newOfFIOEntity !== '' ||
    store.newOfDocEntity !== '' ||
    store.valueService_nameContract !== '' ||
    store.valueArticle_nameContract !== '') {
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


const colors = [
  { color: '#f56c6c', percentage: 20 },
  { color: '#e6a23c', percentage: 40 },
  { color: '#5cb87a', percentage: 60 },
  { color: '#1989fa', percentage: 80 },
  { color: '#6f7ad3', percentage: 100 },
]
import { ElNotification } from 'element-plus'

const open = () => {
  ElNotification({
    title: 'Cоздание КУ',
    dangerouslyUseHTMLString: true,
    message: '<el-progress :percentage="progress" v-if="progress !== 100" size="small" />',
    showClose: false,
  })
  ElMessage({
    message: 'Коммерческое условие успешно создано.',
    duration: 5000,
    type: 'success',
  })
  // <strong>This is <i>HTML</i> string</strong>
}





const createKU = async () => {

  try {

    if (!(await store.isFormValid())) {
      // Если форма не валидна, выводим сообщение об ошибке и завершаем выполнение функции
      ElMessage({
        showClose: true,
        message: 'Не все поля заполнены.',
        duration: 10000,
        type: 'error',
      });
      return;
    }
    if (store.newOfFIOСounteragent.length === 0 &&
      store.newOfPostСounteragent.length === 0 &&
      store.newOfDocСounteragent.length === 0 &&
      store.newOfFIOEntity.length === 0 &&
      store.newOfPostEntity.length === 0 &&
      store.newOfDocEntity.length === 0) {
      ElMessage.error('Добавьте должностные лица');
      return;
    }

    loading.value = true;
    // open()

    const newItem = createNewItem();
    progress.value = 10;
    const response = await KUC.postKu(newItem);
    progress.value = 20;
    const responses = await postRequirements(response, store.tableDataServiceSelect, KUC.postKuServices);
    progress.value = 30;
    progress.value = 40;
    progress.value = 50;
    const response5 = await postManagerItems(response, store.tableDataManagerSelect, KUC.postKuManager);
    progress.value = 60;
    const response6 = await KUC.postKuOfficial(createOfficialArray(response));
    progress.value = 70;
    const success = responses.every(response => response !== null);
    if (response && success) {
      handleSuccess(response, responses, response5, response6);
    } else {
      handleError();
    }
  } catch (error) {

    console.error("Ошибка при отправке экземпляра на бэкенд:", error);
  } finally {
    loading.value = false;
    progress.value = 100;
  }
  store.clearNewData();
};

const createNewItem = () => {
  return {
    entity_id: kuMain.newEntityId,
    customer_id: kuMain.newCustomerId,
    period: kuMain.newType,
    date_start: dayjs(kuMain.newDateStart, "DD.MM.YYYY").format("YYYY-MM-DD"),
    date_end: dayjs(kuMain.newDateEnd, "DD.MM.YYYY").format("YYYY-MM-DD"),
    status: "Создано",
    description: kuMain.newDescription,
    contract: kuMain.newContract,
    docu_account: kuMain.newDocu_account,
    docu_number: kuMain.newDocu_number,
    docu_date: dayjs(kuMain.newDocu_date, "DD.MM.YYYY").format("YYYY-MM-DD"),
    docu_subject: kuMain.newDocu_subject,
    pay_sum: kuMain.newPay_sum,
    pay_method: kuMain.newPay_method,
  };
};

const postRequirements = async (response: IKuCList, dataArray: any, postFunction: any) => {
  const requirementsArray = dataArray.map((item: { service_code: any; service_name: any; article_code: any; article_name: any; ratio: any; }) => ({
    ku_id: response.ku_id,
    service_code: item.service_code,
    service_name: item.service_name,
    article_code: item.article_code,
    article_name: item.article_name,
    ratio: item.ratio,
  }));

  return await Promise.all(requirementsArray.map(async (newItem: any) => {
    try {
      return await postFunction(newItem);
    } catch (error) {
      console.error("Ошибка при отправке услуг на бэкенд:", error);
      return null;
    }
  }));
};


const postManagerItems = async (response: IKuCList, dataArray: any, postFunction: any) => {
  const itemsArray = dataArray.map((item: { group: any; discription: any; }) => ({
    ku_id: response.ku_id,
    group: item.group,
    discription: item.discription
  }));

  return await Promise.all(itemsArray.map(async (newItem: any) => {
    try {
      return await postFunction(newItem);
    } catch (error) {
      console.error("Ошибка при отправке данных на бэкенд:", error);
      return null;
    }
  }));
};

const postItems = async (response: IKuCList, dataArray: any, postFunction: any) => {
  const itemsArray = dataArray.map((item: { docid: any; }) => ({
    ku_id: response.ku_id,
    docid: item.docid,
  }));

  return await Promise.all(itemsArray.map(async (newItem: any) => {
    try {
      return await postFunction(newItem);
    } catch (error) {
      console.error("Ошибка при отправке данных на бэкенд:", error);
      return null;
    }
  }));
};

const createOfficialArray = (response: IKuCList) => {
  return {
    ku_id: response.ku_id,
    counterparty_name: store.newOfFIOСounteragent,
    counterparty_post: store.newOfPostСounteragent,
    counterparty_docu: store.newOfDocСounteragent,
    entity_name: store.newOfFIOEntity,
    entity_post: store.newOfPostEntity,
    entity_docu: store.newOfDocEntity,
  };
};

const handleSuccess = (response: IKuCList, responses: any[], response5: any[], response6: IOfficialForKuPost) => {
  console.log("КУ клиентов успешно отправлен на бэкенд:", response);
  console.log("услуги успешно отправлены на бэкенд:", responses);
  console.log("Кат. менеджеры успешно отправлены на бэкенд:", response5);
  console.log("Должн. лица успешно отправлены на бэкенд:", response6);
  useKuCStore().getKuFromAPIWithFilter();
  router.push("kuC");
  ElMessage({
    message: 'Коммерческое условие успешно создано.',
    duration: 5000,
    type: 'success',
  })
};

const handleError = () => {
  console.error("Не удалось отправить экземпляр или условия на бэкенд");
  ElMessage.error("Возникла ошибка. Коммерческое условие не создано.");
};


//отменить
const addClose = () => {
  if (
    // Проверяем наличие несохраненных данных
    store.tableDataServiceSelect.length > 0 ||
    store.tableDataManagerSelect.length > 0 ||
    kuMain.newType !== '' ||
    kuMain.newEntityId !== '' ||
    kuMain.newEntityName !== '' ||
    kuMain.newCustomerId !== '' ||
    kuMain.newCustomerName !== '' ||
    kuMain.newDateStart !== '' ||
    kuMain.newDateEnd !== '' ||
    kuMain.newDateActual !== '' ||
    kuMain.newDescription !== '' ||
    kuMain.newContract !== '' ||
    kuMain.newDocu_account !== '' ||
    kuMain.newDocu_number !== '' ||
    kuMain.newDocu_date !== '' ||
    kuMain.newDocu_subject !== '' ||
    kuMain.newPay_sum !== null ||
    kuMain.newPay_method !== '' ||
    store.newOfFIOСounteragent !== '' ||
    store.newOfPostСounteragent !== '' ||
    store.newOfDocСounteragent !== '' ||
    store.newOfFIOEntity !== '' ||
    store.newOfDocEntity !== '' ||
    store.valueService_nameContract !== '' ||
    store.valueArticle_nameContract !== ''
  ) {
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
      // Если пользователь подтвердил, переходим на другую страницу и очищаем данные
      router.push("kuC");
      store.clearNewData();
    }).catch(() => {
      // Если пользователь отменил, ничего не делаем
    });
  } else {
    // Если нет несохраненных данных, просто переходим на другую страницу и очищаем данные
    router.push("kuC");
    store.clearNewData();
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
