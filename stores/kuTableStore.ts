import { defineStore } from "pinia";

interface IKu {
  id: number;
  kuNumber: string;
  percent: number;
  provider: string;
}

export const useKuTableStore = defineStore("KuTableStore", {
  state: () => ({
    newId: 0,
    newPercent: 0,
    providerName: "",
    multipleSelection: [] as IKu[],
    search: "",
    tableData: [] as IKu[],
    multipleTableRef: null as Ref | null, // Добавляем Ref для multipleTableRef
    percent: 0,
    provider: "",
    kuNumber: "",
  }),

  getters: {
    filteredTableData: (state) => {
      const searchValue = state.search.toLowerCase();
      return state.tableData.filter((item) =>
        item.provider.toLowerCase().includes(searchValue)
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
        id: this.tableData.length + 1,
        kuNumber: `КУ${paddedId}`,
        percent: this.newPercent,
        provider: this.providerName,
      });
      this.newPercent = 0;
      this.providerName = "";
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
        // две сущности при инициализации стора
        this.tableData.push({
          id: 1,
          kuNumber: "КУ00001",
          percent: 10,
          provider: "Mikki",
        });
        this.tableData.push({
          id: 2,
          kuNumber: "КУ00002",
          percent: 15,
          provider: "Mikki",
        });
      }
    },
  },
});
