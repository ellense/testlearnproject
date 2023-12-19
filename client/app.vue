<template>
  <el-config-provider :locale="locale">
    
    <NuxtLayout>
      
      <template #header><WidgetsTheHeader /></template>
      <template #menu><WidgetsTheMenu /></template>
      <template #content><NuxtPage /></template>
    </NuxtLayout>
  </el-config-provider>
</template>

<script lang="ts" setup>
import { ElConfigProvider } from "element-plus";
import ru from "element-plus/dist/locale/ru.mjs";
import { useAuthStore } from './stores/authStore';
const locale = ru;
import { onMounted } from 'vue';
import { useVendorTableStore } from '~~/stores/providerTableStore';

const vendorStore = useVendorTableStore();
//инициализация vendor
// onMounted(async () => {
//   await vendorStore.fetchVendorsList({
//       vendorid: "",
//       name: "",
//       urasticname: "",
//       directorname: "",
//       urasticadress: "",
//       inn_kpp: "",
//       entityid: "",
//     });
// });
// Инициализация авторизации
const auth = useAuthStore();
// Если пользователь не авторизован, инициируем процесс авторизации
if (!auth.isAuth) auth.initAuth();
// Дожидаемся завершения процесса авторизации
await auth.authPromise;
</script>

<style scoped>
 .el-main {
  padding: 0 0 20px 30px;
}
</style>
