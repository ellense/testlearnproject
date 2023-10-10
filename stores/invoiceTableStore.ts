import { defineStore } from "pinia";

interface IInvoice {
  id: number;
  number: number| null;
  summa: number | null;
  date: Date;
  nameProvider: string;
}

export const useInvoiceTableStore = defineStore("InvoiceTableStore", {
  state: () => ({
    newId: 0,
    newNumber: null,
    newSum: null,
    newDate: new Date(""),
    ProviderName: "",
    multipleSelection: [] as IInvoice[],
    search: "",
    tableData: [] as IInvoice[],
    multipleTableRef: null as Ref | null,
  }),

  getters: {
    filteredTableData: (state) => {
      const searchValue = state.search.toLowerCase();
      return state.tableData.filter((item) => {
        const dateMatch = item.date
          .toString()
          .toLowerCase()
          .includes(searchValue);
        const nameProviderMatch = item.nameProvider
          .toLowerCase()
          .includes(searchValue);

        return  dateMatch || nameProviderMatch;
      });
    },
  },

  actions: {
    setMultipleTableRef(ref: Ref) {
      this.multipleTableRef = ref;
    },

    toggleSelection(rows?: IInvoice[]) {
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
    handleSelectionChange(val: IInvoice[]) {
      this.multipleSelection = val;
    },

    addRows() {
      this.tableData.push({
        id: this.tableData.length + 1,
        number: this.newNumber,
        summa: this.newSum,
        date: this.newDate,
        nameProvider: this.ProviderName,
      });
      this.newNumber = null;
      this.newSum = null;
      this.newDate = new Date("");
      this.ProviderName = "";
    },

    deleteSelectedRows() {
      const selectedRows = this.multipleSelection;

      this.tableData = this.tableData.filter((row: IInvoice) => {
        return !selectedRows.includes(row);
      });

      this.multipleSelection = [];
    },
    initializeTableData() {
      if (this.tableData.length === 0) {
        // Добавьте две сущности при инициализации стора
        this.tableData.push({
          id: 1,
          number: 347568679,
          summa: 43643626,
          date: new Date("2023,9,21"),
          nameProvider: "Minni",
        });
        this.tableData.push({
          id: 2,
          number: 78453234,
          summa: 46533,
          date: new Date("2021,8,18"),
          nameProvider: "Minni",
        });
      }
    },
  },
});
