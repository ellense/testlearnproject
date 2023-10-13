<template>
  <!-- Form -->
  <el-button text @click="dialogFormVisible = true"> Добавить товар </el-button>
  <el-dialog v-model="dialogFormVisible" title="Новый товар">
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
  
  <el-scrollbar class="scrollTable" max-height="400px">
    <el-table
      ref="multipleTableRef"
      :data="storeProduct.searchTableData"
      style="width: 100%"
      @selection-change="storeProduct.handleSelectionChange"
      height="400"
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
      <el-table-column>
        <template #header>
          <el-input
            v-model="storeProduct.search"
            placeholder="Поиск"
            style="width: 200px"
            :prefix-icon="Search"
          />
        </template>
      </el-table-column>
    </el-table>
  </el-scrollbar>
  
  
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { Search } from "@element-plus/icons-vue";
import { useProviderTableStore } from "~~/stores/providerTableStore";
import { useProductTableStore } from "~~/stores/productTableStore";



const dialogFormVisible = ref(false);
const formLabelWidth = "140px";
const options = ref<{ ProviderName: string; label: string }[]>([]);
const newName = ref<string>("");
const ProviderName = ref<string>("");
const newCategory = ref<string>("");

const storeProvider = useProviderTableStore();
const storeProduct = useProductTableStore();

//storeProvider.initializeTableData();
//storeProduct.initializeTableData();

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
  newName.value = "";
  ProviderName.value = "";
  newCategory.value = "";
};

updateOptions();


const saveProduct = () => {
  
  dialogFormVisible.value = false;
  storeProduct.addRows;
};



// const dialogVisible = ref(false);

// const newProduct = ref({
//   name: "",
//   nameProvider: "",
//   category: "",
// });

// const openDialog = () => {
//   dialogVisible.value = true;
// };

// const saveProduct = () => {
//   storeProduct.addProduct(newProduct.value);
//   dialogVisible.value = false;
// };

// return {
//   // ...
//   dialogVisible,
//   newProduct,
//   openDialog,
//   saveProduct,
// };

</script>

<style scoped>
.el-button--text {
  margin-right: 15px;
}
.el-select {
  width: 300px;
}
.el-input {
  width: 300px;
}
.dialog-footer button:first-child {
  margin-right: 10px;
}
</style>
