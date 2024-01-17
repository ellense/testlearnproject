import { defineStore } from "pinia";
import type { GetAllInvoicesReturnData, IInvoice, InvoiceStore, WithoutNullableKeys } from "~/utils/types/directoryTypes";

export const useInvoiceTableStore = defineStore("InvoiceTableStore", {
  state: ():InvoiceStore => ({
    invoice: [],
    pagination: null,
    countRowTable: 50,
  }),

  getters: {
    getInvoices: (state) => state.invoice,
  },

  actions: {
    async fetchInvoicesList(page?: number) {
      try {
        const invoices = await INVOICE.getInvoicesList({
          page_size: this.$state.countRowTable,
          page, 
        }) as GetAllInvoicesReturnData; // Явно указываем тип данных
    
        this.$state.invoice = invoices.results;
        this.$state.pagination = {
          count: invoices.count,
          previous: invoices.previous,
          next: invoices.next,
        };
      } catch (error) {
        return Promise.reject(error);
      }
    },
  },
});
