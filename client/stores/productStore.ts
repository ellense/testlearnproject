import { defineStore } from "pinia";
import type { GetAllProducts, ProductStore } from "~/utils/types/directoryTypes";

export const useProductStore = defineStore("ProductStore", {
  state: (): ProductStore => ({
    product: [],
    pagination: null,
    countRowTable: 100,
    search: "",
    filterValue: {},
    // productList: [] as IProduct[],
  }),

  getters: {
    getProducts: (state) => state.product,
  },

  actions: {
    //для поиска
    async performSearch(searchQuery: string) {
      try {
        // Устанавливаем значение для поиска в хранилище
        this.setSearchQuery(searchQuery);
        // Вызываем метод для получения данных с учетом поискового запроса
        await this.getProductFromAPIWithFilter();
      } catch (error) {
        console.error('Ошибка при выполнении поиска', error);
      }
    },

    setSearchQuery(query: string) {
      this.$state.search = query;
    },

    setFilterValue<
      T extends keyof GetAllProducts,
      U extends GetAllProducts[T],
    >(field: T, value: U) {
      this.$state.filterValue[field] = value
    },
    setCountRowTable(count: number) {
      this.$state.countRowTable = count;
    },

    async getProductFromAPIWithFilter(page?: number) {
      this.setFilterValue('page', page);
      this.setFilterValue('search', this.$state.search);
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
  },
});
