<template>
  <div class="login-container">
    <el-card class="login-card">
      <template #header>
      
        <h1>Авторизация</h1>
    
    </template>
      <div class="auth-container__form">
        <el-form :model="form" @submit.prevent.stop="login">
          <el-form-item>
            <el-input v-model="form.username" placeholder="Введите логин" :prefix-icon="Message" />
          </el-form-item>
          <el-form-item>
            <el-input v-model="form.password" placeholder="Введите пароль" show-password type="password" :prefix-icon="Lock" />
          </el-form-item>
          <el-form-item>
            <el-button native-type="submit" type="primary" :full-width="true" :scopes="'all'" :for-all="true"
              style="width: 100%">
              Войти
            </el-button>
          </el-form-item>
        </el-form>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { reactive } from "vue";
import { Lock, Message } from "@element-plus/icons-vue";
import { useAuthStore } from "~/stores/authStore";
import { type AuthApiData } from "~/utils/types/authTypes";
import message from "element-plus/es/components/message";

import { useRouter } from "vue-router";

const router = useRouter();

const form = reactive<AuthApiData>({
  username: "admin",
  password: "admin",
});

const login = () => {
  if (form.password && form.username) {
    useAuthStore()
      .getTokenForApi(form)
      .then(() => {
        useAuthStore().setAuth(true);
        router.push("kuV");
        message.success("Вы вошли в личный кабинет");
        form.password = "";
        form.username = "";
      })
      .catch((e) => {
        message.error("Ошибка при авторизации");
        console.error("Ошибка при авторизации:", e);
      });
  } else {
    message.warning(
      `Не заполнен ${!form.username && !form.password
        ? "логин и пароль"
        : !form.username
          ? "логин"
          : " пароль"
      }`
    );
  }
};
</script>

<style scoped>
.el-form {
  /* margin-top: 10px; */
}

.login-container {
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
}

.login-card {
  width: 550px;
  height: 230px;
  padding: 20px;
}

h1 {
  color: #337ecc;
  margin: 0;
}
</style>
