<template>
  <!-- <div class="buttonBar_search">
    <el-input placeholder="Поиск" style="width: 200px" :prefix-icon="Search" />
  </div>
  <el-scrollbar class="scrollTableFiltres" height="300">
    <el-tree 
      :data="data"
      show-checkbox
      node-key="id"
      :default-expanded-keys="[1,2,3,4]"
      :default-checked-keys="[1,2,3]"
      :props="defaultProps"
      height="300"
    />
  </el-scrollbar> -->
  <!-- <el-input
    v-if="category_props.filter"
    v-model="filterText"
    style="margin-bottom: 10px"
    placeholder="Фильтр"
  />
  <el-Scrollbar :height="heightScrollVh">
    <el-tree
      ref="treeRef"
      :empty-text="useRuntimeConfig().public.EmptyText"
      :data="dataCategory"
      :show-checkbox="category_props.showCheckbox"
      node-key="id"
      :props="myProps"
      :default-checked-keys="category_props.defaultCheckedKeys"
      :filter-node-method="filterNode"
      @check="change"
    />
  </el-Scrollbar> -->
</template>

<script setup lang="ts">
// import { Search } from "@element-plus/icons-vue";
// import type { ElTree } from 'element-plus'
// import { storeToRefs } from 'pinia'
// import { TreeNodeData } from 'element-plus/es/components/tree/src/tree.type'
// import { ITree } from '@/utils/types/directoryTypes'
// import { useCategoryData } from '~~/stores/categories'

// const emit = defineEmits<{
//   (e: 'getSelectedCategories', value: TreeNodeData): ITree[] // событие возвращает все выбранные категории
// }>()

// interface props {
//   showCheckbox?: boolean
//   defaultCheckedKeys?: number[]
//   heightScrollVh?: number
//   disabledCheckbox?: boolean
//   filter?: boolean
// }
// const category_props = withDefaults(defineProps<props>(), {
//   showCheckbox: true,
//   defaultCheckedKeys: () => [],
//   heightScrollVh: 70,
//   disabledCheckbox: true,
//   filter: false,
// })

// const filterText = ref('')

// const heightScrollVh = computed(
//   () =>
//     `${
//       category_props.filter
//         ? category_props.heightScrollVh - 5
//         : category_props.heightScrollVh
//     }vh`
// )
// const treeRef = ref<InstanceType<typeof ElTree>>()
// const dataCategory = ref<ITree[]>([])
// const myProps = {
//   value: 'id',
//   label: 'label',
//   children: 'children',
//   lvl: 'lvl',
//   disabled: 'disabled',
// }

// onMounted(async () => {
//   await useCategoryData().getReady.then(() => {
//     dataCategory.value = getCategoryDisabled(
//       storeToRefs(useCategoryData()).categoty_tree.value,
//       category_props.disabledCheckbox
//     )
//   })
// })

// watch(filterText, (val) => {
//   treeRef.value!.filter(val)
// })

// const change = () => {
//   if (treeRef.value) {
//     const selectedCategories: number[] = treeRef
//       .value!.getCheckedNodes(true, true)
//       .map((item) => item.id)
//     emit('getSelectedCategories', selectedCategories)
//   }
// }

// const filterNode = (value: string, data: TreeNodeData) => {
//   if (!value) return true
//   return data.label?.includes(value)
// }












// import type { IProduser } from "~/utils/types/directoryTypes";
// const getProduser = () => {
//   const data: IProduser[] = [];
//   for (let i = 0; i < 50; i++) {
//     data.push({
//       id: i,
//       name: `Бренд-${i}`,
//     });
//   }
//   return data;
// };

// const tableData = ref<IProduser[]>(getProduser());
//     const defaultProps = {
//   children: 'children',
//   label: 'label',
// }
// const data = [
//   {
//     id: 1,
//     label: 'Еда',
//     children: [
//       {
//         id: 4,
//         label: 'Фрукты',
//         children: [
//           {
//             id: 9,
//             label: 'Яблоки',
//           },
//           {
//             id: 10,
//             label: 'Апельсины',
//           },
//         ],
//       },
//     ],
//   },
//   {
//     id: 2,
//     label: 'Одежда',
//     children: [
//       {
//         id: 5,
//         label: 'Мужская',
//       },
//       {
//         id: 6,
//         label: 'Женская',
//       },
//     ],
//   },
//   {
//     id: 3,
//     label: 'Посуда',
//     children: [
//       {
//         id: 7,
//         label: 'Тарелки',
//       },
//       {
//         id: 8,
//         label: 'Кружки',
//       },
//       {
//         id: 9,
//         label: 'Кастрюли',
//       },
//       {
//         id: 10,
//         label: 'Ножи',
//       },
//     ],
//   },
// ]
</script>

<style scoped></style>
