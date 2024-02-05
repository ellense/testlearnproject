import { defineStore } from "pinia";
import type { GetAllInvoices, InvoiceStore } from "~/utils/types/directoryTypes";

export const useInvoiceStore = defineStore("InvoiceStore", {
  state: ():InvoiceStore => ({
    dataInvoice: [],
    pagination: null,
    countRowTable: 100,
    search: "",
    filterValue: {}
  }),

  getters: {
    getInvoices: (state) => state.dataInvoice,
  },

  actions: {
    //для поиска
    async performSearch(searchQuery: string) {
      try {
        // Устанавливаем значение для поиска в хранилище
        this.setSearchQuery(searchQuery);
        // Вызываем метод для получения данных с учетом поискового запроса
        await this.getInvoicesFromAPIWithFilter();
      } catch (error) {
        console.error('Ошибка при выполнении поиска', error);
      }
    },

    setSearchQuery(query: string) {
      this.$state.search = query;
    },

    //для фильтрации
    setFilterValue<
      T extends keyof GetAllInvoices,
      U extends GetAllInvoices[T],
    >(field: T, value: U) {
      this.$state.filterValue[field] = value
    },

    //для пагинации
    setCountRowTable(count: number) {
      this.$state.countRowTable = count;
    },
    //получение накладных
    
    async getInvoicesFromAPIWithFilter(page?: number) {
      this.setFilterValue('page', page);
      this.setFilterValue('search', this.$state.search);
      await INVOICE.getInvoicesList({
        page_size: this.$state.countRowTable,
        page,
        search: this.$state.search,
      })
        .then((dataInvoice) => {
          this.$state.dataInvoice = dataInvoice.results;
          this.$state.pagination = {
            count: dataInvoice.count,
            previous: dataInvoice.previous,
            next: dataInvoice.next,
          };
        })
        .catch((error) => Promise.reject(error));
    },
  },
});
