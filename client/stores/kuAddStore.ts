import { defineStore } from "pinia";
import { useKuIdStore } from "~~/stores/kuIdStore";

import type {
    IKuList,
    IEntityIdAndName,
    GetAllProducer,
    IProducer,
    GetAllProducts,
    IProduct,
    GetAllBrands,
    IBrand,
    GetAllVendorsForEntity,
    IKuAddStore,
    IVendorId,
    IExInvoiceForKu,
    ITree,
    GetAllCategory,
    GetParamExInvoicesForKu,
} from "~/utils/types/directoryTypes";

export const useKuAddStore = defineStore("KuAddStore", {
    state: (): IKuAddStore => ({
        //v-model атрибутов при создании
        newType: "",
        newEntityId: "",
        newEntityName: "",
        newVendorId: "",
        newVendorName: "",
        newDateStart: "",
        newDateEnd: "",
        newDateActual: "",
        newDescription: "",
        newContract: "",
        newProduct_type: "",
        newDocu_account: "",
        newDocu_name: "",
        newDocu_number: "",
        newDocu_date: "",
        newDocu_subject: "",
        newTax: false,
        newExclude_return: false,
        newNegative_turnover: false,
        newKu_type: "",
        newPay_method: "",
        newOfFIOСounteragent: "",
        newOfPostСounteragent: "",
        newOfDocСounteragent: "",
        newOfFIOEntity: "",
        newOfPostEntity: "",
        newOfDocEntity: "",
        valueCategory_idIn: "",
        valueCategory_nameIn: "",
        valueProducer_nameIn: "",
        valueBrand_nameIn: "",
        valueCategory_idEx: "",
        valueCategory_nameEx: "",
        valueProducer_nameEx: "",
        valueBrand_nameEx: "",
        //селекты для множественного выбора
        multipleSelectionProduct: [],
        multipleSelectionExInvoice: [],
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
        tableDataPercent: [],
        tableDataExInvoiceAll: [],
        tableDataExInvoiceSelect: [],
        tableDataManagerAll: [],
        tableDataManagerSelect: [],
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
        //дизэйбл
        disableButtonsIncluded: false,
        disableButtonsExcluded: false,
        //
        searchExInvoiceNumber: "",
        vendorFilter: "",
        vendors: [],
        //пагинация в таблицах
        pagination: null,
        countRowTable: 100,
        countRowTable2: 950,
        //поиски
        searchProductIncluded: "",
        searchProductExcluded: "",
        //параметры для фильтров при запросах
        filterProductIncluded: {},
        filterProductExcluded: {},
        filterProducerIncluded: {},
        filterProducerExcluded: {},
        filterBrandIncluded: {},
        filterBrandExcluded: {},
        filterVendorValue: {},
        filterCategory: {},
        filterExInvoice: {},

    }),

    getters: {
        // getKu: (state) => state.tableData,
        getExInvoiceAll: (state) => state.tableDataExInvoiceAll,
        getManagerAll: (state) => state.tableDataManagerAll,
        getProducersIn: (state) => state.producerIncluded,
        getBrandsIn: (state) => state.brandIncluded,
        getProductIn: (state) => state.productIncluded,
        getProducersEx: (state) => state.producerIncluded,
        getBrandsEx: (state) => state.brandIncluded,
        getProductEx: (state) => state.productIncluded,
        getEntity: (state) => state.dataEntity,
        getEntityName: (state) => state.newEntityName,
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

        //получение данных о юр.лице для создания
        async fetchKuEntity(data: IEntityIdAndName) {
            try {
                const result = await ENTITY.getEntityByIdAndName(data);
                if (Array.isArray(result)) {
                    this.dataEntity = result;
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
                let allVendors: IVendorId[] = [];
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
                    this.$state.newVendorName = dataVendor.results[0].name;
                    useKuIdStore().setKuIdVendorName(dataVendor.results[0].name)
                    // this.$state.dataVendorName = dataVendor.results;
                    console.log('Получены данные vendorName:', this.$state.newVendorName, useKuIdStore().kuIdVendorName);
                    // console.log('Получены данные dataVendorName:', this.$state.dataVendorName);
                    this.$state.pagination = {
                        count: dataVendor.count,
                        previous: dataVendor.previous,
                        next: dataVendor.next,
                    };
                })
                .catch((error) => Promise.reject(error));
        },
        setFilterValue6<
            T extends keyof GetAllVendorsForEntity,
            U extends GetAllVendorsForEntity[T],
        >(field: T, value: U) {
            this.$state.filterVendorValue[field] = value
        },


        ////////////////////////////////////////////////////////////////////
        setFilterCategory<
            T extends keyof GetAllCategory,
            U extends GetAllCategory[T],
        >(field: T, value: U) {
            this.$state.filterCategory[field] = value
            console.log("filterCategory", this.$state.filterCategory);
        },
        removeFilterCategory<T extends keyof GetAllCategory>(field: T) {
            if (this.$state.filterCategory) {
                delete this.$state.filterCategory[field]
            }
        },
        // Метод для построения дерева
        buildTree(nodes: ITree[], parentCode: string | null = null): ITree[] {
            const parentNode = nodes.filter(node => node.parent_code === parentCode);
            if (!parentNode.length) return []; // Если узел родителя не существует, вернуть пустой массив

            return parentNode.map(node => {
                const children = this.buildTree(nodes, node.classifier_code.toString());
                if (children.length) {
                    node.children = children;
                }
                return node;
            });
        },

        // Метод для загрузки данных
        async fetchCategories() {
            try {
                const vendorId = this.$state.newVendorId; // Получаем vendor_id из состояния хранилища
                console.log("Before API call, vendorId ", vendorId);
                // Передаем vendor_id в запрос
                const result = await CATEGORY.getCategory2({
                    vendor_id: this.$state.filterCategory.vendor_id,
                });
                if (Array.isArray(result)) {
                    this.$state.treeData = this.buildTree(result, '0');
                    console.log("treeData из стора", this.$state.treeData);
                    // this.treeRef && this.treeRef.updateKeyChildren(data.classifier_code, this.treeData);
                } else {
                    this.treeData = [];
                    console.error("Данные не получены или не являются массивом");
                }
                console.log("After API call");
            } catch (error) {
                console.error("Произошла ошибка при получении данных категорий", error);
            }
        },
       
        //получение данных о производителе с фильтром
        async fetchAllProducersForInclided() {
            try {
                let allProducer: IProducer[] = [];
                let nextPage = 1;
                let totalPages = 1;
                while (nextPage <= totalPages) {
                    const producers = await PRODUCER.getProducer({
                        page_size: this.$state.countRowTable2,
                        page: nextPage,
                        l4: this.$state.filterProducerIncluded.l4,
                        vendor_id: this.$state.newVendorId
                    });
                    allProducer = allProducer.concat(producers.results);
                    totalPages = Math.ceil(producers.count / this.$state.countRowTable2);
                    nextPage++;
                }
                console.log("Все данные о производителе:", allProducer);
                this.$state.producerIncluded = allProducer;
                this.$state.producerExcluded = allProducer;
            } catch (error) {
                console.error(
                    "Произошла ошибка при получении данных о производителе",
                    error
                );
                return Promise.reject(error);
            }
        },
        setFilterProducer<
            T extends keyof GetAllProducer,
            U extends GetAllProducer[T],
        >(field: T, value: U) {
            this.$state.filterProducerIncluded[field] = value
            console.log("filterProducerIncluded", this.$state.filterProducerIncluded);
        },

        //получение данных о бренде с фильтром для включенных условий
        async fetchAllBrandsForIncluded() {
            try {
                let allBrands: IBrand[] = [];
                let nextPage = 1;
                let totalPages = 1;
                while (nextPage <= totalPages) {
                    const brands = await BRAND.getBrand({
                        page_size: this.$state.countRowTable2,
                        page: nextPage,
                        producer_name: this.$state.filterBrandIncluded.producer_name,
                        l4: this.$state.filterProducerIncluded.l4,
                        vendor_id: this.$state.newVendorId
                    });
                    allBrands = allBrands.concat(brands.results);
                    totalPages = Math.ceil(brands.count / this.$state.countRowTable2);
                    nextPage++;
                }
                console.log("Все данные о брендах:", allBrands);
                this.$state.brandIncluded = allBrands;
                this.$state.brandExcluded = allBrands;
            } catch (error) {
                console.error(
                    "Произошла ошибка при получении данных о брендах",
                    error
                );
                return Promise.reject(error);
            }
        },
        setFilterBrand<
            T extends keyof GetAllBrands,
            U extends GetAllBrands[T],
        >(field: T, value: U) {
            this.$state.filterBrandIncluded[field] = value
        },

        //получение данных о товарах для условий с фильтром и поиск 
        async getProductFromIncludedWithFilter(page?: number) {
            this.setFilterProductInRequirement('page', page);
            this.setFilterProductInRequirement('search', this.$state.searchProductIncluded);
            this.setFilterProductInRequirement('vendor_id', this.$state.newVendorId);
            await PRODUCT.getProductsList({
                page_size: this.$state.countRowTable,
                page,
                search: this.$state.searchProductIncluded,
                vendor_id: this.$state.newVendorId
            })
                .then((product) => {
                    console.log('Получены данные вкл товаров:', product);
                    this.$state.productIncluded = product.results;
                    // this.$state.productExcluded = product.results;
                    this.$state.pagination = {
                        count: product.count,
                        previous: product.previous,
                        next: product.next,
                    };
                })
                .catch((error) => {
                    console.error('Ошибка при получении данных вкл товаров ку_адд:', error);
                    return Promise.reject(error);
                });
        },
        async performSearchProductIn(searchQuery: string) {
            try {
                this.setSearchProductIn(searchQuery);
                await this.getProductFromIncludedWithFilter();
            } catch (error) {
                console.error('Ошибка при выполнении поиска в вкл товарах ку_адд', error);
            }
        },
        setSearchProductIn(query: string) {
            this.$state.searchProductIncluded = query;
        },
        setFilterProductInRequirement<
            T extends keyof GetAllProducts,
            U extends GetAllProducts[T],
        >(field: T, value: U) {
            this.$state.filterProductIncluded[field] = value
        },


        //////////////////////// ИСКЛЮЧЕННЫЕ УСЛОВИЯ   //////////////////////////////////////////////

        //получение данных о товарах для условий с фильтром и поиск 
        async getProductFromExcludedWithFilter(page?: number) {
            this.setFilterProductEx('page', page);
            this.setFilterProductEx('search', this.$state.searchProductExcluded);
            this.setFilterProductEx('vendor_id', this.$state.newVendorId);
            await PRODUCT.getProductsList({
                page_size: this.$state.countRowTable,
                page,
                search: this.$state.searchProductExcluded,
                vendor_id: this.$state.newVendorId
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
            // Значения v-model при создании
            this.newType = '',
                this.newEntityId = '';
            this.newEntityName = '';
            this.newVendorId = '';
            this.newVendorName = '';
            this.newDateStart = '';
            this.newDateEnd = '';
            this.newDateActual = '';
            this.newDescription = '';
            this.newContract = '';
            this.newProduct_type = '';
            this.newDocu_account = '';
            this.newDocu_name = '';
            this.newDocu_number = '';
            this.newDocu_date = '';
            this.newDocu_subject = '';
            this.newTax = false;
            this.newExclude_return = false;
            this.newNegative_turnover = false;
            this.newKu_type = '';
            this.newPay_method = '';
            this.valueCategory_idIn = '';
            this.valueCategory_nameIn = '';
            this.valueProducer_nameIn = '';
            this.valueBrand_nameIn = '';
            this.valueCategory_idEx = '';
            this.valueCategory_nameEx = '';
            this.valueProducer_nameEx = '';
            this.valueBrand_nameEx = '';

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

            // Сбрасываем флаги дизейбла кнопок
            this.disableButtonsIncluded = false;
            this.disableButtonsExcluded = false;

            // Сбрасываем значения поисковых строк
            this.searchProductIncluded = '';
            this.searchProductExcluded = '';
        }
    }
});
