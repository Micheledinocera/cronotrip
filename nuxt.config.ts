// https://nuxt.com/docs/api/configuration/nuxt-config
import tailwindcss from '@tailwindcss/vite';

export default defineNuxtConfig({
  compatibilityDate: '2025-07-15',
  devtools: { enabled: true },
  vite: {
    plugins: [tailwindcss()],
  },
  modules: ['@nuxtjs/supabase', '@nuxt/icon', '@pinia/nuxt'],
  pinia: {
    storesDirs: ['./stores/**']
  },
  css: [
    '~/assets/css/tailwind-import.css',
    '~/assets/scss/themes.scss',
    '~/assets/scss/main.scss'
  ],
  supabase: {
    redirect: false
  },
  runtimeConfig: {
    public: {
      supabaseUrl: process.env.SUPABASE_URL,
      supabaseKey: process.env.SUPABASE_KEY
    }
  }
})