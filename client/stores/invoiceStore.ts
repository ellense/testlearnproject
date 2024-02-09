import { defineStore } from "pinia";
import type { EntityId, GetAllInvoices, IVendorId, InvoiceStore } from "~/utils/types/directoryTypes";

export const useInvoiceStore = defineStore("InvoiceStore", {
  state: (): InvoiceStore => ({
    dataInvoice: [],
    pagination: null,
    countRowTable: 100,
    legalEntity: [],
    vendor: [],
    search: "",
    filterValue: {
      entity_id: [],
      vendor_id: []
    }
  }),

  getters: {
    getInvoices: (state) => state.dataInvoice,
  },

  actions: {
    //для поиска
    async performSearch(searchQuery: string) {
      try {
        this.setSearchQuery(searchQuery);
        await this.getInvoicesFromAPIWithFilter();
      } catch (error) {
        console.error('Ошибка при выполнении поиска', error);
      }
    },

    setSearchQuery(query: string) {
      console.log('Устанавливается запрос поиска:', query);
      this.$state.search = query;
    },

    //для фильтрации
    getLegalEntityFromApi() {
      console.log('Запрос данных о юридических лицах...');
      ENTITY.getEntityById()
        .then((legalEntity) => {
          console.log('Получены данные о юридических лицах:', legalEntity);
          this.setLegalEntity(legalEntity);
        })
        .catch((e) => console.error('Ошибка при получении данных о юридических лицах:', e));
    },
    setLegalEntity(data: EntityId[]) {
      console.log('Устанавливаются данные о юридических лицах:', data);
      this.$state.legalEntity = data.map(
        (legalEntity) => legalEntity.entity_id
      )
    },
    // getVendorFromApi() {
    //   console.log('Запрос данных о поставщиках...');
    //   VENDOR.getVendorById()
    //     .then((vendor) => {
    //       console.log('Получены данные о поставщиках:', vendor);
    //       this.setVendor(vendor);
    //     })
    //     .catch((error) => {
    //       console.error('Ошибка при получении данных о поставщиках:', error.message);
    //       // Вы также можете вывести полный объект ошибки для получения дополнительной информации:
    //       console.error('Полная ошибка:', error);
    //     });
    // },
    async fetchVendorsListForEntityInInvoice(page?: number) {
      try {
        const vendors = await VENDOR.getVendorsForEntityInKU({
          page_size: this.$state.countRowTable,
          page,
          entity_id: this.$state.legalEntity,
        });
        this.$state.vendor = vendors.results;
        this.$state.pagination = {
          count: vendors.count,
          previous: vendors.previous,
          next: vendors.next,
        };
      } catch (error) {
        console.error(
          "Произошла ошибка при получении данных о поставщиках для юридического лица в накладных",
          error
        );
        return Promise.reject(error);
      }
    },
    // setVendor(data: IVendorId[]) {
    //   console.log('Устанавливаются данные о поставщиках:', data);
    //   this.$state.vendor = data.map(
    //     (vendor) => vendor.vendor_id
    //   )
    // },
    setFilterValue<
      T extends keyof GetAllInvoices,
      U extends GetAllInvoices[T],
    >(field: T, value: U) {
      console.log('Устанавливается значение фильтра:', field, value);
      this.$state.filterValue[field] = value
    },

    //для пагинации
    setCountRowTable(count: number) {
      this.$state.countRowTable = count;
    },

    
    //получение накладных
    async getInvoicesFromAPIWithFilter(page?: number) {
      console.log('Выполняется запрос накладных с фильтрацией...');
      this.setFilterValue('page', page);
      this.setFilterValue('search', this.$state.search);
      await INVOICE.getInvoicesList({
        page_size: this.$state.countRowTable,
        page,
        entity_id: this.$state.filterValue?.entity_id || [],
        vendor_id: this.$state.filterValue?.vendor_id || [],
        search: this.$state.search,
      })
        .then((dataInvoice) => {
          console.log('Получены данные накладных:', dataInvoice);
          this.$state.dataInvoice = dataInvoice.results;
          this.$state.pagination = {
            count: dataInvoice.count,
            previous: dataInvoice.previous,
            next: dataInvoice.next,
          };
        })
        .catch((error) => {
          console.error('Ошибка при получении данных накладных:', error);
          return Promise.reject(error);
        });
    },
  },
});
