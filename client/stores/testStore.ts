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
        const response = await this.$axiosPlugin.get<entity>('/api/entitieslist');
        this.setApiData(response.data);
      } catch (error) {
        this.handleApiError(error);
      }
    },
    setApiData(data: entity) {
      this.entity = data;
    },
    handleApiError(error: any) {
      if (error.response) {
        console.error('Ошибка запроса. Код ответа:', error.response.status);
        console.error('Детали ошибки:', error.response.data);
        // Дополнительные действия, связанные с обработкой конкретного статуса, например, 404
        if (error.response.status === 404) {
          console.error('Ресурс не найден');
        }
      } else if (error.request) {
        // Запрос был отправлен, но не получен ответ
        console.error('Ошибка запроса. Запрос был отправлен, но не получен ответ.');
      } else {
        // Возникла ошибка при настройке запроса
        console.error('Ошибка запроса. Детали ошибки:', error.message);
      }
    },
  },
});
