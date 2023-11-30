<template>
  <el-form
    ref="ruleFormLoginRef"
    :model="form"
    :rules="rulesLogin"
    status-icon
    @submit.native.prevent="login"
  >
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
        placeholder="Введите логин"
        :prefix-icon="Lock"
      />
    </el-form-item>

    <el-form-item>
      <el-button
        type="success"
        native-type="submit"
        @click="submitForm(ruleFormLoginRef)"
        >Войти</el-button
      >
    </el-form-item>
    <el-form-item>
      <el-button @click="resetForm(ruleFormLoginRef)">Сбросить</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { Lock, Message } from "@element-plus/icons-vue";
import type { FormInstance, FormRules } from "element-plus";
const router = useRouter();
interface loginData {
  username: string;
  password: string;
}
const form = ref<loginData>({
  username: "",
  password: "",
});
const { $axiosPlugin } = useNuxtApp();

const login = async () => {
  await $axiosPlugin
    .post("api/token/", {
      username: form.value.username,
      password: form.value.password,
    })
    .then((response) => {
      console.log(response);
      console.log("успешно");
      localStorage.setItem("ваш_ключ_токена", response.data.access);
      console.log(response.data.access);
      router.push("/");
    })
    .catch((error) => {
      console.error("Ошибка при запросе:", error.message);
      console.error("Детали ошибки:", error);
    });
};

const ruleFormLoginRef = ref<FormInstance>();
const rulesLogin = ref<FormRules<loginData>>({
  username: [
    {
      required: true,
      message: "Пожалуйста, введите вашу почту или логин",
      trigger: "change",
    },
    // {
    //   type: "email",
    //   message: "Пожалуйста, введите вашу почту правильно",
    //   trigger: "change",
    // },
  ],
  password: [
    {
      required: true,
      message: "Пожалуйста, введите ваш пароль",
      trigger: "change",
    },
  ],
});
const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log("submit!");
    } else {
      console.log("error submit!", fields);
    }
  });
};

const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) return;
  formEl.resetFields();
};
</script>

<style scoped>
.el-form {
  margin-top: 30px;
}

.el-form .el-button {
  width: 100%;
}
</style>
