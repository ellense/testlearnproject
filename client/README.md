# Nuxt 3 Minimal Starter

Look at the [Nuxt 3 documentation](https://nuxt.com/docs/getting-started/introduction) to learn more.

## Setup

Make sure to install the dependencies:

```bash
# npm
npm install

# pnpm
pnpm install

# yarn
yarn install

# bun
bun install
```

## Development Server

Start the development server on `http://localhost:3000`:

```bash
# npm
npm run dev

# pnpm
pnpm run dev

# yarn
yarn dev

# bun
bun run dev
```

## Production

Build the application for production:

```bash
# npm
npm run build

# pnpm
pnpm run build

# yarn
yarn build

# bun
bun run build
```

Locally preview production build:

```bash
# npm
npm run preview

# pnpm
pnpm run preview

# yarn
yarn preview

# bun
bun run preview
```

Check out the [deployment documentation](https://nuxt.com/docs/getting-started/deployment) for more information.


вставить в .env
VITE_BASE_URL='http://127.0.0.1:8001'
VITE_REFRESH_URL: "api/token/refresh/"
VITE_LOGIN_URL: "api/token/"
VITE_ACCESS_KEY: "accessToken"
VITE_REFRESH_KEY: "refreshToken"
VITE_TIMEOUT: 1500
# http://127.0.0.1:8001 на работе со своего
# http://192.168.6.168:8001 на работе с вероникиного
# http://127.0.0.1:8000 дома

shift + alt + F - форматирование
<script setup lang="ts">
import { ref, onMounted, watch } from 'vue';
import type { ElTree } from 'element-plus'
import { storeToRefs } from "pinia";
import type { ITree } from '~/utils/types/directoryTypes';
import { useCategoriesStore } from '~~/stores/categoriesStore'

const { getCategory } = storeToRefs(useCategoriesStore());
// const tableData = ref<ITree[]>(getCategory.value);

// watch(getCategory, (value) => {
//   console.log("getEntities changed:", value);
//   tableData.value = value || [];
//   console.log("tableData:", tableData.value);
// });


// onMounted(async () => {
//   try {
//     console.log("Before API call");
//     await useCategoriesStore().getCategoryFromAPIWithFilter({ name: "string",
//             classifier_code: 1,
//             children:[] ,});
//     console.log("After API call");
//   } catch (error) {
//     console.error("Ошибка при загрузке данных", error);
//   }
// });

const hierarchicalData = ref<ITree[]>([]);

// Функция для сгруппировки узлов по их родительским кодам
const groupNodesByParentCode = (nodes: ITree[]) => {
    const groupedNodes: { [key: string]: ITree[] } = {};

    nodes.forEach(node => {
        const parentCode = node.parent_code.toString();
        if (!groupedNodes[parentCode]) {
            groupedNodes[parentCode] = [];
        }
        groupedNodes[parentCode].push(node);
    });

    return groupedNodes;
};

// Функция для преобразования групп узлов в иерархическую структуру
const buildHierarchy = (nodes: ITree[], parentCode: string | null = null) => {
    const parentNode = nodes.filter(node => node.parent_code === parentCode);
    if (!parentNode.length) return []; // Если узел родителя не существует, вернуть пустой массив

    return parentNode.map(node => {
        const children = buildHierarchy(nodes, node.classifier_code.toString());
        if (children.length) {
            node.children = children;
        }
        return node;
    });
};












const treeData = ref<ITree[]>([]);
const treeRef = ref<InstanceType<typeof ElTree>>()

// Функция для получения данных с бэкэнда и установки полученных данных в переменную treeData
const fetchData = async (data: ITree) => {
    // try {
    //     const result = await CATEGORY.getCategory(data);
    //     if (Array.isArray(result)) {
    //         treeData.value = result;
    //         console.log("treeData", treeData.value);
    //         // После установки данных в treeData, обновите дерево через ссылку treeRef
    //         treeRef.value && treeRef.value.updateKeyChildren(data.classifier_code, result);
    //     } else {
    //         treeData.value = [];
    //         console.error("Данные не получены или не являются массивом");
    //     }
    // } catch (error) {
    //     console.error("Произошла ошибка при получении данных категорий", error);
    // }
    try {
        const result = await CATEGORY.getCategory(data);
        
        if (Array.isArray(result)) {
            treeData.value = result;
            const groupedNodes = groupNodesByParentCode(result);
            const hierarchicalResult = buildHierarchy(result);
            hierarchicalData.value = hierarchicalResult;
            console.log("treeData", treeData.value);
            treeRef.value && treeRef.value.updateKeyChildren(data.classifier_code, hierarchicalResult);
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
            children:[] ,
            parent_code: "",
        });
        console.log("After API call");
    } catch (error) {
        console.error("Ошибка при загрузке данных", error);
    }
});



const getCheckedKeys = (checkedKeys: any, checkedNodes: any) => {
    console.log('Отмеченные ключи:', checkedKeys);
    console.log('Отмеченные узлы:', checkedNodes);
};

// Объект с настройками по умолчанию для дерева
const defaultProps = {
    children: 'children',
    label: 'name'
};

</script>


// const tableData = ref<ITree[]>(getCategory.value);

// watch(getCategory, (value) => {
//   console.log("getEntities changed:", value);
//   tableData.value = value || [];
//   console.log("tableData:", tableData.value);
// });


// onMounted(async () => {
//   try {
//     console.log("Before API call");
//     await useCategoriesStore().getCategoryFromAPIWithFilter({ name: "string",
//             classifier_code: 1,
//             children:[] ,});
//     console.log("After API call");
//   } catch (error) {
//     console.error("Ошибка при загрузке данных", error);
//   }
// });






    // try {
    //     const result = await CATEGORY.getCategory(data);
    //     if (Array.isArray(result)) {
    //         treeData.value = result;
    //         console.log("treeData", treeData.value);
    //         // После установки данных в treeData, обновите дерево через ссылку treeRef
    //         treeRef.value && treeRef.value.updateKeyChildren(data.classifier_code, result);
    //     } else {
    //         treeData.value = [];
    //         console.error("Данные не получены или не являются массивом");
    //     }
    // } catch (error) {
    //     console.error("Произошла ошибка при получении данных категорий", error);
    // }