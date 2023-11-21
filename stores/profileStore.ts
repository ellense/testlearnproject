import { defineStore } from "pinia";

interface IProfile {
  id: number;
  last_name: string | null;
  first_name: string | null;
  middle_name: string | null;
  email: string;
}

export const useProfileStore = defineStore("ProfileStore", {
  state: () => ({
    dialogFormVisible: false,
    data: [] as IProfile[],
    new_last_name: "",
    new_first_name: "",
    new_middle_name: "",
    new_email: "",
  }),

  getters: {
    // Добавим геттер для получения первого профиля, если он существует
    firstProfile(): IProfile | undefined {
      return this.data.length > 0 ? this.data[0] : undefined;
    },
  },

  actions: {
    // addNew(row: {
    //   id: number;
    //   last_name: string | null;
    //   first_name: string | null;
    //   middle_name: string | null;
    //   email: string;
    // }) {
    //   this.data.push(row);
    // },
  },
});

