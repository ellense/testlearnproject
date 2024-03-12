import { defineStore } from "pinia";

import type {
  IKuList,
  IKuStore,
  EntityId,
  GetAllKus,
} from "~/utils/types/directoryTypes";

export const useKuStore = defineStore("KuStore", {
  state: (): IKuStore => ({
    //селекты для множественного выбора
    multipleSelection: [],
    multipleTableRef: null,
    //данные 
    tableData: [],
    //пагинация в таблицах
    pagination: null,
    countRowTable: 20,
    //
    legalEntity: [],
    //поиски
    search: "",
    //параметры для фильтров при запросах
    filterKuValue: {
      entity_ids: []
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
    async getKuFromAPIWithFilter(page?: number) {
      console.log('Выполняется запрос ку с фильтрацией...');
      this.setFilterValue('page', page);
      this.setFilterValue('search', this.$state.search);
      await KU.getKuList({
        page_size: this.$state.countRowTable,
        page,
        entity_ids: this.$state.filterKuValue?.entity_ids || [],
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

    //для фильтрации ку
    setFilterValue< 
      T extends keyof GetAllKus,
      U extends GetAllKus[T],
    >(field: T, value: U) {
      console.log('Устанавливается значение фильтра ку:', field, value);
      this.$state.filterKuValue[field] = value
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
        // (legalEntity) => legalEntity.external_code
        (legalEntity) => legalEntity.entity_id
      )
    },
  }
});
