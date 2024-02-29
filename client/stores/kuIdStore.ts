import { defineStore } from "pinia";
import dayjs from "dayjs";
import type {
    IProduct,
    IKuIdStore
} from "~/utils/types/directoryTypes";

export const useKuIdStore = defineStore("KuIdStore", {
    state: (): IKuIdStore => ({
        //данные 
        brand: [],
        producer: [],
        product: [],
        tableDataInRequirement: [],
        dataEntity: [],
        dataVendor: [],
        dataInfoKu: [],
        //v-model атрибутов
        ku_id: "",
        kuIdStatus: "",
        kuIdPercent: null,
        kuIdPeriod: "",
        kuIdEntityName: {
            entity_id: [],
            entity_name: "",
        },
        kuIdVendorName: {
            vendor_id: "",
            vendor_name: "",
        },
        kuIdDateStart: new Date(),
        kuIdDateEnd: new Date(),
        kuIdCategory_id: "",
        kuIdCategory_name: "",
        kuIdProducer_name: "",
        kuIdBrand_name: "",
        //v-model диалоговых форм
        dialogFormProductVisible: false,
        dialogFormCategoryVisible: false,
        //дизэйбл
        disableButtons: false,
        //пагинация в таблицах
        pagination: null,
        countRowTable: 20,
        //
        multipleSelectionProduct: [],
        multipleTableRef: null,

    }),

    getters: {
    },

    actions: {
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
                this.$state.kuIdPercent = results.percent;
                this.$state.kuIdPeriod = results.period;
                this.$state.kuIdEntityName = {
                    entity_id: [results.entity_id],
                    entity_name: results.entity_name
                };
                this.$state.kuIdVendorName = {
                    vendor_id: results.vendor_id,
                    vendor_name: results.vendor_name
                };
                this.$state.kuIdDateStart = new Date(results.date_start);
                this.$state.kuIdDateEnd = new Date(results.date_end);
                console.log("детально", this.kuIdPercent, this.$state.kuIdPeriod, this.$state.kuIdEntityName, this.$state.kuIdVendorName, this.$state.kuIdDateStart, this.$state.kuIdDateEnd)
                console.log("успешно получили данные ку_айди", results);
            } catch (error) {
                console.error("Ошибка при получении данных ку_айди:", error);
            }
        },
        // async getKuRequirementDetailFromApi(kuId: string) {
        //     try {
        //         const results = await KU.getInfoRequirements({
        //             ku_id: kuId,
        //         });
        //         this.$state.tableDataInRequirement = results
        //         console.log("полученная таблица условий ку:", this.tableDataInRequirement)
        //         console.log("успешно получили данные условий:", results);
        //     } catch (error) {
        //         console.error("Ошибка при получении данных условий:", error);
        //     }
        // },
        async fetchVendorsListForEntity(page?: number) {
            try {
                const vendors = await VENDOR.getVendorsForEntityInKU({
                    page_size: this.$state.countRowTable,
                    page,
                    entity_id: this.$state.kuIdEntityName.entity_id
                });
                this.$state.dataVendor = vendors.results;
                this.$state.pagination = {
                    count: vendors.count,
                    previous: vendors.previous,
                    next: vendors.next,
                };
                console.log("Все данные о поставщиках для юридического лица:", vendors.results);
            } catch (error) {
                console.error(
                    "Произошла ошибка при получении данных о поставщиках для юридического лица",
                    error
                );
                return Promise.reject(error);
            }
        },
    },

})


