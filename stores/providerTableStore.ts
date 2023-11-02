import { defineStore } from "pinia";

interface IProvider {
  id: number;
  score: number | null;
  name: string;
  nameEntity: string;
}

export const useProviderTableStore = defineStore("ProviderTableStore", {
  state: () => ({
    multipleSelection: [] as IProvider[],
    search: "",
    tableData: [] as IProvider[],
    multipleTableRef: null as Ref | null,
    dialogFormVisible: false,
  }),

  getters: {
    searchTableData: (state) => {
      const searchValue = state.search.toLowerCase();
      return state.tableData.filter((item) => {
        const nameMatch = item.name.toLowerCase().includes(searchValue);
        const nameEntityMatch = item.nameEntity
          .toLowerCase()
          .includes(searchValue);
        return nameMatch || nameEntityMatch;
      });
    },
  },

  actions: {
    setMultipleTableRef(ref: Ref) {
      this.multipleTableRef = ref;
    },

    toggleSelection(rows?: IProvider[]) {
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
    handleSelectionChange(val: IProvider[]) {
      this.multipleSelection = val;
    },

    addRows(row: {
      id: number;
      score: number | null;
      name: string;
      nameEntity: string;
    }) {
      this.tableData.push(row);
    },

    deleteSelectedRows() {
      const selectedRows = this.multipleSelection;

      this.tableData = this.tableData.filter((row: IProvider) => {
        return !selectedRows.includes(row);
      });

      this.multipleSelection = [];
    },
  },
});
