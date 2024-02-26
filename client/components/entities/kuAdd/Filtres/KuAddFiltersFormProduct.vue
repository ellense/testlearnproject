<template>
  <el-dialog v-model="kuStore.dialogFormProductVisible" title="Выбор включенных товаров для КУ" close-on-click-modal
    close-on-press-escape draggable>
    <div class="buttonBar_search">
      <el-input v-model="searchProductInKu" placeholder="Поиск" style="width: 200px" :prefix-icon="Search" />
    </div>
    <el-scrollbar class="scrollTableFiltres">
      <el-table style="width: 100%" height="300" :data="tableData" @selection-change="useKuStore().handleSelectionChange3"
        ref="multipleTableRef" v-loading="loading">
        <el-table-column property="selection" type="selection" width="55" show-overflow-tooltip />
        <el-table-column prop="itemid" label="ID" width="100" show-overflow-tooltip />
        <el-table-column prop="name" label="Наименование" width="300" show-overflow-tooltip />
        <el-table-column prop="classifier_name" label="Категория" width="250" show-overflow-tooltip />
        <el-table-column prop="brand_name" label="Бренд" show-overflow-tooltip />
      </el-table>
    </el-scrollbar>
    <div v-if="pagination?.count" class="pagination">
      <el-pagination v-model:pageSize="pageSize" :page-sizes="[20, 50, 100, 300, 500]"
      :page-count="Math.ceil(pagination.count / pageSize)" layout="sizes, prev, pager, next"
      @size-change="handleSizeChange" @current-change="paginationChange" />
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="kuStore.dialogFormProductVisible = false">Отмена</el-button>
        <el-button @click="AddProductItem()">Сохранить</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { Search } from "@element-plus/icons-vue";
import { storeToRefs } from "pinia";
import { ref, onMounted, watch } from "vue";
import type { IProduct } from "~/utils/types/directoryTypes";
import { useKuStore } from "~~/stores/kuStore";
import { ElTable } from 'element-plus'

const kuStore = useKuStore();
const { getProduct, pagination, countRowTable } = storeToRefs(
  useKuStore()
);
const tableData = ref<IProduct[]>(getProduct.value);

const loading = ref()

watch(getProduct, (value) => {
  tableData.value = value || [];
});

const pageSize = ref(countRowTable);
const handleSizeChange = async (val: number) => {
  pageSize.value = val;
  useKuStore().setCountRowTable(val);
  try {
    await useKuStore().getKuFromAPIWithFilter();
  } catch (error) {
    console.error("Ошибка при загрузке данных ку1", error);
  }
};
//пагинация
const paginationChange = (page: number) => {
  useKuStore().setFilterValue3('page', page);
  useKuStore().getProductFromAPIWithFilter(page);
};

//поиск
const searchProductInKu = ref('');
watch(searchProductInKu, (newValue: string) => {
  useKuStore().performSearchProduct(newValue);
});

//для очистки выбора
const multipleTableRef = ref<InstanceType<typeof ElTable>>()
const toggleSelection = (rows?: IProduct[]) => {
  if (rows) {
    rows.forEach((row) => {
      multipleTableRef.value!.toggleRowSelection(row, false)
    })
  } else {
    multipleTableRef.value!.clearSelection()
  }
}

//добавление условий
const AddProductItem = () => {
  const selectedRows = useKuStore().multipleSelection3;

  selectedRows.forEach(row => {
    useKuStore().tableDataRequirement.push({
      item_type: "Таблица",
      item_code: row.itemid,
      item_name: row.name,
      producer: "",
      brand: "",
    });
    console.log("store.tableDataRequirementПРОДУКТЫ",useKuStore().tableDataRequirement);
  });
  toggleSelection()
  kuStore.dialogFormProductVisible = false;
};

//монтирование данных в таблицу
onMounted(async () => {
  try {
    loading.value = true; 
    await useKuStore().getProductFromAPIWithFilter();
    loading.value = false;
  } catch (error) {
    console.error("Ошибка при загрузке данных", error);
    loading.value = false;
  }
});

</script>