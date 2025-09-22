const { locales } = useI18n()
export type LocaleCode = typeof locales.value[number]['code']