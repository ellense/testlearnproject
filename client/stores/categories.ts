// import { ICategory, ICategoryList, ITree } from '@/utils/types/directoryTypes'
// import { categoryData as CategoryData } from '~~/utils/form/directoryTypes'

// let CategoryDataPromiseResolve: any
// const CategoryDataReadyPromise = new Promise((resolve) => {
//   CategoryDataPromiseResolve = resolve
// })

// export const useCategoryData = defineStore('categoryData', {
//   state: (): ICategoryList => ({
//     id: null,
//     name: null,
//     external_id: null,
//     external_code: null,
//     lvl: null,
//     is_active: null,
//     hierarchy_key: null,
//     network_key: null,
//     category_parent: null,
//     category_list: [],
//     categoty_tree: [],
//     ready: CategoryDataReadyPromise,
//   }),
//   getters: {
//     getCategoryList: (state) => state.category_list,
//     getReady: (state) => state.ready,
//   },
//   actions: {
//     // async getCategory_list_API() {
//     //   try {
//     //     const categories = await CATALOGS.getCategoryListAll()
//     //     this.set_categoty_list(categories)
//     //     this.set_categoty_tree(new CategoryData(categories).getCategoryTree())
//     //   } catch (e) {
//     //     console.log(e)
//     //   } finally {
//     //     CategoryDataPromiseResolve()
//     //   }
//     // },
//     set_categoty_tree(dataTree: ITree[]) {
//       this.$state.categoty_tree = dataTree
//     },
//     set_categoty_list(data: ICategory[]) {
//       this.$state.category_list = data
//       CategoryDataPromiseResolve()
//     },
//   },
// })
