export const useGlobalStore = defineStore('global', {
  state: () => ({
    categories: [] as Category[],
  }),
  actions: {
    async fetchCategories() {
      if (this.categories.length > 0) return;
      const {data: categories} = await useCategories();
      this.categories = categories.value || [];
    },
  },
});
