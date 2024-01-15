import { defineStore } from "pinia";
import type { IVendor, IVendorListApi, IVendorTableStore } from "~/utils/types/directoryTypes";

export const useVendorTableStore = defineStore("VendorTableStore", {
  state: 
  (): IVendorTableStore => ({
    search: "",
    vendorList: [],
    vendors_list: [],
    countPage: null,
    filterVendor: null,
  }),


  getters: {
    //getVendorList: (state) => state.vendors_list,
     getVendorList: (state) => state.vendorList,
    getCountPage: (state) => state.countPage,
    getUseFilterVendor: (state) => state.filterVendor !== null,
    

  },

  actions: {
    async fetchVendorsList(data: IVendor) {
      try {
        const result = await VENDOR.getVendorsList(data);
        console.log('Fetch result:', result);
        if (Array.isArray(result.results)) {
          this.vendorList = result.results;
          this.setProductData(result);
          // console.log(' result массив:', result);
           // Вызываем setProductData здесь
        } else {
          this.vendorList = [];
          console.error("Данные не получены или не являются массивом");
        }
      } catch (error) {
        console.error("Произошла ошибка при выполнении запроса", error);
        console.error("Произошла ошибка", error);
      }
    },
    async getPage(page: number) {
      try {
        console.log('Fetching data for page:', page);
        const result = await VENDOR.getVendorsList({
          vendorid: "",
          name: "",
          urasticname: "",
          directorname: "",
          urasticadress: "",
          inn_kpp: "",
          entityid: "",
          page: page,
          page_size: null,
        });
        this.setProductData(result);
        console.log("page2 ", page)
      } catch (error) {
        console.error("Произошла ошибка при получении данных", error);
      }
    },

    setProductData(vendor_list: IVendorListApi) {
      console.log(1)
      this.$state.vendors_list = vendor_list.results
      // this.$state.countPage = Math.round(vendor_list.count / 10)
      this.$state.countPage = vendor_list.count
      console.log("vendor_list ",vendor_list)
      console.log("vendor_list.count ",vendor_list.count)
      console.log("vendor_list.results ",vendor_list.results)
    },
  },
});
