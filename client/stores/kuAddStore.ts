import { defineStore } from "pinia";

import type {
    IKuList,
    IEntityIdAndName,
    GetAllProducer,
    IProducer,
    GetAllProducts,
    IProduct,
    GetAllBrands,
    IVendorIdAndName,
    IBrand,
    GetAllVendorsForEntity,
    IKuAddStore,
} from "~/utils/types/directoryTypes";

export const useKuAddStore = defineStore("KuAddStore", {
    state: (): IKuAddStore => ({
        //v-model атрибутов при создании
        newPercent: null,
        newType: "",
        entityName: [],
        vendorName: "",
        newDateStart: new Date(),
        newDateEnd: new Date(),
        newDateActual: new Date(),
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
        dataEntity: [],
        dataVendor: [],
        treeData: [],
        treeRef: null,
        //v-model диалоговых форм
        dialogFormProductInVisible: false,
        dialogFormCategoryInVisible: false,
        dialogFormProductExVisible: false,
        dialogFormCategoryExVisible: false,
        //дизэйбл
        disableButtonsIncluded: false,
        disableButtonsExcluded: false,
        //
        vendorFilter: "",
        // kuFilter: null,
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
        getProducersIn: (state) => state.producerIncluded,
        getBrandsIn: (state) => state.brandIncluded,
        getProductIn: (state) => state.productIncluded,
        getProducersEx: (state) => state.producerIncluded,
        getBrandsEx: (state) => state.brandIncluded,
        getProductEx: (state) => state.productIncluded,
        getEntity: (state) => state.dataEntity,
        getEntityName: (state) => state.entityName,
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

        async fetchAllVendorsListForEntity() {
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
                this.$state.dataVendor = allVendors;
            } catch (error) {
                console.error(
                    "Произошла ошибка при получении данных о поставщиках",
                    error
                );
                return Promise.reject(error);
            }
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
                        vendor_id: this.$state.vendorName
                    });
                    allProducer = allProducer.concat(producers.results);
                    totalPages = Math.ceil(producers.count / this.$state.countRowTable2);
                    nextPage++;
                }
                console.log("Все данные о производителе:", allProducer);
                this.$state.producerIncluded = allProducer;
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
                        vendor_id: this.$state.vendorName
                    });
                    allBrands = allBrands.concat(brands.results);
                    totalPages = Math.ceil(brands.count / this.$state.countRowTable2);
                    nextPage++;
                }
                console.log("Все данные о брендах:", allBrands);
                this.$state.brandIncluded = allBrands;
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
            this.setFilterValue3('vendor_id', this.$state.vendorName);
            await PRODUCT.getProductsList({
                page_size: this.$state.countRowTable,
                page,
                search: this.$state.searchProductIncluded,
                vendor_id: this.$state.vendorName
            })
                .then((product) => {
                    console.log('Получены данные товаров:', product);
                    this.$state.productIncluded = product.results;
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
        async performSearchProductIn(searchQuery: string) {
            try {
                this.setSearchProductIn(searchQuery);
                await this.getProductFromIncludedWithFilter();
            } catch (error) {
                console.error('Ошибка при выполнении поиска', error);
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
        async fetchAllProducersForExcluded() {
            try {
                let allProducer: IProducer[] = [];
                let nextPage = 1;
                let totalPages = 1;
                while (nextPage <= totalPages) {
                    const producers = await PRODUCER.getProducer({
                        page_size: this.$state.countRowTable2,
                        page: nextPage,
                        l4: this.$state.filterProducerExcluded.l4,
                        vendor_id: this.$state.vendorName
                    });
                    allProducer = allProducer.concat(producers.results);
                    totalPages = Math.ceil(producers.count / this.$state.countRowTable2);
                    nextPage++;
                }
                console.log("Все данные о производителе:", allProducer);
                this.$state.producerExcluded = allProducer;
            } catch (error) {
                console.error(
                    "Произошла ошибка при получении данных о производителе",
                    error
                );
                return Promise.reject(error);
            }
        },
        setFilterValue8<
            T extends keyof GetAllProducer,
            U extends GetAllProducer[T],
        >(field: T, value: U) {
            this.$state.filterProducerExcluded[field] = value
        },

        //получение данных о бренде с фильтром для включенных условий
        async fetchAllBrandsForExcluded() {
            try {
                let allBrands: IBrand[] = [];
                let nextPage = 1;
                let totalPages = 1;
                while (nextPage <= totalPages) {
                    const brands = await BRAND.getBrand({
                        page_size: this.$state.countRowTable2,
                        page: nextPage,
                        producer_name: this.$state.filterBrandExcluded.producer_name,
                        l4: this.$state.filterProducerExcluded.l4,
                        vendor_id: this.$state.vendorName
                    });
                    allBrands = allBrands.concat(brands.results);
                    totalPages = Math.ceil(brands.count / this.$state.countRowTable2);
                    nextPage++;
                }
                console.log("Все данные о брендах:", allBrands);
                this.$state.brandExcluded = allBrands;
            } catch (error) {
                console.error(
                    "Произошла ошибка при получении данных о брендах",
                    error
                );
                return Promise.reject(error);
            }
        },
        setFilterValue7<
            T extends keyof GetAllBrands,
            U extends GetAllBrands[T],
        >(field: T, value: U) {
            this.$state.filterBrandExcluded[field] = value
        },
        //получение данных о товарах для условий с фильтром и поиск 
        async getProductFromExcludedWithFilter(page?: number) {
            this.setFilterValue9('page', page);
            this.setFilterValue9('search', this.$state.searchProductExcluded);
            this.setFilterValue9('vendor_id', this.$state.vendorName);
            await PRODUCT.getProductsList({
                page_size: this.$state.countRowTable,
                page,
                search: this.$state.searchProductExcluded,
                vendor_id: this.$state.vendorName
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
                console.error('Ошибка при выполнении поиска', error);
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
