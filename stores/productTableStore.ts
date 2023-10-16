import { defineStore } from "pinia";
interface IProduct {
  id: number;
  name: string;
  nameProvider: string;
  category: string;
}

export const useProductTableStore = defineStore("ProductTableStore", {
  state: () => ({
    multipleSelection: [] as IProduct[],
    search: "",
    tableData: [] as IProduct[],
    multipleTableRef: null as Ref | null,
  }),

  getters: {
    searchTableData: (state) => {
      const searchValue = state.search.toLowerCase();
      return state.tableData.filter((item) => {
        const nameMatch = item.name.toLowerCase().includes(searchValue);
        const categoryMatch = item.category.toLowerCase().includes(searchValue);
        const nameProviderMatch = item.nameProvider
          .toLowerCase()
          .includes(searchValue);
        return nameMatch || categoryMatch || nameProviderMatch;
      });
    },
  },

  actions: {
    setMultipleTableRef(ref: Ref) {
      this.multipleTableRef = ref;
    },

    toggleSelection(rows?: IProduct[]) {
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
    handleSelectionChange(val: IProduct[]) {
      this.multipleSelection = val;
    },

    addRows(row: {
      id: number;
      name: string;
      nameProvider: string;
      category: string;
    }) {
      this.tableData.push(row);
    },

    deleteSelectedRows() {
      const selectedRows = this.multipleSelection;

      this.tableData = this.tableData.filter((row: IProduct) => {
        return !selectedRows.includes(row);
      });

      this.multipleSelection = [];
    },
  },
});
