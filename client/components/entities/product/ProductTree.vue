<template>
    <!-- <vue-resizable minWidth=300 maxWidth=900 width="800px" active="[ 'l']" style="border: 1px solid var(--el-border-color);  height: calc(100vh - 140px);
  border-radius: 2px; "> -->
    <div class="Tree">
        <h3>Категории товаров:</h3>
        <el-scrollbar class="scrollTree">
            <el-tree :data="treeData" :props="defaultProps"  show-checkbox ref="treeRef" node-key="classifier_code"
                @check="getCheckedKeys" :filter-node-method="filterNode" check-on-click-node v-loading="loading" />
        </el-scrollbar>
    </div>
    <!-- </vue-resizable> -->
</template>

<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import type { ElTree } from 'element-plus'
import { useProductStore } from "~~/stores/productStore";
import type { TreeNodeData } from 'element-plus/es/components/tree/src/tree.type';
import type { ITree } from '~/utils/types/treeTypes';

const treeData = ref<ITree[]>([]);
const treeRef = ref<InstanceType<typeof ElTree>>()
const loading = ref()

const buildTree = (nodes: ITree[], parentCode: string | null = null): ITree[] => {
    const parentNode = nodes.filter(node => node.parent_code === parentCode);
    if (!parentNode.length) return []; // Если узел родителя не существует, вернуть пустой массив

    return parentNode.map(node => {
        const children = buildTree(nodes, node.classifier_code.toString());
        if (children.length) {
            return { ...node, children }; // Создание нового объекта с установкой свойства children
        }
        return node;
    });
};

const fetchData = async (data: ITree) => {
    try {
        loading.value = true;
        const result = await CATEGORY.getCategory(data);

        console.log("Результат полученный с сервера:", result); // Логируем полученные данные

        if (Array.isArray(result)) {
            console.log("Полученный массив данных:", result); // Логируем полученный массив данных
            treeData.value = buildTree(result, '0');
            console.log("Сформированное дерево данных:", treeData.value); // Логируем сформированное дерево данных
            treeRef.value && treeRef.value.updateKeyChildren(data.classifier_code, treeData.value);
        } else {
            treeData.value = [];
            console.error("Данные не получены или не являются массивом:", result); // Логируем случай, когда данные не являются массивом
        }
        loading.value = false;
    } catch (error) {
        loading.value = false;
        console.error("Произошла ошибка при получении данных категорий", error);
    }
};

// Вызов функции fetchData при монтировании компонента
onMounted(async () => {
    try {
        console.log("!!!!!!!");
        await fetchData({
            name: "string",
            classifier_code: 0,
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

const triggerFilter = ref<boolean>(true);
const toggleTriggerFilter = () => (triggerFilter.value = !triggerFilter.value);



const getCheckedKeys = (checkedKeys: any, checkedNodes: any) => {
    // console.log('Отмеченные узлы:', checkedNodes);
    const keysOfLevel4 = checkedNodes.checkedKeys.filter((key: string) => key.length === 10);
    //   console.log('Ключи категорий 4 уровня:', keysOfLevel4);
    useProductStore().pagination = null;
    useProductStore().setFilterValue('categories_l4', keysOfLevel4);
    toggleTriggerFilter();
};

watch(triggerFilter, () => {
    useProductStore().getProductFromAPIWithFilter();
});

const defaultProps = {
    children: 'children',
    label: 'name'
};
</script>

<style scoped>
.scrollTree {
    padding-right: 15px;
    height: calc(100vh - 180px);
}

h3 {
    display: flex;
    justify-content: center;
}

.Tree {
    margin-left: 10px;
    /* border: 1px solid var(--el-border-color); */
    height: calc(100vh - 130px);
    min-width: 250px;
    max-width: 700px;
    /* border-radius: 2px; */
}
</style>