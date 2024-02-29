<template>
    <div>
        <el-button size="small" text bg @click="onAddItem()" :disabled="store.disableButtons"
            :title="disableButtonTooltip">+ Все</el-button>
        <el-button size="small" text bg @click="dialogOpenProduct()" :disabled="store.disableButtons"
            :title="disableButtonTooltip">+ Условие по
            товарам</el-button>
        <!-- :loading="categoryDialogLoading"  -->
        <el-button size="small" text bg @click="dialogOpenCategory()" :disabled="store.disableButtons"
            :title="disableButtonTooltip">+ Условие по
            категории</el-button>
    </div>
    <el-scrollbar class="scrollTable">
        <el-table style="width: 100%" height="calc(100vh - 700px)" :data="kuRequirementList" border
            empty-text="Добавьте условия">
            <el-table-column property="item_type" label="Тип номенклатуры" width="150" show-overflow-tooltip />
            <el-table-column property="item_code" label="Связь с номенклатурой / категорией" width="300"
                show-overflow-tooltip />
            <el-table-column property="item_name" label="Наименование" width="300" show-overflow-tooltip />
            <el-table-column property="producer" label="Производитель" width="300" show-overflow-tooltip />
            <el-table-column property="brand" label="Торговая марка" width="300" show-overflow-tooltip />
            <el-table-column fixed="right" label="Операция">
                <template #default="scope">
                    <el-button link type="danger" size="small" @click.prevent="deleteRow(scope.$index)">
                        Удалить
                    </el-button>
                </template>
            </el-table-column>
        </el-table>
    </el-scrollbar>
</template>
<script lang="ts" setup>
import { ref } from "vue";
import type { Action, ElTree } from 'element-plus'
import { useKuAddStore } from "~~/stores/kuAddStore";


const store = useKuAddStore();
const kuRequirementList = ref(store.tableDataRequirement);

// //проверка полей формы
// const isFormValid = () => {
//   const isEmpty = (value: any) => {
//     if (Array.isArray(value)) {
//       return value.some((item) => item === null || item.trim() === '');
//     } else {
//       return value === null || String(value).trim() === '';
//     }
//   };

//   // Проверка для каждого поля
//   const isEntityNameValid = !isEmpty(store.entityName);
//   const isNewTypeValid = !isEmpty(store.newType);
//   const isNewDateStartValid = !isEmpty(store.newDateStart);
//   const isNewDateEndValid = !isEmpty(store.newDateEnd);
//   const isVendorNameValid = !isEmpty(store.vendorName);
//   const isNewPercentValid = !isEmpty(store.newPercent);

//   // Возвращаем результат общей проверки
//   return (
//     isEntityNameValid &&
//     isNewTypeValid &&
//     isNewDateStartValid &&
//     isNewDateEndValid &&
//     isVendorNameValid &&
//     isNewPercentValid
//   );
// };

//добавление условия "все"
const onAddItem = () => {
    if (store.tableDataRequirement.length === 0) {
        store.tableDataRequirement.push({
            item_type: "Все",
            item_code: "",
            item_name: "",
            producer: "",
            brand: "",
        });
        console.log("данные условия ВСЕ", store.tableDataRequirement);

    }
    else {
        ElMessageBox.alert('При добавлении условия "Все", предыдущие условия удалятся', 'Вы точно хотите удалить условия?', {
            confirmButtonText: 'OK',
            callback: (action: Action) => {
                if (action === 'confirm') { // Проверяем, что пользователь подтвердил удаление
                    store.tableDataRequirement.length = 0;// Очищаем массив
                    store.tableDataRequirement.push({
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
    store.disableButtons = true;
};

//кнопки добавления условий
const dialogOpenProduct = () => {
    store.dialogFormProductVisible = true;
};
const dialogOpenCategory = () => {
    store.dialogFormCategoryVisible = true;

};

//удаление условий
const deleteRow = (index: number) => {
    store.tableDataRequirement.splice(index, 1);
    store.disableButtons = false;
}

const disableButtonTooltip = computed(() => {
    return store.disableButtons ? 'Кнопка заблокирована. Для доступа удалите условие "Все".' : '';
});

</script>