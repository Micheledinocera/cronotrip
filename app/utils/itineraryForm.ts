// Empty items for the itinerary form. Links are always there as an object, so that the form
// can bind to them; the schema drops the empty ones on save.
export const emptyActivity = (): Activity => ({
  name: '',
  category: '',
  link: { label: '', url: '' },
});

// The position is chosen afterwards: the schema asks for it on save
export const emptyPlace = (): Place => ({
  name: '',
  coordinates: undefined as unknown as Coordinates,
  events: [],
});

// Deep copy of an itinerary, ready to be edited by the form
export const toFormState = (itinerary: Itinerary): Itinerary => {
  const state: Itinerary = structuredClone(toRaw(itinerary));
  for (const day of state.days ?? [])
    for (const place of day.places ?? []) {
      place.events ??= [];
      for (const activity of place.events) activity.link ??= { label: '', url: '' };
    }
  return state;
};
