import { defineStore } from "pinia";

interface IAddLineStore {
  newText: string;
  historyProviders: string[];
  providers: { id: number; title: string }[];
}

export const useAddLineStore = defineStore("NewTextStore", {
  state: (): IAddLineStore => ({
    newText: "",
    historyProviders: [],
    providers: [],
  }),
  getters: {
    getResult: (state) => state.newText,
    getmyArray: (state) => state.providers,
  },
  actions: {
    addProvider() {
      const newId = this.providers.length + 1;
      this.$state.providers.push({
        id: newId,
        title: this.newText,
      });
      this.$state.historyProviders.push(`${newId} - ${this.newText}`);
    },
  },
});
