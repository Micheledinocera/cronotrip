// Lucide icons of the activity categories (docs/wiki/design/identita-visiva.md):
// categories are told apart by icon, never by color.
const CATEGORY_ICONS: Record<string, string> = {
  trekking: 'i-lucide-footprints',
  food: 'i-lucide-utensils',
  museum: 'i-lucide-landmark',
  concert: 'i-lucide-music',
  sightseeing: 'i-lucide-binoculars',
  accommodation: 'i-lucide-bed-double',
  any: 'i-lucide-compass',
};

export const categoryIcon = (category?: string) =>
  CATEGORY_ICONS[category ?? ''] ?? CATEGORY_ICONS.any!;
