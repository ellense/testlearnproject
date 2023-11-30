<template>
  <div class="buttonBar">
    <div class="buttonBar_left">
      <el-button @click="storeEntity.dialogFormVisible = true">
        Добавить
      </el-button>
      <el-button @click="storeEntity.deleteSelectedRows">Удалить</el-button>
    </div>
    <div class="buttonBar_search">
      <el-input
        v-model="storeEntity.search"
        placeholder="Поиск"
        style="width: 200px"
        :prefix-icon="Search"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import { useEntityTableStore } from "~~/stores/entityTableStore";
import { Search } from "@element-plus/icons-vue";

const storeEntity = useEntityTableStore();
</script>

<style lang=""></style>
