import type { AuthApiData, GetUserData } from "~/utils/types/authTypes";
import type {
  IEntity,
  IInvoice,
  IProduct,
  IProvider,
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
  ): Promise<{ entityid: string; name: string } | null> =>
    $Get("api/entitieslist/", { data, isBearer: false }),
};
export const VENDOR = {
  getVendorsList: (
    data: IProvider
  ): Promise<{
    id: number;
    score: number | null;
    name: string;
    nameEntity: string;
  } | null> => $Get("api/vendorslist/", { data, isBearer: false }),
};
export const PRODUCT = {
  getProductsList: (
    data: IProduct
  ): Promise<{
    id: number;
    name: string;
    nameProvider: string;
    category: string;
  } | null> => $Get("api/productslist/", { data, isBearer: false }),
};