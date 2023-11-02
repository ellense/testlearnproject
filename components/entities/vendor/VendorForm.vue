<template>
  <el-dialog
    v-model="storeProvider.dialogFormVisible"
    title="Новый поставщик"
    close-on-click-modal
    close-on-press-escape
  >
    <el-form>
      <el-form-item label="Счет:" :label-width="formLabelWidth">
        <el-input
          v-model="newScore"
          placeholder="Введите счет"
          style="width: 200px"
          clearable
        />
      </el-form-item>
      <el-form-item label="Поставщик:" :label-width="formLabelWidth">
        <el-input
          v-model="newName"
          label="Наименование"
          placeholder="Введите наименование"
          style="width: 200px"
          clearable
        />
      </el-form-item>
      <el-form-item label="Юридическое лицо:" :label-width="formLabelWidth">
        <el-select
          v-model="EntityName"
          clearable
          placeholder="Выберите юр. лицо"
        >
          <el-option
            v-for="item in options"
            :key="item.EntityName"
            :label="item.label"
            :value="item.EntityName"
          />
        </el-select>
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="storeProvider.dialogFormVisible = false"
          >Отмена</el-button
        >
        <el-button @click="save()"> Добавить </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { useEntityTableStore } from "~~/stores/entityTableStore";
import { useProviderTableStore } from "~~/stores/providerTableStore";

const storeEntity = useEntityTableStore();
const storeProvider = useProviderTableStore();

const formLabelWidth = "200px";
const options = ref<{ EntityName: string; label: string }[]>([]);
const newName = ref<string>("");
const newScore = ref<number | null>(null);
const EntityName = ref<string>("");

const messageClose = () => {
  ElMessage({
    message: "Поставщик '" + newName.value + "' успешно добавлен",
    type: "success",
  });
};
const updateOptions = () => {
  options.value = storeEntity.tableData.map((entity) => ({
    EntityName: entity.name,
    label: entity.name,
  }));
};

const save = () => {
  storeProvider.addRows({
    id: storeProvider.tableData.length + 1,
    score: newScore.value,
    name: newName.value,
    nameEntity: EntityName.value,
  });
  storeProvider.dialogFormVisible = false;
  messageClose();
  newName.value = "";
  EntityName.value = "";
  newScore.value = null;
};

updateOptions();
</script>

<style scoped></style>
