<template>
  <el-scrollbar height="calc(100vh - 60px)">
    <h2>Добавление КУ</h2>
    <div class="toolbarAdd">
      <el-input
        v-model="store.newName"
        placeholder="Введите КУ"
        style="width: 200px"
      ></el-input>
    </div>
    <div v-if="store.newName">
      <el-button @click="addItemAndNavigate()">Добавить элемент</el-button>
    </div>
  </el-scrollbar>
</template>

<script lang="ts" setup>
import { ElInput } from "element-plus";
import { storeToRefs } from "pinia";
import { useKuTableStore } from "~~/stores/kuTableStore";
import { useRouter } from "vue-router";

const store = useKuTableStore();
const router = useRouter();

const addItemAndNavigate = () => {
  store.addItem();

  // После выполнения действия, перейдите на другую страницу
  router.push("/"); 
};
</script>
