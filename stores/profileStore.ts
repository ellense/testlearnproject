
import { defineStore } from 'pinia';

export const useProfileStore = defineStore('profile', {
  state: () => ({
    dialogFormVisible: false,
    user: {
      name: 'Иванова Анна Владимировна',
      email: 'john.doe@example.com',
      avatar: "/img/woman.jpg",
    },
    newName: '', 
  }),

  getters: {
    
  },

  actions: {
    
  },
});

