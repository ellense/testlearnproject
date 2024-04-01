import { defineStore } from "pinia";
import { useKuAddStore } from "~~/stores/kuAddStore";
import type {
    IProduct,
    IKuIdStore,
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
        countRowTable: 100,
        //
        multipleSelectionProduct: [],
        multipleSelectionExInvoice: [],
        multipleTableRef: null,
        filterVendorValue: {},

    }),

    getters: {
        getKuInRequirement: (state) => state.tableDataInRequirement,
        getKuExRequirement: (state) => state.tableDataExRequirement,
        getPercent: (state) => state.tableDataPercent,
        getIExInvoiceForKu: (state) => state.tableDataExInvoiceSelect,
    },

    actions: {
        setKuIdVendorName(name: string) {
            this.kuIdVendorName = name;
        },
        handleSelectionChangeProduct(val: IProduct[]) {
            this.multipleSelectionProduct = val;
        },
        //получение ku_id
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
                this.$state.kuIdDescription = results.description;
                this.$state.kuIdContract = results.contract;
                this.$state.kuIdProduct_type = results.product_type;
                this.$state.kuIdDocu_account = results.docu_account;
                this.$state.kuIdDocu_name = results.docu_name;
                this.$state.kuIdDocu_number = results.docu_number;
                this.$state.kuIdDocu_date = new Date(results.docu_date)
                this.$state.kuIdDocu_subject= results.docu_subject;
                this.$state.kuIdTax= results.tax;
                this.$state.kuIdExclude_return= results.exclude_return;
                this.$state.kuIdNegative_turnover= results.negative_turnover;
                this.$state.kuIdKu_type= results.ku_type;
                this.$state.kuIdPay_method= results.pay_method;

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
        async fetchInRequirementForKuId(ku_id?: string, page?: number) {
            await KU.getKuInRequirements({ ku_id,page_size: this.$state.countRowTable,
                page,
            })
              .then((tableData) => {
                console.log('Получены данные вкл условий ку_айди:', tableData);
                this.$state.tableDataInRequirement = tableData.results;
                console.log('tableDataInRequirement:', this.$state.tableDataInRequirement);
                this.$state.pagination = {
                    count: tableData.count,
                    previous: tableData.previous,
                    next: tableData.next,
                  };
              })
              .catch((error) => {
                console.error('Ошибка при получении данных вкл условий ку_айди:', error);
                return Promise.reject(error);
              });
          },
          async fetchExRequirementForKuId(ku_id?: string, page?: number) {
            await KU.getKuExRequirements({ ku_id,page_size: this.$state.countRowTable,
                page,
            })
              .then((tableData) => {
                console.log('Получены данные искл условий ку_айди:', tableData);
                this.$state.tableDataExRequirement = tableData.results;
                console.log('tableDataExRequirement:', this.$state.tableDataExRequirement);
                this.$state.pagination = {
                    count: tableData.count,
                    previous: tableData.previous,
                    next: tableData.next,
                  };
              })
              .catch((error) => {
                console.error('Ошибка при получении данных искл условий ку_айди:', error);
                return Promise.reject(error);
              });
          },
        //получение бонуса ku_id
          async fetchBonusForKuId(ku_id?: string, page?: number) {
            await KU.getKuRequirementBonus({ ku_id,page_size: this.$state.countRowTable,
                page,
            })
              .then((tableData) => {
                console.log('Получены данные бонуса ку_айди:', tableData);
                this.$state.tableDataPercent = tableData.results;
                console.log('tableDataPercent:', this.$state.tableDataPercent);
                this.$state.pagination = {
                    count: tableData.count,
                    previous: tableData.previous,
                    next: tableData.next,
                  };
              })
              .catch((error) => {
                console.error('Ошибка при получении данных бонуса ку_айди:', error);
                return Promise.reject(error);
              });
          },
          //получение искл. накладных ku_id
          async fetchExInvoiceForKuId(ku_id?: string, page?: number) {
            await KU.getKuExInvoiceForKuId({ ku_id,page_size: this.$state.countRowTable,
                page,
            })
              .then((tableData) => {
                console.log('Получены данные искл накладных ку_айди:', tableData);
                this.$state.tableDataExInvoiceSelect = tableData.results;
                console.log('tableDataExInvoiceSelect:', this.$state.tableDataExInvoiceSelect);
                this.$state.pagination = {
                    count: tableData.count,
                    previous: tableData.previous,
                    next: tableData.next,
                  };
              })
              .catch((error) => {
                console.error('Ошибка при получении данных искл накладных ку_айди:', error);
                return Promise.reject(error);
              });
          },
        // async getKuRequirementDetailFromApi(kuId: string) {
        //     try {
        //         const results = await KU.getInfoRequirements({
        //             ku_id: kuId,
        //         });

        //         // Очищаем массив перед добавлением новых данных
        //         this.$state.tableDataInRequirement = [];

        //         // Перебираем полученные результаты и добавляем их в массив
        //         for (const item of results) {
        //             this.$state.tableDataInRequirement.push(item);
        //         }

        //         console.log("полученная таблица условий ку:", this.tableDataInRequirement);
        //         console.log("успешно получили данные условий:", results);
        //     } catch (error) {
        //         console.error("Ошибка при получении данных условий:", error);
        //     }
        // },
        clearData() {
            // Очищаем таблицу условий
            this.tableDataInRequirement.length = 0;
            this.tableDataExRequirement.length = 0;
            this.tableDataPercent.length = 0;
            // Сбрасываем флаги видимости диалоговых окон
            this.dialogFormExInvoiceVisible = false;
            this.dialogFormProductInVisible = false;
            this.dialogFormCategoryInVisible = false;
            this.dialogFormProductExVisible = false;
            this.dialogFormCategoryExVisible = false;

            // Сбрасываем флаги дизейбла кнопок
            this.disableButtonsIncluded = false;
            this.disableButtonsExcluded = false;

            // Сбрасываем значения поисковых строк
            this.searchProductIncluded = '';
            this.searchProductExcluded = '';

            // Сбрасываем значения в моделях данных
            this.ku_id = '';
            this.kuIdStatus = '';
            this.kuIdType = '';
            this.kuIdEntityId = '';
            this.kuIdEntityName = '';
            this.kuIdVendorId = '';
            this.kuIdVendorName = '';
            this.kuIdDateStart = '';
            this.kuIdDateEnd = '';
            this.kuIdDateActual = '';
            this.kuIdDescription = '';
            this.kuIdContract = '';
            this.kuIdProduct_type = '';
            this.kuIdDocu_account = '';
            this.kuIdDocu_name = '';
            this.kuIdDocu_number = '';
            this.kuIdDocu_date = '';
            this.kuIdDocu_subject = '';
            this.kuIdTax = false;
            this.kuIdExclude_return = false;
            this.kuIdNegative_turnover = false;
            this.kuIdKu_type = '';
            this.kuIdPay_method = '';
            this.kuIdCategory_idIn = '';
            this.kuIdCategory_nameIn = '';
            this.kuIdProducer_nameIn = '';
            this.kuIdBrand_nameIn = '';
            this.kuIdCategory_idEx = '';
            this.kuIdCategory_nameEx = '';
            this.kuIdProducer_nameEx = '';
            this.kuIdBrand_nameEx = '';

            // Сбрасываем флаг дизейбла кнопок
            this.disableButtons = false;
        }
    },

})


