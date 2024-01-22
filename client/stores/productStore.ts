import { defineStore } from "pinia";
import type { ProductStore } from "~/utils/types/directoryTypes";

export const useProductStore = defineStore("ProductStore", {
  state: (): ProductStore => ({
    product: [],
    pagination: null,
    countRowTable: 50,
  }),

  getters: {
    getProducts: (state) => state.product,
  },

  actions: {
    async fetchProductsList(page?: number) {
      try {
        const products = await PRODUCT.getProductsList({
          page_size: this.$state.countRowTable,
          page,
        });
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
