<template>
  <el-scrollbar class="scrollTable" max-height="400px">
    <el-table
      ref="multipleTableRef"
      :data="tableData"
      style="width: 100%"
      @selection-change="handleSelectionChange"
      height="400"
    >
      <el-table-column type="selection" />
      <el-table-column property="score" label="Счет" width="200">
        <template #default="scope">{{ scope.row.score }}</template>
      </el-table-column>
      <el-table-column property="name" label="Наименование" width="600" />
      <el-table-column
        property="nameEntity"
        label="Юридическое лицо"
        show-overflow-tooltip
      />
    </el-table>
  </el-scrollbar>

  <div style="margin-top: 20px">
    <el-button @click="toggleSelection()">Очистить все</el-button>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { ElTable } from "element-plus";

interface Provider {
  score: string;
  name: string;
  nameEntity: string;
}

const multipleTableRef = ref<InstanceType<typeof ElTable>>();
const multipleSelection = ref<Provider[]>([]);
const toggleSelection = (rows?: Provider[]) => {
  if (rows) {
    rows.forEach((row) => {
      // TODO: improvement typing when refactor table
      // eslint-disable-next-line @typescript-eslint/ban-ts-comment
      // @ts-expect-error
      multipleTableRef.value!.toggleRowSelection(row, undefined);
    });
  } else {
    multipleTableRef.value!.clearSelection();
  }
};
const handleSelectionChange = (val: Provider[]) => {
  multipleSelection.value = val;
};

const tableData: Provider[] = [
  {
    score: "5475682-89",
    name: "Tom",
    nameEntity: "No. 189, Grove St, Los Angeles",
  },
  {
    score: "567237699",
    name: "Tom",
    nameEntity: "No. 189, Grove St, Los Angeles",
  },
  {
    score: "26576878",
    name: "Tom",
    nameEntity: "No. 189, Grove St, Los Angeles",
  },
  {
    score: "7865324527",
    name: "Tom",
    nameEntity: "No. 189, Grove St, Los Angeles",
  },
  {
    score: "7658467078",
    name: "Tom",
    nameEntity: "No. 189, Grove St, Los Angeles",
  },
  {
    score: "525656867",
    name: "Tom",
    nameEntity: "No. 189, Grove St, Los Angeles",
  },
  {
    score: "908467345",
    name: "Tom",
    nameEntity: "No. 189, Grove St, Los Angeles",
  },
  {
    score: "1632456867",
    name: "Tom",
    nameEntity: "No. 189, Grove St, Los Angeles",
  },
  {
    score: "78967947",
    name: "Tom",
    nameEntity: "No. 189, Grove St, Los Angeles",
  },
  {
    score: "5785699",
    name: "Tom",
    nameEntity: "No. 189, Grove St, Los Angeles",
  },
  {
    score: "906909805",
    name: "Tom",
    nameEntity: "No. 189, Grove St, Los Angeles",
  },
  {
    score: "879478469",
    name: "Tom",
    nameEntity: "No. 189, Grove St, Los Angeles",
  },
  {
    score: "769476898",
    name: "Tom",
    nameEntity: "No. 189, Grove St, Los Angeles",
  },
];
</script>

<style scoped>
.scrollTable {
  margin-right: 300px;
  border: 1px solid var(--el-border-color);
  border-radius: 2px;
}
</style>
