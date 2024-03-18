import { defineStore } from "pinia";

import type {
  IKuList,
  IGraphic,
  EntityId,
  GetAllGraphic,
  IKuId,
  GetAllKu_Id,
  IGraphicStore,
} from "~/utils/types/directoryTypes";

export const useGraphicStore = defineStore("GraphicStore", {
  state: (): IGraphicStore => ({
    //селекты для множественного выбора
    multipleSelectionGraphic: [],
    multipleTableRef: null,
    //данные 
    dataGraphic: [],
    //v-model диалоговых форм
    dialogFormEditApprovedVisible: false,
    //утверждено
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
    vendors: [],
    //пагинация в таблицах
    pagination: null,
    countRowTable: 50,
    countRowTable2: 950,
    //
    legalEntity2: [],
    //поиски
    searchGraphic: "",
    //параметры для фильтров при запросах
    KuParams: [],
    filterGraphicValue: {
      entity_ids: [], ku_id: []
    },
  }),

  getters: {
    getGraphic: (state) => state.dataGraphic,
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
    handleSelectionChange2(val: IGraphic[]) {
      this.multipleSelectionGraphic = val;
    },

    //для разной пагинации
    setCountRowTable(count: number) {
      this.$state.countRowTable = count;
    },

    //получение данных графика с фильтром
    async getGraphicsFromAPIWithFilter(page?: number) {
      this.setFilterValue2('page', page);
      this.setFilterValue2('search', this.$state.searchGraphic);
      await GRAPHIC.getGraphic({
        page_size: this.$state.countRowTable,
        page,
        entity_ids: this.$state.filterGraphicValue?.entity_ids || [],
        ku_id: this.$state.filterGraphicValue?.ku_id || [],
        search: this.$state.searchGraphic,
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
      console.log('Устанавливается запрос поиска гр:', query);
      this.$state.searchGraphic = query;
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
        // (legalEntity2) => legalEntity2.external_code
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