<template>
  <el-dialog v-model="store.dialogFormCategoryInVisible" width="530px"
    title="Выбор включенных: категории, производителя и торговой марки для КУ" close-on-click-modal close-on-press-escape
    draggable>
    <h4>Код поставщика: <span style="font-weight: 400;">{{ store.kuIdVendorId }}</span></h4>
    <h4 style="margin-bottom:10px;">Наименование поставщика: <span style="font-weight: 400;">{{
      store.kuIdVendorName }}</span></h4>
    <div class="selectCategory">
      <div>
        <div class="custom-label">Категория</div>
        <el-tree-select v-model="value" :data="treeData" filterable clearable placeholder="Выберите категорию"
          :render-after-expand="false" style="width: 500px" class="tree_U" :props="defaultProps" ref="treeRef"
          node-key="classifier_code" @change="getCheckedKeys" />
      </div>
      <div>
        <div class="custom-label">Производитель</div>
        <el-select-v2 v-model="store2.valueProducer_nameIn" clearable filterable style="width: 500px; "
          placeholder="Выберите производителя" :options="options2" @change="onProducerChange">
          <template #option="{ option }">
            <span>{{ option.label }}</span>
            <span style="
              margin-left: 10px;
              float: right;
              color: var(--el-text-color-secondary);
              font-size: 13px;
            ">{{ option.value }}</span>
          </template>
        </el-select-v2>
      </div>
      <div>
        <div class="custom-label">Торговая марка</div>
        <el-select-v2 v-model="store2.valueBrand_nameIn" clearable filterable style="width: 500px"
          placeholder="Выберите торговую марку" :options="options3">
          <template #option="{ option }">
            <span>{{ option.label }}</span>
            <span style="
              margin-left: 10px;
              float: right;
              color: var(--el-text-color-secondary);
              font-size: 13px;
            ">{{ option.value }}</span>
          </template>
        </el-select-v2>
      </div>
    </div>


    <template #footer>
      <span class="dialog-footer">
        <el-button @click="store.dialogFormCategoryInVisible = false">Отменить</el-button>
        <el-button @click="AddCategoryItem()">Сохранить</el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script setup lang="ts">
import { ref, watch } from 'vue';
import { useKuAddStore } from '~~/stores/kuAddStore';
import { useKuIdStore } from "~~/stores/kuIdStore";
import type { ElTree } from 'element-plus'
import type { IBrand } from '~/utils/types/brandTypes';
import type { ITree } from '~/utils/types/treeTypes';
import type { IProducer } from '~/utils/types/producerTypes';

const store = useKuIdStore();
const store2 = useKuAddStore();

const options2 = ref<Array<{ label: string; value: string }>>([]);
const options3 = ref<Array<{ label: string; value: string }>>([]);

watch(() => store2.producerIncluded, (producers: IProducer[]) => {
  const uniqueProducers = Array.from(new Set(producers.map(item => item.producer_name)));
  options2.value = uniqueProducers.map(label => ({ label, value: label }));
});

watch(() => store2.brandIncluded, (brands: IBrand[]) => {
  const uniqueBrands = Array.from(new Set(brands.map(item => item.brand_name)));
  options3.value = uniqueBrands.map(label => ({ label, value: label }));
});

const onProducerChange = async () => {
  store2.valueBrand_nameIn = "";
  store2.setFilterBrand('producer_name', store2.valueProducer_nameIn);
  if (store2.valueProducer_nameIn) { // Проверка, что выбрана торговая маркка
    store2.fetchAllBrandsForIncluded(); // Выполнить запрос с фильтром по производителям
    console.log('Выполнен запрос на получение данных производителей.');
  } else {
    store2.setFilterBrand('producer_name', undefined); // Сбросить фильтр
    console.log('Сброшен фильтр производителей:', store2.filterBrandIncluded);
    store2.fetchAllBrandsForIncluded(); // Выполнить запрос без фильтра
    console.log('Выполнен запрос на получение всех данных производителей.');
  }
};

//дерево
const value = ref()
const treeData = ref<ITree[]>([]);
const treeRef = ref<InstanceType<typeof ElTree>>()

const defaultProps = {
  children: 'children',
  label: 'name',
  isLeaf: 'isLeaf',
};

watch(() => store2.treeData, (newTreeData: ITree[]) => {
  treeData.value = newTreeData;
});

//изменение поля дерева
let selectedCategoryName = '';
const getCheckedKeys = async (checkedKeys: any, checkedNodes: any) => {
  store2.valueBrand_nameIn = "";
  store2.valueProducer_nameIn = "";
  store2.setFilterProducer("l4", []);
  store2.setFilterBrand('producer_name', undefined);
  console.log('Отмеченные ключи:', checkedKeys);

  if (checkedKeys && checkedKeys.length > 0) {
    const selectedCategoryKey = checkedKeys; // Получаем ключ выбранной категории
    console.log('Выбранный ключ категории:', selectedCategoryKey);
    // Находим соответствующий элемент в дереве данных
    const selectedCategory = findCategoryByKey(treeData.value, selectedCategoryKey);

    if (selectedCategory) {
      selectedCategoryName = selectedCategory.name; // Сохраняем имя выбранной категории для отправки в условия
    }
    store2.setFilterProducer("l4", selectedCategoryKey);
    store2.setFilterBrand("l4", selectedCategoryKey);
   
    if (selectedCategoryKey.length > 0) { // Проверка, что выбрана категория
      store2.fetchAllProducersForInclided(); // Выполнить запрос с фильтром по категории
      store2.fetchAllBrandsForIncluded();
      console.log('Выполнены запросы по фильтру категории.');
    }
  }
}

// Функция для поиска категории по ключу в дереве данных
const findCategoryByKey = (tree: ITree[], key: any): ITree | undefined => {
  for (const node of tree) {
    if (node.classifier_code === key) {
      return node;
    }
    if (node.children) {
      const result = findCategoryByKey(node.children, key);
      if (result) {
        return result;
      }
    }
  }
  return undefined;
};
// //дерево
// const value = ref()
// const treeData = ref<ITree[]>([]);
// const treeRef = ref<InstanceType<typeof ElTree>>()

// const defaultProps = {
//   children: 'children',
//   label: 'name',
//   isLeaf: 'isLeaf',
// };

// //изменение поля дерева
// let selectedCategoryName = '';
// const getCheckedKeys = async (checkedKeys: any, checkedNodes: any) => {
//   store2.valueBrand_nameIn = "";
//   store2.valueProducer_nameIn = "";
//   store2.setFilterProducer("l4", []);
//   store2.setFilterBrand('producer_name', undefined);
//   await store2.fetchAllProducersForInclided();
//   await store2.fetchAllBrandsForIncluded();
//   console.log('Отмеченные ключи:', checkedKeys);

//   if (checkedKeys && checkedKeys.length > 0) {
//     const selectedCategoryKey = checkedKeys; // Получаем ключ выбранной категории
//     console.log('Выбранный ключ категории:', selectedCategoryKey);
//     // Находим соответствующий элемент в дереве данных
//     const selectedCategory = findCategoryByKey(treeData.value, selectedCategoryKey);

//     if (selectedCategory) {
//       selectedCategoryName = selectedCategory.name; // Сохраняем имя выбранной категории для отправки в условия
//     }
//     store2.setFilterProducer("l4", selectedCategoryKey);
//     store2.setFilterBrand("l4", selectedCategoryKey);
   
//     if (selectedCategoryKey.length > 0) { // Проверка, что выбрана категория
//       store2.fetchAllProducersForInclided(); // Выполнить запрос с фильтром по категории
//       store2.fetchAllBrandsForIncluded();
//       console.log('Выполнены запросы по фильтру категории.');
//     }
//   }
// }

// // Функция для поиска категории по ключу в дереве данных
// const findCategoryByKey = (tree: ITree[], key: any): ITree | undefined => {
//   for (const node of tree) {
//     if (node.classifier_code === key) {
//       return node;
//     }
//     if (node.children) {
//       const result = findCategoryByKey(node.children, key);
//       if (result) {
//         return result;
//       }
//     }
//   }
//   return undefined;
// };

//добавление условий по категории
const AddCategoryItem = async () => {
  if (store2.valueProducer_nameIn || value.value || store2.valueBrand_nameIn) {
    console.log("valueProducer_name", store2.valueProducer_nameIn);
    console.log("valueBrand_name", store2.valueBrand_nameIn);

    // Используем сохраненное значение selectedCategoryName
    store.tableDataInRequirement.push({
      id: null,
      item_type: "Категория",
      item_code: value.value,
      item_name: selectedCategoryName, // Передаем имя выбранной категории
      producer: store2.valueProducer_nameIn,
      brand: store2.valueBrand_nameIn,
    });
    console.log("store.tableDataRequirementКАТЕГОРИЯ", store.tableDataInRequirement);

    store.dialogFormCategoryInVisible = false;
    value.value = "";
    store2.valueProducer_nameIn = "";
    store2.valueBrand_nameIn = "";
    selectedCategoryName = ''
    store2.setFilterProducer("l4", []);
    store2.setFilterBrand('producer_name', undefined);
    await store2.fetchAllProducersForInclided();
    await store2.fetchAllBrandsForIncluded();
  } else {
    ElMessage.error('Заполните минимум одно поле или нажмите "Отменить"');
  }
};


</script>

<style scoped>
.containerFilter {
  display: flex;
}

.selectCategory {
  display: flex;
  flex-direction: column;
  gap: 20px;
  max-width: 700px;
  margin: 20px 0 20px 0;
}
</style>
~/utils/types/serviceTypes