import type { Pagination } from "./generalTypes";

////////////////////////////////////////////////// Товары ///////////////////////////////////////////////
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
    categories_l4?: string[];
    vendor_id?: string;
    sort_by?: string;
    sort_order?: string;
  }
  export interface ProductStore {
    product: IProduct[];
    pagination: Pagination | null;
    countRowTable: number;
    sortProp: string
    sortOrder: string
    search: string
    filterValue: GetAllProducts
  }
  export interface GetAllProductsReturnData extends Pagination {
    results: IProduct[];
  }