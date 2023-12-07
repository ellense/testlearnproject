export interface IEntity {
  entityid: string;
  name: string;
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
  id: number;
  name: string;
  nameProvider: string;
  category: string;
}

export interface IProvider {
  id: number;
  score: number | null;
  name: string;
  nameEntity: string;
}

export interface IProfile {
  id: number;
  last_name: string;
  first_name: string;
  middle_name: string;
  email: string;
}
