<template>
    <div class="absolute top-0 left-0 !bg-gray-200/50 w-full">
        <button @click="global.toggleIsDark" class="px-4 py-2 rounded"> <Icon :name="global.isDark?'i-ix-light-dark':'i-circum-dark'"/> </button>
    </div>
</template>

<script setup>
const global = useGlobalStore()
</script>