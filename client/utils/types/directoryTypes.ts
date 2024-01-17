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
  entity_id: string;
  vendor_id: string;
  invoice_name: string;
  invoice_number: string;
  invoice_date: Date | string;
}

export interface GetAllInvoices {
  page_size?: number
  page?: number
}
export interface InvoiceStore {
  invoice: IInvoice[] 
  pagination: Pagination | null
  countRowTable: number
}
export interface GetAllInvoicesReturnData extends Pagination {
  results: IInvoice[]
}


// КУ
export interface IKu {
  // error: IKu;
  ku_id: string;
  vendor: string;
  period: string;
  date_start: Date | string;
  date_end: Date | string;
  status: string;
  base: number | null;
  percent: number | null;
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


// export interface IVendorList extends IVendor {
//   vendors_list: IVendorList[] | null
//   countPage: number | null
//   filterVendor: number | null
// }
// export interface IVendorTableStore {
//   search: string
//   vendorList: IVendor[],
//   vendors_list: IVendorList[],
//   countPage: number | null;
//   filterVendor: number | null;
// }

// export interface IPagination {
//   count: number
//   next: string | null
//   previous: string | null
//   results: []
// }

// export interface IVendorListApi extends Omit<IPagination, 'results'> {
//   results: IVendorList[]
// }


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
export interface IProduser {
  id: number;
  name: string;
}

//Бренд
export interface IBrand {
  brand_name: string;
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
export interface IVendorIdAndName {
  vendorid: string;
  name: string;
}
export interface IVendorApiResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: IVendorIdAndName[];
}
export interface GetAllVendors {
  page_size?: number
  page?: number
}
export interface VendorStore {
  vendors: IVendor[] | null
  pagination: Pagination | null
  countRowTable: number
}
export interface GetAllVendorsReturnData extends Pagination {
  results: IVendor[]
}


//общие
export interface Pagination {
  count: number
  next: string | null
  previous: string | null
}
export type WithoutNullableKeys<Type> = {
  [Key in keyof Type]-?: WithoutNullableKeys<NonNullable<Type[Key]>>
}

