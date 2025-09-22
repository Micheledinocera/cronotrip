export const useGlobalStore = defineStore('global', {
  state: () => ({
    isDark: false as boolean,
    categories: [] as Category[]
  }),
  actions: {
    toggleIsDark() {
      this.isDark=!this.isDark
    },
    async fetchCategories() {
      if(this.categories.length>0) return
      const {data:categories} = await useCategories()
      this.categories = categories.value || [];
    }
  }
})
