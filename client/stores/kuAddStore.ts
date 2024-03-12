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
    IInvoiceForKu,
} from "~/utils/types/directoryTypes";
import useStore from "element-plus/es/components/table/src/store/index.mjs";

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
        dataEntity: [],
        dataVendorId: [],
        dataVendorName: [],
        treeData: [],
        treeRef: null,
        //v-model диалоговых форм
        dialogFormExInvoiceVisible: false,
        dialogFormProductInVisible: false,
        dialogFormCategoryInVisible: false,
        dialogFormProductExVisible: false,
        dialogFormCategoryExVisible: false,
        //дизэйбл
        disableButtonsIncluded: false,
        disableButtonsExcluded: false,
        //
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


    }),

    getters: {
        // getKu: (state) => state.tableData,
        getExInvoiceAll: (state) => state.tableDataExInvoiceAll,
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
        handleSelectionChangeExInvoice(val: IInvoiceForKu[]) {
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


        ////////////////////// ВКЛЮЧЕННЫЕ УСЛОВИЯ ///////////////////////////////////////
        //дерево

        // async buildTree(nodes: ITree[], parentCode: string | null = null): Promise<ITree[]> {
        //   const parentNode = nodes.filter(node => node.parent_code === parentCode);
        //   if (!parentNode.length) return [];

        //   return parentNode.map(async node => {
        //     const children =  this.buildTree(nodes, node.classifier_code.toString());
        //     if (children.length) {
        //       node.children = children;
        //     }
        //     return node;
        //   });
        // },

        // async fetchData(data: ITree) {
        //   try {
        //     const result = await CATEGORY.getCategory(data);
        //     if (Array.isArray(result)) {
        //       this.treeData = await this.buildTree(result, '0');
        //       console.log("treeData", this.treeData);
        //       if (this.treeRef) {
        //         this.treeRef.updateKeyChildren(data.classifier_code, this.treeData);
        //       }
        //     } else {
        //       this.treeData = [];
        //       console.error("Данные не получены или не являются массивом");
        //     }
        //   } catch (error) {
        //     console.error("Произошла ошибка при получении данных категорий", error);
        //   }
        // },


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
        setFilterValue4<
            T extends keyof GetAllProducer,
            U extends GetAllProducer[T],
        >(field: T, value: U) {
            this.$state.filterProducerIncluded[field] = value
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
        setFilterValue5<
            T extends keyof GetAllBrands,
            U extends GetAllBrands[T],
        >(field: T, value: U) {
            this.$state.filterBrandIncluded[field] = value
        },

        //получение данных о товарах для условий с фильтром и поиск 
        async getProductFromIncludedWithFilter(page?: number) {
            this.setFilterValue3('page', page);
            this.setFilterValue3('search', this.$state.searchProductIncluded);
            this.setFilterValue3('vendor_id', this.$state.newVendorId);
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
        setFilterValue3<
            T extends keyof GetAllProducts,
            U extends GetAllProducts[T],
        >(field: T, value: U) {
            this.$state.filterProductIncluded[field] = value
        },


        //////////////////////// ИСКЛЮЧЕННЫЕ УСЛОВИЯ   //////////////////////////////////////////////

        //получение данных о товарах для условий с фильтром и поиск 
        async getProductFromExcludedWithFilter(page?: number) {
            this.setFilterValue9('page', page);
            this.setFilterValue9('search', this.$state.searchProductExcluded);
            this.setFilterValue9('vendor_id', this.$state.newVendorId);
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
        setFilterValue9<
            T extends keyof GetAllProducts,
            U extends GetAllProducts[T],
        >(field: T, value: U) {
            this.$state.filterProductExcluded[field] = value
        },


    }
});
