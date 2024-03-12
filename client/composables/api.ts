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
  IGraphicId,
  IKuDeleteGraph,
  IVendorId,
  GetAllKusReturnData,
  GetAllKus,
  GetAllKu_Id,
  GetAllKu_IdReturnData,
  ITree,
  IKuList,
  IRequirementPost2,
  IGraphicInfo,
  GetAllInvoicesForGraphicReturnData,
  GetAllInvoicesAndProductForGraphic,
  GetAllProductsForGraphicReturnData,
  IKuUpdate,
  IIncludedRequirement,
  GetAllCategory,
  IPercent,
  IPercentPost,
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
  // getInvoicesList: (
  //   params?: GetAllInvoices
  // ): Promise<GetAllInvoicesReturnData> =>
  //   $Get("api/vend_doc_list", { params, isBearer: false }),
};
export const ENTITY = {
  getEntitiesList: (params: GetAllEntities): Promise<IEntity> =>
    $Get("api/entitieslist/", { params, isBearer: false }),
  getEntityByIdAndName: (data: IEntityIdAndName): Promise<IEntityIdAndName[]> =>
    $Get("api/entitieslist/", { data, isBearer: false }),
  getEntityById: (): Promise<EntityId[]> =>
    $Get("api/entitieslist/", { isBearer: false }),
  // getEntitiesList: (params: GetAllEntities): Promise<IEntity> =>
  //   $Get("api/entitiy_list/", { params, isBearer: false }),
  // getEntityByIdAndName: (data: IEntityIdAndName): Promise<IEntityIdAndName[]> =>
  //   $Get("api/entitiy_list/", { data, isBearer: false }),
  // getEntityById: (): Promise<EntityId[]> =>
  //   $Get("api/entitiy_list/", { isBearer: false }),
};

export const VENDOR = {
  getVendorsList: (params?: GetAllVendors): Promise<GetAllVendorsReturnData> =>
    $Get("api/vendorlist/", { params, isBearer: false }),
  getVendorsForEntityInVendor: (
    params?: GetAllVendorsForEntityInVendor
  ): Promise<GetAllVendorsForEntityInVendorReturnData> =>
    $Get("api/vendorlist/", { params, isBearer: false }),
  getVendorById: (): Promise<IVendorId[]> =>
    $Get("api/vendorlist/", { isBearer: false }),
  // getVendorsList: (params?: GetAllVendors): Promise<GetAllVendorsReturnData> =>
  //   $Get("api/vendor_list/", { params, isBearer: false }),
  // getVendorsForEntityInVendor: (
  //   params?: GetAllVendorsForEntityInVendor
  // ): Promise<GetAllVendorsForEntityInVendorReturnData> =>
  //   $Get("api/vendor_list/", { params, isBearer: false }),
  // getVendorById: (): Promise<IVendorId[]> =>
  //   $Get("api/vendor_list/", { isBearer: false }),
  getVendorsForEntityInKU: (
    params?: GetAllVendorsForEntity
  ): Promise<GetAllVendorsForEntityReturnData> =>
    $Get("api/vendorfilter/", { params, isBearer: false }),
  // getVendorsForEntityInKU: (
  //   params?: GetAllVendorsForEntity
  // ): Promise<GetAllVendorsForEntityReturnData> =>
  //   $Get("api/vendor_filter/", { params, isBearer: false }),

};

export const PRODUCT = {
  getProductsList: (
    params?: GetAllProducts
  ): Promise<GetAllProductsReturnData> =>
    $Get("api/productslist", { params, isBearer: false }),
  // getProductsList: (
  //   params?: GetAllProducts
  // ): Promise<GetAllProductsReturnData> =>
  //   $Get("api/product_list", { params, isBearer: false }),
};

export const KU = {
  getKuList: (params: GetAllKus): Promise<GetAllKusReturnData> =>
    $Get("api/kulist/", { params, isBearer: false }),
  getKuIdList: (params: GetAllKu_Id): Promise<GetAllKu_IdReturnData> =>
    $Get("api/kulist/", { params, isBearer: false }),
  // getKuList: (params: GetAllKus): Promise<GetAllKusReturnData> =>
  //   $Get("api/ku_list/", { params, isBearer: false }),
  // getKuIdList: (params: GetAllKu_Id): Promise<GetAllKu_IdReturnData> =>
  //   $Get("api/ku_list/", { params, isBearer: false }),
  postKu: (data: IKuPost): Promise<IKuList> =>
    $Post("api/ku_create/", { data, isBearer: false }),

  deleteKu: (data: IKuId) =>
    $Delete(`api/kudetail/${data.ku_id}`, { data, isBearer: false }),
  updateKu: (data: IKuUpdate) =>
    $Put(`api/kudetail/${data.ku_id}/`, { data, isBearer: false }),
  getInfoKu: (data: IKuId): Promise<IKuList> =>
    $Get(`api/kudetail/${data.ku_id}/`, { data, isBearer: false }),
  // deleteKu: (data: IKuId) =>
  //   $Delete(`api/ku_detail/${data.ku_id}`, { data, isBearer: false }),
  // updateKu: (data: IKuUpdate) =>
  //   $Put(`api/ku_detail/${data.ku_id}/`, { data, isBearer: false }),
  // getInfoKu: (data: IKuId): Promise<IKuList> =>
  //   $Get(`api/ku_detail/${data.ku_id}/`, { data, isBearer: false }),

  postKuRequirement: (data: IRequirementPost2): Promise<IRequirementPost2> =>
    $Post("api/included_condition_create/", { data, isBearer: false }),
  postKuRequirementBonus: (data: IPercentPost): Promise<IPercentPost> =>
  $Post("api/bonus_condition/", { data, isBearer: false }),
  getKuRequirementBonus: (params: IKuId): Promise<IPercent[]> =>
  $Get(`api/bonus_condition/`, { params, isBearer: false }),
  getInfoRequirements: (params: IKuId): Promise<IIncludedRequirement[]> =>
    $Get(`api/included_conditions_list/`, { params, isBearer: false }),
  // getInfoRequirements: (params: IKuId): Promise<IIncludedRequirement[]> =>
  //   $Get(`api/included_condition_list/`, { params, isBearer: false }),

  deleteGraphRow: (params: IKuDeleteGraph) =>
    $Delete("api/graphlist/", { params, isBearer: false }),
  // deleteGraphRow: (params: IKuDeleteGraph) =>
  //   $Delete("api/graph_list/", { params, isBearer: false }),
};

export const GRAPHIC = {
  getGraphic: (params?: GetAllGraphic): Promise<GetAllGraphicsReturnData> =>
    $Get("api/graphlist/", { params, isBearer: false }),
  // getGraphic: (params?: GetAllGraphic): Promise<GetAllGraphicsReturnData> =>
  //   $Get("api/graph_list/", { params, isBearer: false }),

  postGraphic: (data: IKuPostGraphic): Promise<IKuPostGraphic> =>
    $Post("api/graph_create/", { data, isBearer: false }),

  deleteGraphic: (data: IGraphicId) =>
    $Delete(`api/graphdetail/${data.graph_id}/`, { data, isBearer: false }),
  getInfoGraphic: (data: IGraphicId): Promise<IGraphicInfo> =>
    $Get(`api/graphdetail/${data.graph_id}/`, { data, isBearer: false }),
    updateGraphic: (data: IGraphicInfo) =>
    $Put(`api/graphdetail/${data.graph_id}/`, { data, isBearer: false }),
  // deleteGraphic: (data: IGraphicId) =>
  //   $Delete(`api/graph_detail/${data.graph_id}/`, { data, isBearer: false }),
  // getInfoGraphic: (data: IGraphicId): Promise<IGraphicInfo> =>
  //   $Get(`api/graph_detail/${data.graph_id}/`, { data, isBearer: false }),
  // updateGraphic: (data: IGraphicInfo) =>
  //   $Put(`api/graph_detail/${data.graph_id}/`, { data, isBearer: false }),

  // getInfoInvoicesForGraphic: (data: IGraphicId): Promise<GraphicForExcelReportInvoice> =>
  //   $Get(`api/graphdetail/${data.graph_id}/`, { data, isBearer: false }),
  getInfoInvoicesForGraphic: (params: GetAllInvoicesAndProductForGraphic): Promise<GetAllInvoicesForGraphicReturnData> =>
    $Get("api/included_invoice_list/", { params, isBearer: false }),

  getInfoProductsForGraphic: (params: GetAllInvoicesAndProductForGraphic): Promise<GetAllProductsForGraphicReturnData> =>
    $Get("api/included_product_list/", { params, isBearer: false }),

};

export const PRODUCER = {
  getProducer: (params?: GetAllProducer): Promise<GetAllProducersReturnData> =>
    $Get("api/brandlist/", { params, isBearer: false }),
  // getProducer: (params?: GetAllProducer): Promise<GetAllProducersReturnData> =>
  //   $Get("api/brand_list/", { params, isBearer: false }),
};

export const BRAND = {
  getBrand: (params?: GetAllBrands): Promise<GetAllBrandsReturnData> =>
    $Get("api/brandlist/", { params, isBearer: false }),
  // getBrand: (params?: GetAllBrands): Promise<GetAllBrandsReturnData> =>
  //   $Get("api/brand_list/", { params, isBearer: false }),
};

export const CATEGORY = {
  getCategory: (data: ITree): Promise<ITree> =>
    $Get("api/classifiers_tree/", { data, isBearer: false }),
  getCategory2: (params: GetAllCategory): Promise<ITree> =>
    $Get("api/classifiers_tree/", { params, isBearer: false }),
};
