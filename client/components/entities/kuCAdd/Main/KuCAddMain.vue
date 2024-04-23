<template>
    <el-tabs v-model="activeName" type="border-card" style="margin-right: 10px; height: 85vh;">
        <!-- <vue-resizable  minHeight=300 maxHeight=1500 active="[ 'b']" style="border-bottom: 1px solid var(--el-border-color); height: calc(100vh - 560px);"> -->
        <el-tab-pane label="Основное" name="first"><EntitiesKuCAddMainBasic/></el-tab-pane>
        <el-tab-pane label="Условия бонуса" name="second"><EntitiesKuCAddMainBonus/></el-tab-pane>
        <el-tab-pane label="Поставщики и договоры" name="third"><EntitiesKuCAddMainVendorsAndContracts/></el-tab-pane>
        <el-tab-pane label="Исключенные накладные" name="fourth"><EntitiesKuCAddMainExInvoice/></el-tab-pane>
        <el-tab-pane label="Категорийные менеджеры" name="fifth"><EntitiesKuCAddMainManagers/></el-tab-pane>
        <el-tab-pane label="Должностные лица" name="sixth"><EntitiesKuCAddMainOfficial/></el-tab-pane>
    <!-- </vue-resizable> -->
    <EntitiesKuCAddRequirement />
    </el-tabs>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import type { TabsPaneContext } from 'element-plus'
// import VueResizable from 'vue-resizable'
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