export const useGlobalStore = defineStore('global', {
  state: () => ({
    categories: [] as Category[],
    selectedItinerary: {} as Itinerary | undefined
  }),
  actions: {
    async fetchCategories() {
      if (this.categories.length > 0) return;
      const {data: categories} = await useCategories();
      this.categories = categories.value || [];
    },
    async fetchCurrentItinerary(id:number) {
      if (this.selectedItinerary) return;
      const { data: fetchedItinerary } = await useItinerary();
      this.selectedItinerary = fetchedItinerary.value;
    },
  },
});
