import { defineStore } from "pinia";
import type { ITree } from "~/utils/types/directoryTypes";

export const useCategoriesStore = defineStore("CategoriesStore", {
    state: () => ({
        count: [],
        product: {},
        dataCategory: [] as ITree[],
    }),

    getters: {

    },

    actions: {
        async getCategoryFromAPIWithFilter(data: ITree) {
            try {
                const result = await CATEGORY.getCategory(data);
                if (Array.isArray(result)) {
                    this.dataCategory = result;
                } else {
                    this.dataCategory = [];
                    console.error("Данные не получены или не являются массивом");
                }
            } catch (error) {
                console.error("Произошла ошибка при получении даных категорий", error);
            }
        },
    }
})