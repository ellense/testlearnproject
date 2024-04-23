import { defineStore } from "pinia";

import type {
  IKuList,
  EntityId,
  IParamKus,
  IKuCStore,
} from "~/utils/types/directoryTypes";

export const useKuCStore = defineStore("KuCStore", {
  state: (): IKuCStore => ({
    //селекты для множественного выбора
    multipleSelection: [],
    multipleTableRef: null,
    //данные 
    tableData: [],
    //пагинация в таблицах
    pagination: null,
    countRowTable: 50,
    //
    sortProp: "",
    sortOrder: "",
    legalEntity: [],
    //поиски
    search: "",
    filterEntityId: [],
    filterVendorId: [],
    //параметры для фильтров при запросах
    filterKuValue: {
    },
  }),

  getters: {
    getKu: (state) => state.tableData,
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

    //для разной пагинации
    setCountRowTable(count: number) {
      this.$state.countRowTable = count;
    },

    //получение КУ с фильтром
    async getKuFromAPIWithFilter(page?: number, sort_by?: string, sort_order?: string) {
      this.setFilterValue('page', page);
      this.setFilterValue('search', this.$state.search);
      this.setFilterValue('sort_by', sort_by);
      this.setFilterValue('sort_order', sort_order); 
      await KU.getKuList({
        page_size: this.$state.countRowTable,
        page,
        entity_id: this.$state.filterKuValue?.entity_id || [],
        vendor_id: this.$state.filterKuValue?.vendor_id || [],
        status: this.$state.filterKuValue?.status || [],
        graph_exists: this.$state.filterKuValue?.graph_exists,
        date_start_s: this.$state.filterKuValue?.date_start_s,
        date_start_e: this.$state.filterKuValue?.date_start_e,
        date_end_s: this.$state.filterKuValue?.date_end_s,
        date_end_e: this.$state.filterKuValue?.date_end_e,
        search: this.$state.search,
        sort_by,
        sort_order,
      })
        .then((tableData) => {
          console.log('Получены данные ку:', tableData);
          this.$state.tableData = tableData.results;
          console.log('tableData:', this.$state.tableData);
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

    //для фильтрации ку
    setFilterValue< 
      T extends keyof IParamKus,
      U extends IParamKus[T],
    >(field: T, value: U) {
      this.$state.filterKuValue[field] = value
    },
    removeFilterValue<T extends keyof IParamKus>(field: T) {
      if (this.$state.filterKuValue) {
        delete this.$state.filterKuValue[field]
      }
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
      this.$state.search = query;
    },


    //получения юр лица для фильтра в ку
    getLegalEntityFilterForKuFromApi() {
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
    
  }
});
