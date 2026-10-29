import type { InjectionKey } from 'vue';

// Photos chosen in the form are "parked" in the browser until the itinerary is saved: they go
// to <owner_id>/<itinerary_id>/, and a new itinerary has no id before its first save.
// Until then the document holds a placeholder reference, replaced by the path on save.
export const PARKED_PHOTO_PREFIX = 'parked:';

export const MAX_PHOTO_SIZE = 10 * 1024 * 1024;

export const isParkedPhoto = (ref: string) => ref.startsWith(PARKED_PHOTO_PREFIX);

export interface ParkedPhotos {
  files: Map<string, File>;
  park: (file: File) => string;
  preview: (ref: string) => string | undefined;
  release: () => void;
}

export const createParkedPhotos = (): ParkedPhotos => {
  const files = new Map<string, File>();
  const previews = new Map<string, string>();
  return {
    files,
    park: (file) => {
      const ref = PARKED_PHOTO_PREFIX + crypto.randomUUID();
      files.set(ref, file);
      previews.set(ref, URL.createObjectURL(file));
      return ref;
    },
    preview: (ref) => previews.get(ref),
    release: () => previews.forEach((url) => URL.revokeObjectURL(url)),
  };
};

export const PARKED_PHOTOS: InjectionKey<ParkedPhotos> = Symbol('parked-photos');
