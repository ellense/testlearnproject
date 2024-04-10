import { defineStore } from "pinia";
import { useKuAddStore } from "~~/stores/kuAddStore";
import type {
    IProduct,
    IKuIdStore,
} from "~/utils/types/directoryTypes";

export const useKuIdStore = defineStore("KuIdStore", {
    state: (): IKuIdStore => ({
        tableDataInRequirement: [],
        tableDataInRequirementOrigin: [],
        tableDataExRequirement: [],
        tableDataExRequirementOrigin: [],
        tableDataPercent: [],
        tableDataPercentOrigin: [],
        tableDataExInvoiceAll: [],
        tableDataExInvoiceSelect: [],
        tableDataExInvoiceSelectOrigin: [],
        tableDataManagerSelect: [],
        tableDataManagerSelectOrigin: [],
        tableDataContract: [],
        //v-model диалоговых форм
        dialogFormExInvoiceVisible: false,
        dialogFormProductInVisible: false,
        dialogFormCategoryInVisible: false,
        dialogFormProductExVisible: false,
        dialogFormCategoryExVisible: false,
        dialogFormManagersVisible: false,
        //дизэйбл
        disableButtonsIncluded: false,
        //поиски
        searchProductIncluded: "",
        searchProductExcluded: "",
        //v-model атрибутов
        ku_id: "",
        kuIdStatus: "",
        kuIdType: "",
        kuIdEntityId: "",
        kuIdEntityName: "",
        kuIdVendorId: "",
        kuIdVendorName: "",
        kuIdDateStart: "",
        kuIdDateEnd: "",
        kuIdDateActual: "",
        kuIdDescription: "",
        kuIdContract: "",
        kuIdProduct_type: "",
        kuIdDocu_account: "",
        kuIdDocu_name: "",
        kuIdDocu_number: "",
        kuIdDocu_date: "",
        kuIdDocu_subject: "",
        kuIdTax: false,
        kuIdExclude_return: false,
        kuIdNegative_turnover: false,
        kuIdKu_type: "",
        kuIdPay_method: "",
        officialId: null,
        kuIdFIOСounteragent: "",
        kuIdPostСounteragent: "",
        kuIdDocСounteragent: "",
        kuIdFIOEntity: "",
        kuIdPostEntity: "",
        kuIdDocEntity: "",
        //пагинация в таблицах
        pagination: null,
        countRowTable: 100,
        //
        multipleSelectionProduct: [],
        multipleSelectionExInvoice: [],
        multipleSelectionManager: [],
        multipleTableRef: null,
        filterVendorValue: {},

    }),

    getters: {
        getKuInRequirement: (state) => state.tableDataInRequirement,
        getKuExRequirement: (state) => state.tableDataExRequirement,
        getPercent: (state) => state.tableDataPercent,
        getIExInvoiceForKu: (state) => state.tableDataExInvoiceSelect,

    },

    actions: {

        setKuIdVendorName(name: string) {
            this.kuIdVendorName = name;
        },
        handleSelectionChangeProduct(val: IProduct[]) {
            this.multipleSelectionProduct = val;
        },
        //получение ku_id
        async getKuDetailFromApi(kuId: string) {
            try {
                const results = await KU.getInfoKu({
                    ku_id: kuId,
                });
                this.$state.ku_id = results.ku_id;
                this.$state.kuIdStatus = results.status;
                this.$state.kuIdType = results.period;
                this.$state.kuIdEntityId = results.entity_id
                this.$state.kuIdEntityName = results.entity_name
                this.$state.kuIdVendorId = results.vendor_id
                this.$state.kuIdVendorName = results.vendor_name
                this.$state.kuIdDateStart = results.date_start;
                this.$state.kuIdDateEnd = new Date(results.date_end);
                this.$state.kuIdDescription = results.description;
                this.$state.kuIdContract = results.contract;
                this.$state.kuIdProduct_type = results.product_type;
                this.$state.kuIdDocu_account = results.docu_account;
                this.$state.kuIdDocu_name = results.docu_name;
                this.$state.kuIdDocu_number = results.docu_number;
                this.$state.kuIdDocu_date = new Date(results.docu_date)
                this.$state.kuIdDocu_subject = results.docu_subject;
                this.$state.kuIdTax = results.tax;
                this.$state.kuIdExclude_return = results.exclude_return;
                this.$state.kuIdNegative_turnover = results.negative_turnover;
                this.$state.kuIdKu_type = results.ku_type;
                this.$state.kuIdPay_method = results.pay_method;

                console.log("успешно получили данные ку_айди", results);
            } catch (error) {
                console.error("Ошибка при получении данных ку_айди:", error);
            }
        },
        async performSearchProductIn(searchQuery: string) {
            try {
                this.setSearchProductIn(searchQuery);
                await useKuAddStore().getProductFromIncludedWithFilter();
            } catch (error) {
                console.error('Ошибка при выполнении поиска в вкл товарах ку_айди', error);
            }
        },
        setSearchProductIn(query: string) {
            this.$state.searchProductIncluded = query;
        },
        async performSearchProductEx(searchQuery: string) {
            try {
                this.setSearchProductEx(searchQuery);
                await useKuAddStore().getProductFromIncludedWithFilter();
            } catch (error) {
                console.error('Ошибка при выполнении поиска в искл товарах ку_айди', error);
            }
        },
        setSearchProductEx(query: string) {
            this.$state.searchProductExcluded = query;
        },
        async fetchInRequirementForKuId(ku_id?: string, page?: number) {
            await KU.getKuInRequirements({
                ku_id, page_size: this.$state.countRowTable,
                page,
            })
                .then((tableData) => {
                    console.log('Получены данные вкл условий ку_айди:', tableData);
                    this.$state.tableDataInRequirement = tableData.results;
                    this.$state.tableDataInRequirementOrigin = this.$state.tableDataInRequirement.slice();
                    console.log('tableDataInRequirement:', this.$state.tableDataInRequirement);
                    console.log('tableDataInRequirementOrigin:', this.$state.tableDataInRequirementOrigin);
                    this.$state.pagination = {
                        count: tableData.count,
                        previous: tableData.previous,
                        next: tableData.next,
                    };
                })
                .catch((error) => {
                    console.error('Ошибка при получении данных вкл условий ку_айди:', error);
                    return Promise.reject(error);
                });
        },
        async fetchExRequirementForKuId(ku_id?: string, page?: number) {
            await KU.getKuExRequirements({
                ku_id, page_size: this.$state.countRowTable,
                page,
            })
                .then((tableData) => {
                    console.log('Получены данные искл условий ку_айди:', tableData);
                    this.$state.tableDataExRequirement = tableData.results;
                    this.$state.tableDataExRequirementOrigin = this.$state.tableDataExRequirement.slice();
                    console.log('tableDataExRequirement:', this.$state.tableDataExRequirement);
                    console.log('tableDataExRequirementOrigin:', this.$state.tableDataExRequirementOrigin);
                    this.$state.pagination = {
                        count: tableData.count,
                        previous: tableData.previous,
                        next: tableData.next,
                    };
                })
                .catch((error) => {
                    console.error('Ошибка при получении данных искл условий ку_айди:', error);
                    return Promise.reject(error);
                });
        },
        //получение бонуса ku_id
        async fetchBonusForKuId(ku_id?: string, page?: number) {
            await KU.getKuRequirementBonus({
                ku_id, page_size: this.$state.countRowTable,
                page,
            })
                .then((tableData) => {
                    console.log('Получены данные бонуса ку_айди:', tableData);
                    this.$state.tableDataPercent = tableData.results;
                    this.$state.tableDataPercentOrigin = this.$state.tableDataPercent.slice();
                    console.log('tableDataPercent:', this.$state.tableDataPercent);
                    console.log('tableDataPercentOrigin:', this.$state.tableDataPercentOrigin);
                    this.$state.pagination = {
                        count: tableData.count,
                        previous: tableData.previous,
                        next: tableData.next,
                    };
                })
                .catch((error) => {
                    console.error('Ошибка при получении данных бонуса ку_айди:', error);
                    return Promise.reject(error);
                });
        },
        //получение искл. накладных ku_id
        async fetchExInvoiceForKuId(ku_id?: string, page?: number) {
            await KU.getKuExInvoiceForKuId({
                ku_id, page_size: this.$state.countRowTable,
                page,
            })
                .then((tableData) => {
                    console.log('Получены данные искл накладных ку_айди:', tableData);
                    this.$state.tableDataExInvoiceSelect = tableData.results;
                    this.$state.tableDataExInvoiceSelectOrigin = this.$state.tableDataExInvoiceSelect.slice();
                    console.log('tableDataExInvoiceSelect:', this.$state.tableDataExInvoiceSelect);
                    console.log('tableDataExInvoiceSelectOrigin:', this.$state.tableDataExInvoiceSelectOrigin);
                    this.$state.pagination = {
                        count: tableData.count,
                        previous: tableData.previous,
                        next: tableData.next,
                    };
                })
                .catch((error) => {
                    console.error('Ошибка при получении данных искл накладных ку_айди:', error);
                    return Promise.reject(error);
                });
        },
        //получение долж. лиц ku_id
        async fetchOfficialForKuId(ku_id?: string, page?: number) {
            await KU.getKuOfficial({
                ku_id, page_size: this.$state.countRowTable,
                page,
            })
                .then((tableData) => {
                    console.log('Получены данные долж. лиц ку_айди:', tableData);
                    this.$state.officialId = tableData.results[0].id;
                    this.$state.kuIdFIOСounteragent = tableData.results[0].counterparty_name;
                    this.$state.kuIdPostСounteragent = tableData.results[0].counterparty_post;
                    this.$state.kuIdDocСounteragent = tableData.results[0].counterparty_docu;
                    this.$state.kuIdFIOEntity = tableData.results[0].entity_name;
                    this.$state.kuIdPostEntity = tableData.results[0].entity_post;
                    this.$state.kuIdDocEntity = tableData.results[0].entity_docu;
                    this.$state.pagination = {
                        count: tableData.count,
                        previous: tableData.previous,
                        next: tableData.next,
                    };
                })
                .catch((error) => {
                    console.error('Ошибка при получении данных долж. лиц ку_айди:', error);
                    return Promise.reject(error);
                });
        },
        clearData() {
            // Очищаем таблицу условий
            this.tableDataInRequirement.length = 0;
            this.tableDataInRequirementOrigin.length = 0;
            this.tableDataExRequirement.length = 0;
            this.tableDataPercent.length = 0;
            this.tableDataExInvoiceSelect.length = 0;
            this.tableDataManagerSelect.length = 0;
            this.tableDataContract.length = 0;
            // Сбрасываем флаги видимости диалоговых окон
            this.dialogFormExInvoiceVisible = false;
            this.dialogFormProductInVisible = false;
            this.dialogFormCategoryInVisible = false;
            this.dialogFormProductExVisible = false;
            this.dialogFormCategoryExVisible = false;
            this.dialogFormManagersVisible = false;
            // Сбрасываем флаги дизейбла кнопок
            this.disableButtonsIncluded = false;

            // Сбрасываем значения поисковых строк
            this.searchProductIncluded = '';
            this.searchProductExcluded = '';

            // Сбрасываем значения в моделях данных
            this.ku_id = '';
            this.kuIdStatus = '';
            this.kuIdType = '';
            this.kuIdEntityId = '';
            this.kuIdEntityName = '';
            this.kuIdVendorId = '';
            this.kuIdVendorName = '';
            this.kuIdDateStart = '';
            this.kuIdDateEnd = '';
            this.kuIdDateActual = '';
            this.kuIdDescription = '';
            this.kuIdContract = '';
            this.kuIdProduct_type = '';
            this.kuIdDocu_account = '';
            this.kuIdDocu_name = '';
            this.kuIdDocu_number = '';
            this.kuIdDocu_date = '';
            this.kuIdDocu_subject = '';
            this.kuIdTax = false;
            this.kuIdExclude_return = false;
            this.kuIdNegative_turnover = false;
            this.kuIdKu_type = '';
            this.kuIdPay_method = '';
            this.kuIdFIOСounteragent = '';
            this.kuIdPostСounteragent = '';
            this.kuIdDocСounteragent = '';
            this.kuIdFIOEntity = '';
            this.kuIdPostEntity = '';
            this.kuIdDocEntity = '';

            this.multipleSelectionProduct = [];
            this.multipleSelectionExInvoice = [];
            this.multipleSelectionManager = [];
            this.multipleTableRef = null;
        }
    },

})


