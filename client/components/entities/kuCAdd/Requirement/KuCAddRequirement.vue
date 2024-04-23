<template>
    <div style="margin-top: 10px;  height: 35vh;">
<el-tabs  v-model="activeName" class="demo-tabs" @tab-click="handleClick">
    <el-tab-pane label="Включенные условия" name="first"><EntitiesKuCAddRequirementIncluded/></el-tab-pane>
    <el-tab-pane label="Исключенные условия" name="second"><EntitiesKuCAddRequirementExcluded/></el-tab-pane>
    <el-tab-pane label="Наименование контракта" name="third"><EntitiesKuCAddRequirementContract/></el-tab-pane>
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
    padding: 0 !important;
    color: #3b3c3f;
    min-height: 100px;
}

</style>
