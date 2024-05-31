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
  },

  actions: {},
});
