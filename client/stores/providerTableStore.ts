import { version } from "nuxt/dist/app/compat/capi";
import { defineStore } from "pinia";
import type { IVendor } from "~/utils/types/directoryTypes";

export const useVendorTableStore = defineStore("ProviderTableStore", {
  state: () => ({
    multipleSelection: [] as IVendor[],
    search: "",
    VendorList: [] as IVendor[],
    multipleTableRef: null as Ref | null,
    dialogFormVisible: false,
  }),

  getters: {
    // searchVendorList: (state) => {
    //   const searchValue = state.search.toLowerCase();
    //   return state.VendorList.filter((item) => {
    //     const nameMatch = item.name.toLowerCase().includes(searchValue);
    //     const nameEntityMatch = item.nameEntity
    //       .toLowerCase()
    //       .includes(searchValue);
    //     return nameMatch || nameEntityMatch;
    //   });
    // },
    getVendorList: (state) => state.VendorList,
  },

  actions: {
    setMultipleTableRef(ref: Ref) {
      this.multipleTableRef = ref;
    },

    toggleSelection(rows?: IVendor[]) {
      if (this.multipleTableRef) {
        if (rows) {
          rows.forEach((row) => {
            this.multipleTableRef.value.toggleRowSelection(row, undefined);
          });
        } else {
          this.multipleTableRef.value.clearSelection();
        }
      }
    },
    handleSelectionChange(val: IVendor[]) {
      this.multipleSelection = val;
    },

    // addRows(row: {
    //   vendorid: string;
    //   name: string;
    //   urasticname: string;
    //   directorname: string;
    //   urasticadress: string;
    //   inn_kpp: string;
    //   entityid: string;
    // }) {
    //   this.VendorList.push(row);
    // },
    async fetchVendorsList(data: IVendor) {
      try {
        const result = await VENDOR.getVendorsList(data);
  
        if (Array.isArray(result)) {
          // Если данные успешно получены и являются массивом, обновляем entityList в сторе
          this.VendorList = result;
        } else {
          // Если result не является массивом или равен null, обновляем entityList пустым массивом
          this.VendorList = [];
          console.error("Данные не получены или не являются массивом");
        }
      } catch (error) {
        console.error("Произошла ошибка", error);
      }
    },
    deleteSelectedRows() {
      const selectedRows = this.multipleSelection;

      this.VendorList = this.VendorList.filter((row: IVendor) => {
        return !selectedRows.includes(row);
      });

      this.multipleSelection = [];
    },
  },
});
