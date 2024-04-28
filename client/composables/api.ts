import type { GetUserData } from "~/utils/types/authTypes";
import type {
  IEntity,
  IEntityInKu,
  IKuPost,
  IKuId,
  IParamInvoices,
  IInvoicesReturnData,
  GetAllProducts,
  GetAllProductsReturnData,
  IParamVendors,
  IVendorsReturnData,
  IParamVendorsForEntity,
  IVendorsForEntityReturnData,
  GetAllBrandsReturnData,
  GetAllBrands,
  GetAllProducer,
  GetAllProducersReturnData,
  IParamVendorsForEntityInVendor,
  IVendorsForEntityInVendorReturnData,
  EntityId,
  IParamEntities,
  IKuPostGraphic,
  GetAllGraphic,
  GetAllGraphicsReturnData,
  IGraphicId,
  IKuDeleteGraph,
  IVendorId,
  IKusReturnData,
  IParamKus,
  IParamKu_Id,
  IKu_IdReturnData,
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
  IParamKuId,
  IRequirementPost,
  IRequirementReturnData,
  IContractPost,
  IContractPromise,
  IRequirementId,
  IGraphicNumeralsAndSumQty,
  IRequirementId2,
  IRequirementReturnData2,
  IOfficialForKu,
  IParamServices,
  IServicesReturnData,
  IPlaceReturnData,
  IPricelistReturnData,
  IArticleReturnData,
  IKuCPost,
  IParamKusC,
  IKusCReturnData,
  IKuCList,
  IServicesPost,
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
    params?: IParamInvoices
  ): Promise<IInvoicesReturnData> =>
    $Get("api/vend_doc_list", { params, isBearer: false }),
};
export const ENTITY = {
  getEntitiesList: (params: IParamEntities): Promise<IEntity> =>
    $Get("api/entity_list/", { params, isBearer: false }),
  getEntityByIdAndName: (data: IEntityInKu): Promise<IEntityInKu[]> =>
    $Get("api/entity_list/", { data, isBearer: false }),
  getEntityById: (): Promise<EntityId[]> =>
    $Get("api/entity_list/", { isBearer: false }),
  getEntityDetail: (data: EntityId): Promise<IEntityFull> =>
    $Get(`api/entity_detail/${data.entity_id}/`, { data, isBearer: false }),
};

export const VENDOR = {
  getVendorsList: (params?: IParamVendors): Promise<IVendorsReturnData> =>
    $Get("api/vendor_list/", { params, isBearer: false }),
  getVendorsForEntityInVendor: (
    params?: IParamVendorsForEntityInVendor
  ): Promise<IVendorsForEntityInVendorReturnData> =>
    $Get("api/vendor_list/", { params, isBearer: false }),
  getVendorById: (): Promise<IVendorId[]> =>
    $Get("api/vendor_list/", { isBearer: false }),
  getVendorsForEntityInKU: (
    params?: IParamVendorsForEntity
  ): Promise<IVendorsForEntityReturnData> =>
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
  getKuList: (params: IParamKus): Promise<IKusReturnData> =>
    $Get("api/ku_list/", { params, isBearer: false }),
  getKuIdList: (params: IParamKu_Id): Promise<IKu_IdReturnData> =>
    $Get("api/ku_list/", { params, isBearer: false }),
  postKu: (data: IKuPost): Promise<IKuList> =>
    $Post("api/ku_create/", { data, isBearer: false }),
  deleteKu: (data: IKuId) =>
    $Delete(`api/ku_detail/${data.ku_id}`, { data, isBearer: false }),
  updateKu: (data: IKuUpdate) =>
    $Put(`api/ku_detail/${data.ku_id}/`, { data, isBearer: false }),
  getInfoKu: (data: IKuId): Promise<IKuList> =>
    $Get(`api/ku_detail/${data.ku_id}/`, { data, isBearer: false }),
  //отправление
  postKuInRequirement: (data: IRequirementPost): Promise<IRequirementPost> =>
    $Post("api/included_condition_create/", { data, isBearer: false }),
  postKuExRequirement: (data: IRequirementPost): Promise<IRequirementPost> =>
    $Post("api/excluded_condition_create/", { data, isBearer: false }),
  postKuRequirementBonus: (data: IPercentPost): Promise<IPercentPost> =>
    $Post("api/bonus_condition/", { data, isBearer: false }),
  postKuExInvoices: (data: IExInvoiceForKuPost): Promise<IExInvoiceForKuPost> =>
    $Post("api/excluded_venddoc_list_create/", { data, isBearer: false }),
  postKuManager: (data: IManagerForKuPost): Promise<IManagerForKuPost> =>
    $Post("api/manager_create/", { data, isBearer: false }),
  postKuOfficial: (data: IOfficialForKuPost): Promise<IOfficialForKuPost> =>
    $Post("api/official_create/", { data, isBearer: false }),
  postKuContractCreate: (data: IContractPost): Promise<IContractPromise> =>
    $Post("api/name_contact_create/", { data, isBearer: false }),
  postKuInRequirementChange: (data: IRequirementPost): Promise<IRequirementPost> =>
    $Post("api/included_condition_list/", { data, isBearer: false }),
  postKuExRequirementChange: (data: IRequirementPost): Promise<IRequirementPost> =>
    $Post("api/excluded_condition_list/", { data, isBearer: false }),
  //получение
  getKuInRequirements: (params: IParamKuId): Promise<IRequirementReturnData> =>
    $Get(`api/included_condition_list/`, { params, isBearer: false }),
  getKuExRequirements: (params: IParamKuId): Promise<IRequirementReturnData2> =>
    $Get(`api/excluded_condition_list/`, { params, isBearer: false }),
  getKuRequirementBonus: (params: IParamKuId): Promise<GetPersentReturnData> =>
    $Get(`api/bonus_condition/`, { params, isBearer: false }),
  // getKuExInvoiceForKuId: (params: GetParamExInvoicesForKu): Promise<GetExInvoicesForKuReturnData> =>
  //   $Get(`api/excluded_venddoc_list_create/`, { params, isBearer: false }),
  getKuExInvoiceForKuId: (params: GetParamExInvoicesForKu): Promise<GetExInvoicesForKuReturnData> =>
    $Get(`api/excluded_venddoc_list_full/`, { params, isBearer: false }),
  getKuOfficial: (params: IParamKuId): Promise<GetAllOfficialReturnData> =>
    $Get(`api/official_create/`, { params, isBearer: false }),
  getInvoicesList: (
    params?: GetParamExInvoicesForKu
  ): Promise<GetExInvoicesForKuReturnData> =>
    $Get("api/vend_doc_list", { params, isBearer: false }),
  // для редактирования
  deleteInRequirement: (data: IRequirementId) =>
    $Delete(`api/included_condition_detail/${data.in_prod_id}/`, { data, isBearer: false }),
  deleteExRequirement: (data: IRequirementId2) =>
    $Delete(`api/excluded_condition_detail/${data.id}/`, { data, isBearer: false }),
  deleteRequirementBonus: (data: IRequirementId2) =>
    $Delete(`api/bonus_condition_detail/${data.id}/`, { data, isBearer: false }),
  deleteExInvoiceForKuId: (data: IRequirementId2) =>
    $Delete(`api/excluded_venddoc_detail/${data.id}/`, { data, isBearer: false }),
  deleteManager: (data: IRequirementId2) =>
    $Delete(`api/manager_detail/${data.id}/`, { data, isBearer: false }),
  updateOfficial: (data: IOfficialForKu) =>
    $Put(`api/official_detail/${data.id}/`, { data, isBearer: false }),

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
  getNumeralsGraphic: (data: IGraphicId): Promise<IGraphicNumeralsAndSumQty> =>
    $Get(`api/graph_words/${data.graph_id}/`, { data, isBearer: false }),
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

export const SERVICE = {
  getServiceList: (params?: IParamServices): Promise<IServicesReturnData> =>
    $Get("api/vendor_list/", { params, isBearer: false }),
  getPlaceList: (params?: IParamServices): Promise<IPlaceReturnData> =>
    $Get("api/vendor_list/", { params, isBearer: false }),
  getPricelistList: (params?: IParamServices): Promise<IPricelistReturnData> =>
    $Get("api/vendor_list/", { params, isBearer: false }),
  getArticleList: (params?: IParamServices): Promise<IArticleReturnData> =>
    $Get("api/vendor_list/", { params, isBearer: false }),
  // getVendorsForEntityInVendor: (
  //   params?: IParamVendorsForEntityInVendor
  // ): Promise<IVendorsForEntityInVendorReturnData> =>
  //   $Get("api/vendor_list/", { params, isBearer: false }),
  // getVendorById: (): Promise<IVendorId[]> =>
  //   $Get("api/vendor_list/", { isBearer: false }),
  // getVendorsForEntityInKU: (
  //   params?: IParamVendorsForEntity
  // ): Promise<IVendorsForEntityReturnData> =>
  //   $Get("api/vendor_filter/", { params, isBearer: false }),
  // getVendorDetail: (data: IVendorId): Promise<IVendorFull> =>
  //   $Get(`api/vendor_detail/${data.vendor_id}/`, { data, isBearer: false }),
};

export const KUC = {
  getKuList: (params: IParamKusC): Promise<IKusCReturnData> =>
    $Get("api/ku_list/", { params, isBearer: false }),

  //отправление
  postKu: (data: IKuCPost): Promise<IKuCList> =>
    $Post("api/ku_create/", { data, isBearer: false }),
  postKuServices: (data: IServicesPost): Promise<IServicesPost> =>
    $Post("api/included_condition_create/", { data, isBearer: false }),
  postKuExInvoices: (data: IExInvoiceForKuPost): Promise<IExInvoiceForKuPost> =>
    $Post("api/excluded_venddoc_list_create/", { data, isBearer: false }),
  postKuManager: (data: IManagerForKuPost): Promise<IManagerForKuPost> =>
    $Post("api/manager_create/", { data, isBearer: false }),
  postKuOfficial: (data: IOfficialForKuPost): Promise<IOfficialForKuPost> =>
    $Post("api/official_create/", { data, isBearer: false }),
  postKuContractCreate: (data: IContractPost): Promise<IContractPromise> =>
    $Post("api/name_contact_create/", { data, isBearer: false }),
  
};