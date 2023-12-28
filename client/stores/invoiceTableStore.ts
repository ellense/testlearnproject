import { defineStore } from "pinia";
import type { IInvoice } from "~/utils/types/directoryTypes";

export const useInvoiceTableStore = defineStore("InvoiceTableStore", {
  state: () => ({
    search: "", // Поиск
    invoiceList: [] as IInvoice[], // Данные таблицы накладной
  }),

  getters: {
    searchInvoicesList: (state) => {
      const searchValue = state.search.toLowerCase();
      return state.invoiceList.filter((item) => {
        const entity_idMatch =
          item.entity_id && item.entity_id.toLowerCase().includes(searchValue);
        const vendor_idMatch =
          item.vendor_id && item.vendor_id.toLowerCase().includes(searchValue);
        const invoice_nameMatch =
          item.invoice_name &&
          item.invoice_name.toLowerCase().includes(searchValue);
        const invoice_numberMatch =
          item.invoice_number &&
          item.invoice_number.toLowerCase().includes(searchValue);
        return (
          entity_idMatch ||
          vendor_idMatch ||
          invoice_nameMatch ||
          invoice_numberMatch
        );
      });
    },
  },

  actions: {
    async fetchInvoicesList(data: IInvoice) {
      try {
        const result = await INVOICE.getInvoicesList(data);

        if (Array.isArray(result)) {
          this.invoiceList = result;
        } else {
          this.invoiceList = [];
          console.error("Данные не получены или не являются массивом");
        }
      } catch (error) {
        console.error("Произошла ошибка", error);
      }
    },
  },
});
