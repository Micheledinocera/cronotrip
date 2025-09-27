<template>
  <div class="container mx-auto p-4">
    <h1 class="text-2xl mb-4">Login</h1>
    <form @submit.prevent="handleLogin">
      <div class="mb-4">
        <label>Email:</label>
        <input v-model="email" type="email" class="border p-2 w-full" required />
      </div>
      <div class="mb-4">
        <label>Password:</label>
        <input v-model="password" type="password" class="border p-2 w-full" required />
      </div>
      <button type="submit" class="bg-blue-500 text-white px-4 py-2 rounded">
        Accedi
      </button>
    </form>
  </div>
</template>

<script setup lang="ts">
const client = useSupabaseClient()
const user = useSupabaseUser()
const router = useRouter()

const email = ref('')
const password = ref('')

async function handleLogin() {
  try {
    const { error } = await client.auth.signInWithPassword({
      email: email.value,
      password: password.value
    })
    if (error) throw error
    router.push('/dashboard')
  } catch (error : unknown) {
    if (error instanceof Error) {
      console.error(error.message)
    } else {
      console.error('Errore sconosciuto', error)
    }
  }
}

watchEffect(() => {
  if (user.value) {
    console.log(user.value)
    router.push('/dashboard')
  }
})
</script>