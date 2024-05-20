import type { Pagination } from "./generalTypes"

///////////////////////////////////// поставщик /////////////////////////////////
export interface IVendor {
    vendor_id: string
    name: string
    urastic_name: string
    director_name: string
    urastic_adress: string
    inn_kpp: string
    entity_id: string
    entity_name: string
  }
  export interface IVendorFull {
    vendor_id: string
    name: string
    urastic_name: string
    director_name: string
    urastic_adress: string
    inn_kpp: string
    account: string
    bank_name: string
    bank_bik: string
    corr_account: string
    dir_party: number | null
    entity_id: string
    entity_name: string
  }
 
  export interface IParamVendors {
    page_size?: number
    page?: number
  }
  export interface IVendorsReturnData extends Pagination {
    results: IVendor[]
  }
  export interface IVendorId {
    vendor_id: string
  }
  export interface IVendorName {
    name: string
  }
  export interface IVendorIdAndName {
    vendor_id: string
    name: string;
  }
  export interface IVendorIdAndNameForKu {
    vendor_id: string
    vendor_name: string;
  }
  export interface IParamVendorsForEntity {
    entity_id?: string;
    vendor_id?: string;
    page_size?: number;
    page?: number;
  }
  export interface IParamVendorsForEntityInVendor {
    entity_ids?: string[]
    page_size?: number
    page?: number
    search?: string;
    sort_by?: string;
    sort_order?: string;
  }
  export interface IVendorsForEntityReturnData extends Pagination {
    resultsId: IVendorId[];
    resultsName: IVendorName[];
    results: IVendorIdAndName[]
  }
  export interface IVendorsForEntityInVendorReturnData extends Pagination {
    results: IVendor[];
  }
  