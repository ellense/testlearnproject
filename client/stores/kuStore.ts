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
  GetAllBrands,
  IVendorIdAndName,
  IBrand,
  GetAllVendorsForEntity,
  ITree,
} from "~/utils/types/directoryTypes";

export const useKuStore = defineStore("KuStore", {
  state: (): IKuStore => ({
    //v-model атрибутов при создании
    newPercent: null,
    newType: "",
    entityName: [],
    vendorName: "",
    newDateStart: new Date(),
    newDateEnd: new Date(),
    newDateActual: new Date(),
    valueCategory_id: "",
    valueCategory_name: "",
    valueProducer_name: "",
    valueBrand_name: "",
    //селекты для множественного выбора
    multipleSelection: [],
    multipleSelection2: [],
    multipleSelection3: [],
    multipleTableRef: null,
    //данные 
    tableData: [],
    dataGraphic: [],
    brand: [],
    producer: [],
    product: [],
    tableDataRequirement: [],
    dataEntity: [],
    dataVendor: [],
    treeData: [],
    treeRef: null,
    //v-model диалоговых форм
    dialogFormProductVisible: false,
    dialogFormCategoryVisible: false,
    dialogFormEditApprovedVisible: false,
    //дизэйбл
    disableButtons: false,
    //
    editApproved: null,
    selectedRowEditApproved: {
      graph_id: null,
      ku_id: "",
      entity_id: "",
      entity_name: "",
      vendor_id: "",
      vendor_name: "",
      period: "",
      date_start: "",
      date_end: "",
      date_calc: "",
      percent: null,
      sum_calc: null,
      sum_bonus: null,
      sum_approved: null,
      status: "",
    },
    //
    vendorFilter: "",
    kuFilter: null,
    vendors: [],
    //пагинация в таблицах
    pagination: null,
    countRowTable: 20,
    countRowTable2: 950,
    //
    legalEntity: [],
    legalEntity2: [],
    //поиски
    search: "",
    search2: "",
    search3: "",
    //параметры для фильтров при запросах
    KuParams: [],
    filterKuValue: {
      entity_id: []
    },
    filterGraphicValue: {
      entity_id: [], ku_id: []
    },
    filterProductValue: {},
    filterProducerValue: {},
    filterBrandValue: {},
    filterVendorValue: {},
    //
    producerSelect: [],
    brandSelect: [],


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

    //для разной пагинации
    setCountRowTable(count: number) {
      this.$state.countRowTable = count;
    },

    //получение КУ с фильтром
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
    setFilterValue< //для фильтрации ку
      T extends keyof GetAllKus,
      U extends GetAllKus[T],
    >(field: T, value: U) {
      console.log('Устанавливается значение фильтра ку:', field, value);
      this.$state.filterKuValue[field] = value
    },
    async performSearchKu(searchQuery: string) {   //для поиска в ку
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


    //получения юр лица для фильтра в ку
    getLegalEntityFilterForKuFromApi() {
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




    //дерево

    // async buildTree(nodes: ITree[], parentCode: string | null = null): Promise<ITree[]> {
    //   const parentNode = nodes.filter(node => node.parent_code === parentCode);
    //   if (!parentNode.length) return [];

    //   return parentNode.map(async node => {
    //     const children =  this.buildTree(nodes, node.classifier_code.toString());
    //     if (children.length) {
    //       node.children = children;
    //     }
    //     return node;
    //   });
    // },

    // async fetchData(data: ITree) {
    //   try {
    //     const result = await CATEGORY.getCategory(data);
    //     if (Array.isArray(result)) {
    //       this.treeData = await this.buildTree(result, '0');
    //       console.log("treeData", this.treeData);
    //       if (this.treeRef) {
    //         this.treeRef.updateKeyChildren(data.classifier_code, this.treeData);
    //       }
    //     } else {
    //       this.treeData = [];
    //       console.error("Данные не получены или не являются массивом");
    //     }
    //   } catch (error) {
    //     console.error("Произошла ошибка при получении данных категорий", error);
    //   }
    // },
  
















    //получение данных о производителе с фильтром
    async fetchAllProducers() {
      try {
        let allProducer: IProducer[] = [];
        let nextPage = 1;
        let totalPages = 1;
        while (nextPage <= totalPages) {
          const producers = await PRODUCER.getProducer({
            page_size: this.$state.countRowTable2,
            page: nextPage,
            l4: this.$state.filterProducerValue.l4,
            vendor_id: this.$state.vendorName
          });
          allProducer = allProducer.concat(producers.results);
          totalPages = Math.ceil(producers.count / this.$state.countRowTable2);
          nextPage++;
        }
        console.log("Все данные о производителе:", allProducer);
        this.$state.producer = allProducer;
      } catch (error) {
        console.error(
          "Произошла ошибка при получении данных о производителе",
          error
        );
        return Promise.reject(error);
      }
    },
    setFilterValue4<
    T extends keyof GetAllProducer,
    U extends GetAllProducer[T],
  >(field: T, value: U) {
    this.$state.filterProducerValue[field] = value
  },

    //получение данных о бренде с фильтром
    async fetchAllBrands() {
      try {
        let allBrands: IBrand[] = [];
        let nextPage = 1;
        let totalPages = 1;
        while (nextPage <= totalPages) {
          const brands = await BRAND.getBrand({
            page_size: this.$state.countRowTable2,
            page: nextPage,
            producer_name: this.$state.filterBrandValue.producer_name,
            l4: this.$state.filterProducerValue.l4,
            vendor_id: this.$state.vendorName
          });
          allBrands = allBrands.concat(brands.results);
          totalPages = Math.ceil(brands.count / this.$state.countRowTable2);
          nextPage++;
        }
        console.log("Все данные о брендах:", allBrands);
        this.$state.brand = allBrands;
      } catch (error) {
        console.error(
          "Произошла ошибка при получении данных о брендах",
          error
        );
        return Promise.reject(error);
      }
    },
    setFilterValue5<
      T extends keyof GetAllBrands,
      U extends GetAllBrands[T],
    >(field: T, value: U) {
      this.$state.filterBrandValue[field] = value
    },

    //получение данных о товарах для условий с фильтром и поиск 
    async getProductFromAPIWithFilter(page?: number) {
      this.setFilterValue3('page', page);
      this.setFilterValue3('search', this.$state.search3);
      this.setFilterValue3('vendor_id', this.$state.vendorName);
      await PRODUCT.getProductsList({
        page_size: this.$state.countRowTable,
        page,
        search: this.$state.search3,
        vendor_id: this.$state.vendorName
      })
        .then((product) => {
          console.log('Получены данные товаров:', product);
          this.$state.product = product.results;
          this.$state.pagination = {
            count: product.count,
            previous: product.previous,
            next: product.next,
          };
        })
        .catch((error) => {
          console.error('Ошибка при получении данных товаров:', error);
          return Promise.reject(error);
        });
    },
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

    async fetchAllVendorsListForEntity() {
      try {
        let allVendors: IVendorIdAndName[] = [];
        let nextPage = 1;
        let totalPages = 1;
        while (nextPage <= totalPages) {
          const vendors = await VENDOR.getVendorsForEntityInKU({
            page_size: this.$state.countRowTable2,
            page: nextPage,
            entity_id: this.$state.filterVendorValue.entity_id,
          });
          allVendors = allVendors.concat(vendors.results);
          totalPages = Math.ceil(vendors.count / this.$state.countRowTable2);
          nextPage++;
        }
        console.log("Все данные о поставщиках:", allVendors);
        this.$state.dataVendor = allVendors;
      } catch (error) {
        console.error(
          "Произошла ошибка при получении данных о поставщиках",
          error
        );
        return Promise.reject(error);
      }
    },
    setFilterValue6<
    T extends keyof GetAllVendorsForEntity,
    U extends GetAllVendorsForEntity[T],
  >(field: T, value: U) {
    this.$state.filterVendorValue[field] = value
  },


//////////////////////// Г Р А Ф И К //////////////////////////////////////////////////////////


    //получение данных графика с фильтром
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
          console.log('Получены данные графика:', dataGraphic);
          this.$state.dataGraphic = dataGraphic.results;
          this.$state.pagination = {
            count: dataGraphic.count,
            previous: dataGraphic.previous,
            next: dataGraphic.next,
          };
        })
        .catch((error) => {
          console.error('Ошибка при получении данных графика:', error);
          return Promise.reject(error);
        });
    },
    setFilterValue2<
      T extends keyof GetAllGraphic,
      U extends GetAllGraphic[T],
    >(field: T, value: U) {
      this.$state.filterGraphicValue[field] = value
    },
    //для поиска в графике
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


    //получения юр лица для фильтра в графике
    getLegalEntityFilterForGraphicFromApi() {
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


    //получения ку для фильтра в графике
    getKuIdFilterForGraphicFromApi() {
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

  }
});
