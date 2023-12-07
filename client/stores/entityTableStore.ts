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
        // Вызываем вашу функцию для получения данных
        const result = await ENTITY.getEntitiesList(data);

        // Если данные успешно получены, обновляем entityList в сторе
        if (result) {
          this.entityList = [result];
        } else {
          console.error("Ошибка получения данных");
        }
      } catch (error) {
        console.error("Произошла ошибка", error);
      }
    },
    addRows(row: { entityid: string; name: string }) {
      this.entityList.push(row);
    },
    deleteSelectedRows() {
      const selectedRows = this.multipleSelection;

      this.entityList = this.entityList.filter((row: IEntity) => {
        return !selectedRows.includes(row);
      });

      this.multipleSelection = [];
    },
  },
});
