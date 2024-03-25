<template>
    <div style="margin-top: 10px;">
<el-tabs  v-model="activeName" class="demo-tabs" @tab-click="handleClick">
    <el-tab-pane label="Включенные условия" name="first"><EntitiesKuRequirementIncluded/></el-tab-pane>
    <el-tab-pane label="Исключенные условия" name="second"><EntitiesKuRequirementExcluded/></el-tab-pane>
    <el-tab-pane label="Наименование контракта" name="third">В разработке...</el-tab-pane>
  </el-tabs>
</div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import type { TabsPaneContext } from 'element-plus'

const activeName = ref('first')

const handleClick = (tab: TabsPaneContext, event: Event) => {
    console.log(tab, event)
}
</script>
<style>
.demo-tabs>.el-tabs__content {
    padding: 0 10px 10px 10px !important;
    color: #3b3c3f;
    min-height: 100px;
}
</style>
