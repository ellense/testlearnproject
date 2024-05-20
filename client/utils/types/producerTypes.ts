import type { Pagination } from "./generalTypes";

///////////////////////////////////// Производитель /////////////////////////////////////////////////
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