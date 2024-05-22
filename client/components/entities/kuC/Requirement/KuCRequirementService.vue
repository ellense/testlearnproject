<template>
    <el-button size="small" type="primary" plain round
        @click="store.dialogFormService = true" :disabled="isEditButtonDisabled">Добавить</el-button>
    <el-button size="small" type="danger" plain round @click="store.tableDataServiceSelect.length = 0" :disabled="isEditButtonDisabled">Удалить
        все</el-button>
    <div class="scrollTableRequirement">
        <el-table :data="tableData2" border style="width: 100%; height:30vh" height="30vh" empty-text="Добавьте услуги">
            <el-table-column label="Услуга" align="center">
                <el-table-column property="service_code" label="Код" width="200" show-overflow-tooltip />
                <el-table-column property="service_name" label="Наименование" width="400" show-overflow-tooltip />
            </el-table-column>
            <el-table-column label="Статья услуги" align="center">
                <el-table-column property="article_code" label="Код" width="200" show-overflow-tooltip />
                <el-table-column property="article_name" label="Наименование" width="550" show-overflow-tooltip />
            </el-table-column>
            <el-table-column prop="ratio" label="Коэффициент" width="150" />
            <el-table-column align="center" label="Операция">
                <template #default="scope">
                    <el-button text type="danger" :icon="Delete" size="small"
                        @click.prevent="deleteRow(scope.$index)" :disabled="isEditButtonDisabled">Удалить</el-button>
                </template>
            </el-table-column>
        </el-table>
    </div>
    <el-dialog v-model="store.dialogFormService" title="Выбор оказываемых услуг" close-on-click-modal
        close-on-press-escape draggable width="715px">
        <el-scrollbar class="scrollTableFiltres">
            <el-form>
                <el-form-item label-width="130" label="Услуга">
                    <el-select v-model="store.valueService_name" size="small" placeholder="Выберите услугу" clearable
                        filterable style="width: 300px">
                        <el-option v-for="item in optionsService" :key="item.value" :label="item.label" :value="item.value">
                            <span style="float: left;">{{ item.label }}</span>
                            <span style="float: right; color: var(--el-text-color-secondary);
                    font-size: 13px;  margin-left: 10px;">{{ item.value }}</span>
                        </el-option>
                        <template #footer>
                            <el-button v-if="!isAddingService" text bg size="small" @click="onAddServiceOption">
                                Добавить
                            </el-button>
                            <template v-else>
                                <el-input v-model="optionServiceId" class="option-input" placeholder="Введите код услуги"
                                    size="small" />
                                <el-input v-model="optionServiceName" class="option-input"
                                    placeholder="Введите наименование услуги" size="small" />
                                <el-button type="primary" size="small" @click="onConfirmService">
                                    Сохранить
                                </el-button>
                                <el-button size="small" @click="clearService">Отменить</el-button>
                            </template>
                        </template>
                    </el-select>
                </el-form-item>
                <el-form-item label-width="130" label="Статья услуги">
                    <el-select v-model="store.valueArticle_name" size="small" placeholder="Выберите статью" clearable
                        filterable style="width: 300px">
                        <el-option v-for="item in optionsArticle" :key="item.value" :label="item.label" :value="item.value">
                            <span style="float: left;">{{ item.label }}</span>
                            <span style="float: right; color: var(--el-text-color-secondary);
                    font-size: 13px;  margin-left: 10px;">{{ item.value }}</span>
                        </el-option>
                        <template #footer>
                            <el-button v-if="!isAddingArticle" text bg size="small" @click="onAddArticleOption">
                                Добавить
                            </el-button>
                            <template v-else>
                                <el-input v-model="optionArticleId" class="option-input" placeholder="Введите код статьи услуги"
                                    size="small" />
                                <el-input v-model="optionArticleName" class="option-input"
                                    placeholder="Введите наименование статьи услуги" size="small" />
                                <el-button type="primary" size="small" @click="onConfirmArticle">
                                    Сохранить
                                </el-button>
                                <el-button size="small" @click="clearArticle">Отменить</el-button>
                            </template>
                        </template>
                    </el-select>
                </el-form-item>
                <el-form-item label-width="130" label="Коэффициент">
                    <el-input v-model="store.valueRatio" size="small" clearable placeholder="Введите коэффициент"
                        style="width: 300px">
                    </el-input>
                </el-form-item>
            </el-form>
        </el-scrollbar>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="store.dialogFormService = false">Отмена</el-button>
                <el-button @click="saveRow()">Сохранить</el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script setup lang="ts">
import { useKuCAddStore } from "~~/stores/kuCAddStore";
import { useKuCIdStore } from "~~/stores/kuCIdStore";
import { ElTable } from 'element-plus'
import { Delete } from '@element-plus/icons-vue'
import type { IService, IArticle } from "~/utils/types/serviceTypes";

const store = useKuCIdStore();
const store2 = useKuCAddStore();

const isEditButtonDisabled = computed(() => {
  return store.kuIdStatus !== 'Создано';
});

const tableData2 = ref(store.tableDataServiceSelect);

onMounted(async () => {
    try {
        await store2.getServiceFromAPIWithFilter();
        await store2.getArticleFromAPIWithFilter();
    } catch (error) {
        console.error("Ошибка при загрузке данных услуг", error);
    }
});
const optionsService = ref<Array<{id: number | null; label: string; value: string }>>([]);
watch(() => store2.tableDataServiceAll, (vendors: IService[]) => {
    optionsService.value = vendors.map(item => ({ id: item.id, label: item.service_name, value: item.service_code }));
});
const optionsArticle = ref<Array<{id: number | null; label: string; value: string }>>([]);
watch(() => store2.tableDataArticleAll, (vendors: IArticle[]) => {
    optionsArticle.value = vendors.map(item => ({ id: item.id, label: item.article_name, value: item.article_code }));
});

const isAddingService = ref(false)
const optionServiceId = ref('')
const optionServiceName = ref('')

const onAddServiceOption = () => {
    isAddingService.value = true
}

const onConfirmService = async () => {
    if (optionServiceName.value || optionServiceId.value) {
        optionsService.value.push({
            id: null,
            label: optionServiceName.value,
            value: optionServiceId.value,
        })
        const data = {
            service_code: optionServiceId.value,
            service_name: optionServiceName.value,
        };

        try {
            const response = await SERVICE.postServices(data);
            console.log("услуга успешно отправлена:", response);
            await store2.getServiceFromAPIWithFilter();
        } catch (error) {
            console.error("Ошибка при добавлении услуг на сервер", error);
        }
        clearService()
    }
}

const clearService = () => {
    optionServiceId.value = ''
    optionServiceName.value = ''
    isAddingService.value = false
}

const isAddingArticle = ref(false)
const optionArticleId = ref('')
const optionArticleName = ref('')

const onAddArticleOption = () => {
    isAddingArticle.value = true
}

const onConfirmArticle = async () => {
    if (optionArticleName.value || optionArticleId.value) {
        optionsArticle.value.push({
            id: null,
            label: optionArticleName.value,
            value: optionArticleId.value,
        })
        const data = {
            article_code: optionArticleId.value,
            article_name: optionArticleName.value,
        };

        try {
            const response = await SERVICE.postArticles(data);
            console.log("статья услуги успешно отправлена:", response);
            await store2.getArticleFromAPIWithFilter();
        } catch (error) {
            console.error("Ошибка при добавлении статьи услуги на сервер", error);
        }
        clearArticle()
    }
}

const clearArticle = () => {
    optionArticleId.value = ''
    optionArticleName.value = ''
    isAddingArticle.value = false
}
//добавление услуг
const saveRow = async () => {
    if (store.valueService_name || store.valueArticle_name || store.valueRatio) {
        // Находим объект с соответствующим значением article_code в options2
        const selectedArticle = optionsArticle.value.find(option => option.value === store.valueArticle_name);
        // Получаем наименование статьи услуги из найденного объекта
        const articleName = selectedArticle ? selectedArticle.label : '';

        const selectedService = optionsService.value.find(option => option.value === store.valueService_name);
        const serviceName = selectedService ? selectedService.label : '';

        const selectedArticleId = optionsArticle.value.find(option => option.value === store.valueArticle_name);
        const articleId = selectedArticleId ? selectedArticleId.id : null;

        const selectedServiceId = optionsService.value.find(option => option.value === store.valueService_name);
        const serviceId = selectedServiceId ? selectedServiceId.id : null;


        console.log("valueService_id", store.valueService_name);
        console.log("valueArticle_id", store.valueArticle_name);
        console.log("valueRatio", store.valueRatio);

        // Используем наименование услуги и статьи услуги для сохранения
        store.tableDataServiceSelect.push({
            id: null,
            service_code: store.valueService_name,
            service: serviceId,
            service_name: serviceName,
            article: articleId,
            article_code: store.valueArticle_name,
            article_name: articleName,
            ratio: store.valueRatio,
        });

        console.log("оказываемые услуги", store.tableDataServiceSelect);
        store.dialogFormService = false;
        store.valueRatio = null;
        store.valueService_name = "";
        store.valueArticle_name = "";
    } else {
        ElMessage.error('Заполните минимум одно поле или нажмите "Отменить"');
    }
};


//удаление менеджеров
const deleteRow = (index: number) => {
    store.tableDataServiceSelect.splice(index, 1);
}

</script>

<style scoped>
.el-scrollbar__view {
    width: 740px;
}

.option-input {
    width: 100%;
    margin-bottom: 8px;
}
</style>