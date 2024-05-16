import { defineStore } from "pinia";
import type { IVendor, IVendorStore, WithoutNullableKeys, IParamVendorsForEntityInVendor, EntityId, IParamCustomers, ICustomerStore } from "~/utils/types/directoryTypes";

export const useCustomerStore = defineStore("ICustomerStore", {
  state: (): ICustomerStore => ({
    dataCustomer: [], 
    pagination: null, 
    countRowTable: 100, 
    entityName: [],
    dataEntity: [],
    search: "",
    sortProp: "",
    sortOrder: "",
    filteredDataCustomer: [],
    juristicPersons: [],
    filterValue: {}
  }),

  getters: {
    getCustomers: (state) => state.dataCustomer,
  },

  actions: {
    //для поиска
    async performSearch(searchQuery: string) {
      try {
        // Устанавливаем значение для поиска в хранилище
        this.setSearchQuery(searchQuery);
        // Вызываем метод для получения данных с учетом поискового запроса
        await this.getCustomerFromAPIWithFilter();
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
      T extends keyof IParamCustomers,
      U extends IParamCustomers[T],
    >(field: T, value: U) {
      this.$state.filterValue[field] = value
    },

    //для пагинации
    setCountRowTable(count: number) {
      this.$state.countRowTable = count;
    },

    //получение поставщиков
    async getCustomerFromAPIWithFilter(page?: number, sort_by?: string, sort_order?: string) {
      this.setFilterValue('page', page);
      this.setFilterValue('search', this.$state.search);
      this.setFilterValue('sort_by', sort_by);
      this.setFilterValue('sort_order', sort_order); 
      await CUSTOMER.getCustomersList({
        page_size: this.$state.countRowTable,
        page,
        entity_id: this.$state.filterValue?.entity_id || [],
        search: this.$state.search,
        sort_by,
        sort_order,
      })
        .then((dataCustomer) => {
          console.log('Получены данные поставщиков:', dataCustomer);
          this.$state.dataCustomer = dataCustomer.results;
          this.$state.pagination = {
            count: dataCustomer.count,
            previous: dataCustomer.previous,
            next: dataCustomer.next,
          };
        })
        .catch((error) => Promise.reject(error));
    },
  },
});
