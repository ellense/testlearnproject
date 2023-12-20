export interface IEntity {
  entityid: string;
  directorname: string;
  urasticname: string;
  name: string;
  urasticaddress: string;
}
export interface IInvoice {
  id: number;
  number: number | null;
  summa: number | null;
  date: Date | string;
  nameProvider: string;
}

export interface IKu {
  ku_id: number | null;
  vendor: string;
  period: string;
  date_start: Date | string;
  date_end: Date | string;
  status: string;
  date_actual: Date | string;
  base: number | null;
  percent: number | null;
}

export interface IGraphic {
  graph_id: number | null;
  ku: number | null;
  vendor: string;
  period: string;
  date_start: Date | string;
  date_end: Date | string;
  date_calc: Date | string;
  percent: number | null;
  sum_calc: number | null;
  sum_bonus: number | null;
}

export interface IProduct {
  itemid: string;
  classifier_id: string;
  brand_id: string;
  name: string;
}

export interface IVendor {
  vendorid: string;
  name: string;
  urasticname: string;
  directorname: string;
  urasticadress: string;
  inn_kpp: string;
  entityid: string;
}

export interface IVendorNameId {
  vendorid: string;
  name: string;
}

export interface IProfile {
  id: number;
  last_name: string;
  first_name: string;
  middle_name: string;
  email: string;
}

export interface IProduser {
  id: number;
  name: string;
}

export interface IBrand {
  id: number;
  name: string;
}
