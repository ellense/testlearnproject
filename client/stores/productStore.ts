import { defineStore } from "pinia";
import type { ProductStore, GetAllProducts } from "~/utils/types/productTypes";

export const useProductStore = defineStore("ProductStore", {
  state: (): ProductStore => ({
    product: [],
    pagination: null,
    countRowTable: 100,
    sortProp: "",
    sortOrder: "",
    search: "",
    filterValue: {},
  }),

  getters: {
    getProducts: (state) => state.product,
  },

  actions: {
    //для поиска
    async performSearch(searchQuery: string) {
      try {
        this.setSearchQuery(searchQuery);
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

    async getProductFromAPIWithFilter(page?: number, sort_by?: string, sort_order?: string) {
      this.setFilterValue('page', page);
      this.setFilterValue('search', this.$state.search);
      this.setFilterValue('categories_l4', this.$state.filterValue.categories_l4);
      this.setFilterValue('sort_by', sort_by); 
      this.setFilterValue('sort_order', sort_order); 
      await PRODUCT.getProductsList({
        page_size: this.$state.countRowTable,
        page,
        search: this.$state.search,
        categories_l4: this.$state.filterValue.categories_l4,
        sort_by,
        sort_order,
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
