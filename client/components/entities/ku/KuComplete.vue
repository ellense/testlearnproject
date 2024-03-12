<template>
  <el-scrollbar height="calc(100vh - 120px) !important">
    <EntitiesKuMain />

    <div class="button_bottom">
      <el-button @click="addClose()">Отменить</el-button>
      <el-button type="primary" @click="changeKuToBackend()" :loading="loading" :disabled="isEditButtonDisabled"
                :title="disableButtonEditTooltip">Изменить</el-button>
    </div>

  </el-scrollbar>
</template>

<script lang="ts" setup>
import { useKuIdStore } from "~~/stores/kuIdStore";
import dayjs from "dayjs";

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

  // Возвращаем результат общей проверки
  return (
    isEntityNameValid &&
    isNewTypeValid &&
    isNewDateStartValid &&
    isNewDateEndValid &&
    isVendorNameValid
  );
};


//отменить
const addClose = () => {
  router.push({ path: "/" });
  store.tableDataInRequirement.length = 0;
  store.tableDataExRequirement.length = 0;
  store.tableDataPercent.length = 0;
  store.disableButtonsIncluded = false;
  store.disableButtonsExcluded = false;
  store.kuIdEntityId = "";
  store.kuIdVendorId = "";
  store.kuIdType = "";
  store.kuIdDateStart = "";
  store.kuIdDateEnd = "";
  store.kuIdDocu_date = "";
};
const isEditButtonDisabled = computed(() => {
    return store.kuIdStatus !== 'Создано';
});

const disableButtonEditTooltip = computed(() => {
    return store.kuIdStatus !== 'Создано'
        ? 'Вы можете изменить только КУ в статусе "создано".'
        : "";
});


const changeKuToBackend = async () => {
    // Проверяем валидность формы
    if (!isFormValid()) {
        ElMessage.error('Не все поля заполнены корректно.');
        return;
    }
    // Проверяем наличие хотя бы одного условия по товарам
    // if (store.tableDataInRequirement.length === 0) {
    //     ElMessage.error('Добавьте минимум одно условие по товарам');
    //     return;
    // }

    loading.value = true;

    try {
        // Создаем объект newItem для отправки на бэкенд
        const newItem = {
            ku_id: store.ku_id,
            entity_id: store.kuIdEntityId,
            vendor_id: store.kuIdVendorId,
            period: store.kuIdType,
            date_start: dayjs(store.kuIdDateStart).format("YYYY-MM-DD"),
            date_end: dayjs(store.kuIdDateEnd).format("YYYY-MM-DD"),
            status: "Создано",
        };
        console.log("newItem", newItem)
        // Отправляем запрос на создание нового элемента на бэкенд
        const response = await KU.updateKu(newItem);

        // // Создаем массив объектов для каждого элемента из tableDataInRequirement
        // const requirementsArray = store.tableDataInRequirement.map(item => ({
        //   ku_id: response.ku_id, // используем ku_id из ответа на предыдущий запрос
        //   item_type: item.item_type,
        //   item_code: item.item_code,
        //   item_name: item.item_name,
        //   producer: item.producer,
        //   brand: item.brand,
        // }));

        // // Отправляем каждый объект из массива на бэкенд
        // const responses = await Promise.all(requirementsArray.map(newItem2 => KU.postKuRequirement(newItem2)));

        // Проверяем успешность отправки всех объектов
        // const allSuccess = responses.every(response => response !== undefined);
        // && allSuccess
        if (response) {
            console.log("Экземпляр успешно отправлен на бэкенд:", response);
            //   console.log("Условия успешно отправлены на бэкенд:", responses);
            router.push("ku");
            ElMessage.success("Коммерческое условие успешно изменено.");
        } else {
            console.error("Не удалось отправить экземпляр или условия на бэкенд из-за проверок");
            ElMessage.error("Возникла ошибка. Коммерческое условие не изменено.");
        }

    } catch (error) {
        ElMessage.error("Возникла ошибка. Коммерческое условие не изменено.");
        console.error("Ошибка при отправке экземпляра или условий на бэкенд:", error);
    } finally {
        loading.value = false;
        // Очищаем поля и таблицу условий
        store.tableDataInRequirement.length = 0;
        store.kuIdEntityId = "";
        store.kuIdVendorName = "";
        store.kuIdType = "";
        store.kuIdDateStart = "";
        store.kuIdDateEnd = "";
        store.kuIdDocu_date = "";
        store.disableButtons = false;
    }
    router.push({ path: "/" });
}
</script>

<style scoped>
/* .el-scrollbar__view{
height: 100%;
} */


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
