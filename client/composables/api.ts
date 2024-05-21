import type { GetAllInvoicesAndProductForGraphic, GetAllInvoicesForGraphicReturnData, GetAllProductsForGraphicReturnData, IGraphicNumeralsAndSumQty } from "~/utils/types/actTypes";
import type { GetUserData } from "~/utils/types/authTypes";
import type { GetAllBrands, GetAllBrandsReturnData } from "~/utils/types/brandTypes";
import type { IParamCustomers, ICustomerReturnData, IParamCustomersKU, ICustomerForEntityReturnData } from "~/utils/types/customerTypes";
import type { IParamEntities, IEntity, IEntityInKu, EntityId, IEntityFull } from "~/utils/types/entityTypes";
import type { GetAllGraphic, GetAllGraphicsReturnData, IGraphicId, IGraphicInfo } from "~/utils/types/graphicVendorTypes";
import type { IParamInvoices, IInvoicesReturnData } from "~/utils/types/invoiceTypes";
import type { IParamKusC, IKusCReturnData, IKuCList, IKuCPost } from "~/utils/types/kuCustomerTypes";
import type { IParamKus, IKusReturnData, IParamKu_Id, IKu_IdReturnData, IKuPost, IKuList, IKuId, IKuUpdate, IKuDeleteGraph, IKuPostGraphic } from "~/utils/types/kuVendorTypes";
import type { GetAllProducer, GetAllProducersReturnData } from "~/utils/types/producerTypes";
import type { GetAllProducts, GetAllProductsReturnData } from "~/utils/types/productTypes";
import type { IParamServices, IServicesReturnData, IPlaceReturnData, IPricelistReturnData, IArticleReturnData, IService, IArticle } from "~/utils/types/serviceTypes";
import type { IRequirementPost, IPercentPost, IVACPost, IExInvoiceForKuPost, IManagerForKuPost, IOfficialForKuPost, IContractPost, IContractPromise, IParamKuId, IRequirementReturnData, GetPersentReturnData, GetVACReturnData, IManagersReturnData, GetParamExInvoicesForKu, GetExInvoicesForKuReturnData, GetAllOfficialReturnData, IRequirementId, IOfficialForKu, IParamManagers, IServicesPost, GetAllServiceReturnData } from "~/utils/types/tabsKuTypes";
import type { ITree, GetAllCategory } from "~/utils/types/treeTypes";
import type { IParamVendors, IVendorsReturnData, IParamVendorsForEntityInVendor, IVendorsForEntityInVendorReturnData, IVendorId, IParamVendorsForEntity, IVendorsForEntityReturnData, IVendorFull } from "~/utils/types/vendorTypes";

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
export const CUSTOMER = {
  getCustomersList: (params?: IParamCustomers): Promise<ICustomerReturnData> =>
    $Get("api/customer_list/", { params, isBearer: false }),
  getCustomersForEntityInKU: (
    params?: IParamCustomersKU
  ): Promise<ICustomerForEntityReturnData> =>
    $Get("api/customer_list/", { params, isBearer: false }),
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
  postKuVAC: (data: IVACPost): Promise<IVACPost> =>
    $Post("api/VAC/", { data, isBearer: false }),
  postKuExInvoices: (data: IExInvoiceForKuPost): Promise<IExInvoiceForKuPost> =>
    $Post("api/excluded_venddoc_list_create/", { data, isBearer: false }),
  postKuManager: (data: IManagerForKuPost): Promise<IManagerForKuPost> =>
    $Post("api/manager_ku/", { data, isBearer: false }),
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
  getKuExRequirements: (params: IParamKuId): Promise<IRequirementReturnData> =>
    $Get(`api/excluded_condition_list/`, { params, isBearer: false }),
  getKuRequirementBonus: (params: IParamKuId): Promise<GetPersentReturnData> =>
    $Get(`api/bonus_condition/`, { params, isBearer: false }),
  getKuVAC: (params: IParamKuId): Promise<GetVACReturnData> =>
    $Get(`api/VAC/`, { params, isBearer: false }),
  getKuManager: (params: IParamKuId): Promise<IManagersReturnData> =>
    $Get(`api/manager_ku/`, { params, isBearer: false }),
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
    $Delete(`api/included_condition_detail/${data.id}/`, { data, isBearer: false }),
  deleteExRequirement: (data: IRequirementId) =>
    $Delete(`api/excluded_condition_detail/${data.id}/`, { data, isBearer: false }),
  deleteRequirementBonus: (data: IRequirementId) =>
    $Delete(`api/bonus_condition_detail/${data.id}/`, { data, isBearer: false }),
  deleteVAC: (data: IRequirementId) =>
    $Delete(`api/VAC_detail/${data.id}/`, { data, isBearer: false }),
  deleteExInvoiceForKuId: (data: IRequirementId) =>
    $Delete(`api/excluded_venddoc_detail/${data.id}/`, { data, isBearer: false }),
  deleteManager: (data: IRequirementId) =>
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

export const MANAGER = {
  getManager: (params?: IParamManagers): Promise<IManagersReturnData> =>
    $Get("api/manager_list/", { params, isBearer: false }),
};

export const CATEGORY = {
  getCategory: (data: ITree): Promise<ITree> =>
    $Get("api/classifier_tree/", { data, isBearer: false }),
  getCategory2: (params: GetAllCategory): Promise<ITree> =>
    $Get("api/classifier_tree/", { params, isBearer: false }),
};

export const SERVICE = {
  getServiceList: (params?: IParamServices): Promise<IServicesReturnData> =>
    $Get("api/service_list/", { params, isBearer: false }),
  getPlaceList: (params?: IParamServices): Promise<IPlaceReturnData> =>
    $Get("api/place_service_list/", { params, isBearer: false }),
  getPricelistList: (params?: IParamServices): Promise<IPricelistReturnData> =>
    $Get("api/price_list/", { params, isBearer: false }),
  getArticleList: (params?: IParamServices): Promise<IArticleReturnData> =>
    $Get("api/article_list/", { params, isBearer: false }),

  postServices: (data: IService): Promise<IService> =>
    $Post("api/service_list/", { data, isBearer: false }),
  postArticles: (data: IArticle): Promise<IArticle> =>
    $Post("api/article_list/", { data, isBearer: false }),
};

export const KUC = {
  getKuList: (params: IParamKusC): Promise<IKusCReturnData> =>
    $Get("api/ku_customer_list/", { params, isBearer: false }),
  getKuIdList: (params: IParamKu_Id): Promise<IKu_IdReturnData> =>
    $Get("api/ku_customer_list/", { params, isBearer: false }),
  getInfoKu: (data: IKuId): Promise<IKuCList> =>
    $Get(`api/ku_customer_detail/${data.ku_id}/`, { data, isBearer: false }),

  //отправление
  postKu: (data: IKuCPost): Promise<IKuCList> =>
    $Post("api/ku_customer_create/", { data, isBearer: false }),
  postKuServices: (data: IServicesPost): Promise<IServicesPost> =>
    $Post("api/included_service_list/", { data, isBearer: false }),
  postKuManager: (data: IManagerForKuPost): Promise<IManagerForKuPost> =>
    $Post("api/manager_ku_customer/", { data, isBearer: false }),
  postKuOfficial: (data: IOfficialForKuPost): Promise<IOfficialForKuPost> =>
    $Post("api/official_customer_create/", { data, isBearer: false }),
  postKuContractCreate: (data: IContractPost): Promise<IContractPromise> =>
    $Post("api/name_contact_create/", { data, isBearer: false }),
  //для получения в ku_id
  getKuService: (params: IParamKuId): Promise<GetAllServiceReturnData> =>
    $Get(`api/included_service_list/`, { params, isBearer: false }),
  getKuVAC: (params: IParamKuId): Promise<GetVACReturnData> =>
    $Get(`api/VAC/`, { params, isBearer: false }),
  getKuManager: (params: IParamKuId): Promise<IManagersReturnData> =>
    $Get(`api/manager_ku_customer/`, { params, isBearer: false }),
  getKuOfficial: (params: IParamKuId): Promise<GetAllOfficialReturnData> =>
    $Get(`api/official_create/`, { params, isBearer: false }),
  //для изменения
  deleteManager: (data: IRequirementId) =>
    $Delete(`api/manager_customer_detail/${data.id}/`, { data, isBearer: false }),
  updateOfficial: (data: IOfficialForKu) =>
    $Put(`api/official_customer_detail/${data.id}/`, { data, isBearer: false }),

};
export const GRAPHICC = {
  getGraphic: (params?: GetAllGraphic): Promise<GetAllGraphicsReturnData> =>
    $Get("api/graph_customer_list/", { params, isBearer: false }),
};