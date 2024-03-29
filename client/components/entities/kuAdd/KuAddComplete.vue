<template>
  <EntitiesKuAddMain />
  <div class="button_bottom">
    <el-button @click="addClose()" size="small">Отменить</el-button>
    <el-button type="primary" @click="addItemAndSendToBackend()" :loading="loading" size="small">Создать</el-button>
  </div>
</template>

<script lang="ts" setup>
import { useKuAddStore } from "~~/stores/kuAddStore";
import { useKuStore } from "~~/stores/kuStore";
import dayjs from "dayjs";

const store = useKuAddStore();
const router = useRouter();
const loading = ref(false);

//проверка полей формы
const isFormValid = () => {
  const isEmpty = (value: any) => {
    if (Array.isArray(value)) {
      return value.some((item) => item === null || item.trim() === '');
    } else {
      return value === null || String(value).trim() === '';
    }
  };

  // Проверка для каждого поля
  const isEntityNameValid = !isEmpty(store.newEntityId);
  const isNewTypeValid = !isEmpty(store.newType);
  const isNewDateStartValid = !isEmpty(store.newDateStart);
  const isNewDateEndValid = !isEmpty(store.newDateEnd);
  const isVendorNameValid = !isEmpty(store.newVendorId);
  const isNewDocu_dateValid = !isEmpty(store.newDocu_date);


  // Возвращаем результат общей проверки
  return (
    isEntityNameValid &&
    isNewTypeValid &&
    isNewDateStartValid &&
    isNewDateEndValid &&
    isVendorNameValid &&
    isNewDocu_dateValid
  );
};

//отправка ку на бэк
const addItemAndSendToBackend = async () => {
  // Проверяем валидность формы
  if (!isFormValid()) {
    ElMessage.error('Не все поля заполнены корректно. Заполните: Код компании, код поставщика, период, начальная дата, конечная дата, дата договора ');
    return;
  }
  // Проверяем наличие хотя бы одного условия по товарам
  if (store.tableDataInRequirement.length === 0) {
    ElMessage.error('Добавьте минимум одно условие по товарам');
    return;
  }

  loading.value = true;
  let success = false; // Переменная для отслеживания успешности выполнения всех запросов

  try {
    // Создаем объект newItem для отправки на бэкенд
    const newItem = {
      entity_id: store.newEntityId,
      vendor_id: store.newVendorId,
      period: store.newType,
      date_start: dayjs(store.newDateStart, "DD.MM.YYYY").format("YYYY-MM-DD"),
      date_end: dayjs(store.newDateEnd, "DD.MM.YYYY").format("YYYY-MM-DD"),
      status: "Создано",
      description: store.newDescription,
      contract: store.newContract,
      product_type: store.newProduct_type,
      docu_account: store.newDocu_account,
      docu_name: store.newDocu_name,
      docu_number: store.newDocu_number,
      docu_date: dayjs(store.newDocu_date, "DD.MM.YYYY").format("YYYY-MM-DD"),
      docu_subject: store.newDocu_subject,
      tax: store.newTax,
      exclude_return: store.newExclude_return,
      negative_turnover: store.newNegative_turnover,
      ku_type: store.newKu_type,
      pay_method: store.newPay_method,
    };

    // Отправляем запрос на создание нового элемента на бэкенд
    const response = await KU.postKu(newItem);

    // Создаем массив объектов для каждого элемента из tableDataInRequirement
    const requirementsInArray = store.tableDataInRequirement.map(item => ({
      ku_id: response.ku_id, // используем ku_id из ответа на предыдущий запрос
      item_type: item.item_type,
      item_code: item.item_code,
      item_name: item.item_name,
      producer: item.producer,
      brand: item.brand,
    }));


    const responses = await Promise.all(requirementsInArray.map(async newItem => {
      try {
        const response = await KU.postKuInRequirement(newItem);
        return response;
      } catch (error) {
        console.error("Ошибка при отправке условия на бэкенд:", error);
        return null;
      }
    }));

    const requirementsExArray = store.tableDataExRequirement.map(item => ({
      ku_id: response.ku_id,
      item_type: item.item_type,
      item_code: item.item_code,
      item_name: item.item_name,
      producer: item.producer,
      brand: item.brand,
    }));

    const response2 = await Promise.all(requirementsExArray.map(async newItem => {
      try {
        const response = await KU.postKuExRequirement(newItem);
        return response;
      } catch (error) {
        console.error("Ошибка при отправке условия на бэкенд:", error);
        return null;
      }
    }));

    const requirementsBonusArray = store.tableDataPercent.map(item => ({
      ku_key_id: response.ku_id,
      fix: item.fix,
      criterion: item.criterion,
      percent_sum: item.percent_sum,
    }));

    const response3 = await Promise.all(requirementsBonusArray.map(async newItem => {
      try {
        const response = await KU.postKuRequirementBonus(newItem);
        return response;
      } catch (error) {
        console.error("Ошибка при отправке бонуса на бэкенд:", error);
        return null;
      }
    }));

    const ExcludedInvoicesArray = store.tableDataExInvoiceSelect.map(item => ({
      ku_id: response.ku_id,
      doc_id: item.docid,
    }));
    // Отправляем каждый объект из массива на бэкенд и проверяем успешность каждого запроса
    const response4 = await Promise.all(ExcludedInvoicesArray.map(async newItem => {
      try {
        const response = await KU.postKuExInvoices(newItem);
        return response;
      } catch (error) {
        console.error("Ошибка при отправке искл. накладных на бэкенд:", error);
        return null;
      }
    }));

    const ManagerArray = store.tableDataManagerSelect.map(item => ({
      ku_id: response.ku_id,
      group: item.group,
      discription: item.discription
    }));
    // Отправляем каждый объект из массива на бэкенд и проверяем успешность каждого запроса
    const response5 = await Promise.all(ManagerArray.map(async newItem => {
      try {
        const response = await KU.postKuManager(newItem);
        return response;
      } catch (error) {
        console.error("Ошибка при отправке искл. накладных на бэкенд:", error);
        return null;
      }
    }));
    const OfficialArray = {
      ku_id: response.ku_id,
      counterparty_name: store.newOfFIOСounteragent,
      counterparty_post: store.newOfPostСounteragent,
      counterparty_docu: store.newOfDocСounteragent,
      entity_name: store.newOfFIOEntity,
      entity_post: store.newOfPostEntity,
      entity_docu: store.newOfDocEntity,
    };

    // Отправляем запрос на создание нового элемента на бэкенд
    const response6 = await KU.postKuOfficial(OfficialArray);
    // Проверяем успешность отправки всех объектов
    success = responses.every(response => response !== null);

    if (response && success) {
      console.log("Экземпляр успешно отправлен на бэкенд:", response);
      console.log("вклУсловия успешно отправлены на бэкенд:", responses);
      console.log("исклУсловия успешно отправлены на бэкенд:", response2);
      console.log("бонус успешно отправлены на бэкенд:", response3);
      console.log("Искл. накладные успешно отправлены на бэкенд:", response4);
      console.log("Кат. менеджеры успешно отправлены на бэкенд:", response5);
      console.log("Должн. лица успешно отправлены на бэкенд:", response6);
      await useKuStore().getKuFromAPIWithFilter();
      router.push("ku");
      ElMessage.success("Коммерческое условие успешно создано.");
    } else {
      console.error("Не удалось отправить экземпляр или условия на бэкенд");
      ElMessage.error("Возникла ошибка. Коммерческое условие не создано.");
      return;
    }
  } catch (error) {
    // ElMessage.error("Возникла ошибка. Коммерческое условие не создано.");
    console.error("Ошибка при отправке экземпляра на бэкенд:", error);
    return;
  } finally {
    loading.value = false;
  }
  store.clearNewData()

};


//отменить
const addClose = () => {
  router.push("ku");
  store.clearNewData()
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
