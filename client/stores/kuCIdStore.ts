import { defineStore } from "pinia";
import { useKuAddStore } from "~~/stores/kuAddStore";
import _ from 'lodash';
import type { IProduct } from "~/utils/types/productTypes";
import type { IKuCIdStore } from "~/utils/types/storesTypes";
import type { IContractPost } from "~/utils/types/tabsKuTypes";

export const useKuCIdStore = defineStore("KuCIdStore", {
    state: (): IKuCIdStore => ({
        tableDataVAC: [],
        tableDataServiceSelect: [],
        tableDataManagerSelect: [],
        tableDataContract: [],
        //v-model диалоговых форм
        dialogFormVAC: false,
        dialogFormService: false,
        dialogFormManagersVisible: false,
        dialogFormContractVisible: false,
        //дизэйбл
        disableButtonsIncluded: false,
        disableSubsidiaries: false,
        //v-model атрибутов
        ku_id: "",
        kuIdStatus: "",
        kuIdType: "",
        kuIdEntityId: "",
        kuIdEntityName: "",
        kuIdSubsidiaries: false,
        kuIdCustomerId: "",
        kuIdCustomerName: "",
        kuIdDateStart: "",
        kuIdDateEnd: "",
        kuIdDateActual: "",
        kuIdDescription: "",
        kuIdContract: "",
        kuIdDocu_account: "",
        kuIdDocu_number: "",
        kuIdDocu_date: "",
        kuIdDocu_subject: "",
        kuIdPay_method: "",
        kuIdPay_sum: null,
        officialId: null,
        kuIdFIOСounteragent: "",
        kuIdPostСounteragent: "",
        kuIdDocСounteragent: "",
        kuIdFIOEntity: "",
        kuIdPostEntity: "",
        kuIdDocEntity: "",
        valueVendorIdVAC: "",
        valueEntityIdVAC: "",
        valueService_nameContract: "",
        valueArticle_nameContract: "",
        valueService_name: "",
        valueArticle_name: "",
        valueRatio: null,
        initialState: {
            kuIdStatus: "",
            kuIdType: "",
            kuIdEntityId: "",
            kuIdEntityName: "",
            kuIdSubsidiaries: false,
            kuIdCustomerId: "",
            kuIdCustomerName: "",
            kuIdDateStart: "",
            kuIdDateEnd: "",
            kuIdDateActual: "",
            kuIdDescription: "",
            kuIdContract: "",
            kuIdDocu_account: "",
            kuIdDocu_number: "",
            kuIdDocu_date: "",
            kuIdDocu_subject: "",
            kuIdPay_sum: null,
            kuIdPay_method: "",
            officialId: null,
            kuIdFIOСounteragent: "",
            kuIdPostСounteragent: "",
            kuIdDocСounteragent: "",
            kuIdFIOEntity: "",
            kuIdPostEntity: "",
            kuIdDocEntity: "",
            tableDataManagerSelect: [],
            tableDataVAC: [],
            tableDataServiceSelect: [],
        },
        //пагинация в таблицах
        pagination: null,
        countRowTable: 100,

    }),

    getters: {
        getServiceForKu: (state) => state.tableDataServiceSelect,
        getManagerForKu: (state) => state.tableDataManagerSelect,
        getVACForKu: (state) => state.tableDataVAC,
    },

    actions: {
        setKuIdCustomerName(name: string) {
            this.kuIdCustomerName = name;
        },
        //получение ku_id
        async getKuDetail_API(kuId: string) {
            try {
                const results = await KUC.getInfoKu({
                    ku_id: kuId,
                });
                this.$state.ku_id = results.ku_id;
                this.$state.kuIdStatus = results.status;
                this.$state.kuIdType = results.period;
                this.$state.kuIdEntityId = results.entity
                this.$state.kuIdEntityName = results.entity_name
                this.$state.kuIdCustomerId = results.customer
                this.$state.kuIdCustomerName = results.customer_name
                this.$state.kuIdDateStart = results.date_start;
                this.$state.kuIdDateEnd = new Date(results.date_end);
                this.$state.kuIdDescription = results.description;
                this.$state.kuIdContract = results.contract;
                this.$state.kuIdDocu_account = results.docu_account;
                this.$state.kuIdDocu_number = results.docu_number;
                this.$state.kuIdDocu_date = new Date(results.docu_date)
                this.$state.kuIdDocu_subject = results.docu_subject;
                this.$state.kuIdPay_sum = results.pay_sum;
                this.$state.kuIdPay_method = results.pay_method;
                this.$state.initialState.kuIdStatus = results.status;
                this.$state.initialState.kuIdType = results.period;
                this.$state.initialState.kuIdEntityId = results.entity
                this.$state.initialState.kuIdEntityName = results.entity_name
                this.$state.initialState.kuIdCustomerId = results.customer
                this.$state.initialState.kuIdCustomerName = results.customer_name
                this.$state.initialState.kuIdDateStart = results.date_start;
                this.$state.initialState.kuIdDateEnd = new Date(results.date_end);
                this.$state.initialState.kuIdDescription = results.description;
                this.$state.initialState.kuIdContract = results.contract;
                this.$state.initialState.kuIdDocu_account = results.docu_account;
                this.$state.initialState.kuIdDocu_number = results.docu_number;
                this.$state.initialState.kuIdDocu_date = new Date(results.docu_date)
                this.$state.initialState.kuIdDocu_subject = results.docu_subject;
                this.$state.initialState.kuIdPay_method = results.pay_method;

                console.log("успешно получили данные ку_айди клиентов", results);
                console.log("this.$state.ku_id", this.$state.ku_id);
                console.log("this.$state.kuIdType", this.$state.kuIdType);
                console.log("this.$state.kuIdDateStart", this.$state.kuIdDateStart);

            } catch (error) {
                console.error("Ошибка при получении данных ку_айди клиентов:", error);
            }
        },
        async getServiceForKuId_API(ku_id?: string, page?: number) {
            await KUC.getKuService({
                ku_id, page_size: this.$state.countRowTable,
                page,
            })
                .then((tableData) => {
                    console.log('Получены данные услуг ку_айди:', tableData);
                    this.$state.tableDataServiceSelect = tableData.results;
                    this.$state.initialState.tableDataServiceSelect = this.$state.tableDataServiceSelect.slice();
                    console.log('initialState.tableDataServiceSelect:', this.$state.initialState.tableDataServiceSelect);
                    this.$state.pagination = {
                        count: tableData.count,
                        previous: tableData.previous,
                        next: tableData.next,
                    };
                })
                .catch((error) => {
                    console.error('Ошибка при получении данных услуг ку_айди:', error);
                    return Promise.reject(error);
                });
        },
        //получение поставщиков и договоров ku_id
        async getVACForKuId_API(ku_id?: string, page?: number) {
            await KUC.getKuVAC({
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
        async getManagerForKuId_API(ku_id?: string, page?: number) {
            await KUC.getKuManager({
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
            await KUC.getKuOfficial({
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
                const response = await KU.postKuContractCreate(newItem); // используем функцию из вашего модуля API
                console.log("Экземпляр для контракта успешно отправлен на бэкенд:", response);
                this.kuIdContract = response.name; // сохраняем имя в состоянии хранилища
            } catch (error) {
                console.error("Ошибка при отправке экземпляра для контракта на бэкенд:", error);
            }
        },
        hasChanges() {
            const tablesChanged = !_.isEqual(this.tableDataServiceSelect, this.initialState.tableDataServiceSelect);
            const tablesChanged2 = !_.isEqual(this.tableDataVAC, this.initialState.tableDataVAC);
            const tablesChanged3 = !_.isEqual(this.tableDataManagerSelect, this.initialState.tableDataManagerSelect);
            return (
                this.kuIdStatus !== this.initialState.kuIdStatus ||
                this.kuIdType !== this.initialState.kuIdType ||
                this.kuIdEntityId !== this.initialState.kuIdEntityId ||
                this.kuIdEntityName !== this.initialState.kuIdEntityName ||
                this.kuIdSubsidiaries !== this.initialState.kuIdSubsidiaries ||
                this.kuIdCustomerId !== this.initialState.kuIdCustomerId ||
                this.kuIdCustomerName !== this.initialState.kuIdCustomerName ||
                this.kuIdDateStart !== this.initialState.kuIdDateStart ||
                this.kuIdDateEnd !== this.initialState.kuIdDateEnd ||
                this.kuIdDateActual !== this.initialState.kuIdDateActual ||
                this.kuIdDescription !== this.initialState.kuIdDescription ||
                this.kuIdContract !== this.initialState.kuIdContract ||
                this.kuIdDocu_account !== this.initialState.kuIdDocu_account ||
                this.kuIdDocu_number !== this.initialState.kuIdDocu_number ||
                this.kuIdDocu_date !== this.initialState.kuIdDocu_date ||
                this.kuIdDocu_subject !== this.initialState.kuIdDocu_subject ||
                this.kuIdPay_sum !== this.initialState.kuIdPay_sum ||
                this.kuIdPay_method !== this.initialState.kuIdPay_method ||
                this.kuIdFIOСounteragent !== this.initialState.kuIdFIOСounteragent ||
                this.kuIdDocСounteragent !== this.initialState.kuIdDocСounteragent ||
                this.kuIdPostСounteragent !== this.initialState.kuIdPostСounteragent ||
                this.kuIdFIOEntity !== this.initialState.kuIdFIOEntity ||
                this.kuIdPostEntity !== this.initialState.kuIdPostEntity ||
                this.kuIdDocEntity !== this.initialState.kuIdDocEntity ||
                tablesChanged ||
                tablesChanged2 ||
                tablesChanged3
            );
        },
        clearData() {
            // Очищаем таблицу условий
            this.tableDataManagerSelect.length = 0;
            this.tableDataContract.length = 0;
            // Сбрасываем флаги видимости диалоговых окон
            this.dialogFormVAC = false;
            this.dialogFormService = false;
            this.dialogFormManagersVisible = false;
            this.dialogFormContractVisible = false;
            // Сбрасываем флаги дизейбла кнопок
            this.disableButtonsIncluded = false;

            // Сбрасываем значения в моделях данных
            this.ku_id = '';
            this.kuIdStatus = '';
            this.kuIdType = '';
            this.kuIdEntityId = '';
            this.kuIdEntityName = '';
            this.kuIdCustomerId = '';
            this.kuIdCustomerName = '';
            this.kuIdDateStart = '';
            this.kuIdDateEnd = '';
            this.kuIdDateActual = '';
            this.kuIdDescription = '';
            this.kuIdContract = '';
            this.kuIdDocu_account = '';
            this.kuIdDocu_number = '';
            this.kuIdDocu_date = '';
            this.kuIdDocu_subject = '';
            this.kuIdPay_method = '';
            this.kuIdFIOСounteragent = '';
            this.kuIdPostСounteragent = '';
            this.kuIdDocСounteragent = '';
            this.kuIdFIOEntity = '';
            this.kuIdPostEntity = '';
            this.kuIdDocEntity = '';
            this.valueService_nameContract = '';
            this.valueArticle_nameContract = '';
            this.valueService_name = '';
            this.valueArticle_name = '';
            this.valueRatio = null;
            this.officialId = null;

            this.initialState.tableDataManagerSelect.length = 0;
            this.initialState.kuIdStatus = '';
            this.initialState.kuIdType = '';
            this.initialState.kuIdEntityId = '';
            this.initialState.kuIdEntityName = '';
            this.initialState.kuIdSubsidiaries = false;
            this.initialState.kuIdCustomerId = '';
            this.initialState.kuIdCustomerName = '';
            this.initialState.kuIdDateStart = '';
            this.initialState.kuIdDateEnd = '';
            this.initialState.kuIdDateActual = '';
            this.initialState.kuIdDescription = '';
            this.initialState.kuIdContract = '';
            this.initialState.kuIdDocu_account = '';
            this.initialState.kuIdDocu_number = '';
            this.initialState.kuIdDocu_date = '';
            this.initialState.kuIdDocu_subject = '';
            this.initialState.kuIdPay_method = '';
            this.initialState.kuIdFIOСounteragent = '';
            this.initialState.kuIdDocСounteragent = '';
            this.initialState.kuIdPostСounteragent = '';
            this.initialState.kuIdFIOEntity = '';
            this.initialState.kuIdPostEntity = '';
            this.initialState.kuIdDocEntity = '';
        }
    },

})


