import { defineStore } from "pinia";
import { useKuAddStore } from "~~/stores/kuAddStore";
import _ from 'lodash';
import type { IKuIdStore } from "~/utils/types/storesTypes";
import type {  IContractPost } from "~/utils/types/tabsKuTypes";

export const useKuIdStore = defineStore("KuIdStore", {
    state: (): IKuIdStore => ({
        tableDataInRequirement: [],
        tableDataExRequirement: [],
        tableDataPercent: [],
        tableDataVAC: [],
        tableDataExInvoiceSelect: [],
        tableDataManagerSelect: [],
        tableDataContract: [],
        //v-model диалоговых форм
        dialogFormExInvoiceVisible: false,
        dialogFormProductInVisible: false,
        dialogFormCategoryInVisible: false,
        dialogFormProductExVisible: false,
        dialogFormCategoryExVisible: false,
        dialogFormManagersVisible: false,
        dialogFormContractVisible: false,
        dialogFormVACVisible: false,
        //дизэйбл
        disableButtonsIncluded: false,
        disableSubsidiaries: false,
        //поиски
        searchProductIncluded: "",
        searchProductExcluded: "",
        //v-model атрибутов
        ku_id: "",
        kuIdStatus: "",
        kuIdType: "",
        kuIdEntityId: "",
        kuIdEntityName: "",
        kuIdSubsidiaries: false,
        kuIdVendorId: "",
        kuIdVendorName: "",
        kuIdDateStart: "",
        kuIdDateEnd: "",
        kuIdDateActual: "",
        kuIdDescription: "",
        kuIdContract: "",
        kuIdProduct_type: "",
        kuIdDocu_account: "",
        kuIdDocu_number: "",
        kuIdDocu_date: "",
        kuIdDocu_subject: "",
        kuIdTax: false,
        kuIdExclude_return: false,
        kuIdNegative_turnover: false,
        kuIdPay_method: "",
        officialId: null,
        kuIdEntityIdVAC: "",
        kuIdVendorIdVAC: "",
        kuIdFIOСounteragent: "",
        kuIdPostСounteragent: "",
        kuIdDocСounteragent: "",
        kuIdFIOEntity: "",
        kuIdPostEntity: "",
        kuIdDocEntity: "",
        kuIdVendorIdExInvoice: "",
        kuIdVendorNameExInvoice: "",
        valueProducer_nameContract: "",
        valueBrand_nameContract: "",
        initialState: {
            kuIdStatus: "",
            kuIdType: "",
            kuIdEntityId: "",
            kuIdEntityName: "",
            kuIdSubsidiaries: false,
            kuIdVendorId: "",
            kuIdVendorName: "",
            kuIdDateStart: "",
            kuIdDateEnd: "",
            kuIdDateActual: "",
            kuIdDescription: "",
            kuIdContract: "",
            kuIdProduct_type: "",
            kuIdDocu_account: "",
            kuIdDocu_number: "",
            kuIdDocu_date: "",
            kuIdDocu_subject: "",
            kuIdTax: false,
            kuIdExclude_return: false,
            kuIdNegative_turnover: false,
            kuIdPay_method: "",
            officialId: null,
            kuIdEntityIdVAC: "",
            kuIdVendorIdVAC: "",
            kuIdFIOСounteragent: "",
            kuIdPostСounteragent: "",
            kuIdDocСounteragent: "",
            kuIdFIOEntity: "",
            kuIdPostEntity: "",
            kuIdDocEntity: "",
            kuIdVendorIdExInvoice: "",
            kuIdVendorNameExInvoice: "",
            valueProducer_nameContract: "",
            valueBrand_nameContract: "",
            tableDataInRequirement: [],
            tableDataExRequirement: [],
            tableDataPercent: [],
            tableDataVAC: [],
            tableDataExInvoiceSelect: [],
            tableDataManagerSelect: [],
            tableDataContract: [],
        },
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
        getVAC: (state) => state.tableDataVAC,
        getIExInvoiceForKu: (state) => state.tableDataExInvoiceSelect,
        getManagerForKu: (state) => state.tableDataManagerSelect,
    },

    actions: {

        setKuIdVendorName(name: string) {
            this.kuIdVendorName = name;
        },

        setKuIdCustomerCode(code: string) {
            this.kuIdDocu_account = code;
        },

        //получение ku_id
        async getKuDetail_API(kuId: string) {
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
                this.$state.kuIdDocu_number = results.docu_number;
                this.$state.kuIdDocu_date = new Date(results.docu_date)
                this.$state.kuIdDocu_subject = results.docu_subject;
                this.$state.kuIdTax = results.tax;
                this.$state.kuIdExclude_return = results.exclude_return;
                this.$state.kuIdNegative_turnover = results.negative_turnover;
                this.$state.kuIdPay_method = results.pay_method;

                this.$state.initialState.kuIdStatus = results.status;
                this.$state.initialState.kuIdType = results.period;
                this.$state.initialState.kuIdEntityId = results.entity_id
                this.$state.initialState.kuIdEntityName = results.entity_name
                this.$state.initialState.kuIdVendorId = results.vendor_id
                this.$state.initialState.kuIdVendorName = results.vendor_name
                this.$state.initialState.kuIdDateStart = results.date_start;
                this.$state.initialState.kuIdDateEnd = new Date(results.date_end);
                this.$state.initialState.kuIdDescription = results.description;
                this.$state.initialState.kuIdContract = results.contract;
                this.$state.initialState.kuIdProduct_type = results.product_type;
                this.$state.initialState.kuIdDocu_account = results.docu_account;
                this.$state.initialState.kuIdDocu_number = results.docu_number;
                this.$state.initialState.kuIdDocu_date = new Date(results.docu_date)
                this.$state.initialState.kuIdDocu_subject = results.docu_subject;
                this.$state.initialState.kuIdTax = results.tax;
                this.$state.initialState.kuIdExclude_return = results.exclude_return;
                this.$state.initialState.kuIdNegative_turnover = results.negative_turnover;
                this.$state.initialState.kuIdPay_method = results.pay_method;

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
        async getInRequirementForKuId_API(ku_id?: string, page?: number) {
            await KU.getKuInRequirements({
                ku_id, page_size: this.$state.countRowTable,
                page,
            })
                .then((tableData) => {
                    console.log('Получены данные вкл условий ку_айди:', tableData);
                    this.$state.tableDataInRequirement = tableData.results;
                    this.$state.initialState.tableDataInRequirement = this.$state.tableDataInRequirement.slice();
                    console.log('initialState.tableDataInRequirement:', this.$state.initialState.tableDataInRequirement);
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

        async getExRequirementForKuId_API(ku_id?: string, page?: number) {
            await KU.getKuExRequirements({
                ku_id, page_size: this.$state.countRowTable,
                page,
            })
                .then((tableData) => {
                    console.log('Получены данные искл условий ку_айди:', tableData);
                    this.$state.tableDataExRequirement = tableData.results;
                    this.$state.initialState.tableDataExRequirement = this.$state.tableDataExRequirement.slice();
                    console.log('initialState.tableDataExRequirement:', this.$state.initialState.tableDataExRequirement);
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
        async getBonusForKuId_API(ku_id?: string, page?: number) {
            await KU.getKuRequirementBonus({
                ku_id, page_size: this.$state.countRowTable,
                page,
            })
                .then((tableData) => {
                    console.log('Получены данные бонуса ку_айди:', tableData);
                    this.$state.tableDataPercent = tableData.results;
                    this.$state.initialState.tableDataPercent = this.$state.tableDataPercent.slice();
                    console.log('initialState.tableDataPercent:', this.$state.tableDataPercent);
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

        //получение поставщиков и договоров ku_id
        async getVACForKuId_API(ku_id?: string, page?: number) {
            await KU.getKuVAC({
                ku_id, page_size: this.$state.countRowTable,
                page,
            })
                .then((tableData) => {
                    console.log('Получены данные поставщиков и договоров ку_айди:', tableData);
                    this.$state.tableDataVAC = tableData.results;
                    this.$state.initialState.tableDataVAC = this.$state.tableDataVAC.slice();
                    console.log('initialState.tableDataPercent:', this.$state.tableDataVAC);
                    this.$state.pagination = {
                        count: tableData.count,
                        previous: tableData.previous,
                        next: tableData.next,
                    };
                })
                .catch((error) => {
                    console.error('Ошибка при получении данных поставщиков и договоров ку_айди:', error);
                    return Promise.reject(error);
                });
        },

        //получение искл. накладных ku_id
        async getExInvoiceForKuId_API(ku_id?: string, page?: number) {
            await KU.getKuExInvoiceForKuId({
                ku_id, page_size: this.$state.countRowTable,
                page,
            })
                .then((tableData) => {
                    console.log('Получены данные искл накладных ку_айди:', tableData);
                    this.$state.tableDataExInvoiceSelect = tableData.results;
                    this.$state.initialState.tableDataExInvoiceSelect = this.$state.tableDataExInvoiceSelect.slice();
                    console.log('initialState.tableDataExInvoiceSelect:', this.$state.initialState.tableDataExInvoiceSelect);
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

        //получение кат. менеджеров ku_id
        async getManagerForKuId_API(ku_id?: string, page?: number) {
            await KU.getKuManager({
                ku_id, page_size: this.$state.countRowTable,
                page,
            })
                .then((tableData) => {
                    console.log('Получены данные менеджеров ку_айди:', tableData);
                    this.$state.tableDataManagerSelect = tableData.results;
                    
                    this.$state.initialState.tableDataManagerSelect = this.$state.tableDataManagerSelect.slice();
                    console.log('initialState.tableDataManagerSelect:', this.$state.initialState.tableDataManagerSelect);
                    this.$state.pagination = {
                        count: tableData.count,
                        previous: tableData.previous,
                        next: tableData.next,
                    };
                })
                .catch((error) => {
                    console.error('Ошибка при получении данных менеджеров ку_айди:', error);
                    return Promise.reject(error);
                });
        },

        //получение долж. лиц ku_id
        async getOfficialForKuId_API(ku_id?: string, page?: number) {
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

                    this.$state.initialState.officialId = tableData.results[0].id;
                    this.$state.initialState.kuIdFIOСounteragent = tableData.results[0].counterparty_name;
                    this.$state.initialState.kuIdPostСounteragent = tableData.results[0].counterparty_post;
                    this.$state.initialState.kuIdDocСounteragent = tableData.results[0].counterparty_docu;
                    this.$state.initialState.kuIdFIOEntity = tableData.results[0].entity_name;
                    this.$state.initialState.kuIdPostEntity = tableData.results[0].entity_post;
                    this.$state.initialState.kuIdDocEntity = tableData.results[0].entity_docu;
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

        //создание контракта
        async createKuContract(newItem: IContractPost) {
            try {
                const response = await KU.postKuContractCreate(newItem);
                console.log("Экземпляр для контракта успешно отправлен на бэкенд:", response);
                this.kuIdContract = response.name; 
            } catch (error) {
                console.error("Ошибка при отправке экземпляра для контракта на бэкенд:", error);
            }
        },
        hasChanges() {
            const tablesChanged = !_.isEqual(this.tableDataInRequirement, this.initialState.tableDataInRequirement);
            const tablesChanged2 = !_.isEqual(this.tableDataExRequirement, this.initialState.tableDataInRequirement);
            const tablesChanged3 = !_.isEqual(this.tableDataPercent, this.initialState.tableDataPercent);
            const tablesChanged4 = !_.isEqual(this.tableDataExInvoiceSelect, this.initialState.tableDataExInvoiceSelect);
            const tablesChanged5 = !_.isEqual(this.tableDataManagerSelect, this.initialState.tableDataManagerSelect);
            const tablesChanged7 = !_.isEqual(this.tableDataVAC, this.initialState.tableDataVAC);
            const tablesChanged6 = !_.isEqual(this.tableDataContract, this.initialState.tableDataContract);
            return (
                this.kuIdStatus !== this.initialState.kuIdStatus ||
                this.kuIdType !== this.initialState.kuIdType ||
                this.kuIdEntityId !== this.initialState.kuIdEntityId ||
                this.kuIdEntityName !== this.initialState.kuIdEntityName ||
                this.kuIdSubsidiaries !== this.initialState.kuIdSubsidiaries ||
                this.kuIdVendorId !== this.initialState.kuIdVendorId ||
                this.kuIdVendorName !== this.initialState.kuIdVendorName ||
                this.kuIdDateStart !== this.initialState.kuIdDateStart ||
                this.kuIdDateEnd !== this.initialState.kuIdDateEnd ||
                this.kuIdDateActual !== this.initialState.kuIdDateActual ||
                this.kuIdDescription !== this.initialState.kuIdDescription ||
                this.kuIdContract !== this.initialState.kuIdContract ||
                this.kuIdProduct_type !== this.initialState.kuIdProduct_type ||
                this.kuIdDocu_account !== this.initialState.kuIdDocu_account ||
                this.kuIdDocu_number !== this.initialState.kuIdDocu_number ||
                this.kuIdDocu_date !== this.initialState.kuIdDocu_date ||
                this.kuIdDocu_subject !== this.initialState.kuIdDocu_subject ||
                this.kuIdTax !== this.initialState.kuIdTax ||
                this.kuIdExclude_return !== this.initialState.kuIdExclude_return ||
                this.kuIdNegative_turnover !== this.initialState.kuIdNegative_turnover ||
                this.kuIdPay_method !== this.initialState.kuIdPay_method ||
                this.kuIdFIOСounteragent !== this.initialState.kuIdFIOСounteragent ||
                this.kuIdDocСounteragent !== this.initialState.kuIdDocСounteragent ||
                this.kuIdPostСounteragent !== this.initialState.kuIdPostСounteragent ||
                this.kuIdFIOEntity !== this.initialState.kuIdFIOEntity ||
                this.kuIdPostEntity !== this.initialState.kuIdPostEntity ||
                this.kuIdDocEntity !== this.initialState.kuIdDocEntity ||
                this.valueBrand_nameContract !== this.initialState.valueBrand_nameContract ||
                this.valueProducer_nameContract !== this.initialState.valueProducer_nameContract ||
                tablesChanged ||
                tablesChanged2 ||
                tablesChanged3 ||
                tablesChanged4 ||
                tablesChanged5 ||
                tablesChanged6 ||
                tablesChanged7
            );
        },
        clearData() {
            // Очищаем таблицы
            this.tableDataInRequirement.length = 0;
            this.tableDataExRequirement.length = 0;
            this.tableDataPercent.length = 0;
            this.tableDataVAC.length = 0 
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
            this.dialogFormContractVisible = false;
            this.dialogFormVACVisible = false,
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
            this.kuIdDocu_number = '';
            this.kuIdDocu_date = '';
            this.kuIdDocu_subject = '';
            this.kuIdTax = false;
            this.kuIdExclude_return = false;
            this.kuIdNegative_turnover = false;
            this.kuIdPay_method = '';
            this.kuIdEntityIdVAC = '';
            this.kuIdVendorIdVAC = '';
            this.kuIdFIOСounteragent = '';
            this.kuIdPostСounteragent = '';
            this.kuIdDocСounteragent = '';
            this.kuIdFIOEntity = '';
            this.kuIdPostEntity = '';
            this.kuIdDocEntity = '';
            this.valueProducer_nameContract = '';
            this.valueBrand_nameContract = '';

            this.multipleSelectionProduct = [];
            this.multipleSelectionExInvoice = [];
            this.multipleSelectionManager = [];
            this.multipleTableRef = null;

            this.initialState.tableDataInRequirement.length = 0;
            this.initialState.tableDataExRequirement.length = 0;
            this.initialState.tableDataPercent.length = 0;
            this.initialState.tableDataVAC.length = 0;
            this.initialState.tableDataExInvoiceSelect.length = 0;
            this.initialState.tableDataManagerSelect.length = 0;
            this.initialState.tableDataContract.length = 0;
            this.initialState.kuIdStatus = '';
            this.initialState.kuIdType = '';
            this.initialState.kuIdEntityId = '';
            this.initialState.kuIdEntityName = '';
            this.initialState.kuIdSubsidiaries = false;
            this.initialState.kuIdVendorId = '';
            this.initialState.kuIdVendorName = '';
            this.initialState.kuIdDateStart = '';
            this.initialState.kuIdDateEnd = '';
            this.initialState.kuIdDateActual = '';
            this.initialState.kuIdDescription = '';
            this.initialState.kuIdContract = '';
            this.initialState.kuIdProduct_type = '';
            this.initialState.kuIdDocu_account = '';
            this.initialState.kuIdDocu_number = '';
            this.initialState.kuIdDocu_date = '';
            this.initialState.kuIdDocu_subject = '';
            this.initialState.kuIdTax = false;
            this.initialState.kuIdExclude_return = false;
            this.initialState.kuIdNegative_turnover = false;
            this.initialState.kuIdPay_method = '';
            this.initialState.kuIdFIOСounteragent = '';
            this.initialState.kuIdDocСounteragent = '';
            this.initialState.kuIdPostСounteragent = '';
            this.initialState.kuIdFIOEntity = '';
            this.initialState.kuIdPostEntity = '';
            this.initialState.kuIdDocEntity = '';
            this.initialState.valueProducer_nameContract = '';
            this.initialState.valueBrand_nameContract = '';
        }
    },

})


