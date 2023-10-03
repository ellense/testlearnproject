<template>
  <el-container class="layout-container-demo">
    <el-header style="text-align: right; font-size: 12px">
      <div>
        <h1>Управление коммерческими условиями поставщиков</h1>
      </div>
      <div class="toolbar">
        <div>
          <h1>РЕТРО-БОНУС</h1>
        </div>
        <el-dropdown>
          <el-icon style="margin-right: 8px; margin-top: 1px" size="25"
            ><User
          /></el-icon>

          <template #dropdown>
            <el-dropdown-menu>
              <el-dropdown-item>Открыть</el-dropdown-item>
              <el-dropdown-item>Редактировать</el-dropdown-item>
              <el-dropdown-item>Выйти</el-dropdown-item>
            </el-dropdown-menu>
          </template>
        </el-dropdown>
      </div>
    </el-header>

    <el-container>
      <el-aside width="200px">
        <el-scrollbar height="calc(100vh - 60px)">
          <el-menu style="font-size: 12px" active-color="#689EFF">
            <nuxt-link to="/">
              <el-menu-item index="1">
                <el-icon><Document /></el-icon>
                <span>Ком.условие</span>
              </el-menu-item>
            </nuxt-link>
            <nuxt-link to="/graphic">
              <el-menu-item index="2">
                <el-icon><Calendar /></el-icon>
                <span>График расчетов</span>
              </el-menu-item>
            </nuxt-link>
            <nuxt-link to="/entity">
              <el-menu-item index="3">
                <el-icon><Suitcase /></el-icon>
                <span>Юридические лица</span>
              </el-menu-item>
            </nuxt-link>
            <nuxt-link to="/invoice">
              <el-menu-item index="4">
                <el-icon><Memo /></el-icon>
                <span>Накладные</span>
              </el-menu-item>
            </nuxt-link>
            <nuxt-link to="/provider">
              <el-menu-item index="5">
                <el-icon><Box /></el-icon>
                <span>Поставщики</span>
              </el-menu-item>
            </nuxt-link>
            <nuxt-link to="/product">
              <el-menu-item index="6">
                <el-icon><ShoppingCartFull /></el-icon>
                <span>Товары</span>
              </el-menu-item>
            </nuxt-link>
          </el-menu>
          <el-divider />
          <div>
            <el-text size="small">История</el-text>
          </div>
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
import {
  Calendar,
  Document,
  Suitcase,
  User,
  Memo,
  Box,
  ShoppingCartFull,
} from "@element-plus/icons-vue";
</script>

<style scoped>

h1{
  color: #337ecc;
}
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
}
.layout-container-demo .el-main {
  padding: 0 0 20px 30px;
}
.layout-container-demo .toolbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  height: 100%;
  /* right: 20px; */
}
.el-menu-item {
height: 40px;
}
</style>
