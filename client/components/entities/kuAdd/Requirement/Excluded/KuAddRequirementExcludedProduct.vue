<template>
  <el-dialog v-model="store.dialogFormProductExVisible" title="Выбор исключенных товаров для КУ" close-on-click-modal
    close-on-press-escape draggable>
    <h4>Код поставщика: <span style="font-weight: 400;">{{ store.kuAddMain.newVendorId }}</span></h4>
    <h4 style="margin-bottom:10px;">Наименование поставщика: <span style="font-weight: 400;">{{
      store.kuAddMain.newVendorName }}</span></h4>
    <div class="buttonBar_search">
      <el-input v-model="searchProductExKu" size="small" placeholder="Поиск" style="width: 200px" :prefix-icon="Search" />
    </div>
    <el-scrollbar class="scrollTableFiltres">
      <el-table style="width: 100%" height="300" :data="tableData"
        @selection-change="store.handleSelectionChange3" ref="multipleTableRef" v-loading="loading" stripe>
        <el-table-column property="selection" type="selection" width="55" show-overflow-tooltip />
        <el-table-column prop="itemid" label="ID" width="100" show-overflow-tooltip />
        <el-table-column prop="name" label="Наименование" width="300" show-overflow-tooltip />
        <el-table-column prop="classifier_name" label="Категория" width="250" show-overflow-tooltip />
        <el-table-column prop="brand_name" label="Бренд" show-overflow-tooltip />
      </el-table>
    </el-scrollbar>
    <div v-if="pagination?.count" class="pagination">
      <el-pagination v-model:pageSize="pageSize" small :page-sizes="[20, 50, 100, 300, 500]"
        :page-count="Math.ceil(pagination.count / pageSize)" layout="sizes, prev, pager, next, total"
        @size-change="handleSizeChange" @current-change="paginationChange" :total="pagination.count" />
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="store.dialogFormProductExVisible = false">Отмена</el-button>
        <el-button @click="AddProductItem()">Сохранить</el-button>
      </span>
    </template>
  </el-dialog>
</template>

<script setup lang="ts">
import { Search } from "@element-plus/icons-vue";
import { storeToRefs } from "pinia";
import { ref, onMounted, watch } from "vue";
import type { IProduct } from "~/utils/types/productTypes";
import { useKuAddStore } from "~~/stores/kuAddStore";
import { ElTable } from 'element-plus'

const store = useKuAddStore();
const { getProductEx, pagination, countRowTable } = storeToRefs(
  store
);
const tableData = ref<IProduct[]>(getProductEx.value);

const loading = ref()

watch(getProductEx, (value) => {
  tableData.value = value || [];
});

const pageSize = ref(countRowTable);
const handleSizeChange = async (val: number) => {
  pageSize.value = val;
  store.setCountRowTable(val);
  try {
    await store.getProductFromExcludedWithFilter();
  } catch (error) {
    console.error("Ошибка при загрузке данных искл.продуктов", error);
  }
};

//пагинация
const paginationChange = (page: number) => {
  store.setFilterProductEx('page', page);
  store.getProductFromExcludedWithFilter(page);
};

//поиск
const searchProductExKu = ref('');
watch(searchProductExKu, (newValue: string) => {
  store.performSearchProductEx(newValue);
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
  const selectedRows = store.multipleSelectionProduct;

  selectedRows.forEach(row => {
    store.tableDataExRequirement.push({
      id: null,
      item_type: "Таблица",
      item_code: row.itemid,
      item_name: row.name,
      producer: "",
      brand: "",
    });
    console.log("исклПРОДУКТЫ", store.tableDataExRequirement);
  });
  toggleSelection()
  store.dialogFormProductExVisible = false;
};
</script>