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
  id: number;
  kuNumber: string;
  percent: number | null;
  provider: string;
  type: string;
  dateStart: Date | string;
  dateEnd: Date | string;
  dateActual: Date | string;
  base: number | null;
}

export interface IGraphic {
  id: number;
  kuNumber: string;
  provider: string;
  type: string;
  dateStart: Date | string;
  dateEnd: Date | string;
  dateCalc: Date | string;
  percent: number | null;
  base: number | null;
  calculated: number | null;
  approved: number | null;
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

export interface IProfile {
  id: number;
  last_name: string;
  first_name: string;
  middle_name: string;
  email: string;
}
