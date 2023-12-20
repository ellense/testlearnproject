<template>
  <div class="buttonBar_search">
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
  </el-scrollbar>
</template>

<script setup lang="ts">
import { Search } from "@element-plus/icons-vue";
import type { IProduser } from "~/utils/types/directoryTypes";
const getProduser = () => {
  const data: IProduser[] = [];
  for (let i = 0; i < 50; i++) {
    data.push({
      id: i,
      name: `Бренд-${i}`,
    });
  }
  return data;
};

const tableData = ref<IProduser[]>(getProduser());
    const defaultProps = {
  children: 'children',
  label: 'label',
}
const data = [
  {
    id: 1,
    label: 'Еда',
    children: [
      {
        id: 4,
        label: 'Фрукты',
        children: [
          {
            id: 9,
            label: 'Яблоки',
          },
          {
            id: 10,
            label: 'Апельсины',
          },
        ],
      },
    ],
  },
  {
    id: 2,
    label: 'Одежда',
    children: [
      {
        id: 5,
        label: 'Мужская',
      },
      {
        id: 6,
        label: 'Женская',
      },
    ],
  },
  {
    id: 3,
    label: 'Посуда',
    children: [
      {
        id: 7,
        label: 'Тарелки',
      },
      {
        id: 8,
        label: 'Кружки',
      },
      {
        id: 9,
        label: 'Кастрюли',
      },
      {
        id: 10,
        label: 'Ножи',
      },
    ],
  },
]
</script>

<style scoped></style>
