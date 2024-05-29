<template>
  <div class="directoryBar">
    <div class="directoryBar_filter">
      <h3>Прайслист статей услуг</h3>
      <el-divider direction="vertical" />
      <el-button type="success" plain @click="store.dialogFormPricelistVisible = true" size="small">Добавить</el-button>
    </div>
    <div class="directoryBar_filter">
      <el-input v-model="searchQuery" placeholder="Поиск" style="max-width: 400px; min-width: 100px; width: 300px;"
        :prefix-icon="Search" size="small"></el-input>
    </div>
  </div>
  <el-dialog v-model="store.dialogFormPricelistVisible" title="Новый прайс" close-on-click-modal close-on-press-escape
    draggable width="715px">
    <el-scrollbar class="scrollTableFiltres">
      <el-form>
        <el-form-item label-width="200" label="Действует с">
          <el-date-picker v-model="store.newPriceDate" style="width: 300px" size="small" placeholder="Выберите дату"
            format="DD.MM.YYYY"  clearable></el-date-picker>
        </el-form-item>
        <el-form-item label-width="200" label="Истечение срока">
          <el-input v-model="store.newPriceExpiration_date" placeholder="Введите дату истечения срока"
            style=" width: 300px;" size="small"></el-input>
        </el-form-item>
        <el-form-item label-width="200" label="Код статьи услуги">
          <el-input v-model="store.newPriceArticle_id" placeholder="Введите код" style=" width: 300px;"
            size="small"></el-input>
        </el-form-item>
        <el-form-item label-width="200" label="Наименование статьи услуги" prop="newVendorId">
          <el-input v-model="store.newPriceArticle_name" placeholder="Введите наименование" style=" width: 300px;"
            size="small"></el-input>
        </el-form-item>
        <el-form-item label-width="200" label="Стоимость">
          <el-input v-model="store.newPriceCost" placeholder="Введите стоимость" style=" width: 300px;"
            size="small"></el-input>
        </el-form-item>
        <el-form-item label-width="200" label="Единица измерения">
          <el-input v-model="store.newPricMeasure_unit" placeholder="Введите единицу измерения" style=" width: 300px;"
            size="small"></el-input>
        </el-form-item>
      </el-form>
    </el-scrollbar>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="store.dialogFormPricelistVisible = false">Отмена</el-button>
        <el-button @click="saveRow()">Сохранить</el-button>
      </span>
    </template>
  </el-dialog>

</template>

<script setup lang="ts">
import { watch, ref } from "vue";
import { Search } from "@element-plus/icons-vue";
import { useServiceStore } from "~~/stores/serviceStore";

const store = useServiceStore()
const tableData = ref(store.tableDataPricelist);

const searchQuery = ref('');
watch(searchQuery, (newValue: string) => {
  store.pagination = null;
  store.performSearchPricelist(newValue);
});

const saveRow = async () => {
  const data = {
    article_code: store.newPriceArticle_id,
    article_name: store.newPriceArticle_name,
    unit: store.newPricMeasure_unit, 
    price: store.newPriceCost, 
    date_expiration: store.newPriceExpiration_date, 
    date_action: store.newPriceDate,
  };

  try {
    const response = await SERVICE.postPricelist(data);
    console.log("прайс успешно отправлен:", response);
    store.pagination = null
    await store.getPricelistFromAPIWithFilter();
  } catch (error) {
    console.error("Ошибка при добавлении прайса на сервер", error);
  }

  store.dialogFormPricelistVisible = false
}

</script>

<style scoped></style>
