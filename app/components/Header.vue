<template>
    <button @click="global.toggleIsDark" class="px-4 py-2 rounded"> clicca </button>
</template>

<script setup>
const global = useGlobalStore()
</script>