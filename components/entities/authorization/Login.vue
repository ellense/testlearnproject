<template>
  <el-form
    ref="ruleFormLoginRef"
    :model="ruleFormLogin"
    :rules="rulesLogin"
    status-icon
  >
    <el-form-item prop="email">
      <el-input
        v-model="ruleFormLogin.email"
        placeholder="Введите email"
        :prefix-icon="Message"
      />
    </el-form-item>
    <el-form-item prop="password">
      <el-input
        v-model="ruleFormLogin.password"
        type="password"
        placeholder="Введите пароль"
        :prefix-icon="Lock"
      />
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="submitForm(ruleFormLoginRef)"
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
import { User, Lock, Message, CircleCheck } from "@element-plus/icons-vue";
import type { FormInstance, FormRules } from "element-plus";
interface loginData {
  email: string;
  password: string;
}
const ruleFormLoginRef = ref<FormInstance>();
const rulesLogin = ref<FormRules<loginData>>({
  email: [
    {
      required: true,
      message: "Пожалуйста, введите вашу почту",
      trigger: "change",
    },
    {
      type: "email",
      message: "Пожалуйста, введите вашу почту правильно",
      trigger: "change",
    },
  ],
  password: [
    {
      required: true,
      message: "Пожалуйста, введите ваш пароль",
      trigger: "change",
    },
  ],
});

const ruleFormLogin = ref<loginData>({
  email: "",
  password: "",
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
