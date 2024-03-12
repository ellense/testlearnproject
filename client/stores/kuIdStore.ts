import { defineStore } from "pinia";
import { useKuAddStore } from "~~/stores/kuAddStore";
import dayjs from "dayjs";
import type {
    IProduct,
    IKuIdStore,
    GetAllVendorsForEntity
} from "~/utils/types/directoryTypes";

export const useKuIdStore = defineStore("KuIdStore", {
    state: (): IKuIdStore => ({
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
        kuIdCategory_idIn: "",
        kuIdCategory_nameIn: "",
        kuIdProducer_nameIn: "",
        kuIdBrand_nameIn: "",
        kuIdCategory_idEx: "",
        kuIdCategory_nameEx: "",
        kuIdProducer_nameEx: "",
        kuIdBrand_nameEx: "",
        
        //дизэйбл
        disableButtons: false,
        //пагинация в таблицах
        pagination: null,
        countRowTable: 20,
        //
        multipleSelectionProduct: [],
        multipleSelectionExInvoice: [],
        multipleTableRef: null,
        filterVendorValue: {},

    }),

    getters: {
        getKuRequirement: (state) => state.tableDataInRequirement,
    },

    actions: {
        setKuIdVendorName(name:string){
            this.kuIdVendorName = name;
        },
        handleSelectionChangeProduct(val: IProduct[]) {
            this.multipleSelectionProduct = val;
        },
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
        async getKuRequirementDetailFromApi(kuId: string) {
            try {
                const results = await KU.getInfoRequirements({
                    ku_id: kuId,
                });
                this.$state.tableDataInRequirement = results
                console.log("полученная таблица условий ку:", this.tableDataInRequirement)
                console.log("успешно получили данные условий:", results);
            } catch (error) {
                console.error("Ошибка при получении данных условий:", error);
            }
        },
    },

})


