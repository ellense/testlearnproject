<template>
    <el-dialog v-model="store.dialogFormShopAndServiceVisible" title='Выбор магазинов и услуг' close-on-click-modal
        close-on-press-escape draggable style="width: 50%;">
        <div style="margin-top: 10px;">
            <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
                <el-tab-pane label="Услуги" name="first">
                    <el-scrollbar class="scrollTable">
                        <el-table :data="tableData" style="width: 100%" height="300px" v-loading="loading" border stripe
                            @selection-change="store.handleSelectionChangeArticle" ref="multipleTableRef">
                            <el-table-column property="selection" type="selection" width="30" show-overflow-tooltip />
                            <el-table-column label="Код статьи" prop="article_code" width="400" show-overflow-tooltip
                                sortable />
                            <el-table-column prop="article_name" label="Наименование статьи услуги"
                                show-overflow-tooltip sortable />
                        </el-table>
                    </el-scrollbar>
                    <div v-if="pagination?.count && pagination.count > countRowTable" class="pagination">
                        <el-pagination v-model:pageSize="pageSize" small :page-sizes="[50, 100, 300, 500]"
                            :page-count="Math.ceil(pagination.count / pageSize)"
                            layout="sizes, prev, pager, next, total" @size-change="handleSizeChange"
                            @current-change="paginationChange" :total="pagination.count" />
                    </div>
                </el-tab-pane>
                <el-tab-pane label="Магазины" name="second">
                    <el-scrollbar class="scrollTable">
                        <el-table :data="tableData2" style="width: 100%" height="300px" v-loading="loading" border
                            @selection-change="store.handleSelectionChangePlace" ref="multipleTableRef" stripe>
                            <el-table-column property="selection" type="selection" width="30" show-overflow-tooltip />
                            <el-table-column label="Код магазина" prop="shop_code" width="200" show-overflow-tooltip
                                sortable />
                            <el-table-column prop="shop_name" label="Наименование" width="300" show-overflow-tooltip
                                sortable />
                            <el-table-column prop="address" label="Адрес" show-overflow-tooltip sortable />
                        </el-table>
                    </el-scrollbar>
                    <div v-if="pagination?.count && pagination.count > countRowTable" class="pagination">
                        <el-pagination v-model:pageSize="pageSize" small :page-sizes="[50, 100, 300, 500]"
                            :page-count="Math.ceil(pagination.count / pageSize)"
                            layout="sizes, prev, pager, next, total" @size-change="handleSizeChange2"
                            @current-change="paginationChange2" :total="pagination.count" />
                    </div>
                </el-tab-pane>
            </el-tabs>
        </div>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="store.dialogFormShopAndServiceVisible = false">Отмена</el-button>
                <!-- <el-button @click="saveSelect()">Сохранить</el-button> -->
                <el-button @click="createAct()">Сформировать акт</el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script setup lang="ts">
import { ref, watch, onMounted } from 'vue'
import { storeToRefs } from "pinia";
import type { TabsPaneContext } from 'element-plus'
import { useGraphicСStore } from "~~/stores/graphicСStore";
import { useServiceStore } from "~~/stores/serviceStore";
import type { IArticle, IService } from "~/utils/types/serviceTypes";
import type { IPlace } from "~/utils/types/serviceTypes";

const store = useGraphicСStore()
const store2 = useServiceStore()

const activeName = ref('first')

const handleClick = (tab: TabsPaneContext, event: Event) => {
    console.log(tab, event)
}

const { getArticle, getPlace, pagination, countRowTable } = storeToRefs(store2);
const tableData = ref<IArticle[]>(getArticle.value);
const tableData2 = ref<IPlace[]>(getPlace.value);

const loading = ref()
const pageSize = ref(countRowTable);

const handleSizeChange = async (val: number) => {
    pageSize.value = val;
    store2.setCountRowTable(val);
    try {
        await store2.getServiceFromAPIWithFilter();
    } catch (error) {
        console.error("Ошибка при загрузке данных", error);
    }
};

const paginationChange = (page: number) => {
    try {
        store2.setFilterValueServices('page', page);
        store2.getServiceFromAPIWithFilter(page, store.sortProp, store.sortOrder);
    } catch (error) {
        console.error("Ошибка при загрузке данных", error);
    }
};
const handleSizeChange2 = async (val: number) => {
    pageSize.value = val;
    store2.setCountRowTable(val);
    try {
        await store2.getPlaceFromAPIWithFilter();
    } catch (error) {
        console.error("Ошибка при загрузке данных", error);
    }
};

const paginationChange2 = (page: number) => {
    try {
        store2.setFilterValuePlace('page', page);
        store2.getPlaceFromAPIWithFilter(page, store.sortProp, store.sortOrder);
    } catch (error) {
        console.error("Ошибка при загрузке данных", error);
    }
};
watch(getArticle, (value) => {
    tableData.value = value || [];
});
watch(getPlace, (value) => {
    tableData2.value = value || [];
});

onMounted(async () => {
    try {
        loading.value = true;
        await store2.getArticleFromAPIWithFilter();
        await store2.getPlaceFromAPIWithFilter();
        loading.value = false;
    } catch (error) {
        console.error("Ошибка при загрузке данных", error);
        loading.value = false;
    }
});

//для АКТА ОКАЗАНИЯ УСЛУГ
import Docxtemplater from "docxtemplater";
import PizZip from "pizzip";
import { dayjs } from "element-plus";
import PizZipUtils from "pizzip/utils/index.js";
import { saveAs } from "file-saver";

function loadFile(url: string, callback: (error: any, content: any) => void) {
    PizZipUtils.getBinaryContent(url, callback);
}


const createAct = async () => {
    try {
        const selectedRows = store.multipleSelectionGraphic.map((row) => row.graph_id);
        await store.getGraphicDetailFromApi(selectedRows[0]);
        const graphic = store.graphicId;
        await store.getKuDetailFromApi(graphic.ku);
        await store.getKuOfficialDetailFromApi(graphic.ku);
        await store.getCustomerDetailFromApi(store.kuId.customer);
        await store.getEntityDetailFromApi(store.kuId.entity);

        store2.setFilterValuePricelist("article_code", store.multipleSelectionArticle[0].article_code);
        await store2.getPricelistFromAPIWithFilter();
       

        if (!graphic) {
            console.error("Ошибка: данные графика не загружены");
            return;
        }

        // Проверка на наличие значения graphic.sum_bonus и данных прайс-листа
        const sum_approved = graphic.sum_approved ?? 0;
        const priceList = store2.tableDataPricelist;
        if (!priceList || priceList.length === 0 || !priceList[0].price) {
            ElMessage.error("Ошибка: данные прайс-листа не загружены или отсутствуют");
            return;
        }

        const price = priceList[0].price;
        const qty = sum_approved ? parseFloat((sum_approved / price).toFixed(2)) : 0;

        loadFile("/templates/templateOfActCustomer.docx", async (error, content) => {
            if (error) {
                throw error;
            }
            const zip = new PizZip(content);
            const doc = new Docxtemplater(zip, { paragraphLoop: true, linebreaks: true });
            doc.render({
                customer_name: store.customer[0].urastic_name,
                entity_name: store.entity[0].urastic_name,

                counterparty_post: store.official[0].counterparty_post,
                counterparty_name: store.official[0].counterparty_name,
                counterparty_docu: store.official[0].counterparty_docu,
                entity_post: store.official[0].entity_post,
                entity_fio: store.official[0].entity_name,
                entity_docu: store.official[0].entity_docu,

                date_start: dayjs(graphic.date_start).format('DD.MM.YYYY'),
                date_end: dayjs(graphic.date_end).format('DD.MM.YYYY'),
                date_accrual: dayjs(graphic.date_accrual).format('DD.MM.YYYY'),
                sum_approved: graphic.sum_approved,
                date_startKu: dayjs(store.kuId.date_start).format('DD.MM.YYYY'),
                date_endKu: dayjs(store.kuId.date_end).format('DD.MM.YYYY'),
                article_name: store.multipleSelectionArticle[0].article_name,
                sum_price: price,
                shop_name: store.multipleSelectionPlace[0].shop_name,

                address: store.multipleSelectionPlace[0].address,
                qty: qty
            });

            const out = doc.getZip().generate({
                type: "blob",
                mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
            });
            saveAs(out, "Приложение к договору по " + graphic.ku + " клиента " + store.customer[0].urastic_name + ".docx");
        });
        store.tableDataArticleSelect.length = 0
        store.tableDataPlaceSelect.length = 0

    } catch (error) {
        console.error("Произошла ошибка:", error);
    }
}; 

//https://docxtemplater.com/docs/tag-types/#creating-multiple-table-rows - динамически добавлять строки в таблицу






</script>

<style scoped></style>
