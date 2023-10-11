import { defineStore } from "pinia";

interface IKu {
  name: string;
  id: number;
  kuNumber: string;
}

export const useKuTableStore = defineStore("KuTableStore", {
  state: () => ({
    newName: "",
    newId: 0,
    multipleSelection: [] as IKu[],
    search: "",
    tableData: [] as IKu[],
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

    toggleSelection(evt: MouseEvent, rows?: IKu[] | undefined) {
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
    handleSelectionChange(val: IKu[]) {
      this.multipleSelection = val;
    },

    addItem() {
      const paddedId = String(this.tableData.length + 1).padStart(5, "0");
      this.tableData.push({
        name: this.newName,
        id: this.tableData.length + 1,
        kuNumber: `КУ${paddedId}`,
      });
      this.newName = "";
    },

    deleteSelectedRows() {
      const selectedRows = this.multipleSelection;

      this.tableData = this.tableData.filter((row: IKu) => {
        return !selectedRows.includes(row);
      });

      this.multipleSelection = [];
    },
    initializeTableData() {
      if (this.tableData.length === 0) {
        this.tableData.push({ name: "Tom", id: 1, kuNumber: "КУ00001" });
        this.tableData.push({ name: "Jerry", id: 2, kuNumber: "КУ00002" });
      }
    },
  },
});
