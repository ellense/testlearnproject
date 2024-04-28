<template>
        <el-button size="small" type="primary" plain round
            @click="store.dialogFormContractVisible = true">Добавить</el-button>
        <el-button size="small" type="danger" plain round @click="store.tableDataContract.length = 0">Удалить
            все</el-button>
        <el-button size="small" type="success" plain round @click="FormContract()">Cформировать поле контакт</el-button>
    <div class="scrollTableRequirement">
        <el-table style="width: 100%; min-height:100px; height:30vh" height="30vh" :data="tableData" border
            empty-text="" align="center">
            <el-table-column label="Услуга" align="center">
                <el-table-column property="producer_code" label="Код" width="200" show-overflow-tooltip
                    align="center" />
                <el-table-column property="producer_name" label="Наименование" width="500" align="center" />
            </el-table-column>
            <el-table-column label="Статья услуги" align="center">
                <el-table-column property="brand_code" label="Код" width="200" show-overflow-tooltip />
                <el-table-column property="brand_name" label="Наименование" width="500" />
            </el-table-column>
            <!-- <el-table-column prop="use_producer" label="Использовать производителя" width="120" align="center">
                <template #default="{ row }">
                    <el-checkbox v-model="row.use_producer" @change="onUseProducerChange(row)"></el-checkbox>
                </template>
</el-table-column>
<el-table-column prop="use_brand" label="Использовать торговую марку" width="120" align="center">
    <template #default="{ row }">
                    <el-checkbox v-model="row.use_brand" @change="onUseBrandChange(row)"></el-checkbox>
                </template>
</el-table-column> -->
            <el-table-column fixed="right" label="Операция" align="center">
                <template #default="scope">
                    <el-button text type="danger" :icon="Delete" size="small" @click.prevent="deleteRow(scope.$index)"
                        style="width: 125px; height: 100%;">Удалить</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
    <el-dialog v-model="store.dialogFormContractVisible" width="530px"
        title="Выбор услуг для наименования контракта" close-on-click-modal
        close-on-press-escape draggable>
        <div class="selectCategory">
            <div>
                <div class="custom-label">Услуга</div>
                <el-select-v2 v-model="store.valueService_nameContract" clearable filterable style="width: 500px; "
                    placeholder="Выберите услугу" :options="options2" @change="onProducerChange">
                    <template #option="{ option }">
                        <span>{{ option.label }}</span>
                        <span style="
              margin-left: 10px;
              float: right;
              color: var(--el-text-color-secondary);
              font-size: 13px;
            ">{{ option.value }}</span>
                    </template>
                </el-select-v2>
            </div>
            <div>
                <div class="custom-label">Статья услуг</div>
                <el-select-v2 v-model="store.valueArticle_nameContract" clearable filterable style="width: 500px"
                    placeholder="Выберите статью" :options="options3">
                    <template #option="{ option }">
                        <span>{{ option.label }}</span>
                        <span style="
              margin-left: 10px;
              float: right;
              color: var(--el-text-color-secondary);
              font-size: 13px;
            ">{{ option.value }}</span>
                    </template>
                </el-select-v2>
            </div>
        </div>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="store.dialogFormContractVisible = false">Отменить</el-button>
                <el-button @click="addRow()">Сохранить</el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script lang="ts" setup>
import { ref } from "vue";
import { Delete } from '@element-plus/icons-vue'
import { useKuCAddStore } from "~~/stores/kuCAddStore";
import type { IBrand, IContract, IProducer } from "~/utils/types/directoryTypes";

const store = useKuCAddStore();
const tableData = ref(store.tableDataContract);
//добавление строк
const addRow = async () => {
    if (store.valueService_nameContract || store.valueArticle_nameContract) {
        console.log("производитель", store.valueService_nameContract);
        console.log("марка", store.valueArticle_nameContract);

        // Используем сохраненное значение selectedCategoryName
        store.tableDataContract.push({
            producer_code: "",
            brand_code: "",
            use_producer: false,
            use_brand: false,
            producer_name: store.valueService_nameContract,
            brand_name: store.valueArticle_nameContract,
        });
        console.log("строка таблицы контркта", store.tableDataContract);

        store.dialogFormContractVisible = false;
        store.valueArticle_nameContract = "";
        store.valueService_nameContract = "";
        store.setFilterBrand('producer_name', undefined);
        await store.fetchAllProducersForInclided();
        await store.fetchAllBrandsForIncluded();
    } else {
        ElMessage.error('Заполните минимум одно поле или нажмите "Отменить"');
    }
};
//удаление строк
const deleteRow = (index: number) => {
    store.tableDataContract.splice(index, 1);
}

const onUseProducerChange = (row: IContract) => {
    const rowIndex = tableData.value.findIndex(item => item === row);
    store.tableDataContract[rowIndex].use_producer = row.use_producer;
    console.log("данные tableDataContract в хранилище изменены:", store.tableDataContract)
};
const onUseBrandChange = (row: IContract) => {
    const rowIndex = tableData.value.findIndex(item => item === row);
    store.tableDataContract[rowIndex].use_brand = row.use_brand;
    console.log("данные tableDataContract в хранилище изменены:", store.tableDataContract)
};

const options2 = ref<Array<{ label: string; value: string }>>([]);
const options3 = ref<Array<{ label: string; value: string }>>([]);

watch(() => store.producerIncluded, (producers: IProducer[]) => {
    const uniqueProducers = Array.from(new Set(producers.map(item => item.producer_name)));
    options2.value = uniqueProducers.map(label => ({ label, value: label }));
});

watch(() => store.brandIncluded, (brands: IBrand[]) => {
    const uniqueBrands = Array.from(new Set(brands.map(item => item.brand_name)));
    options3.value = uniqueBrands.map(label => ({ label, value: label }));
});

const onProducerChange = async () => {
    store.valueArticle_nameContract = "";
    store.setFilterBrand('producer_name', store.valueService_nameContract);
    if (store.valueService_nameContract) { // Проверка, что выбрана торговая маркка
        store.fetchAllBrandsForIncluded();
    } else {
        store.setFilterBrand('producer_name', undefined); // Сбросить фильтр
        store.fetchAllBrandsForIncluded(); // Выполнить запрос без фильтра
    }
};
const FormContract = async () => {
    const newItem = {
        vendor_name: store.kuAddMain.newVendorId,
        ku_type: "",
        provider_list: store.tableDataContract.map(item => item.producer_name),
        brand_list: store.tableDataContract.map(item => item.brand_name),
    }
    await store.createKuContract(newItem)
}
</script>

<style scoped>
.selectCategory {
    display: flex;
    flex-direction: column;
    gap: 20px;
    max-width: 700px;
    margin: 20px 0 20px 0;
}
</style>