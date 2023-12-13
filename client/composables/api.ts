import type { AuthApiData, GetUserData } from "~/utils/types/authTypes";
import type {
  IEntity,
  IInvoice,
  IProduct,
  IVendor,
} from "~/utils/types/directoryTypes";
const isBearer = true;

export const AUTH = {
  getToken: (
    data: AuthApiData
  ): Promise<{ access: string; refresh: string } | null> =>
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
