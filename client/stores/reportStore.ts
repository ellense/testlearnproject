import type { GetAllInvoicesForGraphic, GraphicForExcelReportInvoice, ReportStore } from "~/utils/types/directoryTypes";

export const useReportStore = defineStore("ReportStore", {
    state: (): ReportStore => ({
        dialogForm: false,
        pagination: null,
        countRowTable: 800,
        graphic: [],
        invoices: [],
        getGraphicDone: true,
        printReportToggle: false,
        filterValueInvoice: {}
    }),

    getters: {
        getGraphicInfo: (state) => state.graphic,
        getInvoiceInfo: (state) => state.invoices,
    },

    actions: {
        async getGraphicDetailFromApi(grapId: number | null) {
            try {
                const results = await GRAPHIC.getInfoGraphic({
                    graph_id: grapId,
                });
                this.$state.graphic = [results];
                console.log("успешно получили данные график_айди", results);
                console.log("добавили данные в graphic[] ", this.$state.graphic);
            } catch (error) {
                console.error("Ошибка при получении данных график_айди:", error);
            }
        },

        setFilterValueInvoices<
            T extends keyof GetAllInvoicesForGraphic,
            U extends GetAllInvoicesForGraphic[T],
        >(field: T, value: U) {
            this.$state.filterValueInvoice[field] = value
        },

        // async getInvoiceDetailForGraphicFromAPIWithFilter(graph_id?: number | null) {
        //     this.setFilterValueInvoices('graph_id', graph_id);
        //     try {
        //         const invoices = await GRAPHIC.getInfoInvoicesForGraphic({ graph_id, });
        //         console.log('успешно получили данные invoice for grapgic', invoices);
        //         this.$state.invoices = invoices.results;
        //         console.log("добавили данные в invoices[] ", this.$state.invoices);
        //         // Добавить этот лог, чтобы проверить значение после установки
        //         console.log("значение this.$state.invoices после установки:", this.$state.invoices);
        //     } catch (error) {
        //         console.error('Ошибка при получении данных invoice for grapgic:', error);
        //         return Promise.reject(error);
        //     }
        // },












        // async getInvoiceDetailForGraphicFromAPIWithFilter(graph_id?: number | null, page?: number) {
        //     this.setFilterValueInvoices('graph_id', graph_id);
        //     this.setFilterValueInvoices('page', page);
        //     await GRAPHIC.getInfoInvoicesForGraphic({
        //         graph_id,
        //         page_size: this.$state.countRowTable,
        //         page,
        //     })
        //         .then((invoices) => {
        //             console.log('успешно получили данные invoice for grapgic', invoices);
        //             this.$state.invoices = invoices.results;
        //             console.log("добавили данные в invoices[] ", this.$state.invoices);
        //             this.$state.pagination = {
        //                 count: invoices.count,
        //                 previous: invoices.previous,
        //                 next: invoices.next,
        //               };
        //         })
        //         .catch((error) => {
        //             console.error('Ошибка при получении данных invoice for grapgic:', error);
        //             return Promise.reject(error);
        //         });
        // },
        async fetchAllInvoices(graph_id?: number | null,) {
            try {
              let allProducer: GraphicForExcelReportInvoice[] = [];
              let nextPage = 1;
              let totalPages = 1;
              while (nextPage <= totalPages) {
                const producers = await GRAPHIC.getInfoInvoicesForGraphic({
                  page_size: this.$state.countRowTable,
                  page: nextPage,
                  graph_id,
                });
                allProducer = allProducer.concat(producers.results);
                totalPages = Math.ceil(producers.count / this.$state.countRowTable);
                nextPage++;
              }
              console.log("Все данные о invoice for grapgic", allProducer);
              this.$state.invoices = allProducer;
            } catch (error) {
              console.error(
                "Ошибка при получении данных invoice for grapgic",
                error
              );
              return Promise.reject(error);
            }
          },















        // async getInvoiceDetailForGraphicFromApi(grapId: number | null) {
        //     try {
        //         const results = await GRAPHIC.getInfoInvoicesForGraphic({
        //             graph_id: grapId,
        //         });
        //         this.$state.invoices = [results];
        //         console.log("успешно получили данные invoice for grapgic", results);
        //         console.log("добавили данные в invoices[] ", this.$state.graphic);
        //     } catch (error) {
        //         console.error("Ошибка при получении данных invoice for grapgic:", error);
        //     }
        // },




        // async getGraphicsFromAPIWithFilter(page?: number) {
        //     this.setFilterValue2('page', page);
        //     this.setFilterValue2('search', this.$state.search2);
        //     await GRAPHIC.getGraphic({
        //         page_size: this.$state.countRowTable,
        //         page,
        //         entity_id: this.$state.filterGraphicValue?.entity_id || [],
        //         ku_id: this.$state.filterGraphicValue?.ku_id || [],
        //         search: this.$state.search2,
        //     })
        //         .then((dataGraphic) => {
        //             this.$state.dataGraphic = dataGraphic.results;
        //             this.$state.pagination = {
        //                 count: dataGraphic.count,
        //                 previous: dataGraphic.previous,
        //                 next: dataGraphic.next,
        //             };
        //         })
        //         .catch((error) => Promise.reject(error));
        // },

    }
})
