import { defineStore } from "pinia";
import type { IVendor, VendorStore, WithoutNullableKeys, GetAllVendors, IEntityIdAndName } from "~/utils/types/directoryTypes";

export const useVendorStore = defineStore("VendorStore", {
  state: (): VendorStore => ({
    dataVendor: [], // Массив поставщиков
    pagination: null, // Пагинация результатов запроса
    countRowTable: 100, // Количество строк в таблице
    entityName: "",
    dataEntity: [],
    search: "",
  }),
  getters: {
    getVendors: (state) => state.dataVendor as WithoutNullableKeys<IVendor[]>,
  },

  actions: {
    setCountRowTable(count: number) {
      this.$state.countRowTable = count;
    },
    async fetchVendorsList(page?: number) {
      try {
        const vendors = await VENDOR.getVendorsList({
          page_size: this.$state.countRowTable,
          page,
        });
        this.$state.dataVendor = vendors.results;
        this.$state.pagination = {
          count: vendors.count,
          previous: vendors.previous,
          next: vendors.next,
        };
      } catch (error) {
        return Promise.reject(error);
      }
    },

    async fetchVendorEntity(data: IEntityIdAndName) {
      try {
        const result = await ENTITY.getEntityNameById(data);
        if (Array.isArray(result)) {
          this.dataEntity = result;
        } else {
          this.dataEntity = [];
          console.error("Данные не получены или не являются массивом");
        }
      } catch (error) {
        console.error("Произошла ошибка", error);
      }
    },

    async fetchVendorsListForEntity(page?: number) {
      try {
        const vendors = await VENDOR.getVendorsForEntityInVendor({
          page_size: this.$state.countRowTable,
          page,
          entity_id: this.$state.entityName,
        });
        this.$state.dataVendor = vendors.results;
        this.$state.pagination = {
          count: vendors.count,
          previous: vendors.previous,
          next: vendors.next,
        };
      } catch (error) {
        console.error("Ошибка при получении данных по фильтру", error);
        return Promise.reject(error);
      }
    },
  },
});
