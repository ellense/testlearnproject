<template>
        <el-button size="small" type="primary" plain round
            @click="store.dialogFormContractVisible = true" :disabled="isEditButtonDisabled">Добавить</el-button>
        <el-button size="small" type="danger" plain round @click="store.tableDataContract.length = 0" :disabled="isEditButtonDisabled">Удалить
            все</el-button>
        <el-button size="small" type="success" plain round @click="FormContract()" :disabled="isEditButtonDisabled">Cформировать поле контакт</el-button>
    <div class="scrollTableRequirement">
        <el-table style="width: 100%; min-height:100px; height:26vh" height="26vh" :data="tableData" border
            empty-text="" align="center">
            <el-table-column label="Производитель" align="center">
                <el-table-column property="producer_code" label="Код" width="200" show-overflow-tooltip
                    align="center" />
                <el-table-column property="producer_name" label="Наименование" width="500" align="center" />
            </el-table-column>
            <el-table-column label="Торговая марка" align="center">
                <el-table-column property="brand_code" label="Код" width="200" show-overflow-tooltip />
                <el-table-column property="brand_name" label="Наименование" width="500" />
            </el-table-column>
            <el-table-column fixed="right" label="Операция" align="center">
                <template #default="scope">
                    <el-button text type="danger" :icon="Delete" size="small" @click.prevent="deleteRow(scope.$index)"
                        style="width: 125px; height: 100%;">Удалить</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
    <el-dialog v-model="store.dialogFormContractVisible" width="530px"
        title="Выбор производителя и торговой марки для наименования контракта" close-on-click-modal
        close-on-press-escape draggable>
        <div class="selectCategory">
            <div>
                <div class="custom-label">Производитель</div>
                <el-select-v2 v-model="store.valueProducer_nameContract" clearable filterable style="width: 500px; "
                    placeholder="Выберите производителя" :options="options2" @change="onProducerChange">
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
                <div class="custom-label">Торговая марка</div>
                <el-select-v2 v-model="store.valueBrand_nameContract" clearable filterable style="width: 500px"
                    placeholder="Выберите торговую марку" :options="options3">
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
import { useKuIdStore } from "~~/stores/kuIdStore";
import { useKuAddStore } from "~~/stores/kuAddStore";
import type { IBrand } from "~/utils/types/brandTypes";
import type { IProducer } from "~/utils/types/producerTypes";

const store = useKuIdStore();
const store2 = useKuAddStore();
const tableData = ref(store.tableDataContract);

const isEditButtonDisabled = computed(() => {
  return store.kuIdStatus !== 'Создано';
});
//добавление строк
const addRow = async () => {
    if (store.valueProducer_nameContract || store.valueBrand_nameContract) {
        console.log("производитель", store.valueProducer_nameContract);
        console.log("марка", store.valueBrand_nameContract);

        // Используем сохраненное значение selectedCategoryName
        store.tableDataContract.push({
            producer_code: "",
            brand_code: "",
            use_producer: false,
            use_brand: false,
            producer_name: store.valueProducer_nameContract,
            brand_name: store.valueBrand_nameContract,
        });
        console.log("строка таблицы контркта", store.tableDataContract);

        store.dialogFormContractVisible = false;
        store.valueBrand_nameContract = "";
        store.valueProducer_nameContract = "";
        store2.setFilterBrand('producer_name', undefined);
        await store2.fetchAllProducersForInclided();
        await store2.fetchAllBrandsForIncluded();
    } else {
        ElMessage.error('Заполните минимум одно поле или нажмите "Отменить"');
    }
};
//удаление строк
const deleteRow = (index: number) => {
    store.tableDataContract.splice(index, 1);
}

const options2 = ref<Array<{ label: string; value: string }>>([]);
const options3 = ref<Array<{ label: string; value: string }>>([]);

watch(() => store2.producerIncluded, (producers: IProducer[]) => {
    const uniqueProducers = Array.from(new Set(producers.map(item => item.producer_name)));
    options2.value = uniqueProducers.map(label => ({ label, value: label }));
});

watch(() => store2.brandIncluded, (brands: IBrand[]) => {
    const uniqueBrands = Array.from(new Set(brands.map(item => item.brand_name)));
    options3.value = uniqueBrands.map(label => ({ label, value: label }));
});

const onProducerChange = async () => {
    store.valueBrand_nameContract = "";
    store2.setFilterBrand('producer_name', store.valueProducer_nameContract);
    if (store.valueProducer_nameContract) { // Проверка, что выбрана торговая маркка
        store2.fetchAllBrandsForIncluded();
    } else {
        store2.removeFilterBrand('producer_name'); // Сбросить фильтр
        store2.fetchAllBrandsForIncluded(); // Выполнить запрос без фильтра
    }
};
const FormContract = async () => {
    const newItem = {
        vendor_name: store.kuIdVendorId,
        ku_type: "Ретро-бонус",
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