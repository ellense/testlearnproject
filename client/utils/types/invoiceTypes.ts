import type { Pagination } from "./generalTypes";

//////////////////////////////////////////////// накладные //////////////////////////////////////////////
export interface IInvoice {
    invoice_id: number | null;
    entity_id: string;
    entity_name: string;
    vendor_id: string;
    vendor_name: string;
    invoice_name: string;
    invoice_number: string;
    invoice_date: Date | string;
    product_amount: number | null
  }
  export interface IInvoiceFull {
    invoice_id: number | null;
    entity_id: string;
    entity_name: string;
    vendor_id: string;
    vendor_name: string;
    invoice_name: string;
    invoice_number: string;
    purch_number: string;
    invoice_date: Date | string;
    invoice_status: string
    purch_date: Date | string;
    docid: string
    doctype: string
  }
  export interface IParamInvoices {
    page_size?: number;
    page?: number;
    entity_id?: string[];
    vendor_id?: string[];
    searchNumber?: string;
    start_date?: string,
    end_date?: string,
    sort_by?: string;
    sort_order?: string;
  }
  export interface IInvoicesReturnData extends Pagination {
    results: IInvoice[];
  }
  export interface IInvoicesFullReturnData extends Pagination {
    results: IInvoiceFull[];
  }