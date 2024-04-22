import { defineStore } from 'pinia';

import type {
  IKuList,
  IGraphic,
  EntityId,
  GetAllGraphic,
  IKuId,
  IParamKu_Id,
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
      date_accrual: "",
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
    sortProp: "",
    sortOrder: "",
    //
    legalEntity: [],
    //поиски
    searchGraphic: "",
    //параметры для фильтров при запросах
    KuParams: [],
    filterGraphicValue: {
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
    async getGraphicsFromAPIWithFilter(page?: number, sort_by?: string, sort_order?: string) {
      this.setFilterValue('page', page);
      this.setFilterValue('search', this.$state.searchGraphic);
      this.setFilterValue('sort_by', sort_by);
      this.setFilterValue('sort_order', sort_order);
      await GRAPHIC.getGraphic({
        page_size: this.$state.countRowTable,
        page,
        ku_id: this.$state.filterGraphicValue?.ku_id || [],
        entity_id: this.$state.filterGraphicValue?.entity_id || [],
        vendor_id: this.$state.filterGraphicValue?.vendor_id || [],
        status: this.$state.filterGraphicValue?.status || [],
        period: this.$state.filterGraphicValue?.period || [],
        date_start_s: this.$state.filterGraphicValue?.date_start_s,
        date_start_e: this.$state.filterGraphicValue?.date_start_e,
        date_end_s: this.$state.filterGraphicValue?.date_end_s,
        date_end_e: this.$state.filterGraphicValue?.date_end_e,
        date_accrual_s: this.$state.filterGraphicValue?.date_accrual_s,
        date_accrual_e: this.$state.filterGraphicValue?.date_accrual_e,
        date_calc_s: this.$state.filterGraphicValue?.date_calc_s,
        date_calc_e: this.$state.filterGraphicValue?.date_calc_e,
        search: this.$state.searchGraphic,
        sort_by,
        sort_order,
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

    setFilterValue<
      T extends keyof GetAllGraphic,
      U extends GetAllGraphic[T],
    >(field: T, value: U) {
      this.$state.filterGraphicValue[field] = value
    },
    removeFilterValue<T extends keyof GetAllGraphic>(field: T) {
      if (this.$state.filterGraphicValue) {
        delete this.$state.filterGraphicValue[field]
      }
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
        .then((legalEntity) => {
          console.log('Получены данные о юридических лицах:', legalEntity);
          this.setLegalEntity(legalEntity);
        })
        .catch((e) => console.error('Ошибка при получении данных о юридических лицах:', e));
    },
    setLegalEntity(data: EntityId[]) {
      this.$state.legalEntity = data.map(
        (legalEntity) => legalEntity.entity_id
      )
    },


    //получения ку для фильтра в графике
    getKuIdFilterForGraphicFromApi() {
      const params: IParamKu_Id = {
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