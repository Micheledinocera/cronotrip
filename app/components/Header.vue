<template>
  <div class="absolute top-0 left-0 !bg-gray-200/50 w-full h-[var(--header-height)] flex justify-end items-center">
    <IconButton
      @click="$router.back"
      icon-name="i-weui:back-filled"
    />
    <IconButton
      @click="global.toggleIsDark"
      :icon-name="global.isDark ? 'i-ix-light-dark' : 'i-circum-dark'"
    />
    <select @input="setLocale(($event.target as HTMLSelectElement).value as LocaleCode)">
      <option v-for="locale in locales" :key="locale.code" :value="locale.code">
        {{ locale.name }}
      </option>
    </select>
    <button v-if="user" @click="logout" class="text-white px-4 py-2 rounded">
      Logout
    </button>
    <div>
    {{ version?.version }}
    </div>
  </div>
</template>

<script setup lang="ts">
import type { LocaleCode } from "Types/LocaleCode";
const global = useGlobalStore();
const { locales, setLocale } = useI18n();

const client = useSupabaseClient();
const user = useSupabaseUser();
const {data:version} = await useVersion();
const router = useRouter();

async function logout() {
  await client.auth.signOut();
  router.push("/login");
}
</script>
