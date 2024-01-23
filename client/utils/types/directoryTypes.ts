// юр.лица
export interface IEntity {
  entityid: string;
  directorname: string;
  urasticname: string;
  name: string;
  urasticaddress: string;
}
export interface IEntityIdAndName {
  entityid: string;
  name: string;
}
export interface EntityId {
  entityid: string;
}

//накладные
export interface IInvoice {
  invoice_id: number | null;
  entity: string;
  entity_name: string;
  vendor: string;
  vendor_name: string;
  invoice_name: string;
  invoice_number: string;
  invoice_date: Date | string;
}

export interface GetAllInvoices {
  page_size?: number;
  page?: number;
}
export interface InvoiceStore {
  invoice: IInvoice[];
  pagination: Pagination | null;
  countRowTable: number;
}
export interface GetAllInvoicesReturnData extends Pagination {
  results: IInvoice[];
}

// КУ
export interface IKuList {
  entityid: string;
  ku_id: string;
  vendor: string;
  period: string;
  date_start: Date | string;
  date_end: Date | string;
  status: string;
  base: number | null;
  percent: number | null;
}
export interface IKuId {
  ku_id: string;
}
export interface IKuPost {
  entityid: string;
  vendor: string;
  period: string;
  date_start: Date | string;
  date_end: Date | string;
  status: string;
  percent: number | null;
}
export interface IKuStore {
  newPercent: null;
  newType: string;
  entityName: string;
  vendorName: string;
  newDateStart: Date;
  newDateEnd: Date;
  newDateActual: Date;
  multipleSelection: IKuList[];
  multipleTableRef: Ref | null;
  search: string;
  tableData: IKuList[];
  tableDataGraphic: IGraphic[];
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
}

// График
export interface IGraphic {
  graph_id: number | null;
  ku: string;
  vendor: string;
  period: string;
  date_start: Date | string;
  date_end: Date | string;
  date_calc: Date | string;
  percent: number | null;
  sum_calc: number | null;
  sum_bonus: number | null;
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
}
export interface ProductStore {
  product: IProduct[];
  pagination: Pagination | null;
  countRowTable: number;
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

//поставщик
export interface IVendor {
  vendorid: string;
  name: string;
  urasticname: string;
  directorname: string;
  urasticadress: string;
  inn_kpp: string;
  entityid: string;
}
export interface VendorStore {
  vendors: IVendor[] | null;
  pagination: Pagination | null;
  countRowTable: number;
}
export interface GetAllVendors {
  page_size?: number;
  page?: number;
}
export interface GetAllVendorsReturnData extends Pagination {
  results: IVendor[];
}
export interface IVendorIdAndName {
  vendorid: string;
  name: string;
}
export interface GetAllVendorsForEntity {
  entityid?: string;
  page_size?: number;
  page?: number;
}
export interface GetAllVendorsForEntityReturnData extends Pagination {
  results: IVendorIdAndName[];
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
