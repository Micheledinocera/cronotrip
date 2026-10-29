// How each itinerary status looks (docs/wiki/design/identita-visiva.md): color and icon,
// so that it reads without color too. "In corso" is the only solid one.
export const STATUS_LOOKS = {
  planning: {icon: 'i-lucide-circle-dashed', color: 'neutral', variant: 'outline'},
  in_progress: {icon: 'i-lucide-route', color: 'secondary', variant: 'solid'},
  done: {icon: 'i-lucide-circle-check', color: 'primary', variant: 'soft'},
} as const;

export const statusLook = (status?: string) =>
  STATUS_LOOKS[status as keyof typeof STATUS_LOOKS] ?? STATUS_LOOKS.planning;
