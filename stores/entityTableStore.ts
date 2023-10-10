import { defineStore } from "pinia";

interface IEntity {
  name: string;
  id: number;
}

export const useEntityTableStore = defineStore("EntityTableStore", {
  state: () => ({
    newName: "",
    newId: 0,
    multipleSelection: [] as IEntity[],
    search: "",
    tableData: [] as IEntity[],
    multipleTableRef: null as Ref | null, // Добавляем Ref для multipleTableRef
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

    addItem() {
      this.tableData.push({
        name: this.newName,
        id: this.tableData.length + 1,
      });
      this.newName = "";
    },

    deleteSelectedRows() {
      const selectedRows = this.multipleSelection;

      this.tableData = this.tableData.filter((row: IEntity) => {
        return !selectedRows.includes(row);
      });

      this.multipleSelection = [];
    },
    initializeTableData() {
      if (this.tableData.length === 0) {
        // Добавьте две сущности при инициализации стора
        this.tableData.push({ name: "Tom", id: 1 });
        this.tableData.push({ name: "Jerry", id: 2 });
      }
    },
  },
});
