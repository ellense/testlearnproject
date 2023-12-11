import { defineStore } from "pinia";
import type { IEntity } from "~/utils/types/directoryTypes";

export const useEntityTableStore = defineStore("EntityTableStore", {
  state: () => ({
    multipleSelection: [] as IEntity[],
    search: "",
    entityList: [] as IEntity[],
    multipleTableRef: null as Ref | null,
    dialogFormVisible: false,
  }),

  getters: {
    searchentityList: (state) => {
      const searchValue = state.search.toLowerCase();
      return state.entityList.filter((item) =>
        item.name.toLowerCase().includes(searchValue)
      );
    },
    getEntityList: (state) => state.entityList,
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
    async fetchEntitiesList(data: IEntity) {
      try {
        const result = await ENTITY.getEntitiesList(data);
  
        if (Array.isArray(result)) {
          // Если данные успешно получены и являются массивом, обновляем entityList в сторе
          this.entityList = result;
        } else {
          // Если result не является массивом или равен null, обновляем entityList пустым массивом
          this.entityList = [];
          console.error("Данные не получены или не являются массивом");
        }
      } catch (error) {
        console.error("Произошла ошибка", error);
      }
    },
    // addRows(row: { entityid: string;
    //   directorname: string;
    //   urasticname: string;
    //   name: string;
    //   urasticaddress: string; }) {
    //   this.entityList.push(row);
    // },
    deleteSelectedRows() {
      const selectedRows = this.multipleSelection;

      this.entityList = this.entityList.filter((row: IEntity) => {
        return !selectedRows.includes(row);
      });

      this.multipleSelection = [];
    },
  },
});
