<template>
    <el-dialog v-model="store.dialogFormShopAndServiceVisible" title='Выбор магазинов и услуг' close-on-click-modal
        close-on-press-escape draggable style="width: 20%;">
        <div style="margin-top: 10px;  height: 35vh;">
            <el-tabs v-model="activeName" class="demo-tabs" @tab-click="handleClick">
                <el-tab-pane label="Услуги" name="first">
                    <el-scrollbar class="scrollTable">
                        <el-table :data="tableData" style="width: 100%" height="calc(100vh - 130px)" v-loading="loading"
                            border stripe @selection-change="store.handleSelectionChangeService" ref="multipleTableRef">
                            <el-table-column property="selection" type="selection" width="55" show-overflow-tooltip />
                            <el-table-column label="Код услуги" prop="service_code" width="400" show-overflow-tooltip
                                sortable />
                            <el-table-column prop="service_name" label="Наименование  услуги" show-overflow-tooltip
                                sortable />
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
                        <el-table :data="tableData" style="width: 100%" height="calc(100vh - 130px)" v-loading="loading"
                            border @sort-change="handleSortChange" stripe>
                            <el-table-column property="selection" type="selection" width="55" show-overflow-tooltip />
                            <el-table-column label="Код магазина" prop="shop_code" width="300" show-overflow-tooltip
                                sortable />
                            <el-table-column prop="shop_name" label="Наименование" width="500" show-overflow-tooltip
                                sortable />
                            <el-table-column prop="address" label="Адрес" show-overflow-tooltip sortable />
                            <el-table-column label="Операция" align="center" width="200">
                                <template #default="scope">
                                    <el-button text type="danger" :icon="Delete" size="small"
                                        @click.prevent="deleteRow(scope.$index)">Удалить</el-button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </el-scrollbar>
                    <div v-if="pagination?.count && pagination.count > countRowTable" class="pagination">
                        <el-pagination v-model:pageSize="pageSize" small :page-sizes="[50, 100, 300, 500]"
                            :page-count="Math.ceil(pagination.count / pageSize)"
                            layout="sizes, prev, pager, next, total" @size-change="handleSizeChange"
                            @current-change="paginationChange" :total="pagination.count" />
                    </div>
                </el-tab-pane>
            </el-tabs>
        </div>
        <template #footer>
            <span class="dialog-footer">
                <el-button @click="store.dialogFormShopAndServiceVisible = false">Отмена</el-button>
                <el-button @click="createAct()">Сформировать акт</el-button>
            </span>
        </template>
    </el-dialog>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { storeToRefs } from "pinia";
import type { TabsPaneContext } from 'element-plus'
import { useGraphicСStore } from "~~/stores/graphicСStore";
import { useServiceStore } from "~~/stores/serviceStore";
import type { IService } from "~/utils/types/serviceTypes";
const store = useGraphicСStore()
const store2 = useServiceStore()

const activeName = ref('first')

const handleClick = (tab: TabsPaneContext, event: Event) => {
    console.log(tab, event)
}

const { getService, pagination, countRowTable } = storeToRefs(store2);
const tableData = ref<IService[]>(getService.value);

const loading = ref()
const pageSize = ref(countRowTable);

const handleSizeChange = async (val: number) => {
    pageSize.value = val;
    store.setCountRowTable(val);
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
watch(getService, (value) => {
    tableData.value = value || [];
});

onMounted(async () => {
    try {
        loading.value = true;
        await store2.getServiceFromAPIWithFilter();
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
    //   try {
    //     const selectedRows = store.multipleSelectionGraphic.map((row) => row.graph_id);
    //     console.log("selectedRows[0]:", selectedRows[0])
    //     await useReportStore().getGraphicDetailFromApi(selectedRows[0]);
    //     await useReportStore().getNumeralsGraphFromApi(selectedRows[0]);
    //     console.log("useReportStore().graphic[0].ku_id", useReportStore().graphic[0].ku_id)
    //     await useReportStore().getKuOfficialDetailFromApi(useReportStore().graphic[0].ku_id)
    //     // await useReportStore().getKuOfficialDetailFromApi(useReportStore().kuid)
    //     await useReportStore().getVendorDetailFromApi(useReportStore().vendorid)
    //     await useReportStore().getEntityDetailFromApi(useReportStore().entityid)
    //     console.log("inn_kpp", useReportStore().vendor.inn_kpp,)
    //     console.log("urastic_adress2", useReportStore().entity.urastic_address,)
    //     console.log("bank_bik2", useReportStore().entity.bank_bink,)
    //     const graphic = useReportStore().graphic[0];
    //     if (!graphic) {
    //       console.error("Ошибка: данные не загружены");
    //       return;
    //     }
    //     if (useReportStore().vendor && useReportStore().entity) {
    //       console.log("inn_kpp", useReportStore().vendor.inn_kpp);
    //       console.log("urastic_adress2", useReportStore().entity.urastic_address);
    //       console.log("bank_bik2", useReportStore().entity.bank_bink);
    //       loadFile("/templates/templateOfAct.docx", async (error, content) => {
    //         if (error) {
    //           throw error;
    //         }
    //         const zip = new PizZip(content);
    //         const doc = new Docxtemplater(zip, { paragraphLoop: true, linebreaks: true });
    //         doc.render({
    //           vendor_name: useReportStore().vendor.urastic_name,
    //           counterparty_post: useReportStore().official[0].counterparty_post,
    //           counterparty_name: useReportStore().official[0].counterparty_name,
    //           counterparty_docu: useReportStore().official[0].counterparty_docu,
    //           entity_name: useReportStore().entity.urastic_name,
    //           entity_post: useReportStore().official[0].entity_post,
    //           entity_fio: useReportStore().official[0].entity_name,
    //           entity_docu: useReportStore().official[0].entity_docu,

    //           date_start: dayjs(useReportStore().graphic[0].date_start).format('DD.MM.YYYY'),
    //           date_end: dayjs(useReportStore().graphic[0].date_end).format('DD.MM.YYYY'),
    //           sum_calc: useReportStore().graphic[0].sum_calc,
    //           percent: useReportStore().graphic[0].percent,
    //           sum_bonus: useReportStore().graphic[0].sum_bonus,

    //           inn_kpp: useReportStore().vendor.inn_kpp,
    //           urastic_adress: useReportStore().vendor.urastic_adress,
    //           account: useReportStore().vendor.account,
    //           bank_name: useReportStore().vendor.bank_name,
    //           bank_bik: useReportStore().vendor.bank_bik,
    //           corr_account: useReportStore().vendor.corr_account,

    //           inn_kpp2: useReportStore().entity.inn_kpp,
    //           urastic_adress2: useReportStore().entity.urastic_address,
    //           account2: useReportStore().entity.account,
    //           bank_name2: useReportStore().entity.bank_name,
    //           bank_bik2: useReportStore().entity.bank_bink,
    //           corr_account2: useReportStore().entity.corr_account,

    //           numerals: useReportStore().numerals,
    //           sumQty: useReportStore().sumQty
    //         });

    //         const out = doc.getZip().generate({
    //           type: "blob",
    //           mimeType: "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
    //         });
    //         saveAs(out, "Акт предоставления вознаграждения по " + useReportStore().kuid + " поставщика " + useReportStore().vendor.urastic_name + ".docx");
    //       });
    //     } else {
    //       console.log("Данные вендора или энтити ещё не загружены");
    //     }
    //   } catch (error) {
    //     console.error("Произошла ошибка:", error);
    //   }
};
</script>

<style scoped></style>