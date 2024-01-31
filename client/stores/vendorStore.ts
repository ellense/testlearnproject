import { defineStore } from "pinia";
import type { IVendor, VendorStore, WithoutNullableKeys, IEntityIdAndName, GetAllVendorsForEntityInVendor, EntityId } from "~/utils/types/directoryTypes";

export const useVendorStore = defineStore("VendorStore", {
  state: (): VendorStore => ({
    dataVendor: [], // Массив поставщиков
    pagination: null, // Пагинация результатов запроса
    countRowTable: 100, // Количество строк в таблице
    entityName: [],
    dataEntity: [],
    search: "",
    filteredDataVendor: [],
    juristicPersons: [],
    filterValue: { entity_id: [] }
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
      VENDOR.getEntityById()
        .then((juristicPersons) => this.setJuristicPersons(juristicPersons))
        .catch((e) => console.log(e))
    },
    setJuristicPersons(data: EntityId[]) {
      this.$state.juristicPersons = data.map(
        (juristicPerson) => juristicPerson.entity_id
      )
    },
    setFilterValue<
      T extends keyof GetAllVendorsForEntityInVendor,
      U extends GetAllVendorsForEntityInVendor[T],
    >(field: T, value: U) {
      this.$state.filterValue[field] = value
    },

    //для пагинации
    setCountRowTable(count: number) {
      this.$state.countRowTable = count;
    },
    //получение поставщиков
    async getVendorFromAPIWithFilter(page?: number) {
      this.setFilterValue('page', page);
      this.setFilterValue('search', this.$state.search);
      await VENDOR.getVendorsForEntityInVendor({
        page_size: this.$state.countRowTable,
        page,
        entity_id: this.$state.filterValue?.entity_id || [],
        search: this.$state.search,
      })
        .then((dataVendor) => {
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
