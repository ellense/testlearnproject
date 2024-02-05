import { defineStore } from "pinia";

import type {
  IKuList,
  IGraphic,
  IEntityIdAndName,
  IKuStore,
  IKuId,
  GetAllGraphic,
} from "~/utils/types/directoryTypes";

export const useKuStore = defineStore("KuStore", {
  state: (): IKuStore => ({
    newPercent: null,
    newType: "",
    entityName: [],
    vendorName: "",
    newDateStart: new Date(),
    newDateEnd: new Date(),
    newDateActual: new Date(),
    multipleSelection: [],
    multipleTableRef: null,
    search: "",
    tableData: [],
    dataGraphic: [],
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
    filterValueGraphic: {}
  }),

  getters: {
    searchTableData: (state) => {
      const searchValue = state.search.toLowerCase();
      const vendorFilterValue = state.vendorFilter.toLowerCase();

      return state.tableData.filter((item) => {
        const vendorMatch = item.vendor_id
          .toLowerCase()
          .includes(vendorFilterValue);
        const periodMatch = item.period.toLowerCase().includes(searchValue);
        const status = item.status.toLowerCase().includes(searchValue);
        return vendorMatch || periodMatch || status;
      });
    },
    getGraphic: (state) => state.dataGraphic,
    getProducers: (state) => state.producer,
    getBrands: (state) => state.brand,
    getProduct: (state) => state.product,
    getEntity: (state) => state.dataEntity,
    getEntityName: (state) => state.entityName,
  },

  actions: {
    //для пагинации
    setCountRowTable(count: number) {
      this.$state.countRowTable = count;
    },
    //для фильтрации
    setFilterValue<
      T extends keyof GetAllGraphic,
      U extends GetAllGraphic[T],
    >(field: T, value: U) {
      this.$state.filterValueGraphic[field] = value
    },
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

    async getGraphicsFromAPIWithFilter(page?: number) {
      this.setFilterValue('page', page);
      await GRAPHIC.getGraphic({
        page_size: this.$state.countRowTable,
        page,
      })
        .then((dataGraphic) => {
          this.$state.dataGraphic = dataGraphic.results;
          this.$state.pagination = {
            count: dataGraphic.count,
            previous: dataGraphic.previous,
            next: dataGraphic.next,
          };
        })
        .catch((error) => Promise.reject(error));
    },
    async fetchGraphicList(page?: number) {
      try {
        const graphics = await GRAPHIC.getGraphic({
          page_size: this.$state.countRowTable,
          page,
        });
        this.$state.dataGraphic = graphics.results;
        this.$state.pagination = {
          count: graphics.count,
          previous: graphics.previous,
          next: graphics.next,
        };
      } catch (error) {
        console.error("Произошла ошибка", error);
        return Promise.reject(error);
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
        const result = await ENTITY.getEntityById(data);
        if (Array.isArray(result)) {
          this.dataEntity = result;
        } else {
          this.dataEntity = [];
          console.error("Данные не получены или не являются массивом");
        }
      } catch (error) {
        console.error("Произошла ошибка", error);
      }
    },

    async fetchVendorsListForEntity(page?: number) {
      try {
        const vendors = await VENDOR.getVendorsForEntity({
          page_size: this.$state.countRowTable,
          page,
          entity_id: this.$state.entityName,
        });
        this.$state.dataVendor = vendors.results;
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

    // addgraphic(row: {
    //   graph_id: number | null;
    //   ku: string;
    //   vendor_id: string;
    //   period: string;
    //   date_start: Date | string;
    //   date_end: Date | string;
    //   date_calc: Date | string;
    //   percent: number | null;
    //   sum_calc: number | null;
    //   sum_bonus: number | null;
    // }) {
    //   this.tableDataGraphic.push(row);
    // },

    //проверить вообще используется ли она?
    async deleteSelectedRows() {
      const selectedRows = this.multipleSelection.map((row) => row.ku_id);

      try {
        // Используйте ваш API-метод deleteKu с каждым идентификатором
        for (const ku_id of selectedRows) {
          await KU.deleteKu({ ku_id });

          // Обновите данные таблицы в хранилище после успешного удаления каждого элемента
          this.tableData = this.tableData.filter((row) => row.ku_id !== ku_id);
        }

        // Очистите выделение после удаления всех элементов
        this.multipleSelection = [];
      } catch (error) {
        console.error("Ошибка при удалении строк:", error);
      }
    },
  },
});
