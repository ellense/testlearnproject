import type { AuthApiData, GetUserData } from "~/utils/types/authTypes";
import type {
  IEntity,
  IInvoice,
  IProduct,
  IVendor,
  IKu,
  IGraphic,
  GetAllVendorsReturnData,
  GetAllVendors,
  IBrand,
  IEntityIdAndName,
  IVendorIdAndName,
  EntityId,
  GetAllInvoices,
  GetAllInvoicesReturnData
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
  // getInvoicesList: (
  //   data: IInvoice
  // ): Promise<IInvoice> => $Get("api/venddoclist", { data, isBearer: false }),
  getInvoicesList: (params?: GetAllInvoices): Promise<GetAllInvoicesReturnData> =>
    $Get("api/venddoclist", { params, isBearer: false }),
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
    data: IEntityIdAndName
  ): Promise<IEntityIdAndName> => $Get("api/entitieslist/", { data, isBearer: false }),
};
export const VENDOR = {
  // getVendorsIdAndName: (params?: EntityId): Promise<IVendorIdAndName> =>
  //   $Get("api/vendorlist/", { params, isBearer: false }),
  getVendorsIdAndName: (params?: EntityId): Promise<IVendorIdAndName[]> =>
    $Get("api/vendorlist/", { params: { ...params, vendorid: "", name: "", entityid: "" }, isBearer: false }),
    getVendorsIdAndName2: (data: IVendorIdAndName): Promise<IVendorIdAndName> =>
    $Get("api/vendorlist/?entityid=lir", { data, isBearer: false }),
  getVendorsList: (params?: GetAllVendors): Promise<GetAllVendorsReturnData> =>
    $Get("api/vendorlist/", { params, isBearer: false }),
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

export const BRAND = {
  getBrand: (data: IBrand): Promise<IBrand> =>
    $Get("api/brandlist", { data, isBearer: false }),
}
