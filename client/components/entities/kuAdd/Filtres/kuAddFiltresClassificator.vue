<template>
  <div class="buttonBar_search">
    <el-input v-model="filterText" placeholder="Filter keyword" />
  </div>
  <el-scrollbar class="scrollTableFiltres" height="300">
    <el-tree ref="treeRef" class="filter-tree" :data="data" :props="defaultProps" default-expand-all
      :filter-node-method="filterNode" />
    <el-tree :data="data" show-checkbox node-key="id" :default-expanded-keys="[1, 2, 3, 4]" :default-checked-keys="[1, 2, 3]"
      :props="defaultProps" height="300" />
  </el-scrollbar>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue'
import { ElTree } from 'element-plus'

interface Tree {
  [key: string]: any
}

const filterText = ref('')
const treeRef = ref<InstanceType<typeof ElTree>>()

const defaultProps = {
  children: 'children',
  label: 'label',
}

watch(filterText, (val) => {
  treeRef.value!.filter(val)
})

const filterNode = (value: string, data: Tree) => {
  if (!value) return true
  return data.label.includes(value)
}

const data: Tree[] = [
  {
    id: 1,
    label: 'Level one 1',
    children: [
      {
        id: 4,
        label: 'Level two 1-1',
        children: [
          {
            id: 9,
            label: 'Level three 1-1-1',
          },
          {
            id: 10,
            label: 'Level three 1-1-2',
          },
        ],
      },
    ],
  },
  {
    id: 2,
    label: 'Level one 2',
    children: [
      {
        id: 5,
        label: 'Level two 2-1',
      },
      {
        id: 6,
        label: 'Level two 2-2',
      },
    ],
  },
  {
    id: 3,
    label: 'Level one 3',
    children: [
      {
        id: 7,
        label: 'Level two 3-1',
      },
      {
        id: 8,
        label: 'Level two 3-2',
      },
    ],
  },
]

</script>

<style scoped></style>
