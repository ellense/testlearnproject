<template>
  <el-aside width="210px">
    <el-scrollbar height="calc(100vh - 60px)">
      <el-menu active-color="#689EFF">
        <el-divider content-position="left" style=" color: #337ecc;">КУ поставщиков</el-divider>
        <nuxt-link to="/kuV">
          <el-menu-item index="1">
            <el-icon>
              <Document />
            </el-icon>
            <span>Коммерческие условия</span>
          </el-menu-item>
        </nuxt-link>
        <nuxt-link to="/graphicV">
          <el-menu-item index="2">
            <el-icon>
              <Calendar />
            </el-icon>
            <span>Графики расчетов</span>
          </el-menu-item>
        </nuxt-link>
        
        <el-divider content-position="left" style=" color: #337ecc;">КУ клиентов</el-divider>
        <nuxt-link to="kuC">
          <el-menu-item index="4">
            <el-icon>
              <Document />
            </el-icon>
            <span>Коммерческие условия</span>
          </el-menu-item>
        </nuxt-link>
        <nuxt-link to="/graphicC">
          <el-menu-item index="5">
            <el-icon>
              <Calendar />
            </el-icon>
            <span>Графики расчетов</span>
          </el-menu-item>
        </nuxt-link>
        
        <el-divider content-position="left" style=" color: #337ecc;">Справочники</el-divider>
        <nuxt-link to="/entity">
          <el-menu-item index="10">
            <el-icon>
              <Suitcase />
            </el-icon>
            <span>Юридические лица</span>
          </el-menu-item>
        </nuxt-link>

        <nuxt-link to="/vendor">
          <el-menu-item index="11">
            <el-icon>
              <Box />
            </el-icon>
            <span>Поставщики</span>
          </el-menu-item>
        </nuxt-link>
        <nuxt-link to="/customer">
          <el-menu-item index="12">
            <el-icon>
              <Box />
            </el-icon>
            <span>Клиенты</span>
          </el-menu-item>
        </nuxt-link>
        <nuxt-link to="/invoiceV">
          <el-menu-item index="14">
            <el-icon>
              <Memo />
            </el-icon>
            <span>Накладные поставок</span>
          </el-menu-item>
        </nuxt-link>
        <nuxt-link to="/product">
          <el-menu-item index="13">
            <el-icon>
              <ShoppingCartFull />
            </el-icon>
            <span>Товары</span>
          </el-menu-item>
        </nuxt-link>
        <nuxt-link to="/service">
          <el-menu-item index="6">
            <el-icon>
              <Memo />
            </el-icon>
            <span>Услуги</span>
          </el-menu-item>
        </nuxt-link>
        <nuxt-link to="/article">
          <el-menu-item index="7">
            <el-icon>
              <Memo />
            </el-icon>
            <span>Статьи услуг</span>
          </el-menu-item>
        </nuxt-link>
        <nuxt-link to="/pricelist">
          <el-menu-item index="8">
            <el-icon>
              <Memo />
            </el-icon>
            <span>Прайс-лист услуг</span>
          </el-menu-item>
        </nuxt-link>
        <nuxt-link to="/place">
          <el-menu-item index="9">
            <el-icon>
              <Memo />
            </el-icon>
            <span>Места оказания услуг</span>
          </el-menu-item>
        </nuxt-link>
        <el-divider />
        

        <el-menu-item index="14">
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
          <el-popconfirm :title="'Выйти из ЛК?'" :confirm-button-text="'Да'" :cancel-button-text="'Нет'"
            :hide-icon="true" width="200px" @confirm="logOut()">
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
  height: 30px;
}

.el-text {
  margin-left: 20px;
}

.main-menu__logout-button {
  width: 100%;
}
</style>
