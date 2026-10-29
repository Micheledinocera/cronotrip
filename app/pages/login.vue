<template>
  <main class="grid min-h-dvh bg-default max-lg:grid-rows-[300px_auto] lg:h-dvh lg:grid-cols-[1.35fr_1fr]">
    <HeaderPhoto
      :src="getImageUrl(LOGIN_PHOTO)"
      :alt="t('auth.photo_alt')"
      eager
      square
      text-class="inset-x-5 bottom-5 lg:inset-x-14 lg:bottom-14"
    >
      <p class="typo-quote text-xl lg:text-3xl lg:leading-[2.375rem] max-w-xl">{{ t('auth.tagline') }}</p>
      <p class="typo-small opacity-85 mt-2.5 max-lg:hidden">{{ t('auth.photo_caption') }}</p>
    </HeaderPhoto>

    <section class="grid place-items-center px-5 pt-7 pb-8 lg:p-16 max-lg:place-items-start">
      <div class="grid w-full max-w-[380px] gap-6 lg:gap-8">
        <div class="grid gap-4 lg:gap-6">
          <span class="inline-flex items-center gap-2.5 font-display font-semibold tracking-[-0.01em] text-highlighted text-xl lg:text-[26px]">
            <LogoMark :size="36" />cronotrip
          </span>
          <div class="grid gap-1.5">
            <h1 class="typo-title-1 max-lg:text-[28px] max-lg:leading-[34px] text-highlighted">{{ t('auth.title') }}</h1>
            <p class="typo-body text-muted max-lg:hidden">{{ t('auth.subtitle') }}</p>
          </div>
        </div>

        <form class="grid gap-4" :aria-label="t('auth.submit')" @submit.prevent="handleLogin">
          <UAlert
            v-if="failed"
            color="error"
            variant="soft"
            icon="i-lucide-circle-alert"
            :title="t('auth.error_title')"
            :description="t('auth.error_description')"
            role="alert"
          />
          <UFormField :label="t('auth.email')" name="email">
            <UInput
              v-model="email"
              type="email"
              autocomplete="email"
              icon="i-lucide-at-sign"
              size="lg"
              :color="failed ? 'error' : 'primary'"
              :highlight="failed"
              required
              class="w-full"
            />
          </UFormField>
          <UFormField :label="t('auth.password')" name="password">
            <UInput
              v-model="password"
              :type="showPassword ? 'text' : 'password'"
              autocomplete="current-password"
              icon="i-lucide-lock"
              size="lg"
              :color="failed ? 'error' : 'primary'"
              :highlight="failed"
              required
              class="w-full"
            >
              <template #trailing>
                <UButton
                  color="neutral"
                  variant="ghost"
                  size="sm"
                  :icon="showPassword ? 'i-lucide-eye-off' : 'i-lucide-eye'"
                  :aria-label="showPassword ? t('auth.hide_password') : t('auth.show_password')"
                  @click="showPassword = !showPassword"
                />
              </template>
            </UInput>
          </UFormField>
          <UButton
            type="submit"
            size="xl"
            block
            :loading="submitting"
            :label="submitting ? t('auth.submitting') : t('auth.submit')"
          />
          <p class="typo-small text-muted text-center">{{ t('auth.no_account') }}</p>
        </form>
      </div>
    </section>
  </main>
</template>

<script setup lang="ts">
// The entrance: the only "welcome" screen, no registration.
definePageMeta({auth: false, layout: false});

// Public photo of the seed bucket (Umbria Trip, day 1)
const LOGIN_PHOTO = 'Castel%20San%20Vincenzo/lago%201.jpg';

const {t} = useI18n();
const {getImageUrl} = useSupabaseImages();
const client = useSupabaseClient();
const user = useSupabaseUser();
const router = useRouter();

const email = ref('');
const password = ref('');
const showPassword = ref(false);
const submitting = ref(false);
const failed = ref(false);

async function handleLogin() {
  submitting.value = true;
  failed.value = false;
  const {error} = await client.auth.signInWithPassword({email: email.value, password: password.value});
  submitting.value = false;
  if (error) {
    failed.value = true;
    return;
  }
  router.push('/dashboard');
}

watchEffect(() => {
  if (user.value) router.push('/dashboard');
});
</script>
