import { defineStore } from "pinia";
import type { IVendor, IVendorList, IVendorListApi, IVendorTableStore } from "~/utils/types/directoryTypes";

export const useVendorTableStore = defineStore("VendorTableStore", {
  state: (): IVendorTableStore => ({
    search: "",
    vendorList: [],
    vendors_list: [],
    countPage: null,
    filterVendor: null,
  }),
  // (): IVendorList => ({
  //   vendorid: "",
  // name: "",
  // urasticname: "",
  // directorname: "",
  // urasticadress: "",
  // inn_kpp: "",
  // entityid: "",
  // page: null,
  // page_size: null,
  // vendors_list:  null,
  // countPage:  null,
  // filterVendor:  null,
  // }),


  getters: {
    getVendorList: (state) => state.vendors_list,
    getCountPage: (state) => state.countPage,
    getUseFilterVendor: (state) => state.filterVendor !== null,
    //поиск
    // searchVendorList: (state) => {
    //   const searchValue = state.search.toLowerCase();
    //   return state.vendorList.filter((item) => {
    //     const vendoridMatch = item.vendorid.toLowerCase().includes(searchValue);
    //     const directornameMatch = item.directorname
    //       .toLowerCase()
    //       .includes(searchValue);
    //     const nameMatch = item.name.toLowerCase().includes(searchValue);
    //     const urasticaddressMatch = item.urasticadress
    //       .toLowerCase()
    //       .includes(searchValue);
    //     const urasticnameMatch = item.urasticname
    //       .toLowerCase()
    //       .includes(searchValue);
    //     const inn_kppMatch = item.inn_kpp.toLowerCase().includes(searchValue);
    //     return (
    //       vendoridMatch ||
    //       directornameMatch ||
    //       nameMatch ||
    //       urasticaddressMatch ||
    //       urasticnameMatch ||
    //       inn_kppMatch
    //     );
    //   });
    // },

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
    // async getPage(page: number) {
    //   try {

    //     await VENDOR.getVendorsList({
    //       vendorid: "",
    //       name: "",
    //       urasticname: "",
    //       directorname: "",
    //       urasticadress: "",
    //       inn_kpp: "",
    //       entityid: "",
    //       page: page,
    //       page_size: 100,
    //     }).then((result) => this.setProductData(result))
    //     console.log("page ",page)
    //     // this.setProductData(result);
    //   } catch (error) {
    //     console.error("Произошла ошибка при получении данных", error);
    //   }
    // },
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

    // setProductData(vendor_list: IVendorListApi) {
    //   console.log('setProductData called with:', vendor_list);
    //   this.$patch({
    //     vendors_list: vendor_list.results,
    //     countPage: vendor_list.count,
    //   });
    //   console.log('Data updated:', this.$state.vendors_list, this.$state.countPage);
    //   // console.log('setProductData called with:', vendor_list);
    //   // this.$patch({
    //   //   vendors_list: vendor_list.results,
    //   //   countPage: vendor_list.count,
    //   // });
    //   // console.log('Data updated:', this.$state.vendors_list, this.$state.countPage);
    // }
    setProductData(vendor_list: IVendorListApi) {
      console.log(1)
      this.$state.vendors_list = vendor_list.results
      // this.$state.countPage = Math.round(vendor_list.count / 10)
      this.$state.countPage = vendor_list.count
      console.log("vendor_list ",vendor_list)
      console.log("vendor_list.count ",vendor_list.count)
      console.log("vendor_list.results ",vendor_list.results)
    },
    // setProductData(vendor_list: IVendorListApi) {
    //   console.log('setProductData called with:', vendor_list);
    
    //   // Проверьте, что vendor_list.count и vendor_list.results корректны
    //   console.log('Count:', vendor_list.count);
    //   console.log('Results:', vendor_list.results);
    
    //   // Обновите состояние хранилища
    //   this.$patch({
    //     vendors_list: vendor_list.results,
    //     countPage: vendor_list.count,
    //   });
    
    //   console.log('Data updated:', this.$state.vendors_list, this.$state.countPage);
    // }
  },
});
