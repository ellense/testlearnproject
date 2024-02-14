import { defineStore } from "pinia";

import type {
  IKuList,
  IGraphic,
  IEntityIdAndName,
  IKuStore,
  EntityId,
  GetAllKus,
  GetAllGraphic,
  IKuId,
  GetAllKu_Id,
  GetAllProducer,
  IProducer,
  GetAllProducts,
  IProduct,
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
    multipleSelection2: [],
    multipleSelection3: [],
    multipleTableRef: null,
    selectedKu: null,
    tableData: [],
    dataGraphic: [],
    brand: [],
    producer: [],
    product: [],
    tableDataRequirement: [],
    dataEntity: [],
    dataVendor: [],
    dialogFormProductVisible: false,
    dialogFormCategoryVisible: false,
    isAddAllDisabled: false,
    isAddConditionDisabled: false,
    vendorFilter: "",
    kuFilter: null,
    vendors: [],
    filterValueGraphic: {},
    pagination: null,
    countRowTable: 20,
    legalEntity: [],
    legalEntity2: [],
    search: "",
    search2: "",
    search3: "",
    KuParams: [],
    filterKuValue: {
      entity_id: []
    },
    filterGraphicValue: {
      entity_id: [], ku_id: []
    },
    filterProductValue: {},
    filterProducerValue: {
      // l4:[]
    },
    filterBrandValue: {
      producer_name: ""
    },
    producerSelect: [],
    brandSelect: [],
    ProducerList: {
      producer_name: ""
    },
    valueCategory_id:"",
    valueCategory_name: "",
  }),

  getters: {
    getKu: (state) => state.tableData,
    getGraphic: (state) => state.dataGraphic,
    getProducers: (state) => state.producer,
    getBrands: (state) => state.brand,
    getProduct: (state) => state.product,
    getEntity: (state) => state.dataEntity,
    getEntityName: (state) => state.entityName,
  },

  actions: {
    //выборка элементов таблиц
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
    handleSelectionChange2(val: IGraphic[]) {
      this.multipleSelection2 = val;
    },
    handleSelectionChange3(val: IProduct[]) {
      this.multipleSelection3 = val;
    },

    //для поиска в ку
    async performSearchKu(searchQuery: string) {
      try {
        this.setSearchQueryKu(searchQuery);
        await this.getKuFromAPIWithFilter();
      } catch (error) {
        console.error('Ошибка при выполнении поиска ку', error);
      }
    },

    setSearchQueryKu(query: string) {
      console.log('Устанавливается запрос поиска ку:', query);
      this.$state.search = query;
    },

    //для поиска в ку
    async performSearchGraphic(searchQuery: string) {
      try {
        this.setSearchQueryGraphic(searchQuery);
        await this.getGraphicsFromAPIWithFilter();
      } catch (error) {
        console.error('Ошибка при выполнении поиска ку', error);
      }
    },
    setSearchQueryGraphic(query: string) {
      console.log('Устанавливается запрос поиска ку:', query);
      this.$state.search2 = query;
    },

    //для фильтрации ку
    getLegalEntityFromApi() {
      console.log('Запрос данных о юридических лицах...');
      ENTITY.getEntityById()
        .then((legalEntity) => {
          console.log('Получены данные о юридических лицах:', legalEntity);
          this.setLegalEntity(legalEntity);
        })
        .catch((e) => console.error('Ошибка при получении данных о юридических лицах:', e));
    },
    setLegalEntity(data: EntityId[]) {
      console.log('Устанавливаются данные о юридических лицах:', data);
      this.$state.legalEntity = data.map(
        (legalEntity) => legalEntity.entity_id
      )
    },
    setFilterValue<
      T extends keyof GetAllKus,
      U extends GetAllKus[T],
    >(field: T, value: U) {
      console.log('Устанавливается значение фильтра ку:', field, value);
      this.$state.filterKuValue[field] = value
    },

    //для фильтрации графика
    getLegalEntityFromApi2() {
      ENTITY.getEntityById()
        .then((legalEntity2) => {
          console.log('Получены данные о юридических лицах:', legalEntity2);
          this.setLegalEntity2(legalEntity2);
        })
        .catch((e) => console.error('Ошибка при получении данных о юридических лицах:', e));
    },
    setLegalEntity2(data: EntityId[]) {
      this.$state.legalEntity2 = data.map(
        (legalEntity2) => legalEntity2.entity_id
      )
    },

    getKuIdFromApi() {
      const params: GetAllKu_Id = {
        page_size: 100,
        page: 1,
      };

      KU.getKuIdList(params)
        .then((data) => {
          console.log('Получены данные о код ку:', data);
          this.setKuId(data.results);
        })
        .catch((error) => console.error('Ошибка при получении данных о код ку:', error));
    },
    setKuId(data: IKuId[]) {
      this.$state.KuParams = data.map((item) => item.ku_id);
    },
    setFilterValue2<
      T extends keyof GetAllGraphic,
      U extends GetAllGraphic[T],
    >(field: T, value: U) {
      this.$state.filterGraphicValue[field] = value
    },

    //для пагинации
    setCountRowTable(count: number) {
      this.$state.countRowTable = count;
    },


    //получение КУ
    async getKuFromAPIWithFilter(page?: number) {
      console.log('Выполняется запрос ку с фильтрацией...');
      this.setFilterValue('page', page);
      this.setFilterValue('search', this.$state.search);
      await KU.getKuList({
        page_size: this.$state.countRowTable,
        page,
        entity_id: this.$state.filterKuValue?.entity_id || [],
        search: this.$state.search,
      })
        .then((tableData) => {
          console.log('Получены данные ку:', tableData);
          this.$state.tableData = tableData.results;
          this.$state.pagination = {
            count: tableData.count,
            previous: tableData.previous,
            next: tableData.next,
          };
        })
        .catch((error) => {
          console.error('Ошибка при получении данных ку:', error);
          return Promise.reject(error);
        });
    },

    //получение данных графика
    async getGraphicsFromAPIWithFilter(page?: number) {
      this.setFilterValue2('page', page);
      this.setFilterValue2('search', this.$state.search2);
      await GRAPHIC.getGraphic({
        page_size: this.$state.countRowTable,
        page,
        entity_id: this.$state.filterGraphicValue?.entity_id || [],
        ku_id: this.$state.filterGraphicValue?.ku_id || [],
        search: this.$state.search2,
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

    // fetchProducerList() {
    //   const params: GetAllProducer = {
    //     page_size: 100,
    //     page: 1,
    //   };

    //   PRODUCER.getProducer(params)
    //     .then((data) => {
    //       console.log('Получены данные о код ку:', data);
    //       this.setProducer(data.results);
    //     })
    //     .catch((error) => console.error('Ошибка при получении данных о код ку:', error));
    // },
    // setProducer(data: IProducer[]) {
    //   this.$state.producerSelect = data.map((item) => item.producer_name);
    //   // Можете также обновить другие свойства, если необходимо
    // },
    //получение данных о производителе
    setFilterValue4<
    T extends keyof GetAllProducer,
    U extends GetAllProducer[T],
  >(field: T, value: U) {
    this.$state.filterProducerValue[field] = value
  },

    // async fetchProducerList(page?: number) {
    //   this.setFilterValue4('page', page);
    //   // this.setFilterValue4('l4', this.$state.filterProducerValue.l4);
    //   await PRODUCER.getProducer({
    //     page_size: this.$state.countRowTable,
    //     page,
    //     // l4: this.$state.filterProducerValue.l4,
    //   })
    //     .then((producer) => {
    //       console.log('Получены данные произв:', producer);
    //       this.$state.producer = producer.results;
    //       this.$state.pagination = {
    //         count: producer.count,
    //         previous: producer.previous,
    //         next: producer.next,
    //       };
    //     })
    //     .catch((error) => {
    //       console.error('Ошибка при получении данных произв:', error);
    //       return Promise.reject(error)});
    // },
    // async fetchProducerList(page?: number) {
    //   try {
    //     const producers = await PRODUCER.getProducer({
    //       page_size: this.$state.countRowTable,
    //       page,
    //       categories_l4: this.$state.filterProducerValue.categories_l4
    //     });
    //     this.$state.producer = producers.results;
    //     this.$state.pagination = {
    //       count: producers.count,
    //       previous: producers.previous,
    //       next: producers.next,
    //     };
    //   } catch (error) {
    //     console.error("Произошла ошибка", error);
    //     return Promise.reject(error);
    //   }
    // },
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
    //получение данных о бренде
    async fetchBrandList(page?: number) {
      try {
        const brands = await BRAND.getBrand({
          page_size: this.$state.countRowTable,
          page,
          producer_name: this.$state.filterBrandValue.producer_name
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

    //получение данных о товарах для ку  и фильтры хотя они они одинаковые с обычными товарами
    async performSearchProduct(searchQuery: string) {
      try {
        this.setSearchProduct(searchQuery);
        await this.getProductFromAPIWithFilter();
      } catch (error) {
        console.error('Ошибка при выполнении поиска', error);
      }
    },
    setSearchProduct(query: string) {
      this.$state.search3 = query;
    },
    setFilterValue3<
      T extends keyof GetAllProducts,
      U extends GetAllProducts[T],
    >(field: T, value: U) {
      this.$state.filterProductValue[field] = value
    },
    async getProductFromAPIWithFilter(page?: number) {
      this.setFilterValue('page', page);
      this.setFilterValue('search', this.$state.search3);
      await PRODUCT.getProductsList({
        page_size: this.$state.countRowTable,
        page,
        search: this.$state.search,
      })
        .then((product) => {
          this.$state.product = product.results;
          this.$state.pagination = {
            count: product.count,
            previous: product.previous,
            next: product.next,
          };
        })
        .catch((error) => Promise.reject(error));
    },

    //получение данных о юр.лице для создания
    async fetchKuEntity(data: IEntityIdAndName) {
      try {
        const result = await ENTITY.getEntityByIdAndName(data);
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

    //получение данных о поставщиках для создания
    async fetchVendorsListForEntity(page?: number) {
      try {
        const vendors = await VENDOR.getVendorsForEntityInKU({
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

  },
});
