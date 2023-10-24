<template>
  <div class="login-container">
    <el-card class="login-card">
      <el-icon><Document /></el-icon>
      <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
        <el-tab-pane label="Вход" name="first">
          <el-form ref="loginForm" :model="loginData" label-width="80px">
            <el-form-item label="Email" prop="email">
              <el-input
                v-model="loginData.email"
                placeholder="Введите ваш Email"
              />
            </el-form-item>
            <el-form-item label="Пароль" prop="password">
              <el-input
                v-model="loginData.password"
                type="password"
                placeholder="Введите ваш пароль"
              />
            </el-form-item>
            <el-form-item>
              <el-button type="primary">Войти</el-button>
            </el-form-item>
          </el-form>
        </el-tab-pane>
        <el-tab-pane label="Регистрация" name="second">
          <el-form ref="loginForm" :model="loginData" label-width="120px">
            <el-form-item label="ФИО" prop="name">
              <el-input
                v-model="registData.name"
                placeholder="Введите ваше ФИО"
              />
            </el-form-item>
            <el-form-item label="Email" prop="email">
              <el-input
                v-model="registData.email"
                placeholder="Введите ваш Email"
              />
            </el-form-item>
            <el-form-item label="Пароль" prop="password">
              <el-input
                v-model="registData.password"
                type="password"
                placeholder="Придумайте пароль"
              />
            </el-form-item>
            <el-form-item label="Подтверждение" prop="password2">
              <el-input
                v-model="registData.password2"
                type="password"
                placeholder="Введите ваш пароль еще раз"
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
  justify-content: center;
  margin-top: 200px;
}

.login-card {
  width: 550px;
  padding: 20px;
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
