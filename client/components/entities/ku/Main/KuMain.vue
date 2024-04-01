<template>
    <el-tabs v-model="activeName" type="border-card" style="margin-right: 10px; height: 85vh;">
        <el-tab-pane label="Основное" name="first"><EntitiesKuMainBasic/></el-tab-pane>
        <el-tab-pane label="Условия бонуса" name="second"><EntitiesKuMainBonus/></el-tab-pane>
        <el-tab-pane label="Исключенные накладные" name="third"><EntitiesKuMainExInvoice/></el-tab-pane>
        <el-tab-pane label="Категорийные менеджеры" name="fourth"><EntitiesKuMainManagers/></el-tab-pane>
        <el-tab-pane label="Должностные лица" name="fifth"><EntitiesKuMainOfficial/></el-tab-pane>

    <EntitiesKuRequirement />
    </el-tabs>
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
.el-divider__text {
    font-size: 13px;
}

.demo-tabs>.el-tabs__content {
    padding: 10px;
    color: #3b3c3f;
    
}
.el-tabs--border-card {
    height: calc(100vh - 140px);
}
.el-tabs--border-card>.el-tabs__content {
    padding: 0 10px 10px 10px !important;
}
</style>