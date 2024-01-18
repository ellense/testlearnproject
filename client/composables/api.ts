import type { AuthApiData, GetUserData } from "~/utils/types/authTypes";
import type {
  IEntity,
  IEntityIdAndName,
  IKu,
  IGraphic,
  GetAllInvoices,
  GetAllInvoicesReturnData,
  GetAllProducts,
  GetAllProductsReturnData,
  GetAllVendors,
  GetAllVendorsReturnData,
  GetAllVendorsForEntity,
  GetAllVendorsForEntityReturnData,
  GetAllBrandsReturnData,
  GetAllBrands,
  GetAllProduser,
  GetAllProdusersReturnData,
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
    params?: GetAllInvoices
  ): Promise<GetAllInvoicesReturnData> =>
    $Get("api/venddoclist", { params, isBearer: false }),
};
export const ENTITY = {
  getEntitiesList: (data: IEntity): Promise<IEntity> =>
    $Get("api/entitieslist/", { data, isBearer: false }),
  getEntityNameById: (data: IEntityIdAndName): Promise<IEntityIdAndName> =>
    $Get("api/entitieslist/", { data, isBearer: false }),
};

export const VENDOR = {
  getVendorsList: (params?: GetAllVendors): Promise<GetAllVendorsReturnData> =>
    $Get("api/vendorlist/", { params, isBearer: false }),
  getVendorsForEntity: (
    params?: GetAllVendorsForEntity
  ): Promise<GetAllVendorsForEntityReturnData> =>
    $Get("api/vendorlist/", { params, isBearer: false }),
};

export const PRODUCT = {
  getProductsList: (
    params?: GetAllProducts
  ): Promise<GetAllProductsReturnData> =>
    $Get("api/productslist", { params, isBearer: false }),
};

export const KU = {
  getKuList: (data: IKu): Promise<IKu> =>
    $Get("api/kulist", { data, isBearer: false }),
  postKu: (data: IKu): Promise<IKu> =>
    $Post("api/kulist", { data, isBearer: false }),
  putKu: (data: IKu): Promise<IKu> =>
    $Put("api/kulist", { data, isBearer: false }),
  deleteKu: (data: IKu): Promise<IKu> =>
    $Delete("api/kulist", { data, isBearer: false }),
};

export const GRAPHIC = {
  getGraphic: (data: IGraphic): Promise<IGraphic> =>
    $Get("api/kugraph", { data, isBearer: false }),
  postGraphic: (data: IGraphic): Promise<IGraphic> =>
    $Post("api/kugraph", { data, isBearer: false }),
};

export const PRODUCER = {
  getProducer: (params?: GetAllProduser): Promise<GetAllProdusersReturnData> =>
    $Get("api/brandlist", { params, isBearer: false }),
};

export const BRAND = {
  getBrand: (params?: GetAllBrands): Promise<GetAllBrandsReturnData> =>
    $Get("api/brandlist", { params, isBearer: false }),
};
