export const useGlobalStore = defineStore('global', {
  state: () => ({
    categories: [] as Category[],
    selectedItinerary: {} as Itinerary | undefined
  }),
  actions: {
    async fetchCategories() {
      if (this.categories.length > 0) return;
      this.categories = await useCategories();
    },
    async fetchCurrentItinerary(id:number) {
      if (this.selectedItinerary) return;
      const {getItineraryById}=await useItinerary();
      this.selectedItinerary = await getItineraryById(id);
    },
  },
});
