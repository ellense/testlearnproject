
// import { defineStore } from "pinia";
// interface IProfile {
//   id: number;
//   name: string;
//   email: string;
//   avatar: string;
// }

// export const useProfileStore = defineStore("ProfileStore", {
//   state: () => ({
//     tableData: [] as IProfile[],
    
//   }),

//   getters: {
    
//   },

//   actions: {
//     initializeTableData() {
//         if (this.tableData.length === 0) {
//             // две сущности при инициализации стора
//             this.tableData.push({
//             id:1,
//             name: 'Иванова Анна Владимировна',
//             email: 'john.doe@example.com',
//             //avatar: "https://static.vecteezy.com/system/resources/previews/002/002/257/non_2x/beautiful-woman-avatar-character-icon-free-vector.jpg",
//             avatar: "/img/woman.jpg",
//           });
//       }
//   },
// }
// });
// profileStore.js
import { defineStore } from 'pinia';

export const useProfileStore = defineStore('profile', {
  state: () => ({
    dialogFormVisible: false,
    user: {
      name: 'Иванова Анна Владимировна',
      email: 'john.doe@example.com',
      avatar: "/img/woman.jpg",
    },
    newName: '', // Добавьте поле для нового имени
  }),

  getters: {
    // Добавьте геттеры, если они вам нужны
  },

  actions: {
    // Добавьте действия, если они вам нужны
    // save() {
    //   if (this.newName) {
    //   // Реализуйте логику сохранения нового имени и закрытия диалогового окна
    //   this.user.name = this.newName;
    //   this.dialogFormVisible = false;
    //   }
    // }
  },
});

