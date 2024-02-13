import { defineStore } from "pinia";
import type { ITree } from "~/utils/types/directoryTypes";

export const useCategoriesStore = defineStore("CategoriesStore", {
    state: () => ({
        count: [],
        product: {},
        dataCategory: [] as ITree[],
    }),

    getters: {
        getCategory: (state) => {
            console.log("getCateggories getter:", state.dataCategory);
            return state.dataCategory;
        }
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
        // async getEntityFromAPIWithFilter() {
        //     try {
        //         const result = await ENTITY.getEntitiesList({
        //             search: this.$state.search,
        //         });
        //         if (Array.isArray(result)) {
        //             this.dataEntity = result;
        //         } else {
        //             this.dataEntity = [];
        //             console.error("Данные не получены или не являются массивом");
        //         }
        //     } catch (error) {
        //         console.error("Произошла ошибка", error);
        //     }
        // },
    }
})