import { defineStore } from "pinia";

interface IProvider {
  id: number;
  score: string;
  name: string;
  nameEntity: string;
}

export const useProviderTableStore = defineStore("ProviderTableStore", {
  state: () => ({
    newId: 0,
    newScore: "",
    newName: "",
    EntityName: "",
    multipleSelection: [] as IProvider[],
    search: "",
    tableData: [] as IProvider[],
    multipleTableRef: null as Ref | null, 
  }),

  getters: {
    filteredTableData: (state) => {
      const searchValue = state.search.toLowerCase();
      return state.tableData.filter((item) =>
        item.name.toLowerCase().includes(searchValue)
      );
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

    addRows() {
      this.tableData.push({
        id: this.tableData.length + 1,
        score: this.newScore,
        name: this.newName,
        nameEntity: this.EntityName,
      });
      this.newScore = "";
      this.newName = "";
      this.EntityName = "";
    },

    deleteSelectedRows() {
      const selectedRows = this.multipleSelection;

      this.tableData = this.tableData.filter((row: IProvider) => {
        return !selectedRows.includes(row);
      });

      this.multipleSelection = [];
    },
    initializeTableData() {
      if (this.tableData.length === 0) {
        // Добавьте две сущности при инициализации стора
        this.tableData.push({
          id: 1,
          score: "5475682-89",
          name: "Mikki",
          nameEntity: "Jerry",
        });
        this.tableData.push({
          id: 2,
          score: "5475682-89",
          name: "Minni",
          nameEntity: "Tom",
        });
      }
    },
  },
});
