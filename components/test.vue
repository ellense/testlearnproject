<template>
    <div>
      <el-button @click="openDialog">Добавить запись</el-button>
      <el-table :data="tableData">
        <el-table-column prop="name" label="Имя"></el-table-column>
        <el-table-column prop="age" label="Возраст"></el-table-column>
      </el-table>
      <el-dialog title="Добавить запись" v-model="dialogVisible">
        <el-form :model="formData">
          <el-form-item label="Имя">
            <el-input v-model="formData.name"></el-input>
          </el-form-item>
          <el-form-item label="Возраст">
            <el-input v-model="formData.age"></el-input>
          </el-form-item>
        </el-form>
        <div  class="dialog-footer">
          <el-button @click="dialogVisible = false">Отмена</el-button>
          <el-button type="primary" @click="saveData">Сохранить</el-button>
        </div>
      </el-dialog>
    </div>
  </template>
  
  <script>
  import { ref } from 'vue';
  
  export default {
    setup() {
      const dialogVisible = ref(false);
      const formData = ref({
        name: '',
        age: '',
      });
      const tableData = ref([]);
  
      const openDialog = () => {
        dialogVisible.value = true;
      };
  
      const saveData = () => {
        tableData.value.push({
          name: formData.value.name,
          age: formData.value.age,
        });
        dialogVisible.value = false;
        formData.value.name = '';
        formData.value.age = '';
      };
  
      return {
        dialogVisible,
        formData,
        tableData,
        openDialog,
        saveData,
      };
    },
  };
  </script>