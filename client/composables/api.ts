import type { GetUserData } from "~/utils/types/authTypes";
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
  IGraphicInfo,
  GetAllInvoicesForGraphicReturnData,
  GetAllInvoicesAndProductForGraphic,
  GetAllProductsForGraphicReturnData,
  IKuUpdate,
  IRequirement,
  GetAllCategory,
  IPercentPost,
  IExInvoiceForKuPost,
  IManagerForKuPost,
  IOfficialForKuPost,
  IEntityFull,
  IVendorFull,
  GetPersentReturnData,
  GetAllOfficialReturnData,
  GetParamExInvoicesForKu,
  GetExInvoicesForKuReturnData,
  GetParamKuId,
  IRequirementPost,
  GetRequirementReturnData,
  IContract,
  IContractPost,
  IContractPromise,
  IRequirementId,
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
    $Get("api/vend_doc_list", { params, isBearer: false }),
};
export const ENTITY = {
  getEntitiesList: (params: GetAllEntities): Promise<IEntity> =>
    $Get("api/entity_list/", { params, isBearer: false }),
  getEntityByIdAndName: (data: IEntityIdAndName): Promise<IEntityIdAndName[]> =>
    $Get("api/entity_list/", { data, isBearer: false }),
  getEntityById: (): Promise<EntityId[]> =>
    $Get("api/entity_list/", { isBearer: false }),
  getEntityDetail: (data: EntityId): Promise<IEntityFull> =>
    $Get(`api/entity_detail/${data.entity_id}/`, { data, isBearer: false }),
};

export const VENDOR = {
  getVendorsList: (params?: GetAllVendors): Promise<GetAllVendorsReturnData> =>
    $Get("api/vendor_list/", { params, isBearer: false }),
  getVendorsForEntityInVendor: (
    params?: GetAllVendorsForEntityInVendor
  ): Promise<GetAllVendorsForEntityInVendorReturnData> =>
    $Get("api/vendor_list/", { params, isBearer: false }),
  getVendorById: (): Promise<IVendorId[]> =>
    $Get("api/vendor_list/", { isBearer: false }),
  getVendorsForEntityInKU: (
    params?: GetAllVendorsForEntity
  ): Promise<GetAllVendorsForEntityReturnData> =>
    $Get("api/vendor_filter/", { params, isBearer: false }),
  getVendorDetail: (data: IVendorId): Promise<IVendorFull> =>
    $Get(`api/vendor_detail/${data.vendor_id}/`, { data, isBearer: false }),
};

export const PRODUCT = {
  getProductsList: (
    params?: GetAllProducts
  ): Promise<GetAllProductsReturnData> =>
    $Get("api/product_list", { params, isBearer: false }),
};

export const KU = {
  getKuList: (params: GetAllKus): Promise<GetAllKusReturnData> =>
    $Get("api/ku_list/", { params, isBearer: false }),
  getKuIdList: (params: GetAllKu_Id): Promise<GetAllKu_IdReturnData> =>
    $Get("api/ku_list/", { params, isBearer: false }),
  postKu: (data: IKuPost): Promise<IKuList> =>
    $Post("api/ku_create/", { data, isBearer: false }),
  deleteKu: (data: IKuId) =>
    $Delete(`api/ku_detail/${data.ku_id}`, { data, isBearer: false }),
  updateKu: (data: IKuUpdate) =>
    $Put(`api/ku_detail/${data.ku_id}/`, { data, isBearer: false }),
  getInfoKu: (data: IKuId): Promise<IKuList> =>
    $Get(`api/ku_detail/${data.ku_id}/`, { data, isBearer: false }),

  postKuInRequirement: (data: IRequirementPost): Promise<IRequirementPost> =>
    $Post("api/included_condition_create/", { data, isBearer: false }),
  postKuExRequirement: (data: IRequirementPost): Promise<IRequirementPost> =>
    $Post("api/excluded_condition_create/", { data, isBearer: false }),
  postKuRequirementBonus: (data: IPercentPost): Promise<IPercentPost> =>
    $Post("api/bonus_condition/", { data, isBearer: false }),
  postKuExInvoices: (data: IExInvoiceForKuPost): Promise<IExInvoiceForKuPost> =>
    $Post("api/excluded_venddoc_create/", { data, isBearer: false }),
  postKuManager: (data: IManagerForKuPost): Promise<IManagerForKuPost> =>
    $Post("api/manager_create/", { data, isBearer: false }),
  postKuOfficial: (data: IOfficialForKuPost): Promise<IOfficialForKuPost> =>
    $Post("api/official_create/", { data, isBearer: false }),
  postKuContractCreate: (data: IContractPost): Promise<IContractPromise> =>
    $Post("api/name_contact_create/", { data, isBearer: false }),

  getKuInRequirements: (params: GetParamKuId): Promise<GetRequirementReturnData> =>
    $Get(`api/included_condition_list/`, { params, isBearer: false }),
  getKuExRequirements: (params: GetParamKuId): Promise<GetRequirementReturnData> =>
    $Get(`api/excluded_condition_list/`, { params, isBearer: false }),
  getKuRequirementBonus: (params: GetParamKuId): Promise<GetPersentReturnData> =>
    $Get(`api/bonus_condition/`, { params, isBearer: false }),
  getKuExInvoiceForKuId: (params: GetParamExInvoicesForKu): Promise<GetExInvoicesForKuReturnData> =>
    $Get(`api/excluded_venddoc_create/`, { params, isBearer: false }),
  getKuOfficial: (params: GetParamKuId): Promise<GetAllOfficialReturnData> =>
    $Get(`api/official_create/`, { params, isBearer: false }),


  deleteInRequirement: (data: IRequirementId) =>
    $Delete(`api/included_condition_detail/${data.in_prod_id}/`, { data, isBearer: false }),
  getInvoicesList: (
    params?: GetParamExInvoicesForKu
  ): Promise<GetExInvoicesForKuReturnData> =>
    $Get("api/vend_doc_list", { params, isBearer: false }),
  deleteGraphRow: (params: IKuDeleteGraph) =>
    $Delete("api/graph_list/", { params, isBearer: false }),
};

export const GRAPHIC = {
  getGraphic: (params?: GetAllGraphic): Promise<GetAllGraphicsReturnData> =>
    $Get("api/graph_list/", { params, isBearer: false }),
  postGraphic: (data: IKuPostGraphic): Promise<IKuPostGraphic> =>
    $Post("api/graph_create/", { data, isBearer: false }),
  deleteGraphic: (data: IGraphicId) =>
    $Delete(`api/graph_detail/${data.graph_id}/`, { data, isBearer: false }),
  getInfoGraphic: (data: IGraphicId): Promise<IGraphicInfo> =>
    $Get(`api/graph_detail/${data.graph_id}/`, { data, isBearer: false }),
  updateGraphic: (data: IGraphicInfo) =>
    $Put(`api/graph_detail/${data.graph_id}/`, { data, isBearer: false }),
  getInfoInvoicesForGraphic: (params: GetAllInvoicesAndProductForGraphic): Promise<GetAllInvoicesForGraphicReturnData> =>
    $Get("api/included_invoice_list/", { params, isBearer: false }),
  getInfoProductsForGraphic: (params: GetAllInvoicesAndProductForGraphic): Promise<GetAllProductsForGraphicReturnData> =>
    $Get("api/included_product_list/", { params, isBearer: false }),

};

export const PRODUCER = {
  getProducer: (params?: GetAllProducer): Promise<GetAllProducersReturnData> =>
    $Get("api/brand_list/", { params, isBearer: false }),
};

export const BRAND = {
  getBrand: (params?: GetAllBrands): Promise<GetAllBrandsReturnData> =>
    $Get("api/brand_list/", { params, isBearer: false }),
};

export const CATEGORY = {
  getCategory: (data: ITree): Promise<ITree> =>
    $Get("api/classifier_tree/", { data, isBearer: false }),
  getCategory2: (params: GetAllCategory): Promise<ITree> =>
    $Get("api/classifier_tree/", { params, isBearer: false }),
};
