<template>
  <el-tree-select v-model="value" :data="treeData" show-checkbox filterable check-strictly :render-after-expand="false" style="width: 240px" :props="defaultProps"
    ref="treeRef" node-key="classifier_code" />

</template>
  
<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import type { ElTree } from 'element-plus'
import type { ITree } from '~/utils/types/directoryTypes';

const value = ref()
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
const defaultProps = {
    children: 'children',
    label: 'name'
};
</script>