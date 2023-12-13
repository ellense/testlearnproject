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
        const itemidMatch = item.itemid.toLowerCase().includes(searchValue);
        const classifier_idMatch = item.classifier_id.toLowerCase().includes(searchValue);
        const nameMatch = item.name.toLowerCase().includes(searchValue);
        const brand_id = item.brand_id.toLowerCase().includes(searchValue);
        return itemidMatch || classifier_idMatch || nameMatch || brand_id;
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
