<template>
  <div class="toolbarAdd">
    <el-input
      v-model="newName"
      placeholder="Name"
      style="width: 200px"
    ></el-input>
     <!-- Добавляем поле для поиска по имени -->
    <el-input v-model="search" placeholder="Search by Name" style="width: 200px"></el-input>
  </div>
  <el-scrollbar class="scrollTable" max-height="400px">
    <el-table
      ref="multipleTableRef"
      :data="filteredTableData"
      style="width: 100%"
      @selection-change="handleSelectionChange"
      height="400"
    >
      <el-table-column type="selection" width="55" />
      <el-table-column property="name" label="Name" width="120" />
      <el-table-column property="id" label="id" show-overflow-tooltip />
    </el-table>
  </el-scrollbar>
  <div class="toolbarButton" style="margin-top: 20px">
    <el-button @click="toggleSelection()">Очистить все</el-button>
    <div v-if="newName">
      <el-button @click="addItem()">Добавить элемент</el-button>
    </div>
    
    <el-button @click="deleteSelectedRows">Удалить выбранные</el-button>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { ElTable } from "element-plus";

interface User {
  name: string;
  id: number;
}

const newName = ref<string>("");
const newId = ref(0);

const multipleTableRef = ref<InstanceType<typeof ElTable>>();
const multipleSelection = ref<User[]>([]);

const toggleSelection = (rows?: User[]) => {
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
const handleSelectionChange = (val: User[]) => {
  multipleSelection.value = val;
};

const search = ref("");

const filteredTableData = computed(() => { //вычисляемое свойство
  const searchValue = search.value.toLowerCase(); //нижний регистр
  return tableData.value.filter((item) => item.name.toLowerCase().includes(searchValue));
});

const tableData = ref<User[]>([
  {
    // date: "2016-05-03",
    name: "Tom",
    id: 1,
  },
  {
    // date: "2016-05-02",
    name: "Tom",
    id: 2,
  },
]);

const addItem = () => {
  // Добавление нового элемента на основе введенных данных
  tableData.value.push({
    // date: newDate.value,
    name: newName.value,
    id: tableData.value.length + 1,
  });

  // Очистка полей ввода после добавления
  newName.value = "";
};

const deleteSelectedRows = () => {
  const selectedRows: User[] = multipleSelection.value;

  // Фильтруем tableData, оставляя только строки, которые не выбраны
  if (tableData.value) {
    tableData.value = tableData.value.filter((row: User) => {
      return !selectedRows.includes(row);
    });

    // Очищаем выбранные строки после удаления
    multipleSelection.value = [];
  }
};
</script>
