import type { Pagination } from "./generalTypes";

//////////////////////////////////////// Бренд /////////////////////////////////////////////////////
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