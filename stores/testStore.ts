import { defineStore } from "pinia";
const {$axiosPlugin} = useNuxtApp();

interface IEntities {
  entityid: string;
  directorname: string;
  name: string;
}
export const usetestStore = defineStore("testStore", {
  state: () => ({
    entity: [] as IEntities[],
  }),
  actions: {
    async fetchData() {
      try {
        const response = await this.$axios.get<entity>('/supplier');
        this.setApiData(response.data);
      } catch (error) {
        this.handleApiError(error);
      }
    },
    setApiData(data: Supplier) {
      this.supplier = data;
    },
    handleApiError(error: any) {
      // Обработка ошибок
      // ...
    },
  },
});
