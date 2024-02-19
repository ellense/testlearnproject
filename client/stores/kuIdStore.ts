import { defineStore } from "pinia";

import type {
    IKuList,
    IGraphic,
    IEntityIdAndName,
    IKuStore,
    EntityId,
    GetAllKus,
    GetAllGraphic,
    IKuId,
    GetAllKu_Id,
    GetAllProducer,
    IProducer,
    GetAllProducts,
    IProduct,
    GetAllBrands,
    IVendorIdAndName,
    IBrand,
    IKuIdStore
} from "~/utils/types/directoryTypes";

export const useKuIdStore = defineStore("KuIdStore", {
    state: (): IKuIdStore => ({
        //данные 
  brand: [],
  producer: [],
  product: [],
  tableDataRequirement: [],
  dataEntity: [],
  dataVendor: [],
  //v-model атрибутов
        kuIdPercent: null,
        kuIdType: "",
        kuIdEntityName: [],
        kuIdVendorName: "",
        kuIdDateStart: new Date(),
        kuIdDateEnd: new Date(),
        kuIdCategory_id: "",
        kuIdCategory_name: "",
        kuIdProducer_name: "",
        kuIdBrand_name: "",
        //v-model диалоговых форм
        dialogFormProductVisible: false,
        dialogFormCategoryVisible: false,
        //дизэйбл
        disableButtons: false,

        multipleSelectionProduct: [],
  multipleTableRef:null,

    }),

    getters: {
    },

    actions: {
        handleSelectionChangeProduct(val: IProduct[]) {
            this.multipleSelectionProduct = val;
          },
    }
})