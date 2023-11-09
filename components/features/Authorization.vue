<template>
  <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
    <el-tab-pane label="Вход" name="first">
      <EntitiesAuthorizationLogin />
    </el-tab-pane>
    <el-tab-pane label="Регистрация" name="second">
      <EntitiesAuthorizationRegister />
    </el-tab-pane>
  </el-tabs>
</template>

<script setup lang="ts">
import type { TabsPaneContext } from "element-plus";
const activeName = ref("first");
const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event);
};
</script>

<style scoped>
.demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 50px;
  font-weight: 600;
}
</style>
