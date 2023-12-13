<template>
  <div class="directoryBar">
    <h2>Юридические лица</h2>
      <el-input
        v-model="entityStore.search"
        placeholder="Поиск"
        style="max-width: 400px"
        :prefix-icon="Search"
      />
  </div>
</template>

<script setup lang="ts">
import { Search } from "@element-plus/icons-vue";
import { useEntityTableStore } from "~~/stores/entityTableStore";

const entityStore = useEntityTableStore();

</script>

<style scoped></style>
