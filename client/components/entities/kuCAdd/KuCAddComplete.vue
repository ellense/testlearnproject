<template>
  <EntitiesKuCAddMain />
  <div class="button_bottom">
    <el-button @click="addClose()" size="small">Отменить</el-button>
    <el-button type="primary" @click="createKU()" :loading="loading" size="small">Создать</el-button>
  </div>
</template>

<script lang="ts" setup>
import { useKuCAddStore } from "~~/stores/kuCAddStore";
import { useKuCStore } from "~~/stores/kuCStore";
import dayjs from "dayjs";
import { useRouter } from 'vue-router'
const store = useKuCAddStore();
const loading = ref(false);
const progress = ref(0);
const router = useRouter()
const kuMain = store.kuAddMain
import { onBeforeRouteLeave } from 'vue-router'
import { ElMessageBox } from 'element-plus'
import { ref } from 'vue'
import type { IKuCList } from "~/utils/types/kuCustomerTypes";
import type { IServicesPost, IOfficialForKuPost, IManagerForKu, IServiceAndArticle, IVACPost } from "~/utils/types/tabsKuTypes";

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

    const response = await KUC.postKu(createNewItem())
    const responses = await postService(response, store.tableDataServiceSelect);
    const response2 = await postManager(response, store.tableDataManagerSelect);
    const response3 = await KUC.postKuOfficial(createOfficial(response));
    const response4 = await postVAC(response, store.tableDataVAC);

    const success = responses.every(response => response !== null);
    if (response && success) {
      handleSuccess(response, responses, response2, response3, response4 );
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
    entity: kuMain.newEntityId,
    customer: kuMain.newCustomerId,
    period: kuMain.newType,
    date_start: dayjs(kuMain.newDateStart).format("YYYY-MM-DD"),
    date_end: dayjs(kuMain.newDateEnd).format("YYYY-MM-DD"),
    status: "Создано",
    description: kuMain.newDescription,
    contract: kuMain.newContract,
    docu_account: kuMain.newDocu_account,
    docu_number: kuMain.newDocu_number,
    docu_date: dayjs(kuMain.newDocu_date).format("YYYY-MM-DD"),
    docu_subject: kuMain.newDocu_subject,
    pay_sum: kuMain.newPay_sum,
    pay_method: kuMain.newPay_method,
  };
};

const postService = async (response: IKuCList, dataArray: any,) => {
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


const postManager = async (response: IKuCList, dataArray: any) => {
  const itemsArray = dataArray.map((item: IManagerForKu) => ({
    ku: response.ku_id,
    manager: item.id,
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

const postVAC = async (response: IKuCList, dataArray: any) => {
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

const createOfficial = (response: IKuCList) => {
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

const handleSuccess = (response: IKuCList, responses: any[], response2: any[], response3: IOfficialForKuPost, response4: any) => {
  console.log("КУ клиентов успешно отправлен на бэкенд:", response);
  console.log("Услуги успешно отправлены на бэкенд:", responses);
  console.log("Кат. менеджеры успешно отправлены на бэкенд:", response2);
  console.log("Должн. лица успешно отправлены на бэкенд:", response3);
  console.log("поставщики и договоры успешно отправлены на бэкенд:", response4);
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
</style>