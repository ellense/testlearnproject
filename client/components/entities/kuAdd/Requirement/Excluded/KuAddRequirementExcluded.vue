<template>
    <div>
        <el-button size="small" round @click="dialogOpenProduct()">+ Условие по
            товарам</el-button>
        <el-button size="small" round @click="dialogOpenCategory()">+ Условие по
            категории</el-button>
    </div>
    <el-scrollbar class="scrollTableRequirement">
        <el-table style="width: 100%; min-height:100px; height:26vh" height="26vh" :data="kuRequirementList" border
            empty-text="Добавьте условия">
            <el-table-column property="item_type" label="Тип номенклатуры" width="150" show-overflow-tooltip />
            <el-table-column property="item_code" label="Связь с номенклатурой / категорией" width="300"
                show-overflow-tooltip />
            <el-table-column property="item_name" label="Наименование" width="300" show-overflow-tooltip />
            <el-table-column property="producer" label="Производитель" width="300" show-overflow-tooltip />
            <el-table-column property="brand" label="Торговая марка" width="300" show-overflow-tooltip />
            <el-table-column fixed="right" label="Операция"  style="background-color: #ff9f9fdc;">
                <template #default="scope">
                    <el-button text type="danger" :icon="Delete" size="small" @click.prevent="deleteRow(scope.$index)"
                        style="width: 125px; height: 100%;">Удалить</el-button>
                </template>
            </el-table-column>
        </el-table>
    </el-scrollbar>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import { Delete } from '@element-plus/icons-vue'
import { useKuAddStore } from "~~/stores/kuAddStore";

const store = useKuAddStore();
const kuRequirementList = ref(store.tableDataExRequirement);

//кнопки добавления условий
const dialogOpenProduct = () => {
    store.dialogFormProductExVisible = true;
};
const dialogOpenCategory = () => {
    store.dialogFormCategoryExVisible = true;
};

//удаление условий
const deleteRow = (index: number) => {
    store.tableDataExRequirement.splice(index, 1);
}

</script>
<style scoped>

</style>