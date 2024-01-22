import { defineStore } from "pinia";

import type {
  IKuList,
  IGraphic,
  IEntityIdAndName,
  IKuStore,
} from "~/utils/types/directoryTypes";

export const useKuStore = defineStore("KuStore", {
  state: (): IKuStore => ({
    newPercent: null,
    newType: "",
    entityName: "",
    vendorName: "",
    newDateStart: new Date(),
    newDateEnd: new Date(),
    newDateActual: new Date(),
    multipleSelection: [],
    multipleTableRef: null,
    search: "",
    tableData: [],
    tableDataGraphic: [],
    brand: [],
    producer: [],
    product: [],
    tableDataRequirement: [],
    dataEntity: [],
    dataVendor: [],
    dialogFormVisible: false,
    isAddAllDisabled: false,
    isAddConditionDisabled: false,
    vendorFilter: "",
    kuFilter: null,
    pagination: null,
    countRowTable: 50,
    vendors: [],
  }),

  getters: {
    searchTableData: (state) => {
      const searchValue = state.search.toLowerCase();
      const vendorFilterValue = state.vendorFilter.toLowerCase();

      return state.tableData.filter((item) => {
        const vendorMatch = item.vendor
          .toLowerCase()
          .includes(vendorFilterValue);
        const periodMatch = item.period.toLowerCase().includes(searchValue);
        const status = item.status.toLowerCase().includes(searchValue);
        return vendorMatch || periodMatch || status;
      });
    },
    getProducers: (state) => state.producer,
    getBrands: (state) => state.brand,
    getProduct: (state) => state.product,
    getEntity: (state) => state.dataEntity,
    getEntityName: (state) => state.entityName,
  },

  actions: {
    setMultipleTableRef(ref: Ref) {
      this.multipleTableRef = ref;
    },

    toggleSelection(evt: MouseEvent, rows?: IKuList[] | undefined) {
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

    handleSelectionChange(val: IKuList[]) {
      this.multipleSelection = val;
    },

    async fetchKuList(data: IKuList) {
      try {
        const result = await KU.getKuList(data);
        if (Array.isArray(result)) {
          this.tableData = result;
        } else {
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

    async fetchProducerList(page?: number) {
      try {
        const producers = await PRODUCER.getProducer({
          page_size: this.$state.countRowTable,
          page,
        });
        this.$state.producer = producers.results;
        this.$state.pagination = {
          count: producers.count,
          previous: producers.previous,
          next: producers.next,
        };
      } catch (error) {
        console.error("Произошла ошибка", error);
        return Promise.reject(error);
      }
    },

    async fetchBrandList(page?: number) {
      try {
        const brands = await BRAND.getBrand({
          page_size: this.$state.countRowTable,
          page,
        });
        this.$state.brand = brands.results;
        this.$state.pagination = {
          count: brands.count,
          previous: brands.previous,
          next: brands.next,
        };
      } catch (error) {
        console.error("Произошла ошибка", error);
        return Promise.reject(error);
      }
    },

    async fetchProductKuList(page?: number) {
      try {
        const products = await PRODUCT.getProductsList({
          page_size: this.$state.countRowTable,
          page,
        });
        this.$state.product = products.results;
        this.$state.pagination = {
          count: products.count,
          previous: products.previous,
          next: products.next,
        };
      } catch (error) {
        console.error("Произошла ошибка", error);
        return Promise.reject(error);
      }
    },

    async fetchKuEntity(data: IEntityIdAndName) {
      try {
        const result = await ENTITY.getEntityNameById(data);
        if (Array.isArray(result)) {
          this.dataEntity = result;
          console.log("dataEntity", result);
        } else {
          this.dataEntity = [];
          console.error("Данные не получены или не являются массивом");
        }
      } catch (error) {
        console.error("Произошла ошибка", error);
      }
    },

    async fetchVendorsListForEntity(page?: number, entityid?: string) {
      try {
        const vendors = await VENDOR.getVendorsForEntity({
          page_size: this.$state.countRowTable,
          page,
          entityid: this.$state.entityName,
        });
        this.$state.dataVendor = vendors.results;
        console.log("Data vendors for entity:", this.$state.dataVendor);
        console.log("vendors:", vendors);
        this.$state.pagination = {
          count: vendors.count,
          previous: vendors.previous,
          next: vendors.next,
        };
      } catch (error) {
        console.error(
          "Произошла ошибка при получении данных о поставщиках для юридического лица",
          error
        );
        return Promise.reject(error);
      }
    },

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

    //   // this.tableData = this.tableData.filter((row: IKuList) => {
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
    //       (row: IKuList) => !selectedRows.includes(row)
    //     );
    //     this.multipleSelection = [];
    //   } catch (error) {
    //     console.error("Ошибка при удалении строк:", error);
    //   }
    // },
  },
});
