import type { Pagination } from "./generalTypes";

//////////////////////////////////////////// график клиентов //////////////////////////////////////////////
export interface IGraphicC {
    graph_id: number | null;
    ku: string;
    entity: string;
    entity_name: string;
    customer: string;
    customer_name: string;
    period: string;
    date_start: Date | string | null;
    date_end: Date | string | null;
    date_calc: Date | string | null;
    date_accrual: Date | string | null;
    sum_calc: number | null;
    sum_bonus: number | null;
    sum_approved: number | null;
    status: string
  }

  export interface IGraphicСInfo {
    graph_id: number | null;
    entity: string;
    entity_name: string;
    ku: string;
    customer: string;
    customer_name: string;
    period: string;
    date_start: Date | string;
    date_end: Date | string;
    date_calc: Date | string;
    date_accrual: Date | string | null;
    percent: number | null;
    sum_calc: number | null;
    sum_bonus: number | null;
    status: string
    sum_approved: number | null;
  }
  
  export interface GetAllGraphicС {
    page_size?: number;
    page?: number;
    ku_id?: string[];
    entity_id?: string[];
    customer_id?: string[];
    status?: string[];
    period?: string[]
    date_start_s?: string,
    date_start_e?: string,
    date_end_s?: string,
    date_end_e?: string,
    date_calc_s?: string,
    date_calc_e?: string,
    date_accrual_s?: string,
    date_accrual_e?: string,
    search?: string;
    sort_by?: string;
    sort_order?: string;
  }
  export interface GetAllGraphicСsReturnData extends Pagination {
    results: IGraphicC[];
  }