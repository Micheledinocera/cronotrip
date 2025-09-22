<template>
  <div class="container mx-auto p-4">
    <div v-if="itinerario">
      <h1 class="text-2xl mb-4">{{ itinerario.name }}</h1>
      <div class="prose max-w-none">
        {{ itinerario.desc }}
      </div>
    </div>
    <div v-else-if="error" class="text-red-500">
      Itinerario non trovato
    </div>
    <div v-else>
      Caricamento...
    </div>
  </div>
</template>

<script setup lang="ts">
const route = useRoute()
const client = useSupabaseClient()
const itinerario = ref<Itinerary | null>(null)
const error = ref<any>(null)

onMounted(async () => {
  const { data, error: err } = await client
    .from('itinerari')
    .select('*')
    .eq('id', route.params.id)
    .single()
  
  if (err) {
    error.value = err
    return
  }
  
  itinerario.value = data
})
</script>