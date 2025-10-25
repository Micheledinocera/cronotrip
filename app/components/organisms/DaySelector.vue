<template>
    <div>
        <div v-for="(day,dayIndex) in days" :key="'daySelector_'+dayIndex" @click="$emit('select',dayIndex)">
            {{day.subtitle}}
        </div>
    </div>
</template>


<script setup lang="ts">

const props = defineProps<{
  days: Day[];
  selectedDayIndex: number
}>();

</script>