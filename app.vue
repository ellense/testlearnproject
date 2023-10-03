<template>
  <el-container class="layout-container-demo">
    <el-header style="text-align: right; font-size: 12px">
      <div>
        <h1>Управление коммерческими условиями поставщиков</h1>
      </div>
      <div class="toolbar">
        <el-dropdown>
          <el-icon style="margin-right: 8px; margin-top: 1px"
            ><setting
          /></el-icon>
          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>View</el-dropdown-item>
              <el-dropdown-item>Add</el-dropdown-item>
              <el-dropdown-item>Delete</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </el-header>

    <el-container>
      <el-aside width="200px">
        <el-scrollbar height="calc(100vh - 60px)">
          <el-menu style="font-size: 12px" active-color="#689EFF">
            <el-menu-item index="1">
              <nuxt-link to="/">
                <el-icon><Document /></el-icon>
                <span>Ком.условие</span>
              </nuxt-link>
            </el-menu-item>
            <el-menu-item index="2">
              <nuxt-link to="/entity">
                <el-icon><Suitcase /></el-icon>
                <span>Юридические лица</span>
              </nuxt-link>
            </el-menu-item>
            <el-menu-item index="3">
              <nuxt-link to="/graphic">
                <el-icon><Calendar /></el-icon>
                <span>График расчетов</span>
              </nuxt-link>
            </el-menu-item>
            <el-menu-item index="4">
              <nuxt-link to="/invoice">
                <el-icon><Calendar /></el-icon>
                <span>Накладные</span>
              </nuxt-link>
            </el-menu-item>
            <el-menu-item index="5">
              <nuxt-link to="/provider">
                <el-icon><Calendar /></el-icon>
                <span>Поставщики</span>
              </nuxt-link>
            </el-menu-item>
          </el-menu>
        </el-scrollbar>
      </el-aside>
      <el-main>
        <NuxtLayout />
        <NuxtPage />
      </el-main>
    </el-container>
  </el-container>
</template>

<script lang="ts" setup>
//import { ref } from "vue";
import { Calendar, Document, Suitcase, Setting } from "@element-plus/icons-vue";
</script>

<style scoped>
.layout-container-demo .el-header {
  position: relative;
  display: flex;
  
  color: var(--el-text-color-primary);
  border-bottom: 1px solid var(--el-border-color);
}
.layout-container-demo .el-aside {
  color: var(--el-text-color-primary);
}
.layout-container-demo .el-menu {
  border-right: none;
  font-size: 10px;
}
.layout-container-demo .el-menu title {
  font-size: 10px;
}
.el-sub-menu__title {
  font-size: 12px;
}
.layout-container-demo .el-main {
  padding: 20px 0 20px 30px;
}
.layout-container-demo .toolbar {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  height: 100%;
  /* right: 20px; */
}
</style>
