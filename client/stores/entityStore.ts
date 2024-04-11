import { defineStore } from "pinia";
import type { IEntityStore, IParamEntities, } from "~/utils/types/directoryTypes";

export const useEntityStore = defineStore("IEntityStore", {
  state: (): IEntityStore => ({
    dataEntity: [],
    search: "",
    filterValue: {}
  }),

  getters: {
    getEntities: (state) => {
      console.log("getEntities getter:", state.dataEntity);
      return state.dataEntity;
    }
  },

  actions: {
    async performSearch(searchQuery: string) {
      try {
        console.log("Performing search with query:", searchQuery);
        this.setSearchQuery(searchQuery);
        await this.getEntityFromAPIWithFilter();
      } catch (error) {
        console.error('Ошибка при выполнении поиска', error);
      }
    },

    setSearchQuery(query: string) {
      this.$state.search = query;
    },

    setFilterValue<
      T extends keyof IParamEntities,
      U extends IParamEntities[T],
    >(field: T, value: U) {
      this.$state.filterValue[field] = value
    },
    async getEntityFromAPIWithFilter() {
      try {
        const result = await ENTITY.getEntitiesList({
          search: this.$state.search,
        });
        if (Array.isArray(result)) {
          this.dataEntity = result;
        } else {
          this.dataEntity = [];
          console.error("Данные не получены или не являются массивом");
        }
      } catch (error) {
        console.error("Произошла ошибка", error);
      }
    },
  },
});
