<template>
    <el-tabs v-model="activeName" type="border-card" style="margin-right: 10px;">
        <el-tab-pane label="Основное" name="first"><EntitiesKuAddMainBasic/></el-tab-pane>
        <el-tab-pane label="Условия бонуса" name="second"><EntitiesKuAddMainBonus/></el-tab-pane>
        <el-tab-pane label="Исключенные накладные" name="third">В разработке...</el-tab-pane>
        <el-tab-pane label="Категорийные менеджеры" name="fourth">В разработке...</el-tab-pane>
        <el-tab-pane label="Должностные лица" name="fifth">В разработке...</el-tab-pane>

    <EntitiesKuAddRequirement />
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
.demo-tabs>.el-tabs__content {
    padding: 10px;
    color: #3b3c3f;
}
</style>