import type { Pagination } from "./generalTypes"

///////////////////////////////////// клиенты /////////////////////////////////////////////////
export interface ICustomerFull {
    customer_id: string
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
    entity: string
    entity_name: string
  }
  export interface IParamCustomers {
      entity_id?: string[]
      page_size?: number
      page?: number
      search?: string;
      sort_by?: string;
      sort_order?: string;
  }
  export interface IParamCustomersKU {
    customer_id?: string
    entity_id?: string
    page_size?: number
    page?: number
  }
  export interface ICustomerReturnData extends Pagination {
    results: ICustomerFull[]
  }
  export interface ICustomerIdAndName {
    customer_id: string
    name: string;
  }
  
  export interface ICustomerForEntityReturnData extends Pagination {
    results: ICustomerIdAndName[]
  }
