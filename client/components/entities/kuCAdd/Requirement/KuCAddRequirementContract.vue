<template>
        <el-button size="small" type="primary" plain round
            @click="store.dialogFormContractVisible = true">Добавить</el-button>
        <el-button size="small" type="danger" plain round @click="store.tableDataContract.length = 0">Удалить
            все</el-button>
        <el-button size="small" type="success" plain round @click="FormContract()">Cформировать поле контакт</el-button>
    <div class="scrollTableRequirement">
        <el-table style="width: 100%; min-height:100px; height:30vh" height="30vh" :data="tableData" border
            empty-text="" >
            <el-table-column label="Услуга" align="center">
                <el-table-column property="service_code" label="Код" width="200" show-overflow-tooltip
                     />
                <el-table-column property="service_name" label="Наименование" width="500" />
            </el-table-column>
            <el-table-column label="Статья услуги" align="center">
                <el-table-column property="article_code" label="Код" width="200" show-overflow-tooltip />
                <el-table-column property="article_name" label="Наименование" width="500" />
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
        title="Выбор услуг для наименования контракта" close-on-click-modal
        close-on-press-escape draggable>
        <div class="selectCategory">
            <div>
                <div class="custom-label">Услуга</div>
                <el-select-v2 v-model="store.valueService_nameContract" clearable filterable style="width: 500px; "
                    placeholder="Выберите услугу" :options="optionsService">
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
                    placeholder="Выберите статью" :options="optionsArticle">
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
import type { IService, IArticle } from "~/utils/types/serviceTypes";

const store = useKuCAddStore();
const tableData = ref(store.tableDataContract);
//добавление строк

const addRow = async () => {
    if (store.valueService_nameContract || store.valueArticle_nameContract) {
        const selectedArticle = optionsArticle.value.find(option => option.value === store.valueArticle_nameContract);
        const articleName = selectedArticle ? selectedArticle.label : '';

        const selectedService = optionsService.value.find(option => option.value === store.valueService_nameContract);
        const serviceName = selectedService ? selectedService.label : '';

        // Используем наименование услуги и статьи услуги для сохранения
        store.tableDataContract.push({
            service_code: store.valueService_nameContract,
            service_name: serviceName,
            article_code: store.valueArticle_nameContract,
            article_name: articleName,
        });

        console.log("оказываемые услуги", store.tableDataServiceSelect);
        store.dialogFormContractVisible = false;
        store.valueService_nameContract = "";
        store.valueArticle_nameContract = "";
    } else {
        ElMessage.error('Заполните минимум одно поле или нажмите "Отменить"');
    }
};

//удаление строк
const deleteRow = (index: number) => {
    store.tableDataContract.splice(index, 1);
}
onMounted(async () => {
    try {
        await store.getServiceFromAPIWithFilter();
        await store.getArticleFromAPIWithFilter();
    } catch (error) {
        console.error("Ошибка при загрузке данных услуг", error);
    }
});
const optionsService = ref<Array<{ label: string; value: string }>>([]);
watch(() => store.tableDataServiceAll, (vendors: IService[]) => {
    optionsService.value = vendors.map(item => ({ label: item.service_name, value: item.service_code }));
});
const optionsArticle = ref<Array<{ label: string; value: string }>>([]);
watch(() => store.tableDataArticleAll, (vendors: IArticle[]) => {
    optionsArticle.value = vendors.map(item => ({ label: item.article_name, value: item.article_code }));
});

const FormContract = async () => {
    const newItem = {
        vendor_name: store.kuAddMain.newCustomerId,
        ku_type: "Услуга",
        provider_list: store.tableDataContract.map(item => item.service_code),
        brand_list: store.tableDataContract.map(item => item.article_code),
    }
    await store.createKuContract(newItem)
    store.tableDataContract.length = 0;
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