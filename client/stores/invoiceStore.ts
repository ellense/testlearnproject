import { defineStore } from "pinia";
import type { InvoiceStore } from "~/utils/types/directoryTypes";

export const useInvoiceStore = defineStore("InvoiceStore", {
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
        });
    
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
