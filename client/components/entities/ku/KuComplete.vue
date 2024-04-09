<template>
  <EntitiesKuMain />

  <div class="button_bottom">
    <el-button @click="addClose()" size="small">Назад</el-button>
    <el-button type="primary" @click="changeKuToBackend()" :loading="loading" size="small"
      :disabled="isEditButtonDisabled" :title="disableButtonEditTooltip">Изменить</el-button>
  </div>

</template>

<script lang="ts" setup>
import { useKuIdStore } from "~~/stores/kuIdStore";
import { useKuStore } from "~~/stores/kuStore";
import dayjs from "dayjs";
import type { IKuList } from "~/utils/types/directoryTypes";
import { ElMessage } from 'element-plus'

const store = useKuIdStore();
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
  const isEntityNameValid = !isEmpty(store.kuIdEntityId);
  const isNewTypeValid = !isEmpty(store.kuIdType);
  const isNewDateStartValid = !isEmpty(store.kuIdDateStart);
  const isNewDateEndValid = !isEmpty(store.kuIdDateEnd);
  const isVendorNameValid = !isEmpty(store.kuIdVendorId);
  const isNewDocu_dateValid = !isEmpty(store.kuIdDocu_date);

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


//отменить
const addClose = () => {
  router.push({ path: "/" });
  store.clearData()
};
const isEditButtonDisabled = computed(() => {
  return store.kuIdStatus !== 'Создано';
});

const disableButtonEditTooltip = computed(() => {
  return store.kuIdStatus !== 'Создано'
    ? 'Вы можете изменить только КУ в статусе "Создано".'
    : "";
});
const changeKuToBackend = async () => {
  try {
    if (!isFormValid()) {
      ElMessage({
        showClose: true,
        message: 'Не все поля заполнены корректно. Заполните: Код компании, код поставщика, период, начальная дата, конечная дата, дата договора.',
        duration: 10000,
        type: 'error',
      })
      return;
    }
    if (store.tableDataInRequirement.length === 0) {
      ElMessage.error('Добавьте минимум одно условие по товарам');
      return;
    }

    loading.value = true;



    const response = await KU.updateKu(createNewItem());
    deleteInRequirement()
    const responses = await postRequirements(response, store.tableDataInRequirement, KU.postKuInRequirementChange);
    deleteExRequirement()
    const response2 = await postRequirements(response, store.tableDataExRequirement, KU.postKuExRequirementChange);
deleteRequirementBonus()
    const response3 = await postBonusRequirements(response, store.tableDataPercent);
    deleteExInvoice()
     const response4 = await postItems(response, store.tableDataExInvoiceSelect, KU.postKuExInvoices);
     deleteManager()
     const response5 = await postManagerItems(response, store.tableDataManagerSelect, KU.postKuManager);

     const response6 = await KU.updateOfficial(createOfficialArray());

    const success = responses.every(response => response !== null);
    if (response && success) {
      handleSuccess(response, responses, response2, response3,response4,response5,response6,);

    }
  } catch (error) {
    console.error("Ошибка при отправке экземпляра на бэкенд:", error);
    ElMessage.error("Возникла ошибка. Коммерческое условие не изменено.");
  } finally {
    loading.value = false;
  }

};

const createNewItem = () => {
  return {
    ku_id: store.ku_id,
    entity_id: store.kuIdEntityId,
    vendor_id: store.kuIdVendorId,
    period: store.kuIdType,
    date_start: dayjs(store.kuIdDateStart).format("YYYY-MM-DD"),
    date_end: dayjs(store.kuIdDateEnd).format("YYYY-MM-DD"),
    status: "Создано",
    description: store.kuIdDescription,
    contract: store.kuIdContract,
    product_type: store.kuIdProduct_type,
    docu_account: store.kuIdDocu_account,
    docu_name: store.kuIdDocu_name,
    docu_number: store.kuIdDocu_number,
    docu_date: dayjs(store.kuIdDocu_date).format("YYYY-MM-DD"),
    docu_subject: store.kuIdDocu_subject,
    tax: store.kuIdTax,
    exclude_return: store.kuIdExclude_return,
    negative_turnover: store.kuIdNegative_turnover,
    ku_type: store.kuIdKu_type,
    pay_method: store.kuIdPay_method,
  };
};

const postRequirements = async (response: any, dataArray: any, postFunction: any) => {
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

const postBonusRequirements = async (response: any, dataArray: any) => {
  const requirementsArray = dataArray.map((item: { fix: any; criterion: any; percent_sum: any; }) => ({
    ku_key_id: response.ku_id,
    fix: item.fix,
    criterion: item.criterion !== null ? item.criterion : 0,
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

const postManagerItems = async (response:any, dataArray: any, postFunction: any) => {
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

const postItems = async (response: any, dataArray: any, postFunction: any) => {
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

const handleSuccess = (response: any, responses: any[], response2: any[], response3: any,response4: any, response5: any,response6: any) => {
  console.log("Экземпляр успешно отправлен на бэкенд:", response);
  console.log("вклУсловия успешно отправлены на бэкенд:", responses);
  console.log("исклУсловия успешно отправлены на бэкенд:", response2);
  console.log("бонус успешно отправлены на бэкенд:", response3);
  console.log("Искл. накладные успешно отправлены на бэкенд:", response4);
  console.log("Кат. менеджеры успешно отправлены на бэкенд:", response5);
  console.log("Должн. лица успешно отправлены на бэкенд:", response6);
  useKuStore().getKuFromAPIWithFilter();
  router.push({ path: "/" });
  ElMessage.success("Коммерческое условие успешно изменено.");
  store.clearData()
};



// const changeKuToBackend = async () => {
//   // Проверяем валидность формы
//   if (!isFormValid()) {
//     ElMessage.error('Не все поля заполнены корректно.');
//     return;
//   }

//   loading.value = true;

//   try {
//     // Создаем объект newItem для отправки на бэкенд
//     const newItem = {
//       ku_id: store.ku_id,
//       entity_id: store.kuIdEntityId,
//       vendor_id: store.kuIdVendorId,
//       period: store.kuIdType,
//       date_start: dayjs(store.kuIdDateStart).format("YYYY-MM-DD"),
//       date_end: dayjs(store.kuIdDateEnd).format("YYYY-MM-DD"),
//       status: "Создано",
//       description: store.kuIdDescription,
//       contract: store.kuIdContract,
//       product_type: store.kuIdProduct_type,
//       docu_account: store.kuIdDocu_account,
//       docu_name: store.kuIdDocu_name,
//       docu_number: store.kuIdDocu_number,
//       docu_date: dayjs(store.kuIdDocu_date).format("YYYY-MM-DD"),
//       docu_subject: store.kuIdDocu_subject,
//       tax: store.kuIdTax,
//       exclude_return: store.kuIdExclude_return,
//       negative_turnover: store.kuIdNegative_turnover,
//       // ku_type: store.kuIdKu_type === 'Ретро-бонус' ? 'Service' : 'RetroBonus',
//       ku_type: store.kuIdKu_type,
//       pay_method: store.kuIdPay_method,
//     };
//     console.log("newItem", newItem)
//     // Отправляем запрос на создание нового элемента на бэкенд
//     const response = await KU.updateKu(newItem);

//     const newItem2 = {
//       ku_id: store.ku_id,
//       entity_id: store.kuIdEntityId,
//       ku_id: string;
//   item_type: string;
//   item_code: string;
//   item_name: string;
//   producer: string;
//   brand: string;
//     };
//     console.log("newItem", newItem)
//     // Отправляем запрос на создание нового элемента на бэкенд
//     const response2 = await KU.updateKu(newItem);
//     if (response) {
//       console.log("Экземпляр успешно отправлен на бэкенд:", response);
//       //   console.log("Условия успешно отправлены на бэкенд:", responses);
//       router.push("ku");
//       ElMessage.success("Коммерческое условие успешно изменено.");
//     } else {
//       console.error("Не удалось отправить экземпляр или условия на бэкенд из-за проверок");
//       ElMessage.error("Возникла ошибка. Коммерческое условие не изменено.");
//     }

//   } catch (error) {
//     ElMessage.error("Возникла ошибка. Коммерческое условие не изменено.");
//     console.error("Ошибка при gизменении экземпляра или условий на бэкенд:", error);
//   } finally {
//     loading.value = false;

//   }
//   router.push({ path: "/" });
//   store.clearData()

// }

//удаление вкл условий
const deleteInRequirement = () => {
  const selectedRows = store.tableDataInRequirementOrigin.map((row) => row.in_prod_id);
  console.log("SSSselectedRows", selectedRows);
  const deletePromises = selectedRows.map(async (in_prod_id) => {
    try {
      const results = await KU.deleteInRequirement({ in_prod_id });
      console.log("успешно удалилось вкл !!!!!!!!!!!!", results);
      return results;
    } catch (error) {
      console.error("Ошибка при удалении строки:", error);
      throw error; 
    }
  });

  return Promise.all(deletePromises);
};
//удаление вкл условий
const deleteExRequirement = () => {
  const selectedRows = store.tableDataExRequirementOrigin.map((row) => row.id);
  const deletePromises = selectedRows.map(async (id) => {
    try {
      const results = await KU.deleteExRequirement({ id });
      return results;
    } catch (error) {
      console.error("Ошибка при удалении строки:", error);
      throw error;
    }
  });
  return Promise.all(deletePromises);
};
//удаление бонусов
const deleteRequirementBonus = () => {
  const selectedRows = store.tableDataPercentOrigin.map((row) => row.id);
  const deletePromises = selectedRows.map(async (id) => {
    try {
      const results = await KU.deleteRequirementBonus({ id });
      return results;
    } catch (error) {
      console.error("Ошибка при удалении строки:", error);
      throw error;
    }
  });
  return Promise.all(deletePromises);
};
//удаление искл накладных
const deleteExInvoice = () => {
  const selectedRows = store.tableDataExInvoiceSelectOrigin.map((row) => row.id);
  const deletePromises = selectedRows.map(async (id) => {
    try {
      const results = await KU.deleteExInvoiceForKuId({ id });
      return results;
    } catch (error) {
      console.error("Ошибка при удалении строки:", error);
      throw error;
    }
  });
  return Promise.all(deletePromises);
};
const deleteManager = () => {
  const selectedRows = store.tableDataManagerSelectOrigin.map((row) => row.id);
  const deletePromises = selectedRows.map(async (id) => {
    try {
      const results = await KU.deleteManager({ id });
      return results;
    } catch (error) {
      console.error("Ошибка при удалении строки:", error);
      throw error;
    }
  });
  return Promise.all(deletePromises);
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
