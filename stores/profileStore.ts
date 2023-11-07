import { defineStore } from "pinia";

// interface IProfile {
//   id: number;
//   name: string;
//   email: string;
//   avatar: string;
// }

export const useProfileStore = defineStore("ProfileStore", {
  state: () => ({
    // dialogFormVisible: false,
    // data: [] as IProfile[],
    // newName: "",
    // newEmail: "",
    // newAvatar: "",
  }),

  getters: {
    // Добавим геттер для получения первого профиля, если он существует
    // firstProfile(): IProfile | undefined {
    //   return this.data.length > 0 ? this.data[0] : undefined;
    // },
  },

  actions: {
    // addNew(row: IProfile) {
    //   this.data.push(row);
    // },

    // initializeTableData() {
    //     if (this.data.length === 0) {
    //       this.data.push({
    //         id: 1,
    //         name: "Иванова Анна Владимировна",
    //         email: "john.doe@example.com",
    //         avatar: "/img/woman.jpg",
    //       });
    //       console.log(this.data); // Вывести данные массива после их добавления
    //     }
    //   },
  },
});
