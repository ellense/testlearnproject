import type { Pagination } from "./generalTypes";

////////////////////////////////////// Вкладки КУ поставщиков ///////////////////////////////////
export interface IParamKuId {
    ku_id?: string;
    page_size?: number;
    page?: number;
  }
  
  //Условия
  export interface IRequirement {
    id: number | null;
    item_type: string;
    item_code: string;
    item_name: string;
    producer: string;
    brand: string;
  }
  export interface IRequirementId {
    id: number | null;
  }
  export interface IRequirementReturnData extends Pagination {
    results: IRequirement[];
  }
  export interface IRequirementPost {
    ku_id: string;
    item_type: string;
    item_code: string;
    item_name: string;
    producer: string;
    brand: string;
  }
  
  //контракт
  export interface IContract {
    producer_code: string;
    producer_name: string;
    brand_code: string;
    brand_name: string;
    use_producer: boolean;
    use_brand: boolean;
  }
  export interface IContractPost {
    vendor_name: string;
    ku_type: string;
    provider_list: string[];
    brand_list: string[];
  }
  export interface IContractPromise {
    name: string;
  }
  
  //бонус
  export interface IPercent {
    id: number | null;
    fix: boolean;
    criterion: number | null;
    percent_sum: number | null;
  }
  export interface IPercentPost {
    fix: boolean;
    criterion: number | null;
    percent_sum: number | null;
    ku_key_id: string;
  }
  export interface GetPersentReturnData extends Pagination {
    results: IPercent[];
  }
  
  
  //ПОСТАВЩИКИ И ДОГОВОРЫ
  export interface IVendorAndContract {
    id: number | null;
    type_partner: string;
    vendor_id: string;
    vendor_name: string;
    vendor_retention: string;
    vendor_status: string
    entity_id: string
    entity_name: string
  }
  export interface IVACPost {
    type_partner: string;
    vendor_id: string;
    vendor_name: string;
    vendor_retention: string;
    vendor_status: string
    entity_id: string
    entity_name: string
    ku_key_id: string;
  }
  export interface GetVACReturnData extends Pagination {
    results: IVendorAndContract[];
  }
  
  //искл. накладные
  export interface IExInvoiceForKu {
    id: number | null;
    invoice_id: number | null;
    vendor_id: string;
    vendor_name: string;
    invoice_name: string;
    invoice_number: string;
    invoice_date: Date | string;
    product_amount: number | null
    docid: string
  }
  export interface IExInvoiceForKuPost {
    ku_id: string;
    docid: string;
  }
  export interface GetParamExInvoicesForKu {
    page_size?: number;
    page?: number;
    searchNumber?: string;
    entity_id?: string[];
    vendor_id?: string;
    start_date?: string,
    end_date?: string,
    ku_id?: string,
  }
  export interface GetExInvoicesForKuReturnData extends Pagination {
    results: IExInvoiceForKu[];
  }
  
  //кат. менеджеры
  export interface IManagerForKu {
    id: number | null;
    group: string;
    description: string;
  }
  export interface IParamManagers {
    page_size?: number;
    page?: number;
    ku_id?: string;
  }
  export interface IManagersReturnData extends Pagination {
    results: IManagerForKu[];
  }
  export interface IManagerForKuPost {
    ku_id: string
    id: number | null;
  }
  
  //должностные лица
  export interface IOfficialForKu {
    id: number | null;
    counterparty_name: string;
    counterparty_post: string;
    counterparty_docu: string;
    entity_name: string;
    entity_post: string;
    entity_docu: string;
  }
  export interface IOfficialForKuPost {
    ku_id: string
    counterparty_name: string;
    counterparty_post: string;
    counterparty_docu: string;
    entity_name: string;
    entity_post: string;
    entity_docu: string;
  }
  export interface GetAllOfficialReturnData extends Pagination {
    results: IOfficialForKu[];
  }

  ////////////////////////////////////// Вкладки КУ клиентов ///////////////////////////////////

//контракт
export interface IContractService {
    service_code: string;
    service_name: string;
    article_code: string;
    article_name: string;
  }
  export interface IContractServicePost {
    vendor_name: string;
    ku_type: string;
    provider_list: string[];
    brand_list: string[];
  }
  // оказываемые услуги
  export interface IServiceAndArticle {
    service_code: string;
    service_name: string;
    article_code: string;
    article_name: string;
    ratio: number | null;
  }
  export interface IServicesPost {
    ku_id: string;
    service_code: string;
    service_name: string;
    article_code: string;
    article_name: string;
    ratio: number;
  }