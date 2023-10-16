<template>
  <div class="buttonBar">
    <div class="buttonBar_left">
      <el-button @click="dialogFormVisible = true"> Добавить </el-button>
      <el-button @click="storeEntity.deleteSelectedRows">Удалить</el-button>
    </div>
    <div class="buttonBar_search">
      <el-input
        v-model="storeEntity.search"
        placeholder="Поиск"
        style="width: 200px"
        :prefix-icon="Search"
      />
    </div>
  </div>

  <el-dialog
    v-model="dialogFormVisible"
    title="Новый поставщик"
    close-on-click-modal
    close-on-press-escape
  >
    <el-form>
      <el-form-item label="Наименование:" :label-width="formLabelWidth">
        <el-input
          v-model="newName"
          placeholder="Введите наименование"
          style="width: 200px"
          clearable
        ></el-input>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="dialogFormVisible = false">Отмена</el-button>
        <el-button @click="save()"> Добавить </el-button>
      </span>
    </template>
  </el-dialog>

  <el-scrollbar class="scrollTable" max-height="700px">
    <el-table
      :data="storeEntity.searchTableData"
      style="width: 100%"
      @selection-change="storeEntity.handleSelectionChange"
      height="700"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column type="index" width="55" show-overflow-tooltip />
      <el-table-column property="name" label="Name" show-overflow-tooltip />
    </el-table>
  </el-scrollbar>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { Search } from "@element-plus/icons-vue";
import { useEntityTableStore } from "~~/stores/entityTableStore";

const storeEntity = useEntityTableStore();

storeEntity.initializeTableData();

const dialogFormVisible = ref(false);
const formLabelWidth = "200px";
const newName = ref<string>("");
const messageClose = () => {
  ElMessage({
    message: "Юридическое лицо успешно добавлено",
    type: "success",
  });
};
const save = () => {
  storeEntity.addRows({
    id: storeEntity.tableData.length + 1,
    name: newName.value,
  });
  dialogFormVisible.value = false;
  newName.value = "";
  messageClose();
};
</script>
