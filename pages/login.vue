<template>
  <div class="login-container">
    <el-card class="login-card">
      <div class="img">
        <el-image :src="'/img/logo.png'" />
      </div>
      <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
        <el-tab-pane label="Вход" name="first">
          <el-form ref="loginForm" :model="loginData">
            <el-form-item prop="email">
              <el-input
                v-model="loginData.email"
                placeholder="Введите email"
                :prefix-icon="Message"
              />
            </el-form-item>
            <el-form-item prop="password">
              <el-input
                v-model="loginData.password"
                type="password"
                placeholder="Введите пароль"
                :prefix-icon="Lock"
              />
            </el-form-item>
            <el-form-item>
              <el-button type="primary">Войти</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="Регистрация" name="second">
          <el-form ref="loginForm" :model="loginData">
            <el-form-item prop="name">
              <el-input
                v-model="registData.name"
                placeholder="Введите ФИО"
                :prefix-icon="User"
              />
            </el-form-item>
            <el-form-item prop="email">
              <el-input
                v-model="registData.email"
                placeholder="Введите email"
                :prefix-icon="Message"
              />
            </el-form-item>
            <el-form-item prop="password">
              <el-input
                v-model="registData.password"
                type="password"
                placeholder="Придумайте пароль"
                :prefix-icon="Lock"
              />
            </el-form-item>
            <el-form-item prop="password2">
              <el-input
                v-model="registData.password2"
                type="password"
                placeholder="Подтвердите пароль"
                :prefix-icon="CircleCheck"
              />
            </el-form-item>
            <el-form-item>
              <el-button type="primary">Зарегистрироваться</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import {
  User,
  Lock,
  Message,
  CircleCheck,
  Document,
} from "@element-plus/icons-vue";
import type { TabsPaneContext } from "element-plus";

const activeName = ref("first");

const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event);
};
const loginData = ref({
  email: "",
  password: "",
});
const registData = ref({
  name: "",
  email: "",
  password: "",
  password2: "",
});
</script>

<style scoped>
.login-container {
  display: flex;
  height: 100vh; /* Use 100vh to make sure it takes the full viewport height */
  justify-content: center; /* Center horizontally */
  align-items: center; /* Center vertically */
}

.login-card {
  width: 550px;
  padding: 20px;
}

.img {
  display: flex;
  justify-content: center;
  width: 100%;
  margin: 20px 0;
}

.demo-tabs > .el-tabs__content {
  padding: 32px;
  color: #6b778c;
  font-size: 50px;
  font-weight: 600;
}

.el-form {
  margin-top: 30px;
}

.el-form .el-button {
  width: 100%;
}
</style>
