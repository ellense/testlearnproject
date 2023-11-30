<template>
  <el-config-provider :locale="locale">
    <EntitiesProfileInicialize />
    <EntitiesLegalEntityInicialize />
    <EntitiesVendorInicialize />
    <EntitiesProductInicialize />
    <EntitiesInvoiceInicialize />
    <EntitiesKuInicialize />
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
const locale = ru;
</script>

<style scoped>
 .el-main {
  padding: 0 0 20px 30px;
}
</style>
