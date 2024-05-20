<template>
  <el-dialog v-model="store.dialogFormProductInVisible" title="Выбор включенных товаров для КУ" close-on-click-modal
    close-on-press-escape draggable>
    <h4>Код поставщика: <span style="font-weight: 400;">{{ store.kuAddMain.newVendorId }}</span></h4>
    <h4 style="margin-bottom:10px;">Наименование поставщика: <span style="font-weight: 400;">{{
      store.kuAddMain.newVendorName }}</span></h4>
    <div class="buttonBar_search">
      <el-input v-model="searchProductInKu" size="small" placeholder="Поиск" style="width: 200px" :prefix-icon="Search" />
    </div>
    <el-scrollbar class="scrollTableFiltres">
      <el-table style="width: 100%" height="300" :data="tableData" @selection-change="store.handleSelectionChange3"
        ref="multipleTableRef" v-loading="loading" stripe>
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
      @size-change="handleSizeChange" @current-change="paginationChange" :total="pagination.count"/>
    </div>
    <template #footer>
      <span class="dialog-footer">
        <el-button @click="store.dialogFormProductInVisible = false">Отмена</el-button>
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
const { getProductIn, pagination, countRowTable } = storeToRefs(
  useKuAddStore()
);
const tableData = ref<IProduct[]>(getProductIn.value);

const loading = ref()

watch(getProductIn, (value) => {
  tableData.value = value || [];
});

const pageSize = ref(countRowTable);
const handleSizeChange = async (val: number) => {
  pageSize.value = val;
  store.setCountRowTable(val);
  try {
    await store.getProductFromIncludedWithFilter();
  } catch (error) {
    console.error("Ошибка при загрузке данных вкл.прдуктов", error);
  }
};
//пагинация
const paginationChange = (page: number) => {
  store.setFilterProductInRequirement('page', page);
  store.getProductFromIncludedWithFilter(page);
};

//поиск
const searchProductInKu = ref('');
watch(searchProductInKu, (newValue: string) => {
  store.performSearchProductIn(newValue);
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
    store.tableDataInRequirement.push({
      id: null,
      item_type: "Таблица",
      item_code: row.itemid,
      item_name: row.name,
      producer: "",
      brand: "",
    });
    console.log("store.tableDataRequirementПРОДУКТЫ",store.tableDataInRequirement);
  });
  toggleSelection()
  store.dialogFormProductInVisible = false;
};

</script>