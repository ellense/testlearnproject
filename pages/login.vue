<!-- <template>
  <el-dialog>
    <el-form>
    
      <el-form-item>
        <el-input v-model="username" placeholder="Имя пользователя"></el-input>
      </el-form-item>
      <el-form-item>
        <el-input v-model="password" type="password" placeholder="Пароль"></el-input>
      </el-form-item>
      <el-button @click="login">Войти</el-button>
    </el-form>
  </el-dialog>
  </template>
  
  <script setup>
  
      const login = () => {
        // Вызовите хранилище для выполнения входа
        this.$pinia.store.useAuthStore.login({
          username: this.username,
          password: this.password,
        });
      };
    
  </script> -->
  <template>
    <div class="login-container">
      <el-card class="login-card">
        <h2>Авторизация</h2>
        <el-form ref="loginForm" :model="loginData" label-width="80px">
          <el-form-item label="Email" prop="email">
            <el-input v-model="loginData.email" placeholder="Введите ваш Email" />
          </el-form-item>
          <el-form-item label="Пароль" prop="password">
            <el-input
              v-model="loginData.password"
              type="password"
              placeholder="Введите ваш пароль"
            />
          </el-form-item>
          <el-form-item>
            <el-button type="primary" @click="login">Войти</el-button>
          </el-form-item>
        </el-form>
      </el-card>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  
  const loginData = ref({
    email: '',
    password: '',
  });
  
  const login = () => {
    // Здесь можно добавить логику для отправки запроса на сервер для аутентификации
    // и обработки ответа, например:
    // authService.login(loginData.value).then(() => {
    //   // Успешная аутентификация - перенаправьте на другую страницу
    //   $nuxt.navigate('/dashboard');
    // }).catch((error) => {
    //   // Ошибка аутентификации - отобразите сообщение об ошибке
    //   console.error(error);
    // });
  };
  </script>
  
  <style scoped>
  .login-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
  }
  
  .login-card {
    width: 300px;
    padding: 20px;
    /* margin-top: 200px; */
    /* text-align: center; */
  }
  </style>