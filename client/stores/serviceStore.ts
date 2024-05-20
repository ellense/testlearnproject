import { defineStore } from "pinia";
import type { IParamServices } from "~/utils/types/serviceTypes";
import type { IServiceStore } from "~/utils/types/storesTypes";

export const useServiceStore = defineStore("IServiceStore", {
    state: (): IServiceStore => ({
        tableDataPlace: [],
        tableDataPricelist: [],
        tableDataArticle: [],
        tableDataService: [],
        tableDataServiceAndArticleSelect: [],
        pagination: null,
        countRowTable: 100,

        searchService: "",
        searchArticle: "",
        searchPlace: "",
        searchPricelist: "",

        sortProp: "",
        sortOrder: "",

        dialogFormPlaceVisible: false,
        dialogFormPricelistVisible: false,
        dialogFormArticleVisible: false,
        dialogFormServiceVisible: false,
        dialogFormServiceAndArticleSelectVisible: false,

        newService_id: "",
        newService_name: "",
        newArticle_id: "",
        newArticle_name: "",
        newPriceDate: "",
        newPriceExpiration_date: "",
        newPriceCost: null,
        newPricMeasure_unit: "",
        newPriceArticle_id: "",
        newPriceArticle_name: "",
        newShop_id: "",
        newShop_name: "",
        newAddress: "",

        filterValueService: {},
        filterValuePlace: {},
        filterValuePricelist: {},
        filterValueArticle: {},
    }),

    getters: {
        getPlace: (state) => state.tableDataPlace,
        getPricelist: (state) => state.tableDataPricelist,
        getArticle: (state) => state.tableDataArticle,
        getService: (state) => state.tableDataService,
        getServiceAndArticleSelect: (state) => state.tableDataServiceAndArticleSelect,
    },

    actions: {
        //для пагинации
        setCountRowTable(count: number) {
            this.$state.countRowTable = count;
        },


        //получение услуг
        async getServiceFromAPIWithFilter(page?: number, sort_by?: string, sort_order?: string) {
            this.setFilterValueServices('page', page);
            this.setFilterValueServices('search', this.$state.searchService);
            this.setFilterValueServices('sort_by', sort_by);
            this.setFilterValueServices('sort_order', sort_order);
            await SERVICE.getServiceList({
                page_size: this.$state.countRowTable,
                page,
                search: this.$state.searchService,
                sort_by,
                sort_order,
            })
                .then((tableData) => {
                    console.log('Получены данные услуг:', tableData);
                    this.$state.tableDataService = tableData.results;
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
            this.$state.filterValueService[field] = value
        },
        //для поиска 
        async performSearchService(searchQuery: string) {
            try {
                this.setSearchQueryService(searchQuery);
                await this.getServiceFromAPIWithFilter();
            } catch (error) {
                console.error('Ошибка при выполнении поиска', error);
            }
        },

        setSearchQueryService(query: string) {
            this.$state.searchService = query;
        },

        //получение статей услуг
        async getArticleFromAPIWithFilter(page?: number, sort_by?: string, sort_order?: string) {
            this.setFilterValueArticle('page', page);
            this.setFilterValueArticle('search', this.$state.searchArticle);
            this.setFilterValueArticle('sort_by', sort_by);
            this.setFilterValueArticle('sort_order', sort_order);
            await SERVICE.getArticleList({
                page_size: this.$state.countRowTable,
                page,
                search: this.$state.searchArticle,
                sort_by,
                sort_order,
            })
                .then((tableData) => {
                    console.log('Получены данные статей услуг:', tableData);
                    this.$state.tableDataArticle = tableData.results;
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
            this.$state.filterValueArticle[field] = value
        },
        //для поиска 
        async performSearchArticle(searchQuery: string) {
            try {
                this.setSearchQueryArticle(searchQuery);
                await this.getArticleFromAPIWithFilter();
            } catch (error) {
                console.error('Ошибка при выполнении поиска', error);
            }
        },

        setSearchQueryArticle(query: string) {
            this.$state.searchArticle = query;
        },

        //получение прайслиста
        async getPricelistFromAPIWithFilter(page?: number, sort_by?: string, sort_order?: string) {
            this.setFilterValuePricelist('page', page);
            this.setFilterValuePricelist('search', this.$state.searchPricelist);
            this.setFilterValuePricelist('sort_by', sort_by);
            this.setFilterValuePricelist('sort_order', sort_order);
            await SERVICE.getPricelistList({
                page_size: this.$state.countRowTable,
                page,
                search: this.$state.searchPricelist,
                sort_by,
                sort_order,
            })
                .then((tableData) => {
                    console.log('Получены данные прайслиста:', tableData);
                    this.$state.tableDataPricelist = tableData.results;
                    this.$state.pagination = {
                        count: tableData.count,
                        previous: tableData.previous,
                        next: tableData.next,
                    };
                })
                .catch((error) => Promise.reject(error));
        },

        setFilterValuePricelist<
            T extends keyof IParamServices,
            U extends IParamServices[T],
        >(field: T, value: U) {
            this.$state.filterValuePricelist[field] = value
        },
        //для поиска 
        async performSearchPricelist(searchQuery: string) {
            try {
                this.setSearchQueryPricelist(searchQuery);
                await this.getPricelistFromAPIWithFilter();
            } catch (error) {
                console.error('Ошибка при выполнении поиска', error);
            }
        },

        setSearchQueryPricelist(query: string) {
            this.$state.searchPricelist = query;
        },

        //получение мест оказания услуг
        async getPlaceFromAPIWithFilter(page?: number, sort_by?: string, sort_order?: string) {
            this.setFilterValuePlace('page', page);
            this.setFilterValuePlace('search', this.$state.searchPlace);
            this.setFilterValuePlace('sort_by', sort_by);
            this.setFilterValuePlace('sort_order', sort_order);
            await SERVICE.getPlaceList({
                page_size: this.$state.countRowTable,
                page,
                search: this.$state.searchPlace,
                sort_by,
                sort_order,
            })
                .then((tableData) => {
                    console.log('Получены данные мест оказания услуг:', tableData);
                    this.$state.tableDataPlace = tableData.results;
                    this.$state.pagination = {
                        count: tableData.count,
                        previous: tableData.previous,
                        next: tableData.next,
                    };
                })
                .catch((error) => Promise.reject(error));
        },

        setFilterValuePlace<
            T extends keyof IParamServices,
            U extends IParamServices[T],
        >(field: T, value: U) {
            this.$state.filterValuePlace[field] = value
        },
        //для поиска 
        async performSearchPlace(searchQuery: string) {
            try {
                this.setSearchQueryPlace(searchQuery);
                await this.getPlaceFromAPIWithFilter();
            } catch (error) {
                console.error('Ошибка при выполнении поиска', error);
            }
        },

        setSearchQueryPlace(query: string) {
            this.$state.searchPlace = query;
        },
    },
});