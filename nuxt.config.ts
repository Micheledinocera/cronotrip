// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite';
import {fileURLToPath} from 'node:url';
const path = require('path');
let development = process.env.NODE_ENV !== 'production';

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: {enabled: true},
  runtimeConfig: {
    public: {
      supabaseUrl: process.env.SUPABASE_URL,
      supabaseKey: process.env.SUPABASE_KEY,
    },
  },
  vite: {
    plugins: [tailwindcss()],
  },
  alias: {
    Types: fileURLToPath(new URL('./types', import.meta.url)),
    Models: fileURLToPath(new URL('./models', import.meta.url)),
  },
  css: [
    '~/assets/css/tailwind-import.css',
    '~/assets/scss/variables.scss',
    '~/assets/scss/themes.scss',
    '~/assets/scss/main.scss',
  ],
  modules: [
    '@nuxtjs/supabase',
    '@nuxt/icon',
    '@pinia/nuxt',
    '@nuxtjs/i18n',
    '@nuxt/image',
    '@nuxtjs/leaflet',
  ],
  pinia: {
    storesDirs: ['./stores/**'],
  },
  supabase: {
    redirect: false,
  },
  nitro: {
    prerender: {
      failOnError: false,
    },
  },
  i18n: {
    locales: [
      {code: 'it', name: 'Italiano', language: 'it-IT', file: 'it.json'},
      {code: 'en', name: 'English', language: 'en-US', file: 'en.json'},
    ],
    defaultLocale: 'it',
  },
  app: {
    baseURL: development ? '/' : '/cronotrip/',
  },
});
