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
  vendor_id: string;
  period: string;
  date_start: Date | string;
  date_end: Date | string;
  graph_exists: boolean | null
  status: string;
  base: number | null;
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
export interface IKuPostGraphic {
  ku_id: string;
  entity_id: string[];// string[] изменить тип в бд, потому что изменили множественный выбор, а он как цепочка потянул за собой везде изменения
  vendor_id: string;
  period: string;
  date_start: Date | string;
  date_end: Date | string;
  status: string;
  percent: number | null;
}
export interface IKuUpdateStatus {
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
  newPercent: number | null;
  newType: string;
  entityName: string[];
  vendorName: string;
  newDateStart: Date;
  newDateEnd: Date;
  newDateActual: Date;
  multipleSelection: IKuList[];
  multipleSelection2: IGraphic[];
  multipleTableRef: Ref | null;
  search: string;
  tableData: IKuList[];
  dataGraphic: IGraphic[];
  brand: IBrand[];
  producer: IProducer[];
  product: IProduct[];
  tableDataRequirement: IRequirement[];
  dataEntity: IEntityIdAndName[];
  dataVendor: IVendorIdAndName[];
  dialogFormVisible: boolean;
  isAddAllDisabled: boolean;
  isAddConditionDisabled: boolean;
  vendorFilter: string;
  kuFilter: number | null;
  pagination: Pagination | null;
  countRowTable: number;
  vendors: IVendorIdAndName[];
  filterValueGraphic: GetAllGraphic
}

// График
export interface IGraphic {
  graph_id: number | null;
  ku_id: string;
  vendor_id: string;
  period: string;
  date_start: Date | string;
  date_end: Date | string;
  date_calc: Date | string;
  percent: number | null;
  sum_calc: number | null;
  sum_bonus: number | null;
  status: string
}
export interface IGraphicId {
  graph_id: number | null;
}
export interface GetAllGraphic {
  page_size?: number;
  page?: number;
}
export interface GetAllGraphicsReturnData extends Pagination {
  results: IGraphic[];
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
export interface IRequirement {
  number: string;
  product: string;
  category: string;
  producer: string;
  brand: string;
}

// Производитель
export interface IProducer {
  producer_name: string;
}
export interface GetAllProducer {
  page_size?: number;
  page?: number;
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
}
export interface GetAllBrandsReturnData extends Pagination {
  results: IBrand[];
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
