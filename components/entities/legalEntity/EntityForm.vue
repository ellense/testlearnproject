
<template>
  <el-dialog
    v-model="storeEntity.dialogFormVisible"
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
        <el-button @click="storeEntity.dialogFormVisible = false"
          >Отмена</el-button
        >
        <el-button @click="save()"> Добавить </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { useEntityTableStore } from "~~/stores/entityTableStore";

const storeEntity = useEntityTableStore();
const formLabelWidth = "200px";
const newName = ref<string>("");

const messageClose = () => {
  ElMessage({
    message: "Юридическое лицо '" + newName.value + "' успешно добавлено",
    type: "success",
  });
};

const save = () => {
  storeEntity.addRows({
    id: storeEntity.tableData.length + 1,
    name: newName.value,
  });
  storeEntity.dialogFormVisible = false;
  messageClose();
  newName.value = "";
};
</script>
<style lang=""></style>
