<template>
  <UDropdownMenu :items="items" :content="{align: 'end'}" :ui="{content: 'w-60'}">
    <UButton
      color="neutral"
      variant="ghost"
      square
      class="rounded-full p-0.5"
      :aria-label="t('nav.user_menu')"
    >
      <UAvatar :alt="email" size="sm" />
    </UButton>
    <template #account>
      <div class="flex items-center gap-2 min-w-0">
        <UAvatar :alt="email" size="sm" />
        <span class="typo-small text-muted truncate">{{ email }}</span>
      </div>
    </template>
  </UDropdownMenu>
</template>

<script setup lang="ts">
import type {DropdownMenuItem} from '@nuxt/ui';
import type {LocaleCode} from 'Types/LocaleCode';

// Avatar menu: everything that does not deserve room in the bar.
const {t, locale, locales, setLocale} = useI18n();
const colorMode = useColorMode();
const client = useSupabaseClient();
const user = useSupabaseUser();
const router = useRouter();
const {data: version} = await useVersion();

const email = computed(() => user.value?.email ?? '');

const THEMES = [
  {value: 'light', icon: 'i-lucide-sun', label: 'menu.theme_light'},
  {value: 'dark', icon: 'i-lucide-moon', label: 'menu.theme_dark'},
  {value: 'system', icon: 'i-lucide-monitor', label: 'menu.theme_system'},
];

async function logout() {
  await client.auth.signOut();
  router.push('/login');
}

const items = computed<DropdownMenuItem[][]>(() => [
  [{type: 'label', slot: 'account' as const}],
  [
    {
      label: t('menu.language'),
      icon: 'i-lucide-languages',
      children: locales.value.map((l) => ({
        label: l.name,
        type: 'checkbox' as const,
        checked: l.code === locale.value,
        onUpdateChecked: () => setLocale(l.code as LocaleCode),
      })),
    },
    {
      label: t('menu.theme'),
      icon: THEMES.find((th) => th.value === colorMode.preference)?.icon ?? 'i-lucide-monitor',
      children: THEMES.map((th) => ({
        label: t(th.label),
        icon: th.icon,
        type: 'checkbox' as const,
        checked: colorMode.preference === th.value,
        onUpdateChecked: () => (colorMode.preference = th.value),
      })),
    },
  ],
  [
    ...(version.value?.version
      ? [{label: t('menu.version', {v: version.value.version}), type: 'label' as const, class: 'text-dimmed font-normal'}]
      : []),
    {label: t('menu.logout'), icon: 'i-lucide-log-out', onSelect: logout},
  ],
]);
</script>
