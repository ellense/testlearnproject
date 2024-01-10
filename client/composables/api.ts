import type { AuthApiData, GetUserData } from "~/utils/types/authTypes";
import type {
  IEntity,
  IInvoice,
  IProduct,
  IVendor,
  IVendorNameId,
  IKu,
  IVendorListApi,
  IGraphic,
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
    username: string;
    password: string;
  }): Promise<{ access: string; refresh: string } | null> =>
    $Authorization({ data, isBearer: false }),
  getUserData: (data: GetUserData): Promise<GetUserData> =>
    $Post("api/me", { data, isBearer }),
};

export const INVOICE = {
  getInvoicesList: (
    data: IInvoice
  ): Promise<{
    invoice_id: number | null;
    entity_id: string;
    vendor_id: string;
    invoice_name: string;
    invoice_number: string;
    invoice_date: Date | string;
  } | null> => $Get("api/venddoclist", { data, isBearer: false }),
};
export const ENTITY = {
  getEntitiesList: (
    data: IEntity
  ): Promise<{
    entityid: string;
    directorname: string;
    urasticname: string;
    name: string;
    urasticaddress: string;
  } | null> => $Get("api/entitieslist/", { data, isBearer: false }),
  getEntityNameById: (
    data: IEntity
  ): Promise<{
    entityid: string;
  } | null> => $Get("api/entitieslist/", { data, isBearer: false }),
};
export const VENDOR = {
  getVendorsList: (data: IVendor): Promise<IVendorListApi> =>
    $Get("api/vendorlist/", { data, isBearer: false }),
  getVendorsNameAndId: (
    data: IVendorNameId
  ): Promise<{
    vendorid: string;
    name: string;
  } | null> =>
    $Get("api/vendorlist/?fields=name,vendorid", { data, isBearer: false }),
};
export const PRODUCT = {
  getProductsList: (
    data: IProduct
  ): Promise<{
    itemid: string;
    classifier_name: string;
    brand_name: string;
    name: string;
  } | null> => $Get("api/productslist", { data, isBearer: false }),
};

export const KU = {
  getKuList: (
    data: IKu
  ): Promise<IKu> => $Get("api/kulist", { data, isBearer: false }),

  postKu: (
    data: IKu
  ): Promise<IKu> => $Post("api/kulist", { data, isBearer: false }),

  putKu: (
    data: IKu
  ): Promise<IKu> => $Put("api/kulist", { data, isBearer: false }),

  deleteKu: (
    data: IKu
  ): Promise<IKu> => $Delete("api/kulist", { data, isBearer: false }),
};
export const GRAPHIC = {
  getGraphic: (data: IGraphic): Promise<IGraphic> =>
    $Get("api/kugraph", { data, isBearer: false }),

  postGraphic: (data: IKu): Promise<IGraphic> =>
    $Post("api/kugraph", { data, isBearer: false }),
};
