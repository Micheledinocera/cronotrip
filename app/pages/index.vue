<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl mb-4">{{ $t('app_name') }}</h1>
    <div class="flex gap-4">
      <NuxtLink to="/login" class="bg-blue-500 text-white px-4 py-2 rounded">
        {{ $t('login') }}
      </NuxtLink>
    </div>
  </div>
</template>


<script setup lang="ts">
definePageMeta({auth: false})
</script>