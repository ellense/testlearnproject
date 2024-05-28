////////////////////////////////////////////////// Акты  поставщиков /////////////////////////////////////////////////

import type { Pagination } from "./generalTypes";

  export interface IGraphicNumeralsAndSumQty {
    sum_calc_words: string;
    total_qty: number | null;
  
  }
  export interface GraphicForExcelReportInvoice {
    invoice_number: string;
    invoice_date: Date | string;
    purch_number: string;
    purch_date: Date | string;
    invoice_status: string;
    product_amount: number | null;
    total_qty: number | null;
  }
  export interface GraphicForExcelReportProduct {
    product_id: string;
    amount: number | null;
    amount_vat: number | null;
    product_qty: number | null;
    product_name: string;
    category_name_l4: string;
    category_name_l3: string;
    category_name_l2: string;
    producer_name: string;
  }
  export interface GetAllInvoicesAndProductForGraphic {
    page_size?: number;
    page?: number;
    graph_id?: number | null;
  }
  export interface GetAllInvoicesForGraphicReturnData extends Pagination {
    results: GraphicForExcelReportInvoice[];
  }
  export interface GetAllProductsForGraphicReturnData extends Pagination {
    results: GraphicForExcelReportProduct[];
  }