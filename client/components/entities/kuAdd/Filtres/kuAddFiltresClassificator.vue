<template>
  <div class="frameTreeInku">
    <!-- <el-input v-model="filterText" placeholder="Filter keyword" /> -->
    <h3>Категории товаров:</h3>
    <el-scrollbar class="treeInKu">
      <el-tree :data="treeData" v-model="useKuStore().valueCategory_id" :props="defaultProps" show-checkbox ref="treeRef" node-key="classifier_code"
        @check="getCheckedKeys" :filter-node-method="filterNode" />
    </el-scrollbar>
  </div>
</template>


<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import type { ElTree } from 'element-plus'
import { storeToRefs } from "pinia";
import type { ITree } from '~/utils/types/directoryTypes';
import { useProductStore } from "~~/stores/productStore";
import { useKuStore } from "~~/stores/kuStore";
import type { TreeNodeData } from 'element-plus/es/components/tree/src/tree.type';

const treeData = ref<ITree[]>([]);
const treeRef = ref<InstanceType<typeof ElTree>>()

const buildTree = (nodes: ITree[], parentCode: string | null = null): ITree[] => {
  const parentNode = nodes.filter(node => node.parent_code === parentCode);
  if (!parentNode.length) return []; // Если узел родителя не существует, вернуть пустой массив

  return parentNode.map(node => {
    const children = buildTree(nodes, node.classifier_code.toString());
    if (children.length) {
      node.children = children;
    }
    return node;
  });
};

// Функция для получения данных с бэкэнда и установки полученных данных в переменную treeData
const fetchData = async (data: ITree) => {
  try {
    const result = await CATEGORY.getCategory(data);

    if (Array.isArray(result)) {
      treeData.value = buildTree(result, '0');
      console.log("treeData", treeData.value);
      treeRef.value && treeRef.value.updateKeyChildren(data.classifier_code, treeData.value);
    } else {
      treeData.value = [];
      console.error("Данные не получены или не являются массивом");
    }
  } catch (error) {
    console.error("Произошла ошибка при получении данных категорий", error);
  }
};

// Вызов функции fetchData при монтировании компонента
onMounted(async () => {
  try {
    console.log("Before API call");
    await fetchData({
      name: "string",
      classifier_code: 1,
      children: [],
      parent_code: "",
    });
    console.log("After API call");
  } catch (error) {
    console.error("Ошибка при загрузке данных", error);
  }
});
//для поиска
const filterText = ref('')
watch(filterText, (val) => {
  treeRef.value!.filter(val)
})

const filterNode = (value: string, data: TreeNodeData) => {
  if (!value) return true
  return data.label?.includes(value)
}
// для фильтрации
// const KeySelect = ( checkedNodes: any) => {
// useKuStore().valueCategory = checkedNodes.checkedKeys.filter((key: string) => key.length === 10);
// console.log("useKuStore().valueCategory",useKuStore().valueCategory)
// }
// KeySelect
const triggerFilter = ref<boolean>(true);
const toggleTriggerFilter = () => (triggerFilter.value = !triggerFilter.value);

const getCheckedKeys = (checkedKeys: any, checkedNodes: any) => {
  console.log('Отмеченные ключи:', checkedKeys);
  console.log('Отмеченные узлы:', checkedNodes);
  useKuStore().valueCategory_id = checkedNodes.checkedKeys.filter((key: string) => key.length === 10);
  console.log("useKuStore().valueCategory_id",useKuStore().valueCategory_id)
  useKuStore().valueCategory_name = checkedNodes.name;
  console.log("useKuStore().valueCategory_name",useKuStore().valueCategory_name)
  const keysOfLevel4 = checkedNodes.checkedKeys.filter((key: string) => key.length === 10);
  console.log('Ключи категорий 4 уровня:', keysOfLevel4);
  useKuStore().pagination = null;
  // useKuStore().setFilterValue4('l4', keysOfLevel4);
  toggleTriggerFilter();
};

watch(triggerFilter, () => {
  useKuStore().fetchProducerList();
});

const defaultProps = {
  children: 'children',
  label: 'name'
};
</script>

<style scoped>
.treeInKu {
  margin-right: 10px;
  height: 240px;
}

.frameTreeInku {
  min-width: 500px;
  max-width: 500px;
  border: 1px solid var(--el-border-color);
  height: 300px;
  border-radius: 2px;
  margin-right: 10px;
}

h3 {
  display: flex;
  justify-content: center;
}
</style>
