import { defineStore } from "pinia";
import { useKuCIdStore } from "~~/stores/kuCIdStore";
import type { FormInstance } from 'element-plus'
import type { ICustomerIdAndName, IParamCustomersKU } from "~/utils/types/customerTypes";
import type { IEntityInKu } from "~/utils/types/entityTypes";
import type { IKuList } from "~/utils/types/kuVendorTypes";
import type { IParamServices } from "~/utils/types/serviceTypes";
import type { IKuCAddStore } from "~/utils/types/storesTypes";
import type { IManagerForKu, IVendorAndContract, IParamManagers, IContractPost } from "~/utils/types/tabsKuTypes";
import type { IVendorIdAndName, IParamVendorsForEntity } from "~/utils/types/vendorTypes";


export const useKuCAddStore = defineStore("KuCAddStore", {
    state: (): IKuCAddStore => ({
        ruleFormRef: null,
        kuAddMain: {
            newType: "",
            newEntityId: "",
            newEntityName: "",
            newSubsidiaries: false,
            newCustomerId: "",
            newCustomerName: "",
            newDateStart: "",
            newDateEnd: "",
            newDateActual: "",
            newDescription: "",
            newContract: "",
            newDocu_account: "",
            newDocu_number: "",
            newDocu_date: "",
            newDocu_subject: "",
            newPay_sum: null,
            newPay_method: "",
        },
        newOfFIOСounteragent: "",
        newOfPostСounteragent: "",
        newOfDocСounteragent: "",
        newOfFIOEntity: "",
        newOfPostEntity: "",
        newOfDocEntity: "",
        valueService_nameContract: "",
        valueArticle_nameContract: "",
        valueService_name: "",
        valueArticle_name: "",
        valueRatio: null,
        valueVendorIdVAC: "",
        valueEntityIdVAC: "",
        //селекты для множественного выбора
        multipleSelectionService: [],
        multipleSelectionArticle: [],
        multipleSelectionServiceSelect: [],
        multipleSelectionManager: [],
        multipleSelectionVendorAndContract: [],
        multipleTableRef: null,
        //данные 
        tableDataContract: [],
        tableDataManagerAll: [],
        tableDataManagerSelect: [],
        tableDataVAC: [],
        tableDataServiceAll: [],
        tableDataArticleAll: [],
        tableDataServiceSelect: [],
        dataEntity: [],
        dataVendorId: [],
        dataCustomerId: [],
        //v-model диалоговых форм
        dialogFormManagersVisible: false,
        dialogFormContractVisible: false,
        dialogFormServiceVisible: false,
        dialogFormVACVisible: false,
        //дизэйбл
        disableButtonsIncluded: false,
        disableSubsidiaries: false,

        //пагинация в таблицах
        pagination: null,
        countRowTable: 100,
        countRowTable2: 950,
        //параметры для фильтров при запросах
        filterService: {},
        filterArticle: {},
        filterCustomerValue: {},
        filterVendorValue: {},
        filterManager: {},
        isFormValid: false,
    }),

    getters: {
        getServiceAll: (state) => state.tableDataServiceAll,
        getManagerAll: (state) => state.tableDataManagerAll,
        getEntity: (state) => state.dataEntity,
        getEntityName: (state) => state.kuAddMain.newEntityName,
    },

    actions: {
        //выборка элементов таблиц
        setMultipleTableRef(ref: Ref) {
            this.multipleTableRef = ref;
        },
        toggleSelection(evt: MouseEvent, rows?: IKuList[] | undefined) {
            if (this.multipleTableRef) {
                if (rows) {
                    rows.forEach((row) => {
                        this.multipleTableRef.value.toggleRowSelection(row, undefined);
                    });
                } else {
                    this.multipleTableRef.value.clearSelection();
                }
            }
        },
        handleSelectionChangeManager(val: IManagerForKu[]) {
            this.multipleSelectionManager = val;
        },
        handleSelectionChangeVendorAndContract(val: IVendorAndContract[]) {
            this.multipleSelectionVendorAndContract = val;
        },

        //для разной пагинации
        setCountRowTable(count: number) {
            this.$state.countRowTable = count;
        },

        setRuleFormRef(formRef: FormInstance | null) {
            this.ruleFormRef = formRef;
        },
        async isFormValid() {
            return new Promise((resolve, reject) => {
                if (!this.ruleFormRef) {
                    console.error('Form reference is not set');
                    reject(new Error('Form reference is not set'));
                    return;
                }
                this.ruleFormRef.validate((valid, fields) => {
                    if (valid) {
                        console.log('Form is valid!');
                        resolve(true);
                    } else {
                        console.log('Form is invalid:', fields);
                        resolve(false);
                    }
                });
            });
        },

        //получение данных о юр.лице для создания
        async fetchKuEntity(data: IEntityInKu) {
            try {
                const result = await ENTITY.getEntityByIdAndName(data);
                if (Array.isArray(result)) {
                    this.dataEntity = result;
                    console.log("Все данные о юр. лицах:", result);
                } else {
                    this.dataEntity = [];

                    console.error("Данные не получены или не являются массивом");
                }
            } catch (error) {
                console.error("Произошла ошибка", error);
            }
        },

        //получение данных о поставщиках для VAC
        async fetchAllVendorIdForEntity() {
            try {
                let allVendors: IVendorIdAndName[] = [];
                let nextPage = 1;
                let totalPages = 1;
                while (nextPage <= totalPages) {
                    const vendors = await VENDOR.getVendorsForEntityInKU({
                        page_size: this.$state.countRowTable2,
                        page: nextPage,
                        entity_id: this.$state.filterVendorValue.entity_id,
                    });
                    allVendors = allVendors.concat(vendors.results);
                    totalPages = Math.ceil(vendors.count / this.$state.countRowTable2);
                    nextPage++;
                }
                console.log("Все данные о поставщиках:", allVendors);
                this.$state.dataVendorId = allVendors;

            } catch (error) {
                console.error(
                    "Произошла ошибка при получении данных о поставщиках",
                    error
                );
                return Promise.reject(error);
            }
        },
        setFilterVendor<
            T extends keyof IParamVendorsForEntity,
            U extends IParamVendorsForEntity[T],
        >(field: T, value: U) {
            this.$state.filterVendorValue[field] = value
        },
        removeFilterVendor<T extends keyof IParamVendorsForEntity>(field: T) {
            if (this.$state.filterVendorValue) {
                delete this.$state.filterVendorValue[field]
            }
        },

        //получение данных о клиентаъх для создания
        async fetchAllCustomerIdForEntity() {
            try {
                let allCustomers: ICustomerIdAndName[] = [];
                let nextPage = 1;
                let totalPages = 1;
                while (nextPage <= totalPages) {
                    const customers = await CUSTOMER.getCustomersForEntityInKU({
                        page_size: this.$state.countRowTable2,
                        page: nextPage,
                        entity_id: this.$state.filterCustomerValue.entity_id,
                    });
                    allCustomers = allCustomers.concat(customers.results);
                    totalPages = Math.ceil(customers.count / this.$state.countRowTable2);
                    nextPage++;
                }
                console.log("Все данные о клиентах:", allCustomers);
                this.$state.dataCustomerId = allCustomers;

            } catch (error) {
                console.error(
                    "Произошла ошибка при получении данных о клиентах",
                    error
                );
                return Promise.reject(error);
            }
        },

        //получение имени клиента
        async getCustomerNameFromAPIWithFilter(page?: number) {
            await CUSTOMER.getCustomersForEntityInKU({
                page_size: this.$state.countRowTable,
                page,
                customer_id: this.$state.filterCustomerValue.customer_id,
            })
                .then((dataCustomer) => {
                    this.$state.kuAddMain.newCustomerName = dataCustomer.results[0].name;
                    useKuCIdStore().setKuIdCustomerName(dataCustomer.results[0].name)
                    console.log('Получены данные customerName:', this.$state.kuAddMain.newCustomerName, useKuCIdStore().kuIdCustomerName);
                    this.$state.pagination = {
                        count: dataCustomer.count,
                        previous: dataCustomer.previous,
                        next: dataCustomer.next,
                    };
                })
                .catch((error) => Promise.reject(error));
        },
        setFilterCustomer<
            T extends keyof IParamCustomersKU,
            U extends IParamCustomersKU[T],
        >(field: T, value: U) {
            this.$state.filterCustomerValue[field] = value
        },
        removeFilterCustomer<T extends keyof IParamCustomersKU>(field: T) {
            if (this.$state.filterCustomerValue) {
                delete this.$state.filterCustomerValue[field]
            }
        },

        //получение услуг
        async getServiceFromAPIWithFilter(page?: number, sort_by?: string, sort_order?: string) {
            this.setFilterValueServices('page', page);
            this.setFilterValueServices('sort_by', sort_by);
            this.setFilterValueServices('sort_order', sort_order);
            await SERVICE.getServiceList({
                page_size: this.$state.countRowTable,
                page,
                sort_by,
                sort_order,
            })
                .then((tableData) => {
                    console.log('Получены данные услуг:', tableData);
                    this.$state.tableDataServiceAll = tableData.results;
                    this.$state.pagination = {
                        count: tableData.count,
                        previous: tableData.previous,
                        next: tableData.next,
                    };
                })
                .catch((error) => Promise.reject(error));
        },

        setFilterValueServices<
            T extends keyof IParamServices,
            U extends IParamServices[T],
        >(field: T, value: U) {
            this.$state.filterService[field] = value
        },

        //получение статей услуг
        async getArticleFromAPIWithFilter(page?: number, sort_by?: string, sort_order?: string) {
            this.setFilterValueArticle('page', page);
            this.setFilterValueArticle('sort_by', sort_by);
            this.setFilterValueArticle('sort_order', sort_order);
            await SERVICE.getArticleList({
                page_size: this.$state.countRowTable,
                page,
                sort_by,
                sort_order,
            })
                .then((tableData) => {
                    console.log('Получены данные статей услуг:', tableData);
                    this.$state.tableDataArticleAll = tableData.results;
                    this.$state.pagination = {
                        count: tableData.count,
                        previous: tableData.previous,
                        next: tableData.next,
                    };
                })
                .catch((error) => Promise.reject(error));
        },

        setFilterValueArticle<
            T extends keyof IParamServices,
            U extends IParamServices[T],
        >(field: T, value: U) {
            this.$state.filterArticle[field] = value
        },

        //получение менеджеров
        async getManagersFromAPIWithFilter(page?: number) {
            await MANAGER.getManager({
                page_size: this.$state.countRowTable,
                page,
            })
                .then((dataManager) => {
                    console.log('Получены данные менеджеров:', dataManager);
                    this.$state.tableDataManagerAll = dataManager.results;
                    this.$state.pagination = {
                        count: dataManager.count,
                        previous: dataManager.previous,
                        next: dataManager.next,
                    };
                })
                .catch((error) => {
                    console.error('Ошибка при получении данных менеджеров:', error);
                    return Promise.reject(error);
                });
        },
        setFilterManager<
            T extends keyof IParamManagers,
            U extends IParamManagers[T],
        >(field: T, value: U) {
            this.$state.filterManager[field] = value
        },
        //очищение всего
        clearNewData() {
            // Очищаем таблицу условий
            this.tableDataServiceSelect.length = 0;
            this.tableDataManagerSelect.length = 0;
            this.tableDataContract.length = 0;
            // Значения v-model при создании
            this.kuAddMain.newType = '',
                this.kuAddMain.newEntityId = '';
            this.kuAddMain.newEntityName = '';
            this.kuAddMain.newSubsidiaries = false;
            this.kuAddMain.newCustomerId = '';
            this.kuAddMain.newCustomerName = '';
            this.kuAddMain.newDateStart = '';
            this.kuAddMain.newDateEnd = '';
            this.kuAddMain.newDateActual = '';
            this.kuAddMain.newDescription = '';
            this.kuAddMain.newContract = '';
            this.kuAddMain.newDocu_account = '';
            this.kuAddMain.newDocu_number = '';
            this.kuAddMain.newDocu_date = '';
            this.kuAddMain.newDocu_subject = '';
            this.kuAddMain.newPay_method = '';
            this.kuAddMain.newPay_sum = null;
            this.newOfFIOСounteragent = '';
            this.newOfPostСounteragent = '';
            this.newOfDocСounteragent = '';
            this.newOfFIOEntity = '';
            this.newOfPostEntity = '';
            this.newOfDocEntity = '';
            this.valueService_nameContract = '';
            this.valueArticle_nameContract = '';
            this.valueService_name = '';
            this.valueArticle_name = '';
            this.valueRatio = null;
            // Селекты для множественного выбора
            this.multipleSelectionService = [];
            this.multipleSelectionArticle = [];
            this.multipleSelectionServiceSelect = [];
            this.multipleSelectionManager = [];
            this.multipleTableRef = null;
            // Сбрасываем флаги видимости диалоговых окон
            this.dialogFormManagersVisible = false;
            this.dialogFormContractVisible = false;
            // Сбрасываем флаги дизейбла кнопок
            this.disableButtonsIncluded = false;
            this.disableSubsidiaries = false;
            // очищение фильтров
            this.removeFilterCustomer('entity_id');
            this.removeFilterVendor('entity_id');


        },
        //создание контракта
        async createKuContract(newItem: IContractPost) {
            try {
                const response = await KU.postKuContractCreate(newItem);
                console.log("Экземпляр для контракта успешно отправлен на бэкенд:", response);
                this.kuAddMain.newContract = response.name; 
            } catch (error) {
                console.error("Ошибка при отправке экземпляра для контракта на бэкенд:", error);
            }
        },
    }
});
