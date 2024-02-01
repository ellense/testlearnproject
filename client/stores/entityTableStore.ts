import { defineStore } from "pinia";
import type { EntityStore, GetAllEntities, } from "~/utils/types/directoryTypes";

export const useEntityTableStore = defineStore("EntityTableStore", {
  state: (): EntityStore => ({
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
      T extends keyof GetAllEntities,
      U extends GetAllEntities[T],
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
