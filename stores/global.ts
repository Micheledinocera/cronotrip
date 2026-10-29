export const useGlobalStore = defineStore('global', {
  state: () => ({
    categories: [] as Category[],
    statuses: [] as ItineraryStatus[],
    selectedItinerary: {} as Itinerary | undefined
  }),
  actions: {
    async fetchCategories() {
      if (this.categories.length > 0) return;
      this.categories = await useCategories();
    },
    async fetchStatuses() {
      if (this.statuses.length > 0) return;
      this.statuses = await useStatuses();
    },
    async fetchCurrentItinerary(id:number) {
      if (this.selectedItinerary) return;
      const {getItineraryById}=await useItinerary();
      this.selectedItinerary = await getItineraryById(id);
    },
  },
});
