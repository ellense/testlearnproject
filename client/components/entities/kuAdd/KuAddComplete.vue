<template>
  <EntitiesKuAddMain />
  <div class="button_bottom">
    <el-button @click="addClose()" size="small">Отменить</el-button>
    <el-progress :percentage="progress" v-if="progress !== 100" size="small" />
    <el-button type="primary" @click="createKU()" :loading="loading" size="small">Создать</el-button>
  </div>
</template>

<script lang="ts" setup>
import { useKuAddStore } from "~~/stores/kuAddStore";
import { useKuStore } from "~~/stores/kuStore";
import dayjs from "dayjs";
import type { IExInvoiceForKuPost, IKuList, IManagerForKuPost, IOfficialForKuPost } from "~/utils/types/directoryTypes";

const store = useKuAddStore();
const router = useRouter();
const loading = ref(false);
const progress = ref(0);

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

// отправка ку на бэк
// const addItemAndSendToBackend = async () => {
//   // Проверяем валидность формы
//   if (!isFormValid()) {
//     ElMessage.error('Не все поля заполнены корректно. Заполните: Код компании, код поставщика, период, начальная дата, конечная дата, дата договора ');
//     return;
//   }
//   // Проверяем наличие хотя бы одного условия по товарам
//   if (store.tableDataInRequirement.length === 0) {
//     ElMessage.error('Добавьте минимум одно условие по товарам');
//     return;
//   }

//   loading.value = true;
//   let success = false; // Переменная для отслеживания успешности выполнения всех запросов

//   try {

//     // Создаем объект newItem для отправки на бэкенд
//     const newItem = {
//       entity_id: store.newEntityId,
//       vendor_id: store.newVendorId,
//       period: store.newType,
//       date_start: dayjs(store.newDateStart, "DD.MM.YYYY").format("YYYY-MM-DD"),
//       date_end: dayjs(store.newDateEnd, "DD.MM.YYYY").format("YYYY-MM-DD"),
//       status: "Создано",
//       description: store.newDescription,
//       contract: store.newContract,
//       product_type: store.newProduct_type,
//       docu_account: store.newDocu_account,
//       docu_name: store.newDocu_name,
//       docu_number: store.newDocu_number,
//       docu_date: dayjs(store.newDocu_date, "DD.MM.YYYY").format("YYYY-MM-DD"),
//       docu_subject: store.newDocu_subject,
//       tax: store.newTax,
//       exclude_return: store.newExclude_return,
//       negative_turnover: store.newNegative_turnover,
//       ku_type: store.newKu_type,
//       pay_method: store.newPay_method,
//     };

//     // Отправляем запрос на создание нового элемента на бэкенд
//     const response = await KU.postKu(newItem);

//     // Создаем массив объектов для каждого элемента из tableDataInRequirement
//     const requirementsInArray = store.tableDataInRequirement.map(item => ({
//       ku_id: response.ku_id, // используем ku_id из ответа на предыдущий запрос
//       item_type: item.item_type,
//       item_code: item.item_code,
//       item_name: item.item_name,
//       producer: item.producer,
//       brand: item.brand,
//     }));


//     const responses = await Promise.all(requirementsInArray.map(async newItem => {
//       try {
//         const response = await KU.postKuInRequirement(newItem);
//         return response;
//       } catch (error) {
//         console.error("Ошибка при отправке условия на бэкенд:", error);
//         return null;
//       }
//     }));

//     const requirementsExArray = store.tableDataExRequirement.map(item => ({
//       ku_id: response.ku_id,
//       item_type: item.item_type,
//       item_code: item.item_code,
//       item_name: item.item_name,
//       producer: item.producer,
//       brand: item.brand,
//     }));

//     const response2 = await Promise.all(requirementsExArray.map(async newItem => {
//       try {
//         const response = await KU.postKuExRequirement(newItem);
//         return response;
//       } catch (error) {
//         console.error("Ошибка при отправке условия на бэкенд:", error);
//         return null;
//       }
//     }));

//     const requirementsBonusArray = store.tableDataPercent.map(item => ({
//       ku_key_id: response.ku_id,
//       fix: item.fix,
//       criterion: item.criterion,
//       percent_sum: item.percent_sum,
//     }));

//     const response3 = await Promise.all(requirementsBonusArray.map(async newItem => {
//       try {
//         const response = await KU.postKuRequirementBonus(newItem);
//         return response;
//       } catch (error) {
//         console.error("Ошибка при отправке бонуса на бэкенд:", error);
//         return null;
//       }
//     }));

//     const ExcludedInvoicesArray = store.tableDataExInvoiceSelect.map(item => ({
//       ku_id: response.ku_id,
//       doc_id: item.doc_id,
//     }));
//     // Отправляем каждый объект из массива на бэкенд и проверяем успешность каждого запроса
//     const response4 = await Promise.all(ExcludedInvoicesArray.map(async newItem => {
//       try {
//         const response = await KU.postKuExInvoices(newItem);
//         return response;
//       } catch (error) {
//         console.error("Ошибка при отправке искл. накладных на бэкенд:", error);
//         return null;
//       }
//     }));

//     const ManagerArray = store.tableDataManagerSelect.map(item => ({
//       ku_id: response.ku_id,
//       group: item.group,
//       discription: item.discription
//     }));
//     // Отправляем каждый объект из массива на бэкенд и проверяем успешность каждого запроса
//     const response5 = await Promise.all(ManagerArray.map(async newItem => {
//       try {
//         const response = await KU.postKuManager(newItem);
//         return response;
//       } catch (error) {
//         console.error("Ошибка при отправке искл. накладных на бэкенд:", error);
//         return null;
//       }
//     }));
//     const OfficialArray = {
//       ku_id: response.ku_id,
//       counterparty_name: store.newOfFIOСounteragent,
//       counterparty_post: store.newOfPostСounteragent,
//       counterparty_docu: store.newOfDocСounteragent,
//       entity_name: store.newOfFIOEntity,
//       entity_post: store.newOfPostEntity,
//       entity_docu: store.newOfDocEntity,
//     };

//     // Отправляем запрос на создание нового элемента на бэкенд
//     const response6 = await KU.postKuOfficial(OfficialArray);
//     // Проверяем успешность отправки всех объектов
//     success = responses.every(response => response !== null);
// // Подсчитываем общее количество шагов для прогресса
// const totalSteps = requirementsInArray.length + response2.length + response3.length + response4.length + response5.length + 1;

// // Обновляем прогресс после каждого выполненного шага
// let currentStep = 0;
// progress.value = 0; // сбрасываем прогресс
// const updateProgress = () => {
//   currentStep++;
//   progress.value = Math.floor((currentStep / totalSteps) * 100);
// };
// responses.forEach(response => {
//       if (response !== null) {
//         updateProgress();
//       }
//     });
//     if (response && success) {
//       console.log("Экземпляр успешно отправлен на бэкенд:", response);
//       console.log("вклУсловия успешно отправлены на бэкенд:", responses);
//       console.log("исклУсловия успешно отправлены на бэкенд:", response2);
//       console.log("бонус успешно отправлены на бэкенд:", response3);
//       console.log("Искл. накладные успешно отправлены на бэкенд:", response4);
//       console.log("Кат. менеджеры успешно отправлены на бэкенд:", response5);
//       console.log("Должн. лица успешно отправлены на бэкенд:", response6);
//       await useKuStore().getKuFromAPIWithFilter();
//       router.push("ku");
//       ElMessage.success("Коммерческое условие успешно создано.");
//     } else {
//       console.error("Не удалось отправить экземпляр или условия на бэкенд");
//       ElMessage.error("Возникла ошибка. Коммерческое условие не создано.");
//       return;
//     }
//     progress.value = 100;
//   } catch (error) {
//     // ElMessage.error("Возникла ошибка. Коммерческое условие не создано.");
//     console.error("Ошибка при отправке экземпляра на бэкенд:", error);
//     return;
//   } finally {
//     loading.value = false;
//   }
//   store.clearNewData()

// };
const createKU = async () => {
  try {
    if (!isFormValid()) {
      ElMessage.error('Не все поля заполнены корректно. Заполните: Код компании, код поставщика, период, начальная дата, конечная дата, дата договора ');
      return;
    }
    if (store.tableDataInRequirement.length === 0) {
      ElMessage.error('Добавьте минимум одно условие по товарам');
      return;
    }

    loading.value = true;

    const newItem = createNewItem();

    const response = await KU.postKu(newItem);
    progress.value = 10;
    const responses = await postRequirements(response, store.tableDataInRequirement, KU.postKuInRequirement);
    progress.value = 20;
    const response2 = await postRequirements(response, store.tableDataExRequirement, KU.postKuExRequirement);
    progress.value = 30;
    const response3 = await postBonusRequirements(response, store.tableDataPercent);
    progress.value = 40;
    const response4 = await postItems(response, store.tableDataExInvoiceSelect, KU.postKuExInvoices);
    progress.value = 50;
    const response5 = await postManagerItems(response, store.tableDataManagerSelect, KU.postKuManager);
    progress.value = 60;
    const response6 = await KU.postKuOfficial(createOfficialArray(response));
    progress.value = 70;
    const success = responses.every(response => response !== null);
    if (response && success) {
      handleSuccess(response, responses, response2, response3, response4, response5, response6);
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
};

const postRequirements = async (response: IKuList, dataArray: any, postFunction: any) => {
  const requirementsArray = dataArray.map((item: { item_type: any; item_code: any; item_name: any; producer: any; brand: any; }) => ({
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

const postBonusRequirements = async (response: IKuList, dataArray: any) => {
  const requirementsArray = dataArray.map((item: { fix: any; criterion: any; percent_sum: any; }) => ({
    ku_key_id: response.ku_id,
    fix: item.fix,
    criterion: item.criterion,
    percent_sum: item.percent_sum,
  }));

  return await Promise.all(requirementsArray.map(async (newItem: any)  => {
    try {
      return await KU.postKuRequirementBonus(newItem);
    } catch (error) {
      console.error("Ошибка при отправке бонуса на бэкенд:", error);
      return null;
    }
  }));
};

const postManagerItems = async (response:IKuList, dataArray: any, postFunction: any) => {
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

const postItems = async (response: IKuList, dataArray: any, postFunction: any) => {
  const itemsArray = dataArray.map((item: { doc_id: any; }) => ({
    ku_id: response.ku_id,
    doc_id: item.doc_id,
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

const createOfficialArray = (response: IKuList) => {
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

const handleSuccess = (response: IKuList, responses: any[], response2: any[], response3: any[], response4: any[], response5: any[], response6: IOfficialForKuPost) => {
  console.log("Экземпляр успешно отправлен на бэкенд:", response);
  console.log("вклУсловия успешно отправлены на бэкенд:", responses);
  console.log("исклУсловия успешно отправлены на бэкенд:", response2);
  console.log("бонус успешно отправлены на бэкенд:", response3);
  console.log("Искл. накладные успешно отправлены на бэкенд:", response4);
  console.log("Кат. менеджеры успешно отправлены на бэкенд:", response5);
  console.log("Должн. лица успешно отправлены на бэкенд:", response6);
  useKuStore().getKuFromAPIWithFilter();
  router.push("ku");
  ElMessage.success("Коммерческое условие успешно создано.");
};

const handleError = () => {
  console.error("Не удалось отправить экземпляр или условия на бэкенд");
  ElMessage.error("Возникла ошибка. Коммерческое условие не создано.");
};









// const addItemAndSendToBackend = async () => {
//   // Проверяем валидность формы
//   if (!isFormValid()) {
//     ElMessage.error('Не все поля заполнены корректно. Заполните: Код компании, код поставщика, период, начальная дата, конечная дата, дата договора ');
//     return;
//   }

//   // Проверяем наличие хотя бы одного условия по товарам
//   if (store.tableDataInRequirement.length === 0) {
//     ElMessage.error('Добавьте минимум одно условие по товарам');
//     return;
//   }

//   loading.value = true;
//   let success = false; // Переменная для отслеживания успешности выполнения всех запросов

//   try {
//     // Создаем объект newItem для отправки на бэкенд
//     const newItem = {
//       entity_id: store.newEntityId,
//       vendor_id: store.newVendorId,
//       period: store.newType,
//       date_start: dayjs(store.newDateStart, "DD.MM.YYYY").format("YYYY-MM-DD"),
//       date_end: dayjs(store.newDateEnd, "DD.MM.YYYY").format("YYYY-MM-DD"),
//       status: "Создано",
//       description: store.newDescription,
//       contract: store.newContract,
//       product_type: store.newProduct_type,
//       docu_account: store.newDocu_account,
//       docu_name: store.newDocu_name,
//       docu_number: store.newDocu_number,
//       docu_date: dayjs(store.newDocu_date, "DD.MM.YYYY").format("YYYY-MM-DD"),
//       docu_subject: store.newDocu_subject,
//       tax: store.newTax,
//       exclude_return: store.newExclude_return,
//       negative_turnover: store.newNegative_turnover,
//       ku_type: store.newKu_type,
//       pay_method: store.newPay_method,
//     };

//     // Отправляем запрос на создание нового элемента на бэкенд
//     const response = await KU.postKu(newItem);
//     progress.value = 10; // Устанавливаем прогресс после создания экземпляра

//     // Создаем массив объектов для каждого элемента из tableDataExRequirement
// const requirementsExArray = store.tableDataExRequirement.map(item => ({
//   ku_id: response.ku_id,
//   item_type: item.item_type,
//   item_code: item.item_code,
//   item_name: item.item_name,
//   producer: item.producer,
//   brand: item.brand,
// }));

// // Отправляем запросы на создание исключающих условий по товарам и обновляем прогресс
// let currentStepEx = 1;
// const totalStepsEx = requirementsExArray.length;
// for (const newItem of requirementsExArray) {
//   try {
//     const response = await KU.postKuExRequirement(newItem);
//     progress.value = Math.floor((currentStepEx / totalStepsEx) * 5) + 95; // Обновляем прогресс
//     currentStepEx++;
//   } catch (error) {
//     console.error("Ошибка при отправке исключающего условия на бэкенд:", error);
//   }
// }

// // Создаем массив объектов для каждого элемента из tableDataPercent
// const requirementsBonusArray = store.tableDataPercent.map(item => ({
//   ku_key_id: response.ku_id,
//   fix: item.fix,
//   criterion: item.criterion,
//   percent_sum: item.percent_sum,
// }));

// // Отправляем запросы на создание бонусных условий и обновляем прогресс
// let currentStepBonus = 1;
// const totalStepsBonus = requirementsBonusArray.length;
// for (const newItem of requirementsBonusArray) {
//   try {
//     const response = await KU.postKuRequirementBonus(newItem);
//     progress.value = Math.floor((currentStepBonus / totalStepsBonus) * 5) + 100; // Обновляем прогресс
//     currentStepBonus++;
//   } catch (error) {
//     console.error("Ошибка при отправке бонусного условия на бэкенд:", error);
//   }
// }

// // Отправляем запросы на создание исключающих накладных и обновляем прогресс
// const ExcludedInvoicesArray = store.tableDataExInvoiceSelect.map(item => ({
//   ku_id: response.ku_id,
//   doc_id: item.doc_id,
// }));

// let currentStepInvoice = 1;
// const totalStepsInvoice = ExcludedInvoicesArray.length;
// for (const newItem of ExcludedInvoicesArray) {
//   try {
//     const response = await KU.postKuExInvoices(newItem);
//     progress.value = Math.floor((currentStepInvoice / totalStepsInvoice) * 5) + 100; // Обновляем прогресс
//     currentStepInvoice++;
//   } catch (error) {
//     console.error("Ошибка при отправке исключающей накладной на бэкенд:", error);
//   }
// }

// // Отправляем запросы на создание категорий менеджеров и обновляем прогресс
// const ManagerArray = store.tableDataManagerSelect.map(item => ({
//   ku_id: response.ku_id,
//   group: item.group,
//   discription: item.discription
// }));

// let currentStepManager = 1;
// const totalStepsManager = ManagerArray.length;
// for (const newItem of ManagerArray) {
//   try {
//     const response = await KU.postKuManager(newItem);
//     progress.value = Math.floor((currentStepManager / totalStepsManager) * 5) + 100; // Обновляем прогресс
//     currentStepManager++;
//   } catch (error) {
//     console.error("Ошибка при отправке категории менеджера на бэкенд:", error);
//   }
// }

// // Отправляем запрос на создание должностных лиц и обновляем прогресс
// const OfficialArray = {
//   ku_id: response.ku_id,
//   counterparty_name: store.newOfFIOСounteragent,
//   counterparty_post: store.newOfPostСounteragent,
//   counterparty_docu: store.newOfDocСounteragent,
//   entity_name: store.newOfFIOEntity,
//   entity_post: store.newOfPostEntity,
//   entity_docu: store.newOfDocEntity,
// };

// try {
//   const response = await KU.postKuOfficial(OfficialArray);
//   progress.value = 100; // Обновляем прогресс
// } catch (error) {
//   console.error("Ошибка при отправке должностных лиц на бэкенд:", error);
// }

// // Если все запросы завершились успешно, выводим сообщение об успешном создании КУ
// if (response && success) {
//       console.log("Экземпляр успешно отправлен на бэкенд:", response);
//       console.log("вклУсловия успешно отправлены на бэкенд:", responses);
//       console.log("исклУсловия успешно отправлены на бэкенд:", response2);
//       console.log("бонус успешно отправлены на бэкенд:", response3);
//       console.log("Искл. накладные успешно отправлены на бэкенд:", response4);
//       console.log("Кат. менеджеры успешно отправлены на бэкенд:", response5);
//       console.log("Должн. лица успешно отправлены на бэкенд:", response6);
//       await useKuStore().getKuFromAPIWithFilter();
//       router.push("ku");
//       ElMessage.success("Коммерческое условие успешно создано.");
//     } else {
//       console.error("Не удалось отправить экземпляр или условия на бэкенд");
//       ElMessage.error("Возникла ошибка. Коммерческое условие не создано.");
//       return;
//     }
//     progress.value = 100;
//   } catch (error) {
//     // ElMessage.error("Возникла ошибка. Коммерческое условие не создано.");
//     console.error("Ошибка при отправке экземпляра на бэкенд:", error);
//     return;
//   } finally {
//     loading.value = false;
//   }
//   store.clearNewData()
// }



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
