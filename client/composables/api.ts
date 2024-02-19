import type { Tree } from "element-plus/es/components/tree-v2/src/types";
import type { AuthApiData, GetUserData } from "~/utils/types/authTypes";
import type {
  IEntity,
  IEntityIdAndName,
  IKuPost,
  IKuId,
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
  GetAllProducer,
  GetAllProducersReturnData,
  GetAllVendorsForEntityInVendor,
  GetAllVendorsForEntityInVendorReturnData,
  EntityId,
  GetAllEntities,
  IKuPostGraphic,
  GetAllGraphic,
  GetAllGraphicsReturnData,
  IKuUpdateStatus,
  IGraphicId,
  IKuDeleteGraph,
  IVendorId,
  GetAllKusReturnData,
  GetAllKus,
  GetAllKu_Id,
  GetAllKu_IdReturnData,
  ITree,
  IKuPost2,
  IKuList,
  IRequirementPost,
  IRequirementPost2,
} from "~/utils/types/directoryTypes";
const isBearer = true;

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
  getEntitiesList: (params: GetAllEntities): Promise<IEntity> =>
    $Get("api/entitieslist/", { params, isBearer: false }),
  getEntityByIdAndName: (data: IEntityIdAndName): Promise<IEntityIdAndName[]> =>
    $Get("api/entitieslist/", { data, isBearer: false }),
  getEntityById: (): Promise<EntityId[]> =>
    $Get("api/entitieslist/", { isBearer: false }),
};

export const VENDOR = {
  getVendorsList: (params?: GetAllVendors): Promise<GetAllVendorsReturnData> =>
    $Get("api/vendorlist/", { params, isBearer: false }),
  getVendorsForEntityInKU: (
    params?: GetAllVendorsForEntity
  ): Promise<GetAllVendorsForEntityReturnData> =>
    $Get("api/vendorfilter/", { params, isBearer: false }),
  getVendorsForEntityInVendor: (
    params?: GetAllVendorsForEntityInVendor
  ): Promise<GetAllVendorsForEntityInVendorReturnData> =>
    $Get("api/vendorlist/", { params, isBearer: false }),
  getVendorById: (): Promise<IVendorId[]> =>
    $Get("api/vendorlist/", { isBearer: false }),
};

export const PRODUCT = {
  getProductsList: (
    params?: GetAllProducts
  ): Promise<GetAllProductsReturnData> =>
    $Get("api/productslist", { params, isBearer: false }),
};

export const KU = {
  getKuList: (params: GetAllKus): Promise<GetAllKusReturnData> =>
    $Get("api/kulist/", { params, isBearer: false }),
  getKuIdList: (params: GetAllKu_Id): Promise<GetAllKu_IdReturnData> =>
    $Get("api/kulist/", { params, isBearer: false }),
  // postKu: (data: IKuPost, params:IKuPost2): Promise<IKuPost> =>
  //   $Post("api/kulist/", { data,params, isBearer: false }),
  postKu: (data: IKuPost): Promise<IKuList> =>
    $Post("api/ku_create/", { data, isBearer: false }),
  postKuRequirement: (data: IRequirementPost2): Promise<IRequirementPost2> =>
    $Post("api/included_product/", { data, isBearer: false }),
  deleteKu: (data: IKuId) =>
    $Delete(`api/kudetail/${data.ku_id}`, { data, isBearer: false }),
  updateKuStatus: (data: IKuUpdateStatus) =>
    $Put(`api/kudetail/${data.ku_id}/`, { data, isBearer: false }),
  getInfoKu: (data: IKuId): Promise<IKuList> =>
    $Get(`api/kudetail/${data.ku_id}/`, { data, isBearer: false }),
  deleteGraphRow: (params: IKuDeleteGraph) =>
    $Delete("api/graphlist/", { params, isBearer: false }),
};

export const GRAPHIC = {
  getGraphic: (params?: GetAllGraphic): Promise<GetAllGraphicsReturnData> =>
    $Get("api/graphlist/", { params, isBearer: false }),
  postGraphic: (data: IKuPostGraphic): Promise<IKuPostGraphic> =>
    $Post("api/create_graph/", { data, isBearer: false }),
  deleteGraphic: (data: IGraphicId) =>
    $Delete(`api/graphdetail/${data.graph_id}/`, { data, isBearer: false }),
};

export const PRODUCER = {
  getProducer: (params?: GetAllProducer): Promise<GetAllProducersReturnData> =>
    $Get("api/brandlist/", { params, isBearer: false }),
};

export const BRAND = {
  getBrand: (params?: GetAllBrands): Promise<GetAllBrandsReturnData> =>
    $Get("api/brandlist/", { params, isBearer: false }),
};

export const CATEGORY = {
  getCategory: (data: ITree): Promise<ITree> =>
    $Get("api/classifiersTest/", { data, isBearer: false }),
};
