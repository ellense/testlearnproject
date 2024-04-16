<template>
    <div>
        <el-button size="small" type="primary" plain round @click="dialogOpenProduct()" :disabled="isEditButtonDisabled">+ Условие по
            товарам</el-button>
        <el-button size="small" type="primary" plain round @click="dialogOpenCategory()" :disabled="isEditButtonDisabled">+ Условие по
            категории</el-button>
        <el-button size="small" type="danger" plain round @click="store.tableDataExRequirement.length = 0" :disabled="isEditButtonDisabled">Удалить
            все</el-button>
    </div>
    <el-scrollbar class="scrollTableRequirement">
        <el-table style="width: 100%; height:26vh" height="26vh" :data="tableData" border empty-text="Добавьте условия">
            <el-table-column property="item_type" label="Тип номенклатуры" width="150" show-overflow-tooltip />
            <el-table-column property="item_code" label="Связь с номенклатурой / категорией" width="300"
                show-overflow-tooltip />
            <el-table-column property="item_name" label="Наименование" width="300" show-overflow-tooltip />
            <el-table-column property="producer" label="Производитель" width="300" show-overflow-tooltip />
            <el-table-column property="brand" label="Торговая марка" width="300" show-overflow-tooltip />
            <el-table-column fixed="right" label="Операция">
                <template #default="scope">
                    <el-button text type="danger" :icon="Delete" size="small" @click.prevent="deleteRow(scope.$index)"
                        style="width: 125px; height: 100%;" :disabled="isEditButtonDisabled">Удалить</el-button>
                </template>
            </el-table-column>
        </el-table>
    </el-scrollbar>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import { storeToRefs } from "pinia";
import { Delete } from '@element-plus/icons-vue'
import { useKuIdStore } from "~~/stores/kuIdStore";
import type { IRequirement, IRequirement2 } from "~/utils/types/directoryTypes";
const { getKuExRequirement } = storeToRefs(
    useKuIdStore()
);

const isEditButtonDisabled = computed(() => {
    return store.kuIdStatus !== 'Создано';
});


const store = useKuIdStore();
const tableData = ref<IRequirement2[]>(getKuExRequirement.value);
watch(getKuExRequirement, (value) => {
    tableData.value = value || [];
});

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