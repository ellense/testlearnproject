import { defineStore } from "pinia";

interface IProduct {
  id: number;
  name: string;
  nameProvider: string;
  category: string;
}

export const useProductTableStore = defineStore("ProductTableStore", {
  state: () => ({
    newId: 0,
    newName: "",
    ProviderName: "",
    newCategory: "",
    multipleSelection: [] as IProduct[],
    search: "",
    tableData: [] as IProduct[],
    multipleTableRef: null as Ref | null, // Добавляем Ref для multipleTableRef
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

    addRows() {
      this.tableData.push({
        id: this.tableData.length + 1,
        name: this.newName,
        nameProvider: this.ProviderName,
        category: this.newCategory,
      });
      this.newName = "";
      this.ProviderName = "";
      this.newCategory = "";
    },

    deleteSelectedRows() {
      const selectedRows = this.multipleSelection;

      this.tableData = this.tableData.filter((row: IProduct) => {
        return !selectedRows.includes(row);
      });

      this.multipleSelection = [];
    },
    initializeTableData() {
      if (this.tableData.length === 0) {
        // Добавляем две сущности при инициализации стора
        this.tableData.push({
          id: 1,
          name: "Футболка жен.",
          nameProvider: "Mikki",
          category: "Женская одежда",
        });
        this.tableData.push({
          id: 2,
          name: "Набор тарелок",
          nameProvider: "Minni",
          category: "Посуда",
        });
      }
    },
  },
});
