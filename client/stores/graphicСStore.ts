import { defineStore } from 'pinia';
import type { EntityId } from '~/utils/types/entityTypes';
import type { GetAllGraphicС, IGraphicC } from '~/utils/types/graphicCustomerTypes';
import type { IGraphic, GetAllGraphic } from '~/utils/types/graphicVendorTypes';
import type { IKuCList } from '~/utils/types/kuCustomerTypes';
import type { IKuList, IParamKu_Id, IKuId } from '~/utils/types/kuVendorTypes';
import type { IArticle, IPlace, IService } from '~/utils/types/serviceTypes';
import type { IGraphicСStore } from '~/utils/types/storesTypes';
import type { IParamKuId } from '~/utils/types/tabsKuTypes';

export const useGraphicСStore = defineStore("GraphicСStore", {
  state: (): IGraphicСStore => ({
    //селекты для множественного выбора
    multipleSelectionGraphic: [],
    multipleSelectionArticle: [],
    multipleSelectionPlace: [],
    multipleTableRef: null,
    //данные 
    dataGraphic: [],
    tableDataArticleSelect: [],
    tableDataPlaceSelect: [],
    graphicId: {
      graph_id: null,
      ku: "",
      entity: "",
      entity_name: "",
      customer: "",
      customer_name: "",
      period: "",
      date_start: null,
      date_end: null,
      date_calc: null,
      date_accrual: null,
      sum_calc: null,
      sum_bonus: null,
      sum_approved: null,
      status: "",
    },
    kuId: {
      ku_id: "",
      entity: "",
      entity_name: "",
      customer: "",
      customer_name: "",
      period: "",
      date_start: "",
      date_end: "",
      graph_exists: false,
      status: "",
      description: "",
      contract: "",
      docu_account: "",
      docu_number: "",
      docu_date: "",
      docu_subject: "",
      pay_sum: null,
      pay_method: "",
    },
    official: [],
    customer: [],
    entity: [],
    //v-model диалоговых форм
    dialogFormEditApprovedVisible: false,
    dialogFormShopAndServiceVisible: false,
    //утверждено
    editApproved: null,
    selectedRowEditApproved: {
      graph_id: null,
      ku: "",
      entity: "",
      entity_name: "",
      customer: "",
      customer_name: "",
      period: "",
      date_start: "",
      date_end: "",
      date_calc: "",
      date_accrual: "",
      sum_calc: null,
      sum_bonus: null,
      sum_approved: null,
      status: "",
    },
    //
    vendorFilter: "",
    vendors: [],
    //пагинация в таблицах
    pagination: null,
    countRowTable: 50,
    countRowTable2: 950,
    sortProp: "",
    sortOrder: "",
    //
    legalEntity: [],
    //поиски
    searchGraphic: "",
    //параметры для фильтров при запросах
    KuParams: [],
    filterGraphicValue: {},
    filterValueOfficial: {},
  }),

  getters: {
    getGraphic: (state) => state.dataGraphic,
  },

  actions: {
    //выборка элементов таблиц
    setMultipleTableRef(ref: Ref) {
      this.multipleTableRef = ref;
    },
    toggleSelection(evt: MouseEvent, rows?: IKuCList[] | undefined) {
      if (this.multipleTableRef) {
        if (rows) {
          rows.forEach((row) => {
            this.multipleTableRef.value.toggleRowSelection(row, undefined);
          });
        } else {
          this.multipleTableRef.value.clearSelection();
        }
      }
    },
    handleSelectionChange2(val: IGraphicC[]) {
      this.multipleSelectionGraphic = val;
    },
    handleSelectionChangeArticle(val: IArticle[]) {
      this.multipleSelectionArticle = val;
    },
    handleSelectionChangePlace(val: IPlace[]) {
      this.multipleSelectionPlace = val;
    },
    //для разной пагинации
    setCountRowTable(count: number) {
      this.$state.countRowTable = count;
    },

    //получение данных графика с фильтром
    async getGraphicsFromAPIWithFilter(page?: number, sort_by?: string, sort_order?: string) {
      this.setFilterValue('page', page);
      this.setFilterValue('search', this.$state.searchGraphic);
      this.setFilterValue('sort_by', sort_by);
      this.setFilterValue('sort_order', sort_order);
      await GRAPHICC.getGraphic({
        page_size: this.$state.countRowTable,
        page,
        ku_id: this.$state.filterGraphicValue?.ku_id || [],
        entity_id: this.$state.filterGraphicValue?.entity_id || [],
        customer_id: this.$state.filterGraphicValue?.customer_id || [],
        status: this.$state.filterGraphicValue?.status || [],
        period: this.$state.filterGraphicValue?.period || [],
        date_start_s: this.$state.filterGraphicValue?.date_start_s,
        date_start_e: this.$state.filterGraphicValue?.date_start_e,
        date_end_s: this.$state.filterGraphicValue?.date_end_s,
        date_end_e: this.$state.filterGraphicValue?.date_end_e,
        date_accrual_s: this.$state.filterGraphicValue?.date_accrual_s,
        date_accrual_e: this.$state.filterGraphicValue?.date_accrual_e,
        date_calc_s: this.$state.filterGraphicValue?.date_calc_s,
        date_calc_e: this.$state.filterGraphicValue?.date_calc_e,
        search: this.$state.searchGraphic,
        sort_by,
        sort_order,
      })
        .then((dataGraphic) => {
          console.log('Получены данные графика:', dataGraphic);
          this.$state.dataGraphic = dataGraphic.results;
          this.$state.pagination = {
            count: dataGraphic.count,
            previous: dataGraphic.previous,
            next: dataGraphic.next,
          };
        })
        .catch((error) => {
          console.error('Ошибка при получении данных графика:', error);
          return Promise.reject(error);
        });
    },
    setFilterValue<
      T extends keyof GetAllGraphicС,
      U extends GetAllGraphicС[T],
    >(field: T, value: U) {
      this.$state.filterGraphicValue[field] = value
    },
    removeFilterValue<T extends keyof GetAllGraphicС>(field: T) {
      if (this.$state.filterGraphicValue) {
        delete this.$state.filterGraphicValue[field]
      }
    },

    //получение графика детеил для акта
    async getGraphicDetailFromApi(grapId: number | null) {
      try {
        const results = await GRAPHICC.getInfoGraphic({
          graph_id: grapId,
        });
        this.$state.graphicId = results;
        console.log("успешно получили данные график_айди", results);
      } catch (error) {
        console.error("Ошибка при получении данных график_айди:", error);
      }
    },

    //получение ку детеил для акта
    async getKuDetailFromApi(kuId: string) {
      try {
        const results = await KUC.getInfoKu({
          ku_id: kuId,
        });
        this.$state.kuId = results;
        console.log("успешно получили данные ку_айди", results);
      } catch (error) {
        console.error("Ошибка при получении данных ку_айди:", error);
      }
    },

    //получение должн. лиц для акта
    async getKuOfficialDetailFromApi(ku_id?: string, page?: number) {
      this.setFilterValueOfficial('ku_id', ku_id);
      await KUC.getKuOfficial({
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
    //получение клиентов детеил для акта
    async getCustomerDetailFromApi(customerId: string) {
      try {
        const result = await CUSTOMER.getCustomerDetail({
          customer_id: customerId,
        });
        // Учитывая, что результат находится в свойстве results массива
        this.$state.customer = [result];
        console.log("успешно получили данные кастомерафулл", result);
      } catch (error) {
        console.error("Ошибка при получении данных вендорафулл:", error);
      }
    },
    //получение юр. лиц детеил для акта
    async getEntityDetailFromApi(entityId: string) {
      try {
        const results = await ENTITY.getEntityDetail({
          entity_id: entityId,
        });
        this.$state.entity = [results];
        console.log("успешно получили данные энтитифулл", results);
      } catch (error) {
        console.error("Ошибка при получении данных энтитифулл:", error);
      }
    },
    //получения юр лица для фильтра в графике
    getLegalEntityFilterForGraphicFromApi() {
      ENTITY.getEntityById()
        .then((legalEntity) => {
          console.log('Получены данные о юридических лицах:', legalEntity);
          this.setLegalEntity(legalEntity);
        })
        .catch((e) => console.error('Ошибка при получении данных о юридических лицах:', e));
    },
    setLegalEntity(data: EntityId[]) {
      this.$state.legalEntity = data.map(
        (legalEntity) => legalEntity.entity_id
      )
    },


    //получения ку для фильтра в графике
    getKuIdFilterForGraphicFromApi() {
      const params: IParamKu_Id = {
        page_size: 100,
        page: 1,
      };

      KUC.getKuIdList(params)
        .then((data) => {
          console.log('Получены данные о код ку клиентов:', data);
          this.setKuId(data.results);
        })
        .catch((error) => console.error('Ошибка при получении данных о код ку клиентов:', error));
    },
    setKuId(data: IKuId[]) {
      this.$state.KuParams = data.map((item) => item.ku_id);
    },

  }
});