import type { AuthApiData, GetUserData } from "~/utils/types/authTypes";
import type {
  IEntity,
  IInvoice,
  IProduct,
  IVendor,
  IVendorNameId,
  IKu
} from "~/utils/types/directoryTypes";
const isBearer = true;

// export const AUTH = {
//   getToken: (
//     data: AuthApiData
//   ): Promise<{ access: string; refresh: string } | null> =>
//     $Authorization({ data, isBearer: false }),
//   getUserData: (data: GetUserData): Promise<GetUserData> =>
//     $Post("api/me", { data, isBearer }),
// };
export const AUTH = {
  getToken: (data: {
    username: string
    password: string
  }): Promise<{ access: string; refresh: string } | null> =>
    $Authorization({ data, isBearer: false }),
  getUserData: (data: GetUserData): Promise<GetUserData> =>
    $Post("api/me", { data, isBearer }),
};

export const INVOICE = {
  getInvoicesList: (
    data: IInvoice
  ): Promise<{
    id: number;
    number: number | null;
    summa: number | null;
    date: Date | string;
    nameProvider: string;
  } | null> => $Get("api/invoiceslist/", { data, isBearer: false }),
};
export const ENTITY = {
  getEntitiesList: (
    data: IEntity
  ): Promise<{ 
    entityid: string;
    directorname: string;
    urasticname: string;
    name: string;
    urasticaddress: string; } | null> =>
    $Get("api/entitieslist/", { data, isBearer: false }),
    getEntityNameById: (
      data: IEntity
    ): Promise<{
      entityid: string;
    } | null> =>
      $Get("api/entitieslist/", { data, isBearer: false }),
};
export const VENDOR = {
  getVendorsList: (
    data: IVendor
  ): Promise<{
    vendorid: string;
    name: string;
    urasticname: string;
    directorname: string;
    urasticadress: string;
    inn_kpp: string;
    entityid: string;
  } | null> => $Get("api/vendorlist", { data, isBearer: false }),
  getVendorsNameAndId: (
    data: IVendorNameId
  ): Promise<{
    vendorid: string;
    name: string;
  } | null> => $Get("api/vendorlist/?fields=name,vendorid", { data, isBearer: false }),
  
};
export const PRODUCT = {
  getProductsList: (
    data: IProduct
  ): Promise<{
    itemid: string;
    classifier_id: string;
    brand_id: string;
    name: string;
  } | null> => $Get("api/productslist", { data, isBearer: false }),
};

export const KU = {
  postKu: (
    data: IKu
  ): Promise<{
  ku_id: string;
  vendor: string;
  period: string;
  date_start: Date;
  date_end: Date;
  status: string;
  } | null> => $Post("api/kulist", { data, isBearer: false }),
};
