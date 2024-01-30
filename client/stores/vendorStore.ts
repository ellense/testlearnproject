import { defineStore } from "pinia";
import type { IVendor, VendorStore, WithoutNullableKeys, IEntityIdAndName, GetAllVendorsForEntityInVendor, EntityId } from "~/utils/types/directoryTypes";

export const useVendorStore = defineStore("VendorStore", {
  state: (): VendorStore => ({
    dataVendor: [], // Массив поставщиков
    pagination: null, // Пагинация результатов запроса
    countRowTable: 100, // Количество строк в таблице
    entityName: [],
    dataEntity: [],
    search: "",
    filteredDataVendor: [],
    juristicPersons: [],
    filterValue: {entity_id:[]}
  }),

  getters: {
    getVendors: (state) => state.dataVendor as WithoutNullableKeys<IVendor[]>,
  },

  actions: {
    getJuristicPersonsFromApi() {
      VENDOR.getEntityById()
        .then((juristicPersons) => this.setJuristicPersons(juristicPersons))
        .catch((e) => console.log(e))
    },
    setJuristicPersons(data: EntityId[]) {
      this.$state.juristicPersons = data.map(
        (juristicPerson) => juristicPerson.entity_id
      )
    },

    setCountRowTable(count: number) {
      this.$state.countRowTable = count;
    },
    // async getVendorFromAPIWithFilter(page?: number) {
    //   this.setFilterValue('page', page)

    //   await VENDOR.getVendorsForEntityInVendor({
    //     page_size: this.$state.countRowTable,
    //     page,
    //     entity_id: this.$state.filterValue?.entity_id,
    //   })
    //     .then((dataVendor) => {
    //       this.$state.dataVendor = dataVendor.results
    //       this.$state.pagination = {
    //         count: dataVendor.count,
    //         previous: dataVendor.previous,
    //         next: dataVendor.next,
    //       }
    //     })
    //     .catch((error) => Promise.reject(error))
    // },
    async getVendorFromAPIWithFilter(page?: number) {
      this.setFilterValue('page', page);
    
      // Используйте множественные значения для фильтрации
      await VENDOR.getVendorsForEntityInVendor({
        page_size: this.$state.countRowTable,
        entity_id: this.$state.filterValue?.entity_id || [], // Изменено здесь
      })
        .then((dataVendor) => {
          this.$state.dataVendor = dataVendor.results;
          this.$state.pagination = {
            count: dataVendor.count,
            previous: dataVendor.previous,
            next: dataVendor.next,
          };
        })
        .catch((error) => Promise.reject(error));
    },
    // async fetchVendorsList(page?: number) {
    //   try {
    //     const vendors = await VENDOR.getVendorsList({
    //       page_size: this.$state.countRowTable,
    //       page,
    //     });
    //     this.$state.dataVendor = vendors.results;
    //     this.$state.pagination = {
    //       count: vendors.count,
    //       previous: vendors.previous,
    //       next: vendors.next,
    //     };
    //   } catch (error) {
    //     return Promise.reject(error);
    //   }
    // },

    // async fetchVendorEntity(data: IEntityIdAndName) {
    //   try {
    //     const result = await ENTITY.getEntityNameById(data);
    //     if (Array.isArray(result)) {
    //       this.dataEntity = result;
    //     } else {
    //       this.dataEntity = [];
    //       console.error("Данные не получены или не являются массивом");
    //     }
    //   } catch (error) {
    //     console.error("Произошла ошибка", error);
    //   }
    // },

    // async fetchVendorsListForEntity(page?: number, entityid?: string) {
    //   try {
    //     const vendors = await VENDOR.getVendorsForEntityInVendor({
    //       page_size: this.$state.countRowTable,
    //       page,
    //       entity_id: this.$state.entityName,
    //     });
    //     this.$state.dataVendor = vendors.results;
    //     console.log("данные о поставщиках по фильтру юр. лиц:", this.$state.dataVendor);
    //     console.log("vendors:", vendors);
    //     this.$state.pagination = {
    //       count: vendors.count,
    //       previous: vendors.previous,
    //       next: vendors.next,
    //     };
    //   } catch (error) {
    //     console.error(
    //       "Произошла ошибка при получении данных о поставщиках по фильтру юр. лиц",
    //       error
    //     );
    //     return Promise.reject(error);
    //   }
    // },
    
    

    setFilterValue<
      T extends keyof GetAllVendorsForEntityInVendor,
      U extends GetAllVendorsForEntityInVendor[T],
    >(field: T, value: U) {
      this.$state.filterValue[field] = value
    },

  },
});
