<template>
  <div class="toolbarAdd">
    <el-input
      v-model="newScore"
      label="Счет"
      placeholder="Введите счет"
      style="width: 200px"
    ></el-input>
    <el-input
      v-model="newName"
      placeholder="Введите наименование"
      style="width: 200px"
    ></el-input>
    <el-input
      v-model="newEntity"
      placeholder=""
      style="width: 200px"
    ></el-input>

    <!-- <el-select v-model="chooseEntity" value-key="" placeholder="Выберите Юр. лицо" clearable filterable @change=""> -->
    <!-- <el-option v-for="item in options"
    :key="item.value"
    :label="item.label"
    :value="item.value">
    </el-option> -->
    <!-- </el-select> -->
  </div>
  <el-scrollbar class="scrollTable" max-height="400px">
    <el-table
      ref="multipleTableRef"
      :data="tableData"
      style="width: 100%"
      @selection-change="handleSelectionChange"
      height="400"
    >
      <el-table-column property="selection" type="selection" width="55" />
      <el-table-column property="score" label="Счет" width="200">
        <template #default="scope">{{ scope.row.score }}</template>
      </el-table-column>
      <el-table-column property="name" label="Наименование" width="300" />
      <el-table-column
        property="nameEntity"
        label="Юридическое лицо"
        show-overflow-tooltip
      />
    </el-table>
  </el-scrollbar>

  <div class="toolbarButton" style="margin-top: 20px">
    <el-button @click="toggleSelection()">Очистить все</el-button>
    <div v-if="newName"><el-button @click="addRows()">Добавить</el-button></div>
    <div v-if="multipleSelection.length > 0">
      <el-button @click="deleteSelectedRows()">Удалить</el-button>
    </div>
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
const newScore = ref<string>("");
const newName = ref<string>("");
const newEntity = ref<string>("");

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

const tableData = ref<Provider[]>([
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
]);

const addRows = () => {
  // Добавление нового элемента на основе введенных данных
  tableData.value.push({
    score: newScore.value,
    name: newName.value,
    nameEntity: newEntity.value,
  });

  // Очистка полей ввода после добавления
  newScore.value = "";
  newName.value = "";
  newEntity.value = "";
};

const deleteSelectedRows = () => {
  const selectedRows: Provider[] = multipleSelection.value;

  // Фильтруем tableData, оставляя только строки, которые не выбраны
  if (tableData.value) {
    tableData.value = tableData.value.filter((row: Provider) => {
      return !selectedRows.includes(row);
    });

    // Очищаем выбранные строки после удаления
    multipleSelection.value = [];
  }
};
</script>

<style scoped></style>
