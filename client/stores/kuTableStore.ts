import { defineStore } from "pinia";

import type { IKu, IGraphic,IRequirement, IBrand,IEntityIdAndName,IVendorApiResponse, IVendorIdAndName } from "~/utils/types/directoryTypes";

export const useKuTableStore = defineStore("KuTableStore", {
  state: () => ({
    newPercent: null,
    newType: "",
    entityName: "", 
    vendorName: "",
    newDateStart: new Date(),
    newDateEnd: new Date(),
    newDateActual: new Date(),
    multipleSelection: [] as IKu[],
    multipleTableRef: null as Ref | null,
    search: "",
    tableData: [] as IKu[],
    tableDataGraphic: [] as IGraphic[],
    dataBrand:[] as IBrand[],
    tableDataRequirement: [] as IRequirement[],
    dataEntity: [] as IEntityIdAndName[],
    dataVendor: [] as IVendorIdAndName[],
    dialogFormVisible: false,
    isAddAllDisabled: false,
    isAddConditionDisabled: false,
    vendorFilter: "",
    kuFilter: null as number | null,
  }),

  getters: {
    searchTableData: (state) => {
      const searchValue = state.search.toLowerCase();
      const vendorFilterValue = state.vendorFilter.toLowerCase();
      const kuFilterValue = state.kuFilter;

      return state.tableData.filter((item) => {
        const vendorMatch = item.vendor
          .toLowerCase()
          .includes(vendorFilterValue);
        const periodMatch = item.period.toLowerCase().includes(searchValue);
        const status = item.status.toLowerCase().includes(searchValue);

        // Сравнение с учетом null
        // const kuMatch =
        //   kuFilterValue !== null ? item.ku_id === kuFilterValue : true;

        return vendorMatch || periodMatch || status
      });
    },
    getBrands: (state) => state.dataBrand,
    getEntity: (state) => state.dataEntity,
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
          this.tableDataGraphic = result;
        } else {
          this.tableDataGraphic = [];
          console.error("Данные не получены или не являются массивом");
        }
      } catch (error) {
        console.error("Произошла ошибка", error);
      }
    },

    async fetchBrandList(data: IBrand) {
      try {
        const result = await BRAND.getBrand(data);
        if (Array.isArray(result)) {
          console.log('dataBrand',result);
          this.dataBrand = result;
        } else {
          this.dataBrand = [];
          console.error("Данные не получены или не являются массивом");
        }
      } catch (error) {
        console.error("Произошла ошибка", error);
      }
    },

    async fetchKuEntity(data: IEntityIdAndName) {
      try {
        const result = await ENTITY.getEntityNameById(data);
        if (Array.isArray(result)) {
          this.dataEntity = result;
          console.log('dataEntity',result);
        } else {
          this.dataEntity = [];
          console.error("Данные не получены или не являются массивом");
        }
      } catch (error) {
        console.error("Произошла ошибка", error);
      }
    },
    // Обновленный метод в вашем сторе
    async fetchKuVendor(data: { vendorid: string; name: string; entityid: string }) {
      try {
        let allResults: IVendorNameId[] = [];
        let nextPage: string | null = "api/vendorlist/";
    
        while (nextPage) {
          const partialResult: { results: IVendorIdAndName[] } = await VENDOR.getVendorsIdAndName(data);
          console.log('Partial API Response:', partialResult);
    
          if ('results' in partialResult && Array.isArray(partialResult.results)) {
            allResults = [...allResults, ...partialResult.results];
          } else {
            console.error("Данные не получены или не являются массивом");
            break;
          }
    
          // Имитация получения следующей страницы
          nextPage = partialResult.results.length > 0 ? `api/vendorlist/?page=${allResults.length / 10 + 1}` : null;
        }
    
        // Преобразование в ожидаемую структуру IVendorApiResponse
        const result: IVendorApiResponse = {
          count: allResults.length,
          next: nextPage,
          previous: null, // Установите значение в null, так как мы не знаем предыдущую страницу
          results: allResults,
        };
    
        this.dataVendor = allResults;
        console.log('dataVendor', this.dataVendor);
      } catch (error) {
        console.error("Произошла ошибка", error);
      }
    },
    // async fetchKuVendor(data: IVendorIdAndName) {
    //   try {
    //     const result = await VENDOR.getVendorsIdAndName();
    //     if (Array.isArray(result)) {
    //       this.dataVendor = result;
    //       console.log('dataVendor',result);
    //     } else {
    //       this.dataVendor = [];
    //       console.error("Данные не получены или не являются массивом");
    //     }
    //   } catch (error) {
    //     console.error("Произошла ошибка", error);
    //   }
    // },
    addgraphic(row: {
      graph_id: number | null;
      ku: string;
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

    // async deleteSelectedRows() {
    //   // const selectedRows = this.multipleSelection;

    //   // this.tableData = this.tableData.filter((row: IKu) => {
    //   //   return !selectedRows.includes(row);
    //   // });

    //   // this.multipleSelection = [];
    //   const selectedRows = this.multipleSelection;

    //   try {
    //     // Предполагая, что ваш API требует одиночный ku_id для удаления
    //     for (const row of selectedRows) {
    //       const result = await KU.deleteKu({
    //         ku_id: row.ku_id,
    //         vendor: "",
    //         period: "",
    //         date_start: "",
    //         date_end: "",
    //         status: "",
    //         base: null,
    //         percent: null
    //       });
    //       if (!result) {
    //         console.error("Не удалось удалить строку с ku_id:", row.ku_id);
    //         return; // Прерываем выполнение, чтобы избежать обновления данных, если что-то пошло не так
    //       }
    //     }

    //     // Если удаление прошло успешно, обновите данные таблицы в хранилище
    //     this.tableData = this.tableData.filter(
    //       (row: IKu) => !selectedRows.includes(row)
    //     );
    //     this.multipleSelection = [];
    //   } catch (error) {
    //     console.error("Ошибка при удалении строк:", error);
    //   }
    // },
  },
});
