<template>
  <el-form ref="ruleFormRegistRef" :model="ruleFormRegist" :rules="rulesRegist">
    <el-form-item prop="name">
      <el-input
        v-model="ruleFormRegist.name"
        placeholder="Введите ФИО"
        :prefix-icon="User"
      />
    </el-form-item>
    <el-form-item prop="email">
      <el-input
        v-model="ruleFormRegist.email"
        placeholder="Введите email"
        :prefix-icon="Message"
      />
    </el-form-item>
    <el-form-item prop="password">
      <el-input
        v-model="ruleFormRegist.password"
        type="password"
        placeholder="Придумайте пароль"
        :prefix-icon="Lock"
      />
    </el-form-item>
    <el-form-item prop="password2">
      <el-input
        v-model="ruleFormRegist.password2"
        type="password"
        placeholder="Подтвердите пароль"
        :prefix-icon="CircleCheck"
      />
    </el-form-item>

    <el-form-item>
      <el-button type="primary" @click="submitForm(ruleFormRegistRef)"
        >Зарегистрироваться</el-button
      >
    </el-form-item>
    <el-form-item>
      <el-button @click="resetForm(ruleFormRegistRef)">Сбросить</el-button>
    </el-form-item>
  </el-form>
</template>

<script setup lang="ts">
import { ref } from "vue";
import { User, Lock, Message, CircleCheck } from "@element-plus/icons-vue";
import type { TabsPaneContext, FormInstance, FormRules } from "element-plus";

interface registData {
  name: string;
  email: string;
  password: string;
  password2: string;
}

//валидация

const ruleFormRegistRef = ref<FormInstance>();

const ruleFormRegist = ref<registData>({
  name: "",
  email: "",
  password: "",
  password2: "",
});

// const validatePass = (rule: any, value: any, callback: any) => {
//   if (value === '') {
//     callback(new Error('Пожалуйста, введите ваш пароль'))
//   } else {
//     if (ruleFormRegist.value?.password !== '') {
//       if (!ruleFormRegistRef.value) return
//       ruleFormRegistRef.value.validateField('password', () => null)
//     }
//     callback()
//   }
// }
// const validatePass2 = (rule: any, value: any, callback: any) => {
//   if (value === '') {
//     callback(new Error('Пожалуйста, повторите ваш пароль'))
//   } else if (value !== ruleFormRegist.value?.password2) {
//     callback(new Error("Пароли не совпадают"))
//   } else {
//     callback()
//   }
// }
const validatePass = (rule: any, value: any, callback: any) => {
  if (value === "") {
    callback(new Error("Пожалуйста, введите ваш пароль"));
  } else {
    if (ruleFormRegist.value?.password !== "") {
      ruleFormRegistRef.value?.validateField("password", () => null);
    }
    callback();
  }
};

const validatePass2 = (rule: any, value: any, callback: any) => {
  if (value === "") {
    callback(new Error("Пожалуйста, повторите ваш пароль"));
  } else if (value !== ruleFormRegist.value?.password) {
    callback(new Error("Пароли не совпадают"));
  } else {
    callback(); // Вызываем callback без аргументов в случае, если пароли совпадают
  }
};

const rulesRegist = ref<FormRules<registData>>({
  name: [
    {
      required: true,
      message: "Пожалуйста, введите ваше имя пользователя",
      trigger: "change",
    },
  ],
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
  password: [{ validator: validatePass, trigger: "change" }],
  password2: [{ validator: validatePass2, trigger: "change" }],
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
