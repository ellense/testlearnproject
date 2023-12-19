import { defineStore } from "pinia";
import type { IEntity } from "~/utils/types/directoryTypes";

export const useEntityTableStore = defineStore("EntityTableStore", {
  state: () => ({
    search: "",
    entityList: [] as IEntity[],
  }),

  getters: {
    searchEntityList: (state) => {
      const searchValue = state.search.toLowerCase();
      return state.entityList.filter((item) => {
        const entityidMatch = item.entityid.toLowerCase().includes(searchValue);
        const directornameMatch = item.directorname.toLowerCase().includes(searchValue);
        const nameMatch = item.name.toLowerCase().includes(searchValue);
        const urasticaddressMatch = item.urasticaddress.toLowerCase().includes(searchValue);
        const urasticnameMatch = item.urasticname.toLowerCase().includes(searchValue);
        return entityidMatch || directornameMatch || nameMatch || urasticaddressMatch || urasticnameMatch;
      });
    },
  },

  actions: {
    async fetchEntitiesList(data: IEntity) {
      try {
        const result = await ENTITY.getEntitiesList(data);
        const id = await ENTITY.getEntityNameById(data);
        if (Array.isArray(result)) {
          // Если данные успешно получены и являются массивом, обновляем entityList в сторе
          this.entityList = result;
          console.log(id?.entityid)
        } else {
          // Если result не является массивом или равен null, обновляем entityList пустым массивом
          this.entityList = [];
          console.error("Данные не получены или не являются массивом");
        }
      } catch (error) {
        console.error("Произошла ошибка", error);
      }
    },    
  },
});
