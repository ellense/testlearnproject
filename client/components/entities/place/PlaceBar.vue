<template>
  <div class="directoryBar">
    <div class="directoryBar_filter">
    <h3>Места оказания услуг</h3>
    <el-divider direction="vertical" />
    <el-button type="success" plain @click="store.dialogFormPlaceVisible = true" size="small">Добавить</el-button>
  </div>
    <div class="directoryBar_filter">
      <el-input v-model="searchQuery" placeholder="Поиск" style="max-width: 400px; min-width: 100px; width: 300px;" :prefix-icon="Search" size="small"></el-input>
    </div>
  </div>

  <el-dialog v-model="store.dialogFormPlaceVisible" title="Новая услуга" close-on-click-modal
      close-on-press-escape draggable width="715px">
      <el-scrollbar class="scrollTableFiltres">
        <el-form >
          <el-form-item label-width="200" label="Код магазина" >
            <el-input v-model="store.newShop_id" placeholder="Введите код" style=" width: 300px;" size="small"></el-input>
          </el-form-item>
          <el-form-item label-width="200" label="Наименование магазина" prop="newVendorId">
            <el-input v-model="store.newShop_name" placeholder="Введите наименование" style=" width: 300px;" size="small"></el-input>
          </el-form-item>
          <el-form-item label-width="200" label="Адрес" prop="newAddress">
            <el-input v-model="store.newShop_name" placeholder="Введите адрес" style=" width: 300px;" size="small"></el-input>
          </el-form-item>
        </el-form>
      </el-scrollbar>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="store.dialogFormPlaceVisible = false">Отмена</el-button>
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
const tableData = ref(store.tableDataPlace);

const searchQuery = ref('');
watch(searchQuery, (newValue: string) => {
  store.pagination = null;
  store.performSearchPlace(newValue);
});

const saveRow = async () => {
  const data = {
    shop_code: store.newShop_id, 
    shop_name: store.newShop_name, 
    address: store.newAddress
  };

  try {
    const response = await SERVICE.postPlace(data);
    console.log("магазин успешно отправлен:", response);
    store.pagination = null
    await store.getPlaceFromAPIWithFilter();
  } catch (error) {
    console.error("Ошибка при добавлении магазина на сервер", error);
  }

  store.dialogFormPlaceVisible = false
}
</script>

<style scoped></style>
