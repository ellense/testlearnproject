<template>
    <el-form>
      <!-- Форма входа с полями для имени пользователя и пароля -->
      <el-form-item>
        <el-input v-model="username" placeholder="Имя пользователя"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="password" type="password" placeholder="Пароль"></el-input>
      </el-form-item>
      <el-button @click="login">Войти</el-button>
    </el-form>
  </template>
  
  <script setup>
  
      const login = () => {
        // Вызовите хранилище для выполнения входа
        this.$pinia.store.useAuthStore.login({
          username: this.username,
          password: this.password,
        });
      };
    
  </script>