import type { GraphicForExcelReportInvoice, GetAllInvoicesAndProductForGraphic, GraphicForExcelReportProduct } from "~/utils/types/actTypes";
import type { ReportStore } from "~/utils/types/storesTypes";
import type { IParamKuId } from "~/utils/types/tabsKuTypes";


export const useReportStore = defineStore("ReportStore", {
  state: (): ReportStore => ({
    dialogFormReportInvoice: false,
    dialogFormReportProduct: false,
    dialogFormReportActInvoice: false,
    pagination: null,
    countRowTable: 800,
    graphic: [],
    invoices: [],
    invoicesFull: [],
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
    kuId: {
      ku_id: "",
      entity_id: "",
      entity_name: "",
      vendor_id: "",
      vendor_name: "",
      period: "",
      date_start: "",
      date_end: "",
      graph_exists: false,
      status: "",
      description: "",
      contract: "",
      product_type: "",
      docu_account: "",
      docu_number: "",
      docu_date: "",
      docu_subject: "",
      tax: false,
      exclude_return: false,
      negative_turnover: false,
      pay_method: "",
    },
    official: [],
    numerals: "",
    sumQty: null,
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
    async getNumeralsGraphFromApi(grapId: number | null) {
      try {
        const results = await GRAPHIC.getNumeralsGraphic({
          graph_id: grapId,
        });
        this.$state.numerals = results.sum_calc_words;
        this.$state.sumQty = results.total_qty
        console.log("успешно получили данные числительных", results);
        console.log("добавили данные в numerals ", this.$state.numerals);
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
      T extends keyof IParamKuId,
      U extends IParamKuId[T],
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
    //получение ку детеил для 3 акта
    async getKuDetailFromApi(kuId: string) {
      try {
        const results = await KU.getInfoKu({
          ku_id: kuId,
        });
        this.$state.kuId = results;
        // Изменяем значение product_type в зависимости от текущего значения
        if (results.product_type === "Продовольственные") {
          results.product_type = "продовольственных";
        } else if (results.product_type === "Непродовольственные") {
          results.product_type = "непродовольственных";
        }
        console.log("успешно получили данные ку_айди", results);
      } catch (error) {
        console.error("Ошибка при получении данных ку_айди:", error);
      }
    },

    //получение всех накладных по фильтру для 1 акта
    async fetchAllInvoices(graph_id?: number | null,) {
      try {
        const getStatusText = (status: string): string => {
          return status === "1" ? "Счет-фактура" : "";
        };

        let allInvoices: GraphicForExcelReportInvoice[] = [];
        let nextPage = 1;
        let totalPages = 1;
        while (nextPage <= totalPages) {
          const invoice = await GRAPHIC.getInfoInvoicesForGraphic({
            page_size: this.$state.countRowTable,
            page: nextPage,
            graph_id,
          });

          // Преобразование статуса перед сохранением данных
          const transformedInvoices = invoice.results.map(invoice => ({
            ...invoice,
            invoice_status: getStatusText(invoice.invoice_status)
          }));
          allInvoices = allInvoices.concat(transformedInvoices);
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
