///////////////////////////////////////// КУ КЛИЕНТОВ ////////////////////////////////////////////////////

import type { Pagination } from "./generalTypes";
import type { IKuId } from "./kuVendorTypes";

export interface IKuCList {
    ku_id: string;
    entity: string;
    entity_name: string;
    customer: string;
    customer_name: string;
    period: string;
    date_start: Date | string;
    date_end: Date | string;
    graph_exists: boolean | string
    status: string;
    description: string;
    contract: string;
    docu_account: string;
    docu_number: string;
    docu_date: Date | string;
    docu_subject: string;
    pay_sum: number | null;
    pay_method: string;
  }
  export interface IKuCPost {
    entity: string;
    customer: string;
    period: string;
    date_start: Date | string;
    date_end: Date | string;
    status: string;
    description: string;
    contract: string;
    docu_account: string;
    docu_number: string;
    docu_date: Date | string;
    docu_subject: string;
    pay_sum: number | null;
    pay_method: string;
  }
  export interface IKuCPostGraphic {
    ku_id: string;
  }
  export interface IKuCUpdate {
    ku_id: string;
    status: string;
    entity: string;
    customer: string;
    period: string;
    date_start: Date | string;
    date_end: Date | string;
    description: string;
    contract: string;
    docu_account: string;
    docu_number: string;
    docu_date: Date | string;
    docu_subject: string;
    pay_sum: number | null;
    pay_method: string;
  }
  export interface IKuCStore {
    multipleSelection: IKuCList[];
    multipleTableRef: Ref | null;
    tableData: IKuCList[];
    pagination: Pagination | null;
    countRowTable: number;
    sortProp: string;
    sortOrder: string;
    legalEntity: string[]
    filterVendorId: string[]
    filterEntityId: string[]
    filterKuValue: IParamKusC
  }

  export interface IParamKusC {
    page_size?: number;
    page?: number;
    entity_id?: string[];
    customer_id?: string[];
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
  export interface IParamKuC_Id {
    page_size?: number;
    page?: number;
  }
  export interface IKusCReturnData extends Pagination {
    results: IKuCList[];
  }
  export interface IKuC_IdReturnData extends Pagination {
    results: IKuId[];
  }