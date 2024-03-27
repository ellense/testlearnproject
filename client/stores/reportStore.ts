import type { GetAllInvoicesAndProductForGraphic, GraphicForExcelReportInvoice, GraphicForExcelReportProduct, IVendorFull, ReportStore } from "~/utils/types/directoryTypes";

export const useReportStore = defineStore("ReportStore", {
  state: (): ReportStore => ({
    dialogFormReportInvoice: false,
    dialogFormReportProduct: false,
    dialogFormReportActInvoice: false,
    pagination: null,
    countRowTable: 800,
    graphic: [],
    invoices: [],
    products: [],
    kuid: "",
    vendorid: "",
    entityid: "",
    vendor: 
    {
      vendor_id: "",
      name: "",
      urastic_name: "",
      director_name: "",
      urastic_adress: "",
      inn_kpp: "",
      account: "",
      bank_name: "",
      bank_bik: "",
      corr_account: "",
      dir_party: null,
      entity_id: "",
      entity_name: "",
    },
    entity: {
      entity_id: "",
      name: "",
      urastic_name: "",
      director_name: "",
      urastic_address: "",
      inn_kpp: "",
      account: "",
      bank_name: "",
      bank_bink: "",
      corr_account: "",
      merge_id: "",
    },
    official: [],
    getGraphicDone: true,
    printReportToggle: false,
    filterValueInvoice: {}
  }),

  getters: {
    getGraphicInfo: (state) => state.graphic,
    getInvoiceInfo: (state) => state.invoices,
    getProductInfo: (state) => state.products,
  },

  actions: {
    async getGraphicDetailFromApi(grapId: number | null) {
      try {
        const results = await GRAPHIC.getInfoGraphic({
          graph_id: grapId,
        });
        this.$state.graphic = [results];
        this.$state.kuid = results.ku_id;
        this.$state.vendorid = results.vendor_id;
        this.$state.entityid = results.entity_id;
        console.log("успешно получили данные график_айди", results);
        console.log("добавили данные в graphic[] ", this.$state.graphic);
        console.log("номер ку графика, поставщик, юр.лицо ", this.$state.kuid, ",", this.$state.vendorid, ",", this.$state.entityid);
      } catch (error) {
        console.error("Ошибка при получении данных график_айди:", error);
      }
    },

    async getKuOfficialDetailFromApi(kuId: string) {
      try {
        const results = await KU.getKuOfficial({
          ku_id: kuId,
        });
        this.$state.official = results;
        console.log("успешно получили данные должн лиц", results);
        console.log("добавили данные в official ", this.$state.official);
      } catch (error) {
        console.error("Ошибка при получении данных график_айди:", error);
      }
    },
    // async getVendorDetailFromApi(vendorId: string) {
    //   try {
    //     const results = await VENDOR.getVendorDetail({
    //       vendor_id: vendorId,
    //     });
    //     this.$state.vendor = results;
    //     console.log("успешно получили данные вендорафулл", results);
    //     console.log("добавили данные в vendor ", this.$state.vendor);
    //   } catch (error) {
    //     console.error("Ошибка при получении данных вендорафулл:", error);
    //   }
    // },
    async getVendorDetailFromApi(vendorId: string) {
      try {
        const result = await VENDOR.getVendorDetail({
          vendor_id: vendorId,
        });
        // Учитывая, что результат находится в свойстве results массива
        this.$state.vendor = result;
        console.log("успешно получили данные вендорафулл", result);
        console.log("добавили данные в vendor ", this.$state.vendor);
      } catch (error) {
        console.error("Ошибка при получении данных вендорафулл:", error);
      }
    },
    async getEntityDetailFromApi(entityId: string) {
      try {
        const results = await ENTITY.getEntityDetail({
          entity_id: entityId,
        });
        this.$state.entity = results;
        console.log("успешно получили данные энтитифулл", results);
        console.log("добавили данные в entity ", this.$state.entity);
      } catch (error) {
        console.error("Ошибка при получении данных энтитифулл:", error);
      }
    },

    setFilterValueInvoices<
      T extends keyof GetAllInvoicesAndProductForGraphic,
      U extends GetAllInvoicesAndProductForGraphic[T],
    >(field: T, value: U) {
      this.$state.filterValueInvoice[field] = value
    },

    // async getInvoiceDetailForGraphicFromAPIWithFilter(graph_id?: number | null, page?: number) {
    //     this.setFilterValueInvoices('graph_id', graph_id);
    //     this.setFilterValueInvoices('page', page);
    //     await GRAPHIC.getInfoInvoicesForGraphic({
    //         graph_id,
    //         page_size: this.$state.countRowTable,
    //         page,
    //     })
    //         .then((invoices) => {
    //             console.log('успешно получили данные invoice for grapgic', invoices);
    //             this.$state.invoices = invoices.results;
    //             console.log("добавили данные в invoices[] ", this.$state.invoices);
    //             this.$state.pagination = {
    //                 count: invoices.count,
    //                 previous: invoices.previous,
    //                 next: invoices.next,
    //               };
    //         })
    //         .catch((error) => {
    //             console.error('Ошибка при получении данных invoice for grapgic:', error);
    //             return Promise.reject(error);
    //         });
    // },
    async fetchAllInvoices(graph_id?: number | null,) {
      try {
        let allInvoices: GraphicForExcelReportInvoice[] = [];
        let nextPage = 1;
        let totalPages = 1;
        while (nextPage <= totalPages) {
          const invoice = await GRAPHIC.getInfoInvoicesForGraphic({
            page_size: this.$state.countRowTable,
            page: nextPage,
            graph_id,
          });
          allInvoices = allInvoices.concat(invoice.results);
          totalPages = Math.ceil(invoice.count / this.$state.countRowTable);
          nextPage++;
        }
        console.log("Все данные о invoice for grapgic", allInvoices);
        this.$state.invoices = allInvoices;
      } catch (error) {
        console.error(
          "Ошибка при получении данных invoice for grapgic",
          error
        );
        return Promise.reject(error);
      }
    },
    async fetchAllProducts(graph_id?: number | null,) {
      try {
        let allProducts: GraphicForExcelReportProduct[] = [];
        let nextPage = 1;
        let totalPages = 1;
        while (nextPage <= totalPages) {
          const product = await GRAPHIC.getInfoProductsForGraphic({
            page_size: this.$state.countRowTable,
            page: nextPage,
            graph_id,
          });
          allProducts = allProducts.concat(product.results);
          totalPages = Math.ceil(product.count / this.$state.countRowTable);
          nextPage++;
        }
        console.log("Все данные о товарах для отчета", allProducts);
        this.$state.products = allProducts;
      } catch (error) {
        console.error(
          "Ошибка при получении данных товаров для отчета",
          error
        );
        return Promise.reject(error);
      }
    },















    // async getInvoiceDetailForGraphicFromApi(grapId: number | null) {
    //     try {
    //         const results = await GRAPHIC.getInfoInvoicesForGraphic({
    //             graph_id: grapId,
    //         });
    //         this.$state.invoices = [results];
    //         console.log("успешно получили данные invoice for grapgic", results);
    //         console.log("добавили данные в invoices[] ", this.$state.graphic);
    //     } catch (error) {
    //         console.error("Ошибка при получении данных invoice for grapgic:", error);
    //     }
    // },




    // async getGraphicsFromAPIWithFilter(page?: number) {
    //     this.setFilterValue2('page', page);
    //     this.setFilterValue2('search', this.$state.search2);
    //     await GRAPHIC.getGraphic({
    //         page_size: this.$state.countRowTable,
    //         page,
    //         entity_id: this.$state.filterGraphicValue?.entity_id || [],
    //         ku_id: this.$state.filterGraphicValue?.ku_id || [],
    //         search: this.$state.search2,
    //     })
    //         .then((dataGraphic) => {
    //             this.$state.dataGraphic = dataGraphic.results;
    //             this.$state.pagination = {
    //                 count: dataGraphic.count,
    //                 previous: dataGraphic.previous,
    //                 next: dataGraphic.next,
    //             };
    //         })
    //         .catch((error) => Promise.reject(error));
    // },

  }
})
