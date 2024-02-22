import type { ReportStore } from "~/utils/types/directoryTypes";

export const useReportStore = defineStore("ReportStore", {
    state: (): ReportStore => ({
        dialogForm: false,
        graphic: [],
        invoices: [],
        getGraphicDone: true,
        printReportToggle: false,
        filterValue: {}
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
        async getInvoiceDetailForGraphicFromApi(grapId: number | null) {
            try {
                const results = await GRAPHIC.getInfoInvoicesForGraphic({
                    graph_id: grapId,
                });
                this.$state.invoices = [results];
                console.log("успешно получили данные invoice for grapgic", results);
                console.log("добавили данные в invoices[] ", this.$state.graphic);
            } catch (error) {
                console.error("Ошибка при получении данных invoice for grapgic:", error);
            }
        },
    }
})
