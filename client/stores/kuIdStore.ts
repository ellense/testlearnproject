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
        tableDataRequirement: [],
        dataEntity: [],
        dataVendor: [],
        dataInfoKu: [],
        //v-model атрибутов
        ku_id: "",
        kuIdPercent: null,
        kuIdPeriod: "",
        kuIdEntityName: "",
        kuIdVendorName: "",
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

        multipleSelectionProduct: [],
        multipleTableRef: null,

    }),

    getters: {
    },

    actions: {
        handleSelectionChangeProduct(val: IProduct[]) {
            this.multipleSelectionProduct = val;
        },
        // async getLegalEntityFromApi(kuId: string) {
        //     console.log('Запрос данных о юридических лицах...');
        //     await KU.getInfoKu({
        //         ku_id: kuId,
        //     }).then((tableData) => {
        //         console.log('Получены данные ку:', tableData);
        //         this.$state.dataInfoKu = tableData.results;
        //     }).catch((error) => {
        //         console.error('Ошибка при получении данных ку_айди:', error);
        //         return Promise.reject(error);
        //     });
        // },
        async getKuDetailFromApi(kuId: string) {
            try {
                const results = await KU.getInfoKu({
                    ku_id: kuId,
                });
                this.$state.ku_id = results.ku_id;
                this.$state.kuIdPercent = results.percent;
                this.$state.kuIdPeriod = results.period;
                this.$state.kuIdEntityName = results.entity_name;
                this.$state.kuIdVendorName = "results.vendor_name";
                this.$state.kuIdDateStart = dayjs(results.date_start).format("DD.MM.YYYY");
                this.$state.kuIdDateEnd = new Date(results.date_start);
                console.log("детально", this.kuIdPercent, this.$state.kuIdPeriod, this.$state.kuIdEntityName, this.$state.kuIdVendorName, this.$state.kuIdDateStart, this.$state.kuIdDateEnd)
                console.log("успешно получили данные ку_айди", results);
            } catch (error) {
                console.error("Ошибка при получении данных ку_айди:", error);
            }
        },
    },

})


