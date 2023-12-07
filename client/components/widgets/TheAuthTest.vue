<template>
  <div class="login-container">
    <el-card class="login-card">
    <div class="auth-container__form">
      <el-form :model="form" @submit.prevent.stop="login">
        <el-form-item>
          <el-input
            v-model="form.username"
            placeholder="Введите логин"
            :prefix-icon="Message"
          />
        </el-form-item>
        <el-form-item>
          <el-input
            v-model="form.password"
            placeholder="Введите пароль"
            :prefix-icon="Lock"
          />
        </el-form-item>
        <el-form-item>
          <el-button
            native-type="submit"
            type="primary"
            :full-width="true"
            :scopes="'all'"
            :for-all="true"
            style="width: 100%"
          >
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

const authStore = useAuthStore();
const router = useRouter();

const form = reactive<AuthApiData>({
  username: "admin",
  password: "1234",
});

const login = async () => {
  try {
    if (!form.username || !form.password) {
      message.warning(
        `Не заполнен ${
          !form.username && !form.password
            ? "логин и пароль"
            : !form.username
            ? "логин"
            : " пароль"
        }`
      );
      return;
    }

    await authStore.login(form); // Изменил вызов метода на более общий login
    router.push("/");
    message.success("Вы вошли в личный кабинет");
    form.password = "";
    form.username = "";
  } catch (error) {
    message.error("Ошибка входа. Пожалуйста, проверьте введенные данные.");
    console.error(error);
  }
};
</script>


<style scoped>
.el-form {
  margin-top: 30px;
}
.login-container {
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
}

.login-card {
  width: 550px;
  height: 300px;
  padding: 20px;
}
</style>