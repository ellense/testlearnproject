import { defineStore } from "pinia";
import type { IKu, IGraphic } from "~/utils/types/directoryTypes";

export const useKuTableStore = defineStore("KuTableStore", {
  state: () => ({
    newId: 0,
    newPercent: null,
    newType: "",
    providerName: "",
    newDateStart: new Date(),
    newDateEnd: new Date(),
    newDateActual: new Date(),
    multipleSelection: [] as IKu[],
    search: "",
    tableData: [] as IKu[],
    tableDataGraphic: [] as IGraphic[],
    multipleTableRef: null as Ref | null,
    percent: 0,
    provider: "",
    kuNumber: "",
    dialogFormVisible: false,
  }),

  getters: {
    filteredTableData: (state) => {
      const searchValue = state.search.toLowerCase();
      return state.tableData.filter(
        (item: { vendor: string; ku_id: string; period: string }) => {
          const nameProviderMatch = item.vendor
            .toLowerCase()
            .includes(searchValue);
          const kunumberMatch = item.ku_id
            .toLowerCase()
            .includes(searchValue);
          const typeMatch = item.period.toLowerCase().includes(searchValue);
          return typeMatch || kunumberMatch || nameProviderMatch;
        }
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
      // const paddedId = String(this.tableData.length + 1).padStart(5, "0");
      this.tableData.push({
        ku_id: "56",
        vendor: this.providerName,
        period: this.newType,
        date_start: this.newDateStart,
        date_end: this.newDateEnd,
        status: "Создано",
      });
      this.newPercent = null;
      this.providerName = "";
      this.newType = "";
      this.newDateStart = new Date();
      this.newDateEnd = new Date();
      this.newDateActual = new Date();
    },
    

    addgraphic(row: {
      id: number;
      kuNumber: string;
      provider: string;
      type: string;
      dateStart: Date | string;
      dateEnd: Date | string;
      dateCalc: Date | string;
      percent: number | null;
      base: number | null;
      calculated: number | null;
      approved: number | null;
    }) {
      this.tableDataGraphic.push(row);
    },

    deleteSelectedRows() {
      const selectedRows = this.multipleSelection;

      this.tableData = this.tableData.filter((row: IKu) => {
        return !selectedRows.includes(row);
      });

      this.multipleSelection = [];
    },
  },
});
