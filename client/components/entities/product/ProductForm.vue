<template>
  <el-dialog
    v-model="storeProduct.dialogFormVisible"
    title="Новый товар"
    close-on-click-modal
    close-on-press-escape
  >
    <el-form>
      <el-form-item label="Наименование:" :label-width="formLabelWidth">
        <el-input
          v-model="newName"
          label="Наименование"
          placeholder="Введите наименование"
          style="width: 200px"
          clearable
        />
      </el-form-item>
      <el-form-item label="Поставщик:" :label-width="formLabelWidth">
        <el-select
          v-model="ProviderName"
          clearable
          placeholder="Выберите поставщика"
        >
          <el-option
            v-for="item in options"
            :key="item.ProviderName"
            :label="item.label"
            :value="item.ProviderName"
          />
        </el-select>
      </el-form-item>
      <el-form-item label="Категория:" :label-width="formLabelWidth">
        <el-input
          v-model="newCategory"
          placeholder="Введите категорию товара"
          style="width: 200px"
          clearable
        />
      </el-form-item>
    </el-form>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="storeProduct.dialogFormVisible = false"
          >Отмена</el-button
        >
        <el-button @click="save()"> Добавить </el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { useProviderTableStore } from "~~/stores/providerTableStore";
import { useProductTableStore } from "~~/stores/productTableStore";

const storeProvider = useProviderTableStore();
const storeProduct = useProductTableStore();

const formLabelWidth = "140px";

const options = ref<{ ProviderName: string; label: string }[]>([]);
const newName = ref<string>("");
const ProviderName = ref<string>("");
const newCategory = ref<string>("");

const messageClose = () => {
  ElMessage({
    message: "Товар '" + newName.value + "' успешно добавлен",
    type: "success",
  });
};

const updateOptions = () => {
  options.value = storeProvider.tableData.map((provider) => ({
    ProviderName: provider.name,
    label: provider.name,
  }));
};

const save = () => {
  storeProduct.addRows({
    id: storeProduct.tableData.length + 1,
    name: newName.value,
    nameProvider: ProviderName.value,
    category: newCategory.value,
  });
  storeProduct.dialogFormVisible = false;
  messageClose();
  newName.value = "";
  ProviderName.value = "";
  newCategory.value = "";
};

updateOptions();
</script>

<style scoped></style>
