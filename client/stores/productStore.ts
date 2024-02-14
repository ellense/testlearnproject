import { defineStore } from "pinia";
import type { GetAllProducts, ProductStore } from "~/utils/types/directoryTypes";

export const useProductStore = defineStore("ProductStore", {
  state: (): ProductStore => ({
    product: [],
    pagination: null,
    countRowTable: 100,
    search: "",
    filterValue: {
      categories_l4:[]
    },
  }),

  getters: {
    getProducts: (state) => state.product,
  },

  actions: {
    //для поиска
    async performSearch(searchQuery: string) {
      try {
        this.setSearchQuery(searchQuery);
        await this.getProductFromAPIWithFilter();
      } catch (error) {
        console.error('Ошибка при выполнении поиска', error);
      }
    },

    setSearchQuery(query: string) {
      this.$state.search = query;
    },

    setFilterValue<
      T extends keyof GetAllProducts,
      U extends GetAllProducts[T],
    >(field: T, value: U) {
      this.$state.filterValue[field] = value
    },
    setCountRowTable(count: number) {
      this.$state.countRowTable = count;
    },

    async getProductFromAPIWithFilter(page?: number) {
      this.setFilterValue('page', page);
      this.setFilterValue('search', this.$state.search);
      this.setFilterValue('categories_l4', this.$state.filterValue.categories_l4);
      await PRODUCT.getProductsList({
        page_size: this.$state.countRowTable,
        page,
        search: this.$state.search,
        categories_l4: this.$state.filterValue.categories_l4
      })
        .then((product) => {
          this.$state.product = product.results;
          this.$state.pagination = {
            count: product.count,
            previous: product.previous,
            next: product.next,
          };
        })
        .catch((error) => Promise.reject(error));
    },
    // async filterProductsByCategories(selectedCategories: string[]) {
    //   try {
    //     // Устанавливаем выбранные категории в хранилище
    //     this.setFilterValue('categories', selectedCategories.join(','));
    
    //     // Вызываем метод для получения товаров с учетом выбранных категорий
    //     await this.getProductFromAPIWithFilter();
    //   } catch (error) {
    //     console.error('Ошибка при фильтрации товаров по категориям', error);
    //   }
    // }
    // async filterProductsByCategories(selectedCategories: string[] | string) {
    //   try {
    //     if (Array.isArray(selectedCategories) || typeof selectedCategories === 'string') {
    //       console.log('Выбранные категории для фильтрации:', selectedCategories);
          
    //       // Устанавливаем выбранные категории в хранилище
    //       this.setFilterValue('categories', selectedCategories);
    
    //       // Вызываем метод для получения товаров с учетом выбранных категорий
    //       await this.getProductFromAPIWithFilter();
          
    //       console.log('Товары успешно отфильтрованы по категориям');
    //     } else {
    //       throw new Error('selectedCategories должен быть массивом или строкой');
    //     }
    //   } catch (error) {
    //     console.error('Ошибка при фильтрации товаров по категориям', error);
    //   }
    // }
  },
});
