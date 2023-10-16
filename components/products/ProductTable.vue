<template>
  <div class="buttonBar">
    <div class="buttonBar_left">
      <el-button @click="dialogFormVisible = true"> Добавить </el-button>
      <el-button @click="storeProduct.deleteSelectedRows()">Удалить</el-button>
    </div>
    <div class="buttonBar_search">
      <el-input
        v-model="storeProduct.search"
        placeholder="Поиск"
        style="width: 200px"
        :prefix-icon="Search"
      />
    </div>
  </div>

  <el-dialog
    v-model="dialogFormVisible"
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
        <el-button @click="dialogFormVisible = false">Отмена</el-button>
        <el-button @click="save()"> Добавить </el-button>
      </span>
    </template>
  </el-dialog>

  <el-scrollbar class="scrollTable" height="700">
    <el-table
      ref="multipleTableRef"
      :data="storeProduct.searchTableData"
      style="width: 100%"
      @selection-change="storeProduct.handleSelectionChange"
      height="700"
    >
      <el-table-column
        property="selection"
        type="selection"
        width="55"
        show-overflow-tooltip
      />
      <el-table-column type="index" width="55" show-overflow-tooltip />
      <el-table-column
        property="name"
        label="Наименование"
        width="300"
        show-overflow-tooltip
      />
      <el-table-column
        property="nameProvider"
        label="Поставщик"
        width="300"
        show-overflow-tooltip
      />
      <el-table-column property="category" label="Категория" />
    </el-table>
  </el-scrollbar>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { Search } from "@element-plus/icons-vue";
import { useProviderTableStore } from "~~/stores/providerTableStore";
import { useProductTableStore } from "~~/stores/productTableStore";

const storeProvider = useProviderTableStore();
const storeProduct = useProductTableStore();

const dialogFormVisible = ref(false);
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
  dialogFormVisible.value = false;
  messageClose();
  newName.value = "";
  ProviderName.value = "";
  newCategory.value = "";
};

updateOptions();
</script>

<style scoped>
.el-button--text {
  margin-right: 15px;
}

.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>
