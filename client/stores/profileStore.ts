import { defineStore } from "pinia";
import type { IProfile } from "~/utils/types/profileTypes";

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
    firstProfile(): IProfile | undefined {
      return this.data.length > 0 ? this.data[0] : undefined;
    },
  },

  actions: {},
});
