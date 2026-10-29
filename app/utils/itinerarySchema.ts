import {z} from 'zod';

type Translate = (key: string, params?: Record<string, unknown>) => string;

export const SHORT_DESC_MAX = 50;

// Validation of the itinerary form (docs/wiki/viaggi/flussi.md). Objects are loose, so that the
// fields the form does not edit yet (photos, prices, moments, day dates) survive a save.
// Messages are functions, so they follow the current locale.
export const buildItinerarySchema = (t: Translate) => {
  const required = () => t('form.errors.required');
  const text = () => z.string().trim().min(1, {error: required});
  const optionalText = () =>
    z
      .string()
      .trim()
      .optional()
      .transform((value) => value || undefined);

  const coordinates = (error?: () => string) =>
    z.object({lat: z.number(), lng: z.number()}, error && {error});

  // An empty link is dropped; a link without a label shows its url
  const link = z
    .object({label: z.string().trim(), url: z.string().trim()})
    .superRefine((link, ctx) => {
      if (link.label && !link.url) ctx.addIssue({code: 'custom', path: ['url'], message: required()});
      if (link.url && !z.url({protocol: /^https?$/}).safeParse(link.url).success)
        ctx.addIssue({code: 'custom', path: ['url'], message: t('form.errors.invalid_url')});
    })
    .transform((link) => (link.url ? {label: link.label || link.url, url: link.url} : undefined));

  const activity = z.looseObject({
    name: text(),
    category: text(),
    desc: optionalText(),
    link: link.optional(),
    coordinates: coordinates().optional(),
  });

  const place = z.looseObject({
    name: text(),
    coordinates: coordinates(() => t('form.errors.position_required')),
    events: z.array(activity),
  });

  const day = z.looseObject({
    subtitle: text(),
    places: z.array(place),
  });

  return z.looseObject({
    name: text(),
    short_desc: text().max(SHORT_DESC_MAX, {error: () => t('form.errors.max_length', {max: SHORT_DESC_MAX})}),
    desc: text(),
    status: text(),
    days: z.array(day).min(1, {error: () => t('form.errors.at_least_one_day')}),
  });
};
