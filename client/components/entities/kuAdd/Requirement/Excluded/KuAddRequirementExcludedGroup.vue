<template>
  <el-dialog v-model="useKuAddStore().dialogFormCategoryExVisible" width="750px"
    title="Выбор включенных: категории, производителя и торговой марки для КУ" close-on-click-modal
    close-on-press-escape draggable>
    <div class="selectCategory">
      <div>
        <div class="custom-label">Категория</div>
        <el-tree-select v-model="value" :data="treeData" filterable clearable placeholder="Выберите категорию"
          :render-after-expand="false" style="width: 500px" class="tree_U" :props="defaultProps" ref="treeRef"
          node-key="classifier_code" @change="getCheckedKeys" />
      </div>
      <div>
        <div class="custom-label">Производитель</div>
        <el-select-v2 v-model="store.valueProducer_nameEx" clearable filterable style="width: 500px; "
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
        <el-select-v2 v-model="store.valueBrand_nameEx" clearable filterable style="width: 500px"
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
        <el-button @click="useKuAddStore().dialogFormCategoryExVisible = false">Отменить</el-button>
        <el-button @click="AddCategoryItem()">Сохранить</el-button>
      </span>
    </template>
  </el-dialog>
</template>
<script setup lang="ts">
import { ref, watch, onMounted } from 'vue';
import { useKuAddStore } from '~~/stores/kuAddStore';
import type { ElTree } from 'element-plus'
import type { IProducer, ITree, IBrand } from '~/utils/types/directoryTypes';

const store = useKuAddStore();

const options2 = ref<Array<{ label: string; value: string }>>([]);
const options3 = ref<Array<{ label: string; value: string }>>([]);

watch(() => store.producerExcluded, (producers: IProducer[]) => {
  const uniqueProducers = Array.from(new Set(producers.map(item => item.producer_name)));
  options2.value = uniqueProducers.map(label => ({ label, value: label }));
});

watch(() => store.brandExcluded, (brands: IBrand[]) => {
  const uniqueBrands = Array.from(new Set(brands.map(item => item.brand_name)));
  options3.value = uniqueBrands.map(label => ({ label, value: label }));
});

const onProducerChange = async () => {
  store.valueBrand_nameEx = "";
  store.setFilterBrand('producer_name', store.valueProducer_nameEx);
  if (store.valueProducer_nameEx) { // Проверка, что выбрана торговая маркка
    useKuAddStore().fetchAllBrandsForIncluded(); // Выполнить запрос с фильтром по производителям
    console.log('Выполнен запрос на получение данных производителей.');
  } else {
    useKuAddStore().setFilterBrand('producer_name', undefined); // Сбросить фильтр
    console.log('Сброшен фильтр производителей:', useKuAddStore().filterBrandExcluded);
    useKuAddStore().fetchAllBrandsForIncluded(); // Выполнить запрос без фильтра
    console.log('Выполнен запрос на получение всех данных производителей.');
  }
};

//дерево
const value = ref()
const treeData = ref<ITree[]>([]);
const treeRef = ref<InstanceType<typeof ElTree>>();

const defaultProps = {
  children: 'children',
  label: 'name',
  isLeaf: 'isLeaf',
};

// Обновляем данные treeData после получения данных
watch(() => store.treeData, (newTreeData: ITree[]) => {
  treeData.value = newTreeData;
});

//изменение поля дерева
let selectedCategoryName = '';
const getCheckedKeys = async (checkedKeys: any, checkedNodes: any) => {
  store.valueBrand_nameIn = "";
  store.valueProducer_nameIn = "";
  useKuAddStore().setFilterProducer("l4", []);
  useKuAddStore().setFilterBrand('producer_name', undefined);
  console.log('Отмеченные ключи:', checkedKeys);

  if (checkedKeys && checkedKeys.length > 0) {
    const selectedCategoryKey = checkedKeys; // Получаем ключ выбранной категории
    console.log('Выбранный ключ категории:', selectedCategoryKey);
    // Находим соответствующий элемент в дереве данных
    const selectedCategory = findCategoryByKey(treeData.value, selectedCategoryKey);

    if (selectedCategory) {
      selectedCategoryName = selectedCategory.name; // Сохраняем имя выбранной категории для отправки в условия
    }
    useKuAddStore().setFilterProducer("l4", selectedCategoryKey);
    useKuAddStore().setFilterBrand("l4", selectedCategoryKey);

    if (selectedCategoryKey.length > 0) { // Проверка, что выбрана категория
      useKuAddStore().fetchAllProducersForInclided(); // Выполнить запрос с фильтром по категории
      useKuAddStore().fetchAllBrandsForIncluded();
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

//добавление условий по категории
const AddCategoryItem = async () => {
  if (store.valueProducer_nameEx || value.value || store.valueBrand_nameEx) {
    console.log("valueProducer_name", store.valueProducer_nameEx);
    console.log("valueBrand_name", store.valueBrand_nameEx);

    // Используем сохраненное значение selectedCategoryName
    useKuAddStore().tableDataExRequirement.push({
      item_type: "Категория",
      item_code: value.value,
      item_name: selectedCategoryName, // Передаем имя выбранной категории
      producer: store.valueProducer_nameEx,
      brand: store.valueBrand_nameEx,
    });
    console.log("искл таблица КАТЕГОРИЯ", store.tableDataExRequirement);

    useKuAddStore().dialogFormCategoryExVisible = false;
    value.value = "";
    store.valueProducer_nameEx = "";
    store.valueBrand_nameEx = "";
    useKuAddStore().setFilterProducer("l4", []);
    useKuAddStore().setFilterBrand('producer_name', undefined);
    await store.fetchAllProducersForInclided();
    await store.fetchAllBrandsForIncluded();
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
