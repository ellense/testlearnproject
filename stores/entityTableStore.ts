import { defineStore } from "pinia";

interface IEntity {
  id: number;
  name: string;
}

export const useEntityTableStore = defineStore("EntityTableStore", {
  state: () => ({
    multipleSelection: [] as IEntity[],
    search: "",
    tableData: [] as IEntity[],
    multipleTableRef: null as Ref | null,
    dialogFormVisible: false,
  }),

  getters: {
    searchTableData: (state) => {
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

    toggleSelection(evt: MouseEvent, rows?: IEntity[] | undefined) {
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
    handleSelectionChange(val: IEntity[]) {
      this.multipleSelection = val;
    },

    addRows(row: { id: number; name: string }) {
      this.tableData.push(row);
    },
    deleteSelectedRows() {
      const selectedRows = this.multipleSelection;

      this.tableData = this.tableData.filter((row: IEntity) => {
        return !selectedRows.includes(row);
      });

      this.multipleSelection = [];
    },
  },
});
