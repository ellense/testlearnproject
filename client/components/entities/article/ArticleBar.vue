<template>
  <div class="directoryBar">
    <div class="directoryBar_filter">
    <h3>Статьи услуг</h3>
    <el-divider direction="vertical" />
    <el-button type="success" plain @click="store.dialogFormArticleVisible = true" size="small">Добавить</el-button>
  </div>
    <div class="directoryBar_filter">
      <el-input v-model="searchQuery" placeholder="Поиск" style="max-width: 400px; min-width: 100px; width: 300px;" :prefix-icon="Search" size="small"></el-input>
    </div>
  </div>

  <el-dialog v-model="store.dialogFormArticleVisible" title="Новая статья услуг" close-on-click-modal
      close-on-press-escape draggable width="715px">
      <el-scrollbar class="scrollTableFiltres">
        <el-form >
          <el-form-item label-width="200" label="Код статьи услуги">
            <el-input v-model="store.newArticle_id" placeholder="Введите код" style=" width: 300px;" size="small"></el-input>
          </el-form-item>
          <el-form-item label-width="200" label="Наименование статьи услуги">
            <el-input v-model="store.newArticle_name" placeholder="Введите наименование" style=" width: 300px;" size="small"></el-input>
          </el-form-item>
        </el-form>
      </el-scrollbar>
      <template #footer>
        <span class="dialog-footer">
          <el-button @click="store.dialogFormArticleVisible = false">Отмена</el-button>
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
const tableData = ref(store.tableDataArticle);

const searchQuery = ref('');
watch(searchQuery, (newValue: string) => {
  store.pagination = null;
  store.performSearchArticle(newValue);
});

const saveRow = async () => {
  tableData.value.push({ article_code: store.newArticle_id , article_name: store.newArticle_name, });
  console.log("данные статей услуг :", store.tableDataArticle)
  store.dialogFormArticleVisible = false
  store.pagination = null
  await store.getArticleFromAPIWithFilter();
}
</script>

<style scoped></style>
