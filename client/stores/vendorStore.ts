import { defineStore } from "pinia";
import type { IVendor, VendorStore, WithoutNullableKeys,GetAllVendors } from "~/utils/types/directoryTypes";

export const useVendorStore = defineStore("VendorStore", {
  state: (): VendorStore => ({
    vendors: [], // Массив вакансий
    pagination: null, // Пагинация результатов запроса
    countRowTable: 100, // Количество строк в таблице
  }),
  getters: {
    getVendors: (state) => state.vendors as WithoutNullableKeys<IVendor[]>,
    
  },

  actions: {
    async fetchVendorsList(page?: number) {
      console.log('fetchVendorsList called with page:', page);
  
      await VENDOR.getVendorsList({
        page_size: this.$state.countRowTable,
        
      })
      .then((vendors) => {
        console.log('Received vendors data:', vendors);
  
        // Обновление массива вакансий и пагинации
        this.$state.vendors = vendors.results;
        this.$state.pagination = {
          count: vendors.count,
          previous: vendors.previous,
          next: vendors.next,
        };
  
        console.log('Updated pagination:', this.$state.pagination);
      })
      .catch((error) => {
        console.error('Error fetching vendors:', error);
        return Promise.reject(error);
      });
    },
  },
});
