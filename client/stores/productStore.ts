import { defineStore } from "pinia";
import type { ProductStore } from "~/utils/types/directoryTypes";

export const useProductStore = defineStore("ProductStore", {
  state: (): ProductStore => ({
    product: [],
    pagination: null,
    countRowTable: 100,
    // search: "",
    // productList: [] as IProduct[],
  }),

  getters: {
    // searchProductsList: (state) => {
    //   const searchValue = state.search.toLowerCase();
    //   return state.productList.filter((item) => {
    //     const itemidMatch = item.itemid.toLowerCase().includes(searchValue);
    //     const classifier_idMatch = item.classifier_id.toLowerCase().includes(searchValue);
    //     const nameMatch = item.name.toLowerCase().includes(searchValue);
    //     const brand_id = item.brand_id.toLowerCase().includes(searchValue);
    //     return itemidMatch || classifier_idMatch || nameMatch || brand_id;
    //   });
    // },
    getProducts: (state) => state.product,
  },

  actions: {
    setCountRowTable(count: number) {
      this.$state.countRowTable = count;
    },

    async fetchProductsList(page?: number) {
      try {
        const products = await PRODUCT.getProductsList({
          page_size: this.$state.countRowTable,
          page,
        }
        );
        this.$state.product = products.results;
        this.$state.pagination = {
          count: products.count,
          previous: products.previous,
          next: products.next,
        };
      } catch (error) {
        return Promise.reject(error);
      }
    },
  },
});
