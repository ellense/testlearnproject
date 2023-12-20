<template>
  <el-aside width="200px">
    <el-scrollbar height="calc(100vh - 60px)">
      <el-menu style="font-size: 12px" active-color="#689EFF">
        <nuxt-link to="/ku">
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
        <el-divider />
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
        <nuxt-link to="/vendor">
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
        <el-divider />
        <!-- <nuxt-link to="/test">
          <el-menu-item index="8">
            <el-icon><User /></el-icon>
            <span>тест</span>
          </el-menu-item>
        </nuxt-link> -->

        <el-menu-item index="10">
          <!-- <el-dropdown>
            <div class="dropdown">
              <div v-if="firstProfile">
                <h5>
                  {{ firstProfile.last_name }}
                  {{ firstProfile.first_name.charAt(0).toUpperCase() }}.{{
                    firstProfile.middle_name.charAt(0).toUpperCase()
                  }}.
                </h5>
              </div>
            </div>
            <template #dropdown>
              <el-dropdown-menu>
                <el-dropdown-item>Выйти</el-dropdown-item>
              </el-dropdown-menu>
            </template>
          </el-dropdown> -->
          <el-popconfirm
            :title="'Выйти из ЛК?'"
            :confirm-button-text="'Да'"
            :cancel-button-text="'Нет'"
            :hide-icon="true"
            width="180px"
            @confirm="logOut()"
          >
            <template #reference>
              <div class="main-menu__logout-button">
                <span>Выход</span>
              </div>
            </template>
          </el-popconfirm>
        </el-menu-item>
      </el-menu>
    </el-scrollbar>
  </el-aside>
</template>

<script setup lang="ts">
import {
  Calendar,
  Document,
  Suitcase,
  User,
  Memo,
  Box,
  ShoppingCartFull,
} from "@element-plus/icons-vue";
import { storeToRefs } from "pinia";
import { useAuthStore } from "~/stores/authStore";
import { useProfileStore } from "~~/stores/profileStore";
const { firstProfile } = storeToRefs(useProfileStore());
const logOut = () => useAuthStore().logout();
</script>

<style scoped>
.el-aside {
  color: var(--el-text-color-primary);
}
.el-menu {
  border-right: none;
}
.el-menu:first-child {
  margin-top: 24px;
}
.el-menu-item {
  height: 40px;
}
.el-text {
  margin-left: 30px;
}
</style>
