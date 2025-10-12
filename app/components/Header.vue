<template>
  <div
    class="absolute top-0 left-0 !bg-gray-200/50 w-full h-[var(--header-height)] flex justify-end items-center gap-2 pr-2"
  >
    <UButton
      @click="$router.back"
      icon="i-weui:back-filled"
      size="md"
      color="primary"
    />
    <UButton
      @click="()=>{colorMode.preference = colorMode.value=='dark'?'light':'dark'}"
      :icon="colorMode.value=='dark' ? 'i-ix-light-dark' : 'i-circum-dark'"
      size="md"
      color="primary"
    />
    <ULocaleSelect
      v-model="locale"
      :locales="locales as Locale<any>[]"
      @update:model-value="setLocale($event as LocaleCode)"
    />
    <UButton v-if="user" @click="logout" class="text-white px-4 py-2 rounded">
      Logout
    </UButton>
    <div>
      {{ version?.version }}
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Locale } from "@nuxt/ui";
import type { LocaleCode } from "Types/LocaleCode";
const colorMode= useColorMode();
const { locale, locales, setLocale } = useI18n();

const client = useSupabaseClient();
const user = useSupabaseUser();
const { data: version } = await useVersion();
const router = useRouter();

async function logout() {
  await client.auth.signOut();
  router.push("/login");
}
</script>
