<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl font-bold mb-4">Crea Nuovo Itinerario</h1>
    <form @submit.prevent="salvaItinerario" class="max-w-lg">
      <div class="mb-4">
        <label class="block text-gray-700 mb-2" for="titolo">Titolo</label>
        <input type="text" id="titolo" v-model="itinerario.titolo" class="w-full px-3 py-2 border rounded" required>
      </div>
      <div class="mb-4">
        <label class="block text-gray-700 mb-2" for="descrizione">Descrizione</label>
        <textarea id="descrizione" v-model="itinerario.descrizione" class="w-full px-3 py-2 border rounded" rows="4"></textarea>
      </div>
      <div class="mb-4">
        <label class="blockmb-2" for="durata">Durata (giorni)</label>
        <input type="number" id="durata" v-model="itinerario.durata" class="w-full px-3 py-2 border rounded" min="1" required>
      </div>
      <button type="submit" class="px-4 py-2 rounded">
        Crea Itinerario
      </button>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { useSupabaseClient } from '#imports'

const router = useRouter()
const supabase = useSupabaseClient()

const itinerario = ref({
  titolo: '',
  descrizione: '',
  durata: 1,
})

const salvaItinerario = async () => {
  try {
    const { data, error } = await supabase
      .from('itinerari')
      .insert([{
        titolo: itinerario.value.titolo,
        descrizione: itinerario.value.descrizione,
        durata: itinerario.value.durata,
      }])
      .select()
      .single()

    if (error) throw error
    
    // Redirect to the itinerary view page
    router.push(`/itinerario/${data.id}`)
  } catch (error) {
    console.error('Errore durante il salvataggio:', error)
    alert('Si è verificato un errore durante il salvataggio dell\'itinerario')
  }
}
</script>