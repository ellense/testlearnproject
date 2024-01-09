import { defineStore } from "pinia";

import type { IKu, IGraphic } from "~/utils/types/directoryTypes";

export const useKuTableStore = defineStore("KuTableStore", {
  state: () => ({
    newPercent: null,
    newType: "",
    vendorName: "",
    newDateStart: new Date(),
    newDateEnd: new Date(),
    newDateActual: new Date(),
    multipleSelection: [] as IKu[],
    multipleTableRef: null as Ref | null,
    search: "",
    tableData: [] as IKu[],
    tableDataGraphic: [] as IGraphic[],
    dialogFormVisible: false,
    vendorFilter: "",
    kuFilter: null as number | null,
  }),

  getters: {
    searchTableData: (state) => {
      const searchValue = state.search.toLowerCase();
      const vendorFilterValue = state.vendorFilter.toLowerCase();
      const kuFilterValue = state.kuFilter;
  
      return state.tableData.filter((item) => {
        const vendorMatch = item.vendor.toLowerCase().includes(vendorFilterValue);
        const periodMatch = item.period.toLowerCase().includes(searchValue);
        const status = item.status.toLowerCase().includes(searchValue);
  
        // Сравнение с учетом null
        const kuMatch = kuFilterValue !== null ? item.ku_id === kuFilterValue : true;
  
        return vendorMatch || periodMatch || status || kuMatch;
      });
  
    },
    
    
  },
  

  actions: {
    setMultipleTableRef(ref: Ref) {
      this.multipleTableRef = ref;
    },

    setVendorFilter(value: string) {
      this.$state.vendorFilter = value;
    },

    setKuFilter(value: number | null) {
      this.$state.kuFilter = value;
    },

    toggleSelection(evt: MouseEvent, rows?: IKu[] | undefined) {
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

    handleSelectionChange(val: IKu[]) {
      this.multipleSelection = val;
    },

    async fetchKuList(data: IKu) {
      try {
        const result = await KU.getKuList(data);
        if (Array.isArray(result)) {
          // Если данные успешно получены и являются массивом, обновляем entityList в сторе
          this.tableData = result;
        } else {
          // Если result не является массивом или равен null, обновляем entityList пустым массивом
          this.tableData = [];
          console.error("Данные не получены или не являются массивом");
        }
      } catch (error) {
        console.error("Произошла ошибка", error);
      }
    },

    async fetchGraphicList(data: IGraphic) {
      try {
        const result = await GRAPHIC.getGraphic(data);
        if (Array.isArray(result)) {
          // Если данные успешно получены и являются массивом, обновляем entityList в сторе
          this.tableDataGraphic = result;
        } else {
          // Если result не является массивом или равен null, обновляем entityList пустым массивом
          this.tableDataGraphic = [];
          console.error("Данные не получены или не являются массивом");
        }
      } catch (error) {
        console.error("Произошла ошибка", error);
      }
    },

    addgraphic(row: {
      graph_id: number | null;
      ku: number | null;
      vendor: string;
      period: string;
      date_start: Date | string;
      date_end: Date | string;
      date_calc: Date | string;
      percent: number | null;
      sum_calc: number | null;
      sum_bonus: number | null;
    }) {
      this.tableDataGraphic.push(row);
    },

    // const addItemAndSendToBackend = async () => {
    //   const newItem = {
    //     ku_id: store.tableData.length + 20,
    //     vendor: store.vendorName,
    //     period: store.newType,
    //     date_start: dayjs(store.newDateStart, "DD.MM.YYYY").format("YYYY-MM-DD"),
    //     date_end: dayjs(store.newDateEnd, "DD.MM.YYYY").format("YYYY-MM-DD"),
    //     status: "Создано",
    //     date_actual: dayjs(store.newDateActual, "DD.MM.YYYY").format("YYYY-MM-DD"),
    //     base: 15000 + store.tableData.length * store.tableData.length,
    //     percent: store.newPercent,
    //   };
    
    //   try {
    //     const response = await KU.postKu(newItem);
    
    //     if (response) {
    //       console.log("Экземпляр успешно отправлен на бэкенд:", response);
    //       router.push("ku");
    //       messageClose();
    //     } else {
    //       console.error("Не удалось отправить экземпляр на бэкенд");
    //     }
    
    //     router.push("ku");
    //   } catch (error) {
    //     console.error("Ошибка при отправке экземпляра на бэкенд:", error);
    //   }
    // };

    deleteSelectedRows() {
      const selectedRows = this.multipleSelection;

      this.tableData = this.tableData.filter((row: IKu) => {
        return !selectedRows.includes(row);
      });

      this.multipleSelection = [];
    },
  },
});
