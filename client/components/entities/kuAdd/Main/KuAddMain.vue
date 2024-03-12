<template>
    <el-tabs v-model="activeName" type="border-card" style="margin-right: 10px;">
        <!-- <vue-resizable  minHeight=300 maxHeight=1500 active="[ 'b']" style="border-bottom: 1px solid var(--el-border-color); height: calc(100vh - 560px);"> -->
        <el-tab-pane label="Основное" name="first"><EntitiesKuAddMainBasic/></el-tab-pane>
        <el-tab-pane label="Условия бонуса" name="second"><EntitiesKuAddMainBonus/></el-tab-pane>
        <el-tab-pane label="Исключенные накладные" name="third"><EntitiesKuAddMainExInvoice/></el-tab-pane>
        <el-tab-pane label="Категорийные менеджеры" name="fourth"><EntitiesKuAddMainManagers/></el-tab-pane>
        <el-tab-pane label="Должностные лица" name="fifth"><EntitiesKuAddMainOfficial/></el-tab-pane>
    <!-- </vue-resizable> -->
    <EntitiesKuAddRequirement />
    </el-tabs>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import type { TabsPaneContext } from 'element-plus'
import VueResizable from 'vue-resizable'
const activeName = ref('first')

const handleClick = (tab: TabsPaneContext, event: Event) => {
    console.log(tab, event)
}
</script>
<style>
.demo-tabs>.el-tabs__content {
    padding: 10px;
    color: #3b3c3f;
    
}
.el-tabs--border-card {
    height: calc(100vh - 170px);
}
</style>