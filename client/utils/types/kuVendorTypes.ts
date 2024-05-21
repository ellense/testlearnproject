import type { Pagination } from "./generalTypes";

////////////////////////////////////// КУ поставщиков///////////////////////////////////////
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
    description: string;
    contract: string;
    product_type: string;
    docu_account: string;
    docu_number: string;
    docu_date: Date | string;
    docu_subject: string;
    tax: boolean;
    exclude_return: boolean;
    negative_turnover: boolean;
    ku_type: string;
    pay_method: string;
  }
  export interface IKuId {
    ku_id: string;
  }
  export interface IKuPost {
    entity_id: string;
    vendor_id: string;
    period: string;
    date_start: Date | string;
    date_end: Date | string;
    status: string;
    description: string;
    contract: string;
    product_type: string;
    docu_account: string;
    docu_number: string;
    docu_date: Date | string;
    docu_subject: string;
    tax: boolean;
    exclude_return: boolean;
    negative_turnover: boolean;
    ku_type: string;
    pay_method: string;
  }
  export interface IKuPostGraphic {
    ku_id: string;
    entity_id: string;
    vendor_id: string;
    period: string;
    date_start: Date | string;
    date_end: Date | string;
    status: string;
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
    description: string;
    contract: string;
    product_type: string;
    docu_account: string;
    docu_number: string;
    docu_date: Date | string;
    docu_subject: string;
    tax: boolean;
    exclude_return: boolean;
    negative_turnover: boolean;
    ku_type: string;
    pay_method: string;
  }
  export interface IKuDeleteGraph {
    ku_id: string;
    status: string;
  }

  
  export interface IParamKus {
    page_size?: number;
    page?: number;
    entity_id?: string[];
    vendor_id?: string[];
    status?: string[];
    graph_exists?: string[];
    date_start_s?: string,
    date_start_e?: string,
    date_end_s?: string,
    date_end_e?: string,
    search?: string;
    sort_by?: string;
    sort_order?: string;
  }
  export interface IParamKu_Id {
    page_size?: number;
    page?: number;
  }
  export interface IKusReturnData extends Pagination {
    results: IKuList[];
  }
  export interface IKu_IdReturnData extends Pagination {
    results: IKuId[];
  }