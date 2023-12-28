import { defineStore } from "pinia";
import type { IProduct } from "~/utils/types/directoryTypes";

export const useProductTableStore = defineStore("ProductTableStore", {
  state: () => ({
    search: "",
    productList: [] as IProduct[],
  }),

  getters: {
    searchProductsList: (state) => {
      const searchValue = state.search.toLowerCase();
      return state.productList.filter((item) => {
        const itemidMatch =
          item.itemid && item.itemid.toLowerCase().includes(searchValue);
        const classifier_nameMatch =
          item.classifier_name &&
          item.classifier_name.toLowerCase().includes(searchValue);
        const nameMatch =
          item.name && item.name.toLowerCase().includes(searchValue);
        const brand_nameMatch =
          item.brand_name &&
          item.brand_name.toLowerCase().includes(searchValue);
        return (
          itemidMatch || classifier_nameMatch || nameMatch || brand_nameMatch
        );
      });
    },
  },

  actions: {
    async fetchProductsList(data: IProduct) {
      try {
        const result = await PRODUCT.getProductsList(data);

        if (Array.isArray(result)) {
          this.productList = result;
        } else {
          this.productList = [];
          console.error("Данные не получены или не являются массивом");
        }
      } catch (error) {
        console.error("Произошла ошибка", error);
      }
    },
  },
});
