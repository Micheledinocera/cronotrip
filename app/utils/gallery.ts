// Every photo of a trip in order, day → place → activity → moment, for the gallery
// (docs/wiki/design/schermate.md). The place header comes first in its place.
export interface GalleryPhoto {
  src: string;
  title: string;
  dayIndex: number;
  placeIndex: number;
  placeName: string;
  category?: string;
}

export const galleryPhotos = (days: Day[] = []): GalleryPhoto[] =>
  days.flatMap((day, dayIndex) =>
    day.places.flatMap((place, placeIndex) => {
      const at = {dayIndex, placeIndex, placeName: place.name};
      return [
        ...(place.photos ?? []).slice(0, 1).map((src) => ({...at, src, title: place.name})),
        ...place.events.flatMap((activity) => [
          ...(activity.photos ?? []).map((src) => ({...at, src, title: activity.name, category: activity.category})),
          ...(activity.moments ?? []).flatMap((moment) =>
            (moment.photos ?? []).map((src) => ({...at, src, title: moment.name, category: activity.category})),
          ),
        ]),
      ];
    }),
  );
