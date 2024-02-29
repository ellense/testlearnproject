import type { ElTree } from 'element-plus'
// юр.лица
export interface IEntity {
  entity_id: string;
  directorname: string;
  urasticname: string;
  name: string;
  urasticaddress: string;
}
export interface EntityStore {
  dataEntity: IEntity[],
  search: string,
  filterValue: GetAllEntities
}
export interface GetAllEntities {
  search?: string;
}
export interface IEntityIdAndName {
  entity_id: string;
  name: string;
}
export interface IEntityIdAndNameForKu {
  entity_id: string[];
  entity_name: string;
}
export interface EntityId {
  entity_id: string;
}


//поставщик
export interface IVendor {
  vendor_id: string
  name: string
  urasticname: string
  directorname: string
  urasticadress: string
  inn_kpp: string
  entity_id: string
  entity_name: string
}
export interface VendorStore {
  dataVendor: IVendor[] | null
  pagination: Pagination | null
  countRowTable: number
  entityName: string[]
  dataEntity: IEntityIdAndName[];
  search: string
  filteredDataVendor: IVendor[],
  juristicPersons: string[]
  filterValue: GetAllVendorsForEntityInVendor
}
export interface GetAllVendors {
  page_size?: number
  page?: number
}
export interface GetAllVendorsReturnData extends Pagination {
  results: IVendor[]
}
export interface IVendorId {
  vendor_id: string
}
export interface IVendorIdAndName {
  vendor_id: string
  name: string;
}
export interface IVendorIdAndNameForKu {
  vendor_id: string
  vendor_name: string;
}
export interface GetAllVendorsForEntity {
  entity_id?: string[];
  page_size?: number;
  page?: number;
}
export interface GetAllVendorsForEntityInVendor {
  entity_id?: string[]
  page_size?: number
  page?: number
  search?: string;
}
export interface GetAllVendorsForEntityReturnData extends Pagination {
  results: IVendorIdAndName[];
}
export interface GetAllVendorsForEntityInVendorReturnData extends Pagination {
  results: IVendor[];
}


//накладные
export interface IInvoice {
  invoice_id: number | null;
  entity_id: string;
  entity_name: string;
  vendor_id: string;
  vendor_name: string;
  invoice_name: string;
  invoice_number: string;
  invoice_date: Date | string;
  products_amount: number | null
}

export interface GetAllInvoices {
  page_size?: number;
  page?: number;
  entity_id: string[];
  vendor_id: string[];
  search?: string;
  start_date?: string,
  end_date?: string,
}
export interface InvoiceStore {
  dataInvoice: IInvoice[];
  pagination: Pagination | null;
  countRowTable: number;
  search: string;
  legalEntity: string[]
  // vendor: string[]
  vendor: IVendorId[]
  filterValue: GetAllInvoices
}
export interface GetAllInvoicesReturnData extends Pagination {
  results: IInvoice[];
}

// КУ
export interface IKuList {
  ku_id: string;
  entity_id: string;
  entity_name: string;
  vendor_id: string;
  vendor_name: string;
  period: string;
  date_start: Date | string;
  date_end: Date | string;
  graph_exists: boolean | string
  status: string;
  percent: number | null;
}
export interface IKuId {
  ku_id: string;
}
export interface IKuPost {
  entity_id: string[];// string[] изменить тип в бд, потому что изменили множественный выбор, а он как цепочка потянул за собой везде изменения
  vendor_id: string;
  period: string;
  date_start: Date | string;
  date_end: Date | string;
  status: string;
  percent: number | null;
}
export interface IKuPost2 {
  requirements: IIncludedRequirement[];
}
export interface IKuPostGraphic {
  ku_id: string;
  entity_id: string;
  vendor_id: string;
  period: string;
  date_start: Date | string;
  date_end: Date | string;
  status: string;
  percent: number | null;
  graph_exists: boolean | string
}
export interface IKuUpdate {
  ku_id: string;
  status: string;
  entity_id: string;
  vendor_id: string;
  period: string;
  date_start: Date | string;
  date_end: Date | string;
  percent: number | null;
}
export interface IKuDeleteGraph {
  ku_id: string;
  status: string;
}
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
  legalEntity: string[]
  //параметры для фильтров при запросах
  filterKuValue: GetAllKus
}

export interface IKuAddStore {
  //значения v-model при создании
  newPercent: number | null;
  newType: string;
  entityName: string[];
  vendorName: string;
  newDateStart: Date;
  newDateEnd: Date;
  newDateActual: Date;
  valueCategory_idIn: string
  valueCategory_nameIn: string
  valueProducer_nameIn: string;
  valueBrand_nameIn: string;
  valueCategory_idEx: string
  valueCategory_nameEx: string
  valueProducer_nameEx: string;
  valueBrand_nameEx: string;
  //селекты для множественного выбора
  multipleSelectionProduct: IProduct[];
  multipleTableRef: Ref | null;
  //данные таблиц
  brandIncluded: IBrand[];
  brandExcluded: IBrand[];
  producerIncluded: IProducer[];
  producerExcluded: IProducer[];
  productIncluded: IProduct[];
  productExcluded: IProduct[];
  tableDataInRequirement: IIncludedRequirement[];
  tableDataExRequirement: IExcludedRequirement[]
  dataEntity: IEntityIdAndName[];
  dataVendor: IVendorIdAndName[];
  treeData: ITree[],
  treeRef: typeof ElTree | null,
  // dataInfoKu: IKuList[];
  //v-model диалоговых форм
  dialogFormProductInVisible: boolean
  dialogFormCategoryInVisible: boolean
  dialogFormProductExVisible: boolean
  dialogFormCategoryExVisible: boolean
  //дизэйбл кнопок
  disableButtonsIncluded: boolean
  disableButtonsExcluded: boolean
  //
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
  filterProductIncluded: GetAllProducts
  filterProductExcluded: GetAllProducts
  filterProducerIncluded: GetAllProducer
  filterProducerExcluded: GetAllProducer
  filterBrandIncluded: GetAllBrands
  filterBrandExcluded: GetAllBrands
  filterVendorValue: GetAllVendorsForEntity
}
export interface IKuIdStore {
  //v-model атрибутов
  ku_id: string;
  kuIdStatus: string;
  kuIdPercent: number | null;
  kuIdPeriod: string;
  kuIdEntityName: IEntityIdAndNameForKu;
  kuIdVendorName: IVendorIdAndNameForKu;
  kuIdDateStart: Date | string;
  kuIdDateEnd: Date | string;
  kuIdCategory_id: string
  kuIdCategory_name: string
  kuIdProducer_name: string;
  kuIdBrand_name: string;
  //v-model диалоговых форм
  dialogFormProductVisible: boolean;
  dialogFormCategoryVisible: boolean;
  //дизэйбл
  disableButtons: boolean
  //данные 
  brand: IBrand[];
  producer: IProducer[];
  product: IProduct[];
  tableDataInRequirement: IIncludedRequirement[];
  dataEntity: IEntityIdAndName[];
  dataVendor: IVendorIdAndName[];
  dataInfoKu: IKuList[];
  //пагинация в таблицах
  pagination: Pagination | null;
  countRowTable: number;
  //
  multipleSelectionProduct: IProduct[];
  multipleTableRef: Ref | null;
}

export interface GetAllKus {
  page_size?: number;
  page?: number;
  entity_id?: string[];
  search?: string;
}
export interface GetAllKu_Id {
  page_size?: number;
  page?: number;
}
export interface GetAllKusReturnData extends Pagination {
  results: IKuList[];
}
export interface GetAllKu_IdReturnData extends Pagination {
  results: IKuId[];
}

// График
export interface IGraphic {
  graph_id: number | null;
  ku_id: string;
  entity_id: string;
  entity_name: string;
  vendor_id: string;
  vendor_name: string;
  period: string;
  date_start: Date | string;
  date_end: Date | string;
  date_calc: Date | string;
  percent: number | null;
  sum_calc: number | null;
  sum_bonus: number | null;
  sum_approved: number | null;
  status: string
}

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
  //поиски
  searchGraphic: string;
  //
  editApproved: number | null;
  selectedRowEditApproved: IGraphic;
  //
  legalEntity2: string[]
  //параметры для фильтров при запросах
  KuParams: string[]
  filterGraphicValue: GetAllGraphic
}
export interface IGraphicInfo {
  graph_id: number | null;
  ku_id: string;
  vendor_id: string;
  vendor_name: string;
  period: string;
  date_start: Date | string;
  date_end: Date | string;
  date_calc: Date | string;
  percent: number | null;
  sum_calc: number | null;
  sum_bonus: number | null;
  status: string
  sum_approved: number | null;
}
export interface IGraphicId {
  graph_id: number | null;
}
export interface GetAllGraphic {
  page_size?: number;
  page?: number;
  entity_id?: string[];
  ku_id?: string[];
  search?: string;
}
export interface GetAllGraphicsReturnData extends Pagination {
  results: IGraphic[];
}

export interface GraphicForExcelReportInvoice {
  invoice_number: string;
  invoice_date: Date | string;
  purch_number: string;
  purch_date: Date | string;
  invoicestatus: string;
  products_amount: number | null;
}
export interface GraphicForExcelReportProduct {
  product_id: string;
  amount: number | null;
  product_qty: number | null;
  product_name: string;
  category_name: string;
  producer_name: string;


}
export interface GetAllInvoicesAndProductForGraphic {
  page_size?: number;
  page?: number;
  graph_id?: number | null;
}
export interface GetAllInvoicesForGraphicReturnData extends Pagination {
  results: GraphicForExcelReportInvoice[];
}
export interface GetAllProductsForGraphicReturnData extends Pagination {
  results: GraphicForExcelReportProduct[];
}
export interface ReportStore {
  dialogFormReportInvoice: boolean
  dialogFormReportProduct: boolean
  pagination: Pagination | null;
  countRowTable: number;
  graphic: IGraphicInfo[]
  invoices: GraphicForExcelReportInvoice[]
  products: GraphicForExcelReportProduct[]
  getGraphicDone: boolean
  printReportToggle: boolean
  filterValueInvoice: GetAllInvoicesAndProductForGraphic
}

// Товары
export interface IProduct {
  itemid: string;
  classifier_name: string;
  brand_name: string;
  name: string;
}
export interface GetAllProducts {
  page_size?: number;
  page?: number;
  search?: string;
  categories_l4?: string[];
  vendor_id?: string;
}
export interface ProductStore {
  product: IProduct[];
  pagination: Pagination | null;
  countRowTable: number;
  search: string
  filterValue: GetAllProducts
}
export interface GetAllProductsReturnData extends Pagination {
  results: IProduct[];
}

// Профиль
export interface IProfile {
  id: number;
  last_name: string;
  first_name: string;
  middle_name: string;
  email: string;
}

//Условия
export interface IIncludedRequirement {
  item_type: string;
  item_code: string;
  item_name: string;
  producer: string;
  brand: string;
}
export interface IExcludedRequirement {
  item_type: string;
  item_code: string;
  item_name: string;
  producer: string;
  brand: string;
}
export interface IRequirementPost2 {
  ku_id: string;
  item_type: string;
  item_code: string;
  item_name: string;
  producer: string;
  brand: string;
}
export interface IRequirementPost {
  ku_id: string;
  requirements: IIncludedRequirement[]
}

// Производитель
export interface IProducer {
  producer_name: string;
}
export interface GetAllProducer {
  page_size?: number;
  page?: number;
  l4?: string[];
  vendor_id?: string;

}
export interface GetAllProducersReturnData extends Pagination {
  results: IProducer[];
}

//Бренд
export interface IBrand {
  brand_name: string;
}
export interface GetAllBrands {
  page_size?: number;
  page?: number;
  producer_name?: string
  l4?: string[];
  vendor_id?: string;
}
export interface GetAllBrandsReturnData extends Pagination {
  results: IBrand[];
}

//дерево категорий
export interface ITree {
  name: string;
  classifier_code: number; // Лучше использовать string, если коды могут содержать не только числа
  parent_code: string;
  children?: ITree[];
}
export interface GetAllCategory{
  // page_size?: number;
  // page?: number;
  vendor_id?: string;
}

//общие
export interface Pagination {
  count: number;
  next: string | null;
  previous: string | null;
}
export type WithoutNullableKeys<Type> = {
  [Key in keyof Type]-?: WithoutNullableKeys<NonNullable<Type[Key]>>;
};










