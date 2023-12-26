<template>
  <el-scrollbar height="calc(100vh - 60px)">
    <form label-width="120px"
    label-position="top">
      <el-row>
        <el-col :span="5">
          <div class="custom-label">Юридическое лицо</div>
          <el-form-item>
            <el-select
              v-model="store.providerName"
              clearable
              style="width: 214px"
            >
              <el-option
                v-for="item in options"
                :key="item.providerName"
                :label="item.label"
                :value="item.providerName"
              />
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="5">
          <div class="custom-label">Период</div>
          <el-form-item>
            <el-select
              v-model="store.newType"
              clearable
              filterable
              style="width: 214px"
            >
              <el-option
                label="Неделя"
                value="Неделя"
                :disabled="true"
              ></el-option>
              <el-option label="Месяц" value="Месяц"></el-option>
              <el-option label="Квартал" value="Квартал"></el-option>
              <el-option label="Полгода" value="Полгода"></el-option>
              <el-option label="Год" value="Год"></el-option>
            </el-select>
          </el-form-item>
        </el-col>

        <el-col :span="5">
          <div class="custom-label">Начальная дата</div>
          <el-form-item>
            <el-date-picker
              v-model="store.newDateStart"
              style="width: 214px"
              format="DD.MM.YYYY"
              value-format="DD.MM.YYYY"
              clearable
            ></el-date-picker>
          </el-form-item>
        </el-col>
        <!-- <el-col :span="5">
          <el-button type="primary" @click="addItemAndSendToBackend()"
            >Создать</el-button
          >
        </el-col> -->
      </el-row>

      <el-row>
        <el-col :span="5">
          <div class="custom-label">Поставщик</div>
          <el-form-item>
            <el-select
              v-model="store.providerName"
              clearable
              style="width: 214px"
            >
              <el-option
                v-for="item in options"
                :key="item.providerName"
                :label="item.label"
                :value="item.providerName"
              />
            </el-select>
          </el-form-item>
        </el-col>
        <el-col :span="5">
          <div class="custom-label">Процент</div>
          <el-form-item>
            <el-input
            placeholder="Выбрать"
              v-model="store.newPercent"
              clearable
              style="width: 214px"
            ></el-input>
          </el-form-item>
        </el-col>

        <el-col :span="5">
          <div class="custom-label">Конечная дата</div>
          <el-form-item>
            <el-date-picker
              v-model="store.newDateEnd"
              style="width: 214px"
              format="DD.MM.YYYY"
              value-format="DD.MM.YYYY"
              clearable
            ></el-date-picker>
          </el-form-item>
        </el-col>
      </el-row>
    </form>
    <h3>Условия по товарам</h3>
    <!-- <div>
      <el-radio-group v-model="radio" @change="handleRadioChange">
        <el-radio-button label="Все" />
        <el-radio-button label="По фильтру" />
      </el-radio-group>
    </div> -->
    <EntitiesKuAddRequirement/>
    <div class="button_bottom">
      <el-button type="primary" @click="addItemAndSendToBackend()"
            >Создать</el-button
          >
    </div>
    

  </el-scrollbar>
</template>

<script lang="ts" setup>
import { ref } from "vue";

import { useKuTableStore } from "~~/stores/kuTableStore";
import { useVendorTableStore } from "~~/stores/providerTableStore";
import { useInvoiceTableStore } from "~~/stores/invoiceTableStore";
import { useRouter } from "vue-router";
import { formatter } from "element-plus";
import dayjs from "dayjs";

const providerStore = useVendorTableStore();
const store = useKuTableStore();
const invoiceStore = useInvoiceTableStore();
const router = useRouter();
const options = ref<{ providerName: string; label: string }[]>([]);
console.log("id name", providerStore.vendorNameAndIdList);
console.log("list", providerStore.vendorList);
const messageClose = () => {
  ElMessage({
    message: "Коммерческое условие успешно добавлено",
    type: "success",
  });
};

const handleRadioChange = (value: any) => {
  if (value === "По фильтру") {
    store.dialogFormVisible = true;
  } else {
    store.dialogFormVisible = false;
  }
};

const updateOptions = () => {
  options.value = providerStore.vendorList.map((provider) => ({
    providerName: provider.vendorid,
    label: provider.vendorid,
  }));
};
updateOptions();

// const addItemAndNavigate = () => {
//   store.addItem();
//   router.push("ku");
//   messageClose();
// };

const addItemAndSendToBackend = async () => {
  // Создаем объект с данными для нового элемента
  //const paddedId = String(store.tableData.length + 1).padStart(5, "0");
  //`КУ${paddedId}`
  const newItem = {
    ku_id: store.tableData.length + 20,
    vendor: store.providerName,
    period: store.newType,
    date_start: dayjs(store.newDateStart, "DD.MM.YYYY").format("YYYY-MM-DD"),
    date_end: dayjs(store.newDateEnd, "DD.MM.YYYY").format("YYYY-MM-DD"),
    status: "Создано",
    date_actual: dayjs(store.newDateActual, "DD.MM.YYYY").format("YYYY-MM-DD"),
    base: 15000 + store.tableData.length * store.tableData.length,
    percent: store.newPercent,
  };

  try {
    // Вызываем метод postKu для отправки на бэкенд
    const response = await KU.postKu(newItem);

    if (response) {
      // Обработка успешного ответа от бэкенда
      console.log("Экземпляр успешно отправлен на бэкенд:", response);
      router.push("ku");
      // Опционально: вывод уведомления об успешном добавлении
      messageClose();
    } else {
      // Обработка случая, когда ответ от бэкенда равен null
      console.error("Не удалось отправить экземпляр на бэкенд");
    }

    // Перенаправляем пользователя
    router.push("ku");
  } catch (error) {
    // Обработка ошибок, возникших при отправке на бэкенд
    console.error("Ошибка при отправке экземпляра на бэкенд:", error);
  }
};
const radio = ref();
</script>

<style scoped>
.el-row {
  margin-bottom: 20px;
}
.el-row:last-child {
  margin-bottom: 0;
}
.el-col {
  border-radius: 4px;
}
.grid-content {
  border-radius: 4px;
  min-height: 36px;
}
.custom-label {
  display: block;
  margin-bottom: 4px;
  font-size: 14px; 
}
.el-row{
  margin-bottom: 0;
}
.button_bottom{
margin: 20px 50px 0 0;
display: flex;
justify-content: flex-end;
}
</style>
