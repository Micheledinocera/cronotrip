<template>
  <div class="container mx-auto p-4">
    <div class="flex justify-between items-center mb-6">
      <h1 class="text-2xl">I tuoi itinerari</h1>
      <button @click="logout" class="bg-red-500 text-white px-4 py-2 rounded">
        Logout
      </button>
    </div>
    
    <NuxtLink to="/itinerario/nuovo" class="bg-green-500 text-white px-4 py-2 rounded inline-block mb-4">
      Nuovo Itinerario
    </NuxtLink>

    <div v-if="itinerari.length" class="grid gap-4">
      <div v-for="itinerario in itinerari" :key="itinerario.id" class="border p-4 rounded">
        <h3 class="text-xl">{{ itinerario.titolo }}</h3>
        <div class="mt-2">
          <NuxtLink :to="'/itinerario/' + itinerario.id" class="text-blue-500">Visualizza</NuxtLink>
          <NuxtLink :to="'/itinerario/modifica/' + itinerario.id" class="text-blue-500 ml-4">Modifica</NuxtLink>
        </div>
      </div>
    </div>
    <p v-else>Non hai ancora creato nessun itinerario</p>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: 'auth'
})

const client = useSupabaseClient()
const router = useRouter()
const itinerari = ref([])

async function logout() {
  await client.auth.signOut()
  router.push('/login')
}

// Carica gli itinerari dell'utente
onMounted(async () => {
  const { data, error } = await client
    .from('itinerari')
    .select('*')
    .order('created_at', { ascending: false })
  
  if (!error) {
    itinerari.value = data
  }
})
</script>