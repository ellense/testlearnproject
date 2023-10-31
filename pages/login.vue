<template>
  <div class="login-container">
    <el-card class="login-card">
      <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
        <el-tab-pane label="Вход" name="first">
          <el-form ref="ruleFormLoginRef" :model="ruleFormLogin" :rules="rulesLogin" status-icon>
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
        </el-tab-pane>
        <el-tab-pane label="Регистрация" name="second">
          <el-form
            ref="ruleFormRegistRef"
            :model="ruleFormRegist"
            :rules="rulesRegist"
          >
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
        </el-tab-pane>
      </el-tabs>
    </el-card>
  </div>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { User, Lock, Message, CircleCheck } from "@element-plus/icons-vue";
import type { TabsPaneContext, FormInstance, FormRules } from "element-plus";

//для переключения мд входом и регистрацией
const activeName = ref("first");
const handleClick = (tab: TabsPaneContext, event: Event) => {
  console.log(tab, event);
};

//интерфейсы входа и регистрации
interface loginData {
  email: string;
  password: string;
}
interface registData {
  name: string;
  email: string;
  password: string;
  password2: string;
}

//валидация
const ruleFormLoginRef = ref<FormInstance>();
const ruleFormRegistRef = ref<FormInstance>();
  
const ruleFormLogin = ref<loginData>({
  email: "",
  password: "",
});

const ruleFormRegist = ref<registData>({
  name: "",
  email: "",
  password: '',
  password2: '',
});

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
  if (value === '') {
    callback(new Error('Пожалуйста, введите ваш пароль'))
  } else {
    if (ruleFormRegist.value?.password !== '') {
      ruleFormRegistRef.value?.validateField('password', () => null)
    }
    callback()
  }
}

const validatePass2 = (rule: any, value: any, callback: any) => {
  if (value === '') {
    callback(new Error('Пожалуйста, повторите ваш пароль'))
  } else if (value !== ruleFormRegist.value?.password2) {
    callback(new Error("Пароли не совпадают"))
  } else {
    callback()
  }
}


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
  password: [{ validator: validatePass, trigger: 'change' }],
  password2: [{ validator: validatePass2, trigger: 'change' }],
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
.login-container {
  display: flex;
  height: 100vh;
  justify-content: center;
  align-items: center;
}

.login-card {
  width: 550px;
  height: 400px;
  padding: 20px;
}

.img {
  display: flex;
  justify-content: center;
  width: 50px;
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
