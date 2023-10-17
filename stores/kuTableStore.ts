import { defineStore } from "pinia";

interface IKu {
  id: number;
  kuNumber: string;
  percent: number | null;
  provider: string;
  type: string;
  dateStart: Date | string;
  dateEnd: Date | string;
  dateActual: Date | string;
}

export const useKuTableStore = defineStore("KuTableStore", {
  state: () => ({
    newId: 0,
    newPercent: null,
    newType: '',
    providerName: "",
    newDateStart: new Date(),
    newDateEnd: new Date(),
    newDateActual: new Date(),
    multipleSelection: [] as IKu[],
    search: "",
    tableData: [] as IKu[],
    multipleTableRef: null as Ref | null, 
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
        type: this.newType,
        dateStart: this.newDateStart,
        dateEnd: this.newDateEnd,
        dateActual: this.newDateActual,
      });
      this.newPercent = null;
      this.providerName = "";
      this.newType = "";
      this.newDateStart = new Date();
      this.newDateEnd = new Date();
      this.newDateActual = new Date();
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
          type: "Месяц",
          dateStart: "2023/9/21",
          dateEnd: "2029/9/21",
          dateActual: "2024/9/21",
        });
        this.tableData.push({
          id: 2,
          kuNumber: "КУ00002",
          percent: 15,
          provider: "Mikki",
          type: "Квартал",
          dateStart: "2023/10/15",
          dateEnd: "2029/10/25",
          dateActual: "2024/9/09",
        });
      }
    },
  },
});
