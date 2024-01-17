import { defineStore } from "pinia";
import type { IVendor, VendorStore, WithoutNullableKeys, GetAllVendors } from "~/utils/types/directoryTypes";

export const useVendorStore = defineStore("VendorStore", {
  state: (): VendorStore => ({
    vendors: [], // Массив поставщиков
    pagination: null, // Пагинация результатов запроса
    countRowTable: 50, // Количество строк в таблице
  }),
  getters: {
    getVendors: (state) => state.vendors as WithoutNullableKeys<IVendor[]>,
  },

  actions: {
    async fetchVendorsList(page?: number) {
      try {
        const vendors = await VENDOR.getVendorsList({
          page_size: this.$state.countRowTable,
          page, 
        });
        this.$state.vendors = vendors.results;
        this.$state.pagination = {
          count: vendors.count,
          previous: vendors.previous,
          next: vendors.next,
        };
      } catch (error) {
        return Promise.reject(error);
      }
    },
  },
});
