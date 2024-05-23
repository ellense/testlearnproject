import type { FormInstance, ElTree } from "element-plus";
import type { ICustomerFull, ICustomerIdAndName, IParamCustomers, IParamCustomersKU } from "./customerTypes";
import type { IArticle, IParamServices, IPlace, IPricelist, IService } from "./serviceTypes";
import type { IEntity, IParamEntities, IEntityInKu, IEntityFull } from "./entityTypes";
import type { Pagination } from "./generalTypes";
import type { IInvoice, IParamInvoices } from "./invoiceTypes";
import type { IKuList, IParamKus } from "./kuVendorTypes";
import type { IVendor, IParamVendorsForEntityInVendor, IVendorId, IParamVendorsForEntity, IVendorIdAndName, IVendorName, IVendorFull } from "./vendorTypes";
import type { GraphicForExcelReportInvoice, GraphicForExcelReportProduct, GetAllInvoicesAndProductForGraphic } from "./actTypes";
import type { IGraphic, GetAllGraphic, IGraphicInfo } from "./graphicVendorTypes";
import type { IOfficialForKu, IParamKuId, IServiceAndArticle, IContractService, GetParamExInvoicesForKu, IContract, IExInvoiceForKu, IManagerForKu, IParamManagers, IPercent, IRequirement, IVendorAndContract } from "./tabsKuTypes";
import type { IBrand, GetAllBrands } from "./brandTypes";
import type { IProducer, GetAllProducer } from "./producerTypes";
import type { IProduct, GetAllProducts } from "./productTypes";
import type { ITree, GetAllCategory } from "./treeTypes";
import type { GetAllGraphicС, IGraphicC } from "./graphicCustomerTypes";
import type { IKuCList } from "./kuCustomerTypes";


//юр лица
export interface IEntityStore {
    dataEntity: IEntity[],
    search: string,
    filterValue: IParamEntities
  }
  //поставщики
export interface IVendorStore {
    dataVendor: IVendor[] | null
    pagination: Pagination | null
    countRowTable: number
    entityName: string[]
    dataEntity: IEntityInKu[];
    sortProp: string
    sortOrder: string
    search: string
    filteredDataVendor: IVendor[],
    juristicPersons: string[]
    filterValue: IParamVendorsForEntityInVendor
  }

  //клиенты
  export interface ICustomerStore {
    dataCustomer: ICustomerFull[] 
    pagination: Pagination | null
    countRowTable: number
    entityName: string[]
    dataEntity: IEntityInKu[];
    sortProp: string
    sortOrder: string
    search: string
    filteredDataCustomer: ICustomerFull[],
    juristicPersons: string[]
    filterValue: IParamCustomers
  }

  //накладные
  export interface IInvoiceStore {
    dataInvoice: IInvoice[];
    pagination: Pagination | null;
    countRowTable: number;
    sortProp: string;
    sortOrder: string;
    search: string;
    legalEntity: string[]
    // vendor: string[]
    vendor: IVendorId[]
    filterValue: IParamInvoices
  }

//таблица ку поставщиков
  export interface IKuStore {
    //селекты для множественного выбора
    multipleSelection: IKuList[];
    multipleTableRef: Ref | null;
    //данные таблиц
    tableData: IKuList[];
    //пагинация в таблицах
    pagination: Pagination | null;
    countRowTable: number;
    //поиски
    search: string;
    //
    sortProp: string;
    sortOrder: string;
    legalEntity: string[]
    filterVendorId: string[]
    filterEntityId: string[]
    //параметры для фильтров при запросах
    filterKuValue: IParamKus
  }

//создание ку поставщиков
  export interface IKuAddMain {
    newType: string;
    newEntityId: string;
    newEntityName: string;
    newSubsidiaries: boolean;
    newVendorId: string;
    newVendorName: string;
    newDateStart: Date | string;
    newDateEnd: Date | string;
    newDateActual: Date | string;
    newDescription: string;
    newContract: string;
    newProduct_type: string;
    newDocu_account: string;
    newDocu_number: string;
    newDocu_date: Date | string;
    newDocu_subject: string;
    newTax: boolean;
    newExclude_return: boolean;
    newNegative_turnover: boolean;
    newKu_type: string;
    newPay_method: string;
    newVendorIdVAC: string;
    newEntityIdVAC: string;
    newVendorIdExInvoice: string;
    newVendorNameExInvoice: string;
  }

//создание ку поставщиков
  export interface IKuAddStore {
    //значения v-model при создании
    ruleFormRef: FormInstance | null;
    kuAddMain: IKuAddMain
    newOfFIOСounteragent: string;
    newOfPostСounteragent: string;
    newOfDocСounteragent: string;
    newOfFIOEntity: string;
    newOfPostEntity: string;
    newOfDocEntity: string;
    valueProducer_nameContract: string;
    valueBrand_nameContract: string;
    valueProducer_nameIn: string;
    valueBrand_nameIn: string;
    valueProducer_nameEx: string;
    valueBrand_nameEx: string;
    valueVendorInfo: IVendor[]
    //селекты для множественного выбора
    multipleSelectionProduct: IProduct[];
    multipleSelectionExInvoice: IExInvoiceForKu[]
    multipleSelectionManager: IManagerForKu[]
    multipleTableRef: Ref | null;
    //данные таблиц
    brandIncluded: IBrand[];
    brandExcluded: IBrand[];
    producerIncluded: IProducer[];
    producerExcluded: IProducer[];
    productIncluded: IProduct[];
    productExcluded: IProduct[];
    tableDataInRequirement: IRequirement[];
    tableDataExRequirement: IRequirement[];
    tableDataContract: IContract[]
    tableDataPercent: IPercent[];
    tableDataExInvoiceAll: IExInvoiceForKu[]
    tableDataExInvoiceSelect: IExInvoiceForKu[]
    tableDataManagerAll: IManagerForKu[]
    tableDataManagerSelect: IManagerForKu[]
    tableDataVAC: IVendorAndContract[]
    dataEntity: IEntityInKu[];
    // dataVendorId: IVendorId[];
    dataVendorId: IVendorIdAndName[]
    dataVendorName: IVendorName[];
    treeData: ITree[],
    treeRef: typeof ElTree | null,
    //v-model диалоговых форм
    dialogFormExInvoiceVisible: boolean
    dialogFormManagersVisible: boolean
    dialogFormProductInVisible: boolean
    dialogFormCategoryInVisible: boolean
    dialogFormProductExVisible: boolean
    dialogFormCategoryExVisible: boolean
    dialogFormContractVisible: boolean
    dialogFormVACVisible: boolean
    //дизэйбл кнопок
    disableButtonsIncluded: boolean
    disableSubsidiaries: boolean
    //
    searchExInvoiceNumber: string;
    vendorFilter: string;
    // kuFilter: number | null;
    vendors: IVendorIdAndName[];
    //пагинация в таблицах
    pagination: Pagination | null;
    countRowTable: number;
    countRowTable2: number;
    //поиски
    searchProductIncluded: string;
    searchProductExcluded: string;
    //параметры для фильтров при запросах
    filterCategory: GetAllCategory
    filterProductIncluded: GetAllProducts
    filterProductExcluded: GetAllProducts
    filterProducerIncluded: GetAllProducer
    filterProducerExcluded: GetAllProducer
    filterBrandIncluded: GetAllBrands
    filterBrandExcluded: GetAllBrands
    filterVendorValue: IParamVendorsForEntity
    filterExInvoice: GetParamExInvoicesForKu
    filterManager: IParamManagers
    isFormValid: boolean
  }

//изначаьные данные ку_id поставщиков
  export interface IInitialState {
    kuIdStatus: string;
    kuIdType: string;
    kuIdEntityId: string;
    kuIdEntityName: string;
    kuIdSubsidiaries: boolean;
    kuIdVendorId: string;
    kuIdVendorName: string;
    kuIdDateStart: Date | string;
    kuIdDateEnd: Date | string;
    kuIdDateActual: Date | string;
    kuIdDescription: string;
    kuIdContract: string;
    kuIdProduct_type: string;
    kuIdDocu_account: string;
    kuIdDocu_number: string;
    kuIdDocu_date: Date | string;
    kuIdDocu_subject: string;
    kuIdTax: boolean;
    kuIdExclude_return: boolean;
    kuIdNegative_turnover: boolean;
    kuIdKu_type: string;
    kuIdPay_method: string;
    officialId: number | null;
    kuIdEntityIdVAC: string
    kuIdVendorIdVAC: string
    kuIdFIOСounteragent: string;
    kuIdPostСounteragent: string;
    kuIdDocСounteragent: string;
    kuIdFIOEntity: string;
    kuIdPostEntity: string;
    kuIdDocEntity: string;
    kuIdVendorIdExInvoice:  string;
    kuIdVendorNameExInvoice:  string;
    valueProducer_nameContract: string;
    valueBrand_nameContract: string;
    tableDataInRequirement: IRequirement[];
    tableDataExRequirement: IRequirement[];
    tableDataPercent: IPercent[];
    tableDataVAC: IVendorAndContract[];
    tableDataExInvoiceSelect: IExInvoiceForKu[];
    tableDataManagerSelect: IManagerForKu[];
    tableDataContract: IContract[];
  }

  // данные ку_id поставщиков
  export interface IKuIdStore {
    //данные таблиц
    tableDataInRequirement: IRequirement[];
    tableDataExRequirement: IRequirement[];
    tableDataPercent: IPercent[];
    tableDataVAC: IVendorAndContract[]
    tableDataExInvoiceSelect: IExInvoiceForKu[]
    tableDataManagerSelect: IManagerForKu[]
    tableDataContract: IContract[],
    //v-model диалоговых форм
    dialogFormExInvoiceVisible: boolean
    dialogFormProductInVisible: boolean
    dialogFormCategoryInVisible: boolean
    dialogFormProductExVisible: boolean
    dialogFormCategoryExVisible: boolean
    dialogFormManagersVisible: boolean
    dialogFormContractVisible: boolean
    dialogFormVACVisible: boolean
    //дизэйбл кнопок
    disableButtonsIncluded: boolean
    disableSubsidiaries: boolean
    //поиски
    searchProductIncluded: string;
    searchProductExcluded: string;
    //v-model атрибутов
    ku_id: string;
    kuIdStatus: string;
    kuIdType: string;
    kuIdEntityId: string;
    kuIdEntityName: string;
    kuIdSubsidiaries: boolean;
    kuIdVendorId: string;
    kuIdVendorName: string;
    kuIdDateStart: Date | string;
    kuIdDateEnd: Date | string;
    kuIdDateActual: Date | string;
    kuIdDescription: string;
    kuIdContract: string;
    kuIdProduct_type: string;
    kuIdDocu_account: string;
    kuIdDocu_number: string;
    kuIdDocu_date: Date | string;
    kuIdDocu_subject: string;
    kuIdTax: boolean
    kuIdExclude_return: boolean
    kuIdNegative_turnover: boolean
    kuIdKu_type: string;
    kuIdPay_method: string;
    officialId: number | null
    kuIdEntityIdVAC: string
    kuIdVendorIdVAC: string
    kuIdFIOСounteragent: string;
    kuIdPostСounteragent: string;
    kuIdDocСounteragent: string;
    kuIdFIOEntity: string;
    kuIdPostEntity: string;
    kuIdDocEntity: string;
    kuIdVendorIdExInvoice:  string;
    kuIdVendorNameExInvoice:  string;
    valueProducer_nameContract: string;
    valueBrand_nameContract: string;
    initialState: IInitialState;
    //пагинация в таблицах
    pagination: Pagination | null;
    countRowTable: number;
    //
    multipleSelectionProduct: IProduct[];
    multipleSelectionExInvoice: IExInvoiceForKu[]
    multipleSelectionManager: IManagerForKu[]
    multipleTableRef: Ref | null;
    filterVendorValue: IParamVendorsForEntity
  }

  //график расчетов поставщиков
  export interface IGraphicStore {
    //селекты для множественного выбора
    multipleSelectionGraphic: IGraphic[];
    multipleTableRef: Ref | null;
    //данные таблиц
    dataGraphic: IGraphic[];
    //v-model диалоговых форм
    dialogFormEditApprovedVisible: boolean;
    //
    vendorFilter: string;
    vendors: IVendorIdAndName[];
    //пагинация в таблицах
    pagination: Pagination | null;
    countRowTable: number;
    countRowTable2: number;
    sortProp: string;
    sortOrder: string;
    //поиски
    searchGraphic: string;
    //
    editApproved: number | null;
    selectedRowEditApproved: IGraphic;
    //
    legalEntity: string[]
    //параметры для фильтров при запросах
    KuParams: string[]
    filterGraphicValue: GetAllGraphic
  }

  // акты поставщиков
  export interface ReportStore {
    dialogFormReportInvoice: boolean
    dialogFormReportProduct: boolean
    dialogFormReportActInvoice: boolean
    pagination: Pagination | null;
    countRowTable: number;
    graphic: IGraphicInfo[]
    invoices: GraphicForExcelReportInvoice[]
    products: GraphicForExcelReportProduct[]
    kuid: string
    vendorid: string
    entityid: string
    vendor: IVendorFull
    entity: IEntityFull
    official: IOfficialForKu[]
    numerals: string
    sumQty: number | null
    getGraphicDone: boolean
    printReportToggle: boolean
    filterValueInvoice: GetAllInvoicesAndProductForGraphic
    filterValueOfficial: IParamKuId
  }
   //создание ку клиентов
  export interface IKuCAddMain {
    newType: string;
    newEntityId: string;
    newEntityName: string;
    newSubsidiaries: boolean;
    newCustomerId: string;
    newCustomerName: string;
    newDateStart: Date | string;
    newDateEnd: Date | string;
    newDateActual: Date | string;
    newDescription: string;
    newContract: string;
    newDocu_account: string;
    newDocu_number: string;
    newDocu_date: Date | string;
    newDocu_subject: string;
    newPay_sum: number | null
    newPay_method: string;
  }
  //создание ку клиентов
  export interface IKuCAddStore {
    //значения v-model при создании
    ruleFormRef: FormInstance | null;
    kuAddMain: IKuCAddMain
    newOfFIOСounteragent: string;
    newOfPostСounteragent: string;
    newOfDocСounteragent: string;
    newOfFIOEntity: string;
    newOfPostEntity: string;
    newOfDocEntity: string;
    valueService_nameContract: string;
    valueArticle_nameContract: string;
    valueService_name: string;
    valueArticle_name: string;
    valueRatio: number | null;
    valueVendorIdVAC: string;
    valueEntityIdVAC: string;
    //селекты для множественного выбора
    multipleSelectionService: IService[];
    multipleSelectionArticle: IArticle[];
    multipleSelectionServiceSelect: IServiceAndArticle[];
    multipleSelectionManager: IManagerForKu[]
    multipleSelectionVendorAndContract: IVendorAndContract[]
    multipleTableRef: Ref | null;
    //данные таблиц
    tableDataContract: IContractService[]
    tableDataManagerAll: IManagerForKu[]
    tableDataManagerSelect: IManagerForKu[]
    tableDataVAC: IVendorAndContract[]
    dataEntity: IEntityInKu[];
    dataVendorId: IVendorIdAndName[]
    tableDataServiceAll: IService[]
    tableDataArticleAll: IArticle[]
    tableDataServiceSelect: IServiceAndArticle[]
    dataCustomerId: ICustomerIdAndName[]
    //v-model диалоговых форм
    dialogFormManagersVisible: boolean
    dialogFormContractVisible: boolean
    dialogFormServiceVisible: boolean
    dialogFormVACVisible: boolean
    //дизэйбл кнопок
    disableButtonsIncluded: boolean
    disableSubsidiaries: boolean
    //пагинация в таблицах
    pagination: Pagination | null;
    countRowTable: number;
    countRowTable2: number;
    //параметры для фильтров при запросах
    filterService: IParamServices
    filterArticle: IParamServices
    filterCustomerValue: IParamCustomersKU
    filterVendorValue: IParamVendorsForEntity
    filterManager: IParamManagers
    isFormValid: boolean
  }
  //изначальные данные ку_id клиентов
  export interface IInitialStateC {
    kuIdStatus: string;
    kuIdType: string;
    kuIdEntityId: string;
    kuIdEntityName: string;
    kuIdSubsidiaries: boolean;
    kuIdCustomerId: string;
    kuIdCustomerName: string;
    kuIdDateStart: Date | string;
    kuIdDateEnd: Date | string;
    kuIdDateActual: Date | string;
    kuIdDescription: string;
    kuIdContract: string;
    kuIdDocu_account: string;
    kuIdDocu_number: string;
    kuIdDocu_date: Date | string;
    kuIdDocu_subject: string;
    kuIdPay_sum: number | null
    kuIdPay_method: string;
    kuIdFIOСounteragent: string;
    kuIdPostСounteragent: string;
    kuIdDocСounteragent: string;
    kuIdFIOEntity: string;
    kuIdPostEntity: string;
    kuIdDocEntity: string;
    officialId: number | null
    tableDataManagerSelect: IManagerForKu[];
    tableDataVAC: IVendorAndContract[]
    tableDataServiceSelect: IServiceAndArticle[]
  }
  //данные ку_id клиентов
  export interface IKuCIdStore {
    //данные таблиц
    tableDataManagerSelect: IManagerForKu[]
    tableDataVAC: IVendorAndContract[]
    tableDataServiceSelect: IServiceAndArticle[]
    tableDataContract: IContract[]
    //v-model диалоговых форм
    dialogFormVAC: boolean
    dialogFormService: boolean
    dialogFormManagersVisible: boolean
    dialogFormContractVisible: boolean
    //дизэйбл кнопок
    disableButtonsIncluded: boolean
    disableSubsidiaries: boolean
    //v-model атрибутов
    ku_id: string;
    kuIdStatus: string;
    kuIdType: string;
    kuIdEntityId: string;
    kuIdEntityName: string;
    kuIdSubsidiaries: boolean;
    kuIdCustomerId: string;
    kuIdCustomerName: string;
    kuIdDateStart: Date | string;
    kuIdDateEnd: Date | string;
    kuIdDateActual: Date | string;
    kuIdDescription: string;
    kuIdContract: string;
    kuIdDocu_account: string;
    kuIdDocu_number: string;
    kuIdDocu_date: Date | string;
    kuIdDocu_subject: string;
    kuIdPay_sum: number | null
    kuIdPay_method: string;
    kuIdFIOСounteragent: string;
    kuIdPostСounteragent: string;
    kuIdDocСounteragent: string;
    kuIdFIOEntity: string;
    kuIdPostEntity: string;
    kuIdDocEntity: string;
    valueVendorIdVAC: string;
    valueEntityIdVAC: string;
    valueService_nameContract: string;
    valueArticle_nameContract: string;
    valueService_name: string;
    valueArticle_name: string;
    valueRatio: number | null;
    officialId: number | null
    initialState: IInitialStateC;
    //пагинация в таблицах
    pagination: Pagination | null;
    countRowTable: number;
  }

  //график расчетов клиентов
  export interface IGraphicСStore {
    //селекты для множественного выбора
    multipleSelectionGraphic: IGraphicC[];
    multipleSelectionService: IService[];
    multipleSelectionPlace: IPlace[];
    multipleTableRef: Ref | null;
    //данные таблиц
    dataGraphic: IGraphicC[];
    graphicId: IGraphicC
    kuId: IKuCList
    //v-model диалоговых форм
    dialogFormEditApprovedVisible: boolean;
    dialogFormShopAndServiceVisible: boolean;
    //
    vendorFilter: string;
    vendors: IVendorIdAndName[];
    //пагинация в таблицах
    pagination: Pagination | null;
    countRowTable: number;
    countRowTable2: number;
    sortProp: string;
    sortOrder: string;
    //поиски
    searchGraphic: string;
    //
    editApproved: number | null;
    selectedRowEditApproved: IGraphicC;
    //
    legalEntity: string[]
    //параметры для фильтров при запросах
    KuParams: string[]
    filterGraphicValue: GetAllGraphicС
  }

  
//стор услуг
export interface IServiceStore {
    tableDataPlace: IPlace[];
    tableDataPricelist: IPricelist[];
    tableDataArticle: IArticle[];
    tableDataService: IService[];
    tableDataServiceAndArticleSelect: IServiceAndArticle[];
  
    pagination: Pagination | null
    countRowTable: number
    sortProp: string
    sortOrder: string
    searchService: string
    searchArticle: string
    searchPlace: string
    searchPricelist: string
  
    dialogFormPlaceVisible: boolean
    dialogFormPricelistVisible: boolean
    dialogFormArticleVisible: boolean
    dialogFormServiceVisible: boolean
    dialogFormServiceAndArticleSelectVisible: boolean
  
    newService_id: string;
    newService_name: string;
    newArticle_id: string;
    newArticle_name: string;
    newPriceDate: string;
    newPriceExpiration_date: string;
    newPriceCost: number | null;
    newPricMeasure_unit: string;
    newPriceArticle_id: string;
    newPriceArticle_name: string;
    newShop_id: string;
    newShop_name: string;
    newAddress: string;
  
    filterValueService: IParamServices
    filterValuePlace: IParamServices
    filterValuePricelist: IParamServices
    filterValueArticle: IParamServices
  }