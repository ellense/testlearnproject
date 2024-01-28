import { defineStore } from "pinia";
import type { ProductStore } from "~/utils/types/directoryTypes";

export const useProductStore = defineStore("ProductStore", {
  state: (): ProductStore => ({
    product: [],
    pagination: null,
    countRowTable: 100,
  }),

  getters: {
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
        console.log("products", products);
        this.$state.product = products.results;
        this.$state.pagination = {
          count: products.count,
          previous: products.previous,
          next: products.next,
        };
        console.log("this.$state.product", this.$state.product);
      } catch (error) {
        return Promise.reject(error);
      }
    },
  },
});
