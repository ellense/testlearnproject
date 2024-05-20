<template>
  <el-header>
    <!-- <el-icon size="20px" color="#337ecc" class="icon" style="transition: 0.3s;"><Fold /></el-icon> -->
    <div>
      <h1>Управление коммерческими условиями контрагентов</h1>
    </div>
  </el-header>
</template>

<script setup lang="ts">
import { Fold } from "@element-plus/icons-vue";
</script>

<style scoped>
.el-header {
  position: relative;
  color: var(--el-text-color-primary);
  border-bottom: 1px solid var(--el-border-color);
  display: flex;
  gap: 30px;
  align-items: center;
  --el-header-height: 45px;
}
.icon:hover {
  cursor: pointer;
  color:#79bbff;
  
}
h1 {
  color: #337ecc;
  font-size: 17px;
}
</style>
