import type { GetAllInvoicesAndProductForGraphic, GetParamKuId, GraphicForExcelReportInvoice, GraphicForExcelReportProduct, IVendorFull, ReportStore } from "~/utils/types/directoryTypes";

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
    filterValueInvoice: {},
    filterValueOfficial: {},
    //пагинация в таблицах
  }),

  getters: {
    getGraphicInfo: (state) => state.graphic,
    getInvoiceInfo: (state) => state.invoices,
    getProductInfo: (state) => state.products,
  },

  actions: {
    //получение графика детеил для 1,2,3 актов
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
    //получение должн. лиц для 3 акта
    async getKuOfficialDetailFromApi(ku_id?: string, page?: number) {
      this.setFilterValueOfficial('ku_id', ku_id);
      await KU.getKuOfficial({
        ku_id,
        page_size: this.$state.countRowTable,
        page,
      })
        .then((tableData) => {
          console.log('Получены данные должн. лиц:', tableData);
          this.$state.official = tableData.results;
          console.log('official:', this.$state.official);
          this.$state.pagination = {
            count: tableData.count,
            previous: tableData.previous,
            next: tableData.next,
          };
        })
        .catch((error) => {
          console.error('Ошибка при получении данных должн. лиц:', error);
          return Promise.reject(error);
        });
    },
    setFilterValueOfficial<
      T extends keyof GetParamKuId,
      U extends GetParamKuId[T],
    >(field: T, value: U) {
      this.$state.filterValueOfficial[field] = value
    },
    //получение поставщиков детеил для 3 акта
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
    //получение юр. лиц детеил для 3 акта
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

    //получение всех накладных по фильтру для 1 акта
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
    setFilterValueInvoices<
      T extends keyof GetAllInvoicesAndProductForGraphic,
      U extends GetAllInvoicesAndProductForGraphic[T],
    >(field: T, value: U) {
      this.$state.filterValueInvoice[field] = value
    },
    //получение всех товаров по фильтру для 2 акта
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
  }
})
