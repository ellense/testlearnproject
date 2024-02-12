<template>
  <el-input
    v-if="category_props.filter"
    v-model="filterText"
    style="margin-bottom: 10px"
    placeholder="Фильтр"
  />
  <el-Scrollbar
    :height="$props.heightScrollPx ? $props.heightScrollPx : heightScrollVh"
  >
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
  </el-Scrollbar>
</template>

<script setup lang="ts">
import type { ElTree } from 'element-plus'
import { storeToRefs } from 'pinia'
import { TreeNodeData } from 'element-plus/es/components/tree/src/tree.type'
import { ITree } from '~/utils/types/directoryTypes'
import { useCategoryData } from '~~/stores/categories'

const emit = defineEmits<{
  (e: 'getSelectedCategories', value: TreeNodeData): ITree[] // событие возвращает все выбранные категории
}>()

interface props {
  showCheckbox?: boolean
  defaultCheckedKeys?: number[]
  heightScrollVh?: number
  heightScrollPx?: number
  disabledCheckbox?: boolean
  filter?: boolean
}
const category_props = withDefaults(defineProps<props>(), {
  showCheckbox: true,
  defaultCheckedKeys: () => [],
  heightScrollVh: 70,
  disabledCheckbox: true,
  filter: false,
  heightScrollPx: 0,
})

const filterText = ref('')

const heightScrollVh = computed(
  () =>
    `${
      category_props.filter
        ? category_props.heightScrollVh - 5
        : category_props.heightScrollVh
    }vh`
)
const treeRef = ref<InstanceType<typeof ElTree>>()
const dataCategory = ref<ITree[]>([])
const myProps = {
  value: 'id',
  label: 'label',
  children: 'children',
  lvl: 'lvl',
  disabled: 'disabled',
}

onMounted(async () => {
  await useCategoryData().getReady.then(() => {
    dataCategory.value = getCategoryDisabled(
      storeToRefs(useCategoryData()).categoty_tree.value,
      category_props.disabledCheckbox
    )
  })
})

watch(filterText, (val) => {
  treeRef.value!.filter(val)
})

const change = () => {
  if (treeRef.value) {
    const selectedCategories: number[] = treeRef
      .value!.getCheckedNodes(true, true)
      .map((item) => item.id)
    emit('getSelectedCategories', selectedCategories)
  }
}

const filterNode = (value: string, data: TreeNodeData) => {
  if (!value) return true
  return data.label?.includes(value)
}
</script>
<style scoped>
.header {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  border-bottom: 1px solid #727272;
}
</style>
