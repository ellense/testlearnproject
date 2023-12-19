import { defineStore } from "pinia";
import type { IVendor,IVendorNameId } from "~/utils/types/directoryTypes";

export const useVendorTableStore = defineStore("VendorTableStore", {
  state: () => ({
    search: "",
    vendorList: [] as IVendor[],
    vendorNameAndIdList: [] as IVendorNameId[],
  }),

  getters: {
    searchVendorList: (state) => {
      const searchValue = state.search.toLowerCase();
      return state.vendorList.filter((item) => {
        const vendoridMatch = item.vendorid.toLowerCase().includes(searchValue);
        const directornameMatch = item.directorname.toLowerCase().includes(searchValue);
        const nameMatch = item.name.toLowerCase().includes(searchValue);
        const urasticaddressMatch = item.urasticadress.toLowerCase().includes(searchValue);
        const urasticnameMatch = item.urasticname.toLowerCase().includes(searchValue);
        const inn_kppMatch = item.inn_kpp.toLowerCase().includes(searchValue);
        return vendoridMatch || directornameMatch || nameMatch || urasticaddressMatch || urasticnameMatch || inn_kppMatch;
      });
    },
    getVendorsNameAndId: (state) => state.vendorNameAndIdList,
  },

  actions: {
    async fetchVendorsNameAndId(data: IVendor) {
      try {
        const result = await VENDOR.getVendorsNameAndId(data);

        if (Array.isArray(result)) {
          this.vendorNameAndIdList = result;
          // console.log(result)
        } else {
          this.vendorNameAndIdList = [];
          console.error("Данные не получены или не являются массивом");
        }
      } catch (error) {
        console.error("Произошла ошибка", error);
      }
    },
  
    async fetchVendorsList(data: IVendor) {
      try {
        const result = await VENDOR.getVendorsList(data);

        if (Array.isArray(result)) {
          this.vendorList = result;
        } else {
          this.vendorList = [];
          console.error("Данные не получены или не являются массивом");
        }
      } catch (error) {
        console.error("Произошла ошибка", error);
      }
    },
  },
});
