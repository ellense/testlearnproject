import type { Pagination } from "./generalTypes";










///////////////////////////////////// Справочники по услугам ///////////////////////////////////////////
export interface IParamServices {
  page_size?: number
  page?: number
  search?: string;
  sort_by?: string;
  sort_order?: string;
}
// Услуги
export interface IService {
  service_code: string;
  service_name: string;
}
export interface IServicesReturnData extends Pagination {
  results: IService[]
}

//Статьи Услуг
export interface IArticle {
  article_code: string;
  article_name: string;
}
export interface IArticleReturnData extends Pagination {
  results: IArticle[]
}

// Прайслист статей услуг
export interface IPricelist {
  date_action: Date | string
  date_expiration: Date | string;
  article_code: string;
  article_name: string;
  price: number | null;
  unit: string;
}
export interface IPricelistReturnData extends Pagination {
  results: IPricelist[]
}

//места оказания услуг
export interface IPlace {
  shop_code: string;
  shop_name: string;
  address: string;
}
export interface IPlaceReturnData extends Pagination {
  results: IPlace[]
}






