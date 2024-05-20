import { defineStore } from "pinia";
import type { EntityId } from "~/utils/types/entityTypes";
import type { WithoutNullableKeys } from "~/utils/types/generalTypes";
import type { IVendorStore } from "~/utils/types/storesTypes";
import type { IVendor, IParamVendorsForEntityInVendor } from "~/utils/types/vendorTypes";

export const useVendorStore = defineStore("IVendorStore", {
  state: (): IVendorStore => ({
    dataVendor: [], // Массив поставщиков
    pagination: null, // Пагинация результатов запроса
    countRowTable: 100, // Количество строк в таблице
    entityName: [],
    dataEntity: [],
    search: "",
    sortProp: "",
    sortOrder: "",
    filteredDataVendor: [],
    juristicPersons: [],
    filterValue: {}
  }),

  getters: {
    getVendors: (state) => state.dataVendor as WithoutNullableKeys<IVendor[]>,
  },

  actions: {
    //для поиска
    async performSearch(searchQuery: string) {
      try {
        // Устанавливаем значение для поиска в хранилище
        this.setSearchQuery(searchQuery);
        // Вызываем метод для получения данных с учетом поискового запроса
        await this.getVendorFromAPIWithFilter();
      } catch (error) {
        console.error('Ошибка при выполнении поиска', error);
      }
    },

    setSearchQuery(query: string) {
      this.$state.search = query;
    },

    //для фильтра
    getJuristicPersonsFromApi() {
      ENTITY.getEntityById()
        .then((juristicPersons) => this.setJuristicPersons(juristicPersons))
        .catch((e) => console.log(e))
    },
    setJuristicPersons(data: EntityId[]) {
      this.$state.juristicPersons = data.map(
        (juristicPerson) => juristicPerson.entity_id
      )
    },
    setFilterValue<
      T extends keyof IParamVendorsForEntityInVendor,
      U extends IParamVendorsForEntityInVendor[T],
    >(field: T, value: U) {
      this.$state.filterValue[field] = value
    },

    //для пагинации
    setCountRowTable(count: number) {
      this.$state.countRowTable = count;
    },

    //получение поставщиков
    async getVendorFromAPIWithFilter(page?: number, sort_by?: string, sort_order?: string) {
      this.setFilterValue('page', page);
      this.setFilterValue('search', this.$state.search);
      this.setFilterValue('sort_by', sort_by);
      this.setFilterValue('sort_order', sort_order); 
      await VENDOR.getVendorsForEntityInVendor({
        page_size: this.$state.countRowTable,
        page,
        entity_ids: this.$state.filterValue?.entity_ids || [],
        search: this.$state.search,
        sort_by,
        sort_order,
      })
        .then((dataVendor) => {
          console.log('Получены данные поставщиков:', dataVendor);
          this.$state.dataVendor = dataVendor.results;
          this.$state.pagination = {
            count: dataVendor.count,
            previous: dataVendor.previous,
            next: dataVendor.next,
          };
        })
        .catch((error) => Promise.reject(error));
    },
  },
});
