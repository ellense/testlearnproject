<template>
  <div class="directoryBar">
    <div class="directoryBar_filter">
      <h3>Услуги</h3>
      <el-divider direction="vertical" />
      <el-button type="success" plain @click="store.dialogFormServiceVisible = true" size="small">Добавить</el-button>
    </div>
    <div class="directoryBar_filter">
      <el-input v-model="searchQuery" placeholder="Поиск" style="max-width: 400px; min-width: 100px; width: 300px;"
        :prefix-icon="Search" size="small"></el-input>
    </div>
  </div>

  <el-dialog v-model="store.dialogFormServiceVisible" title="Новая услуга" close-on-click-modal close-on-press-escape
    draggable width="715px">
    <el-scrollbar class="scrollTableFiltres">
      <el-form>
        <el-form-item label-width="200" label="Код услуги">
          <el-input v-model="store.newService_id" placeholder="Введите код" style=" width: 300px;"
            size="small"></el-input>
        </el-form-item>
        <el-form-item label-width="200" label="Наименование услуги" prop="newVendorId">
          <el-input v-model="store.newService_name" placeholder="Введите наименование" style=" width: 300px;"
            size="small"></el-input>
        </el-form-item>
      </el-form>
    </el-scrollbar>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="store.dialogFormServiceVisible = false">Отмена</el-button>
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
const tableData = ref(store.tableDataService);

const searchQuery = ref('');
watch(searchQuery, (newValue: string) => {
  store.pagination = null;
  store.performSearchService(newValue);
});

const saveRow = async () => {
  const data = {
    service_code: store.newService_id,
    service_name: store.newService_name,
  };
  try {
    const response = await SERVICE.postServices(data);
    console.log("услуга успешно отправлена:", response);
    store.pagination = null
    await store.getServiceFromAPIWithFilter();
  } catch (error) {
    console.error("Ошибка при добавлении услуг на сервер", error);
  }
  store.dialogFormServiceVisible = false
}
</script>

<style scoped></style>
