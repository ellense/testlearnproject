import { defineStore } from "pinia";
import { useKuIdStore } from "~~/stores/kuIdStore";
import type { FormInstance } from 'element-plus'

import type {
    IKuList,
    IEntityInKu,
    GetAllProducer,
    IProducer,
    GetAllProducts,
    IProduct,
    GetAllBrands,
    IBrand,
    IParamVendorsForEntity,
    IExInvoiceForKu,
    ITree,
    GetAllCategory,
    GetParamExInvoicesForKu,
    IContractPost,
    IVendorIdAndName,
    IKuCAddStore,
    IParamServices,
} from "~/utils/types/directoryTypes";

export const useKuCAddStore = defineStore("KuCAddStore", {
    state: (): IKuCAddStore => ({
        ruleFormRef: null,
        kuAddMain: {
            newType: "",
            newEntityId: "",
            newEntityName: "",
            newSubsidiaries: false,
            newVendorId: "",
            newVendorName: "",
            newDateStart: "",
            newDateEnd: "",
            newDateActual: "",
            newDescription: "",
            newContract: "",
            newDocu_account: "",
            newDocu_name: "",
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
        //селекты для множественного выбора
        multipleSelectionProduct: [],
        multipleSelectionExInvoice: [],
        multipleSelectionService: [],
        multipleSelectionArticle: [],
        multipleSelectionServiceSelect: [],
        multipleSelectionManager: [],
        multipleTableRef: null,
        //данные 
        brandIncluded: [],
        brandExcluded: [],
        producerIncluded: [],
        producerExcluded: [],
        productIncluded: [],
        productExcluded: [],
        tableDataInRequirement: [],
        tableDataExRequirement: [],
        tableDataContract: [],
        tableDataPercent: [],
        tableDataExInvoiceAll: [],
        tableDataExInvoiceSelect: [],
        tableDataManagerAll: [],
        tableDataManagerSelect: [],
        tableDataServiceAll: [],
        tableDataArticleAll: [],
        tableDataServiceSelect: [],
        dataEntity: [],
        dataVendorId: [],
        dataVendorName: [],
        treeData: [],
        treeRef: null,
        //v-model диалоговых форм
        dialogFormExInvoiceVisible: false,
        dialogFormManagersVisible: false,
        dialogFormProductInVisible: false,
        dialogFormCategoryInVisible: false,
        dialogFormProductExVisible: false,
        dialogFormCategoryExVisible: false,
        dialogFormContractVisible: false,
        dialogFormServiceVisible: false,
        //дизэйбл
        disableButtonsIncluded: false,
        disableSubsidiaries: false,
        //

        vendorFilter: "",
        vendors: [],
        //пагинация в таблицах
        pagination: null,
        countRowTable: 100,
        countRowTable2: 950,
        //поиски
        searchExInvoiceNumber: "",
        searchProductIncluded: "",
        searchProductExcluded: "",
        //параметры для фильтров при запросах
        filterService: {},
        filterArticle: {},
        filterProductExcluded: {},
        filterProducerIncluded: {},
        filterProducerExcluded: {},
        filterBrandIncluded: {},
        filterBrandExcluded: {},
        filterVendorValue: {},
        filterExInvoice: {},
        isFormValid: false,
    }),

    getters: {
        // getKu: (state) => state.tableData,
        getExInvoiceAll: (state) => state.tableDataExInvoiceAll,
        getServiceAll: (state) => state.tableDataServiceAll,
        getManagerAll: (state) => state.tableDataManagerAll,
        getProducersIn: (state) => state.producerIncluded,
        getBrandsIn: (state) => state.brandIncluded,
        getProductIn: (state) => state.productIncluded,
        getProducersEx: (state) => state.producerIncluded,
        getBrandsEx: (state) => state.brandIncluded,
        getProductEx: (state) => state.productIncluded,
        getEntity: (state) => state.dataEntity,
        // getEntityName: (state) => state.newEntityName,
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
        handleSelectionChange3(val: IProduct[]) {
            this.multipleSelectionProduct = val;
        },
        handleSelectionChangeExInvoice(val: IExInvoiceForKu[]) {
            this.multipleSelectionExInvoice = val;
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
        // async submitForm(formEl: FormInstance | undefined) {
        //     try {
        //         if (!formEl) return;
        //         await formEl.validate((valid, fields) => {
        //             if (valid) {
        //               console.log('submit!')
        //             } else {
        //               console.log('error submit!', fields)
        //             }
        //           })
        //         // const { valid, fields } = await formEl.validate();
        //         // if (valid) {
        //         //     console.log('submit!');
        //         //     ElMessage.success('Все верно.');
        //         // } else {
        //         //     console.log('error submit!', fields);
        //         //     ElMessage.error('Ошибка валидации формы.');
        //         // }
        //     } catch (error) {
        //         console.error('Ошибка при отправке формы:', error);
        //     }
        // },
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

        //получение данных о поставщиках для создания
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
        async getVendorNameFromAPIWithFilter(page?: number) {
            await VENDOR.getVendorsForEntityInKU({
                page_size: this.$state.countRowTable,
                page,
                vendor_id: this.$state.filterVendorValue.vendor_id,
            })
                .then((dataVendor) => {
                    this.$state.kuAddMain.newVendorName = dataVendor.results[0].name;
                    useKuIdStore().setKuIdVendorName(dataVendor.results[0].name)
                    console.log('Получены данные vendorName:', this.$state.kuAddMain.newVendorName, useKuIdStore().kuIdVendorName);
                    this.$state.pagination = {
                        count: dataVendor.count,
                        previous: dataVendor.previous,
                        next: dataVendor.next,
                    };
                })
                .catch((error) => Promise.reject(error));
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


        ////////////////////////////////////////////////////////////////////

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

///////////////////////////////////////////////////////////////////

     

      


       


        //////////////////////// ИСКЛЮЧЕННЫЕ УСЛОВИЯ   //////////////////////////////////////////////

        //получение данных о товарах для условий с фильтром и поиск 
        async getProductFromExcludedWithFilter(page?: number) {
            this.setFilterProductEx('page', page);
            this.setFilterProductEx('search', this.$state.searchProductExcluded);
            this.setFilterProductEx('vendor_id', this.$state.kuAddMain.newVendorId);
            await PRODUCT.getProductsList({
                page_size: this.$state.countRowTable,
                page,
                search: this.$state.searchProductExcluded,
                vendor_id: this.$state.filterProductExcluded.vendor_id
            })
                .then((product) => {
                    console.log('Получены данные товаров:', product);
                    this.$state.productExcluded = product.results;
                    this.$state.pagination = {
                        count: product.count,
                        previous: product.previous,
                        next: product.next,
                    };
                })
                .catch((error) => {
                    console.error('Ошибка при получении данных товаров:', error);
                    return Promise.reject(error);
                });
        },
        async performSearchProductEx(searchQuery: string) {
            try {
                this.setSearchProductEx(searchQuery);
                await this.getProductFromExcludedWithFilter();
            } catch (error) {
                console.error('Ошибка при выполнении поиска в искл товарах ку_адд', error);
            }
        },
        setSearchProductEx(query: string) {
            this.$state.searchProductExcluded = query;
        },
        setFilterProductEx<
            T extends keyof GetAllProducts,
            U extends GetAllProducts[T],
        >(field: T, value: U) {
            this.$state.filterProductExcluded[field] = value
        },
        ////////////////////////////////////////////////////////////////////////////////////
        //получение накладных
        async getInvoicesFromAPIWithFilter(page?: number) {
            console.log('Выполняется запрос искл.накладных с фильтрацией...');
            await KU.getInvoicesList({
                page_size: this.$state.countRowTable,
                page,
                searchNumber: this.$state.searchExInvoiceNumber,
                entity_id: this.$state.filterExInvoice?.entity_id || [],
                vendor_id: this.$state.filterExInvoice?.vendor_id,
                start_date: this.$state.filterExInvoice?.start_date,
                end_date: this.$state.filterExInvoice?.end_date,
            })
                .then((dataInvoice) => {
                    console.log('Получены данные искл.накладных:', dataInvoice);
                    this.$state.tableDataExInvoiceAll = dataInvoice.results;
                    this.$state.pagination = {
                        count: dataInvoice.count,
                        previous: dataInvoice.previous,
                        next: dataInvoice.next,
                    };
                })
                .catch((error) => {
                    console.error('Ошибка при получении данных искл. накладных:', error);
                    return Promise.reject(error);
                });
        },
        setFilterExInvoice<
            T extends keyof GetParamExInvoicesForKu,
            U extends GetParamExInvoicesForKu[T],
        >(field: T, value: U) {
            this.$state.filterExInvoice[field] = value
        },
        removeFilterExInvoice<T extends keyof GetParamExInvoicesForKu>(field: T) {
            if (this.$state.filterExInvoice) {
                delete this.$state.filterExInvoice[field]
            }
            console.log("фильтр накладных очищен")
        },
        //для поиска накладных по номеру накладной
        async performSearchOfInvoice(searchQuery: string) {
            try {
                this.setSearchQuery(searchQuery);
                await this.getInvoicesFromAPIWithFilter();
            } catch (error) {
                console.error('Ошибка при выполнении поиска по номеру накл.', error);
            }
        },
        setSearchQuery(query: string) {
            console.log('Устанавливается запрос поиска по номеру:', query);
            this.$state.searchExInvoiceNumber = query;
        },


        //очищение всего
        clearNewData() {
            // Очищаем таблицу условий
            this.tableDataInRequirement.length = 0;
            this.tableDataExRequirement.length = 0;
            this.tableDataPercent.length = 0;
            this.tableDataExInvoiceSelect.length = 0;
            this.tableDataManagerSelect.length = 0;
            this.tableDataContract.length = 0;
            this.tableDataExInvoiceAll.length = 0;
            this.tableDataManagerAll.length = 0;
            this.productIncluded.length = 0;
            this.productExcluded.length = 0;
            // Значения v-model при создании
            this.kuAddMain.newType = '',
                this.kuAddMain.newEntityId = '';
            this.kuAddMain.newEntityName = '';
            this.kuAddMain.newVendorId = '';
            this.kuAddMain.newVendorName = '';
            this.kuAddMain.newDateStart = '';
            this.kuAddMain.newDateEnd = '';
            this.kuAddMain.newDateActual = '';
            this.kuAddMain.newDescription = '';
            this.kuAddMain.newContract = '';
            this.kuAddMain.newDocu_account = '';
            this.kuAddMain.newDocu_name = '';
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
            // Селекты для множественного выбора
            this.multipleSelectionProduct = [];
            this.multipleSelectionExInvoice = [];
            this.multipleSelectionManager = [];
            this.multipleTableRef = null;

            // Сбрасываем флаги видимости диалоговых окон
            this.dialogFormExInvoiceVisible = false;
            this.dialogFormProductInVisible = false;
            this.dialogFormCategoryInVisible = false;
            this.dialogFormProductExVisible = false;
            this.dialogFormCategoryExVisible = false;
            this.dialogFormManagersVisible = false;
            this.dialogFormContractVisible = false;

            // Сбрасываем флаги дизейбла кнопок
            this.disableButtonsIncluded = false;

            // Сбрасываем значения поисковых строк
            this.searchExInvoiceNumber = '';
            this.searchProductIncluded = '';
            this.searchProductExcluded = '';

            // очищение фильтров
            this.removeFilterVendor('entity_id');

        },
        //создание контракта
        async createKuContract(newItem: IContractPost) {
            try {
                const response = await KU.postKuContractCreate(newItem); // используем функцию из вашего модуля API
                console.log("Экземпляр для контракта успешно отправлен на бэкенд:", response);
                this.kuAddMain.newContract = response.name; // сохраняем имя в состоянии хранилища
            } catch (error) {
                console.error("Ошибка при отправке экземпляра для контракта на бэкенд:", error);
                // Можно обработать ошибку здесь, если нужно
            }
        },
    }
});
