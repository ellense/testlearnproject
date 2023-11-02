import { defineStore } from "pinia";
interface IProfile {
  name: string;
  email: string;
  avatar: string;
}
export const useProfileStore = defineStore("profile", {
  state: () => ({
    dialogFormVisible: false,
    data: [] as IProfile[],
    // user: {
    //   name: 'Иванова Анна Владимировна',
    //   email: 'john.doe@example.com',
    //   avatar: "/img/woman.jpg",
    // },
    newName: "",
    newEmail: "",
    newAvatar: "",
  }),

  getters: {},

  actions: {
    addNew(row: { name: string; email: string; avatar: string }) {
      this.data.push(row);
    },
    initializeTableData() {
      if (this.data.length === 0) {
        // Добавление двух сущностей при инициализации хранилища
        this.data.push({
          name: "Иванова Анна Владимировна",
          email: "john.doe@example.com",
          avatar: "/img/woman.jpg",
        });
      }
    },
  },
})
