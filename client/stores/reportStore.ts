import type { ReportStore } from "~/utils/types/directoryTypes";

export const useReportStore = defineStore("ReportStore", {
    state: (): ReportStore => ({
        dialogForm: false,
        graphic: [],
        getGraphicDone: true,
        printReportToggle: false,
        filterValue: {}
    }),
  
    getters: {
    },
  
    actions: {
    }
})