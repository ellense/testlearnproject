<template>
  <div class="login-container">
    <el-card class="login-card">
      <FeaturesAuthorization />
    </el-card>
  </div>
</template>

<script lang="ts" setup></script>

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
</style>
