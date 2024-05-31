<template>
    <div>
        <el-button size="small" type="primary" plain round @click="onAddItem()" :disabled="store.disableButtonsIncluded"
            :title="disableButtonTooltip">+ Все</el-button>
        <el-button size="small" type="primary" plain round @click="dialogOpenProduct()"
            :disabled="store.disableButtonsIncluded" :title="disableButtonTooltip">+ Условие по
            товарам</el-button>
        <el-button size="small" type="primary" plain round @click="dialogOpenCategory()"
            :disabled="store.disableButtonsIncluded" :title="disableButtonTooltip">+ Условие по
            категории</el-button>
        <el-button size="small" type="danger" plain round @click="store.tableDataInRequirement.length = 0"
          >Удалить все</el-button>
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
            <el-table-column fixed="right" label="Операция" align="center">
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
import type { Action, ElTree } from 'element-plus'
import { Delete } from '@element-plus/icons-vue'
import { useKuAddStore } from "~~/stores/kuAddStore";


const store = useKuAddStore();
const kuRequirementList = ref(store.tableDataInRequirement);

//добавление условия "все"
const onAddItem = () => {
    if (store.tableDataInRequirement.length === 0) {
        store.tableDataInRequirement.push({
            id: null,
            item_type: "Все",
            item_code: "",
            item_name: "",
            producer: "",
            brand: "",
        });
        console.log("данные условия ВСЕ", store.tableDataInRequirement);

    }
    else {
        ElMessageBox.alert('При добавлении условия "Все", предыдущие условия удалятся', 'Вы точно хотите удалить условия?', {
            confirmButtonText: 'OK',
            callback: (action: Action) => {
                if (action === 'confirm') { // Проверяем, что пользователь подтвердил удаление
                    store.tableDataInRequirement.length = 0;// Очищаем массив
                    store.tableDataInRequirement.push({
                        id: null,
                        item_type: "Все",
                        item_code: "",
                        item_name: "",
                        producer: "",
                        brand: "",
                    });
                    ElMessage({
                        type: 'info',
                        message: 'Предыдущие условия удалены. Условие "Все" добавлено', // Сообщение о том, что условия удалены
                    });
                }
            },
        });

    }
    store.disableButtonsIncluded = true;
};

//кнопки добавления условий
const dialogOpenProduct = () => {
    store.dialogFormProductInVisible = true;
};
const dialogOpenCategory = () => {
    store.dialogFormCategoryInVisible = true;

};

//удаление условий
const deleteRow = (index: number) => {
    store.tableDataInRequirement.splice(index, 1);
    store.disableButtonsIncluded = false;
}

const disableButtonTooltip = computed(() => {
    return store.disableButtonsIncluded ? 'Кнопка заблокирована. Для доступа удалите условие "Все".' : '';
});

</script>

<style scoped></style>