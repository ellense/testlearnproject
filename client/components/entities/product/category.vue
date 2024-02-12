<template>
    <div>
        <el-tree :data="treeData" :props="defaultProps" show-checkbox ref="treeRef" node-key="classifier_code"
            default-expand-all @check="getCheckedKeys" />
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue';
import type { ElTree } from 'element-plus'
import type { ITree } from '~/utils/types/directoryTypes';
import { useCategoriesStore } from '~~/stores/categoriesStore'


const treeData = ref<ITree[]>([]);

// Функция для получения данных с бэкэнда и установки полученных данных в переменную treeData
const fetchData = async (data: ITree) => {
    try {
        const result = await CATEGORY.getCategory(data);
        if (Array.isArray(result)) {
            treeData.value = result;
            console.log("treeData" ,treeData.value)
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
    label: "",
  classifier_code: 1,
  children: [],
});;
    console.log("After API call");
  } catch (error) {
    console.error("Ошибка при загрузке данных", error);
  }
     // Вызовите fetchData при монтировании компонента
});
const getCheckedKeys = (checkedKeys: any, checkedNodes: any) => {
    console.log('Отмеченные ключи:', checkedKeys);
    console.log('Отмеченные узлы:', checkedNodes);
};

// Объект с настройками по умолчанию для дерева
const defaultProps = {
    children: 'children',
    label: 'label'
};
// const treeRef = ref<InstanceType<typeof ElTree>>();

// const defaultProps = {
//   children: "children",
//   label: "label",
// };

// const store = useCategoriesStore();

// const data = ref<ITree[]>([]);



// async function fetchData(data:ITree) {
//     try {
//         const result = await store.getCategoryFromAPIWithFilter(data);
//         if (Array.isArray(result)) {
//             data.value = buildTree(result, '0');
//         } else {
//             console.error("Данные не получены или не являются массивом");
//         }
//     } catch (error) {
//         console.error("Произошла ошибка при получении данных категорий", error);
//     }
// }
// const data = ref<ITree[]>([]);

// async function fetchData(dataToUpdate: Ref<ITree[]>, requestData: ITree) {
//     try {
//         const result = await store.getCategoryFromAPIWithFilter(requestData);
//         if (Array.isArray(result)) {
//             dataToUpdate.value = buildTree(result, '0');
//         } else {
//             console.error("Данные не получены или не являются массивом");
//         }
//     } catch (error) {
//         console.error("Произошла ошибка при получении данных категорий", error);
//     }
// }

// // Затем вызывайте fetchData следующим образом
// fetchData(data, requestData);

// onMounted(async () => {
//     await fetchData();
// });
// function buildTree(data: ITree[], parentCode: string): ITree[] {
//     const node: ITree[] = [];
//     data
//         .filter(item => item.parent_code === parentCode)
//         .forEach(item => {
//             const newNode: ITree = {
//                 label: item.name + " [" + item.classifier_code + "]",
//                 classifier_code: item.classifier_code
//             };
//             const children = buildTree(data, item.classifier_code.toString());
//             if (children.length > 0) {
//                 newNode.children = children;
//             }
//             node.push(newNode);
//         });
//     return node;
// }

// const getCheckedKeys = () => {
//     const checkedKeys: string[] = treeRef.value?.getCheckedKeys(false) || [];
//     const arr: string[] = checkedKeys.filter(item => typeof item === 'string' && item.length === 12);
//     console.log(arr);
// };
</script>

<style scoped></style>