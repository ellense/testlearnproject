<template>
  <el-container class="layout-container-demo">
    <div class="">
      <slot name="header"></slot>
    </div>
    <div v-if="isAuth" class="layout-default__body">
      <el-container>
        <div>
          <slot name="menu"></slot>
        </div>
        <el-main>
          <div>
            <slot name="content"></slot>
          </div>
        </el-main>
      </el-container>
    </div>

    <div v-else>
      <WidgetsTheAuthTest />
    </div>
  </el-container>
</template>
<script setup lang="ts">
import type { WidgetsTheAuthTest } from "#build/components";
import { storeToRefs } from "pinia";
import { useAuthStore } from "~/stores/authStore";

const { isAuth } = storeToRefs(useAuthStore());
</script>
<style scoped>
.layout-container-demo {
  display: flex;
  flex-direction: column;
}

.layout-container-demo .el-main {
  padding: 0 0 20px 20px;
}</style>
