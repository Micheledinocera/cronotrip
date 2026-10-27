export default defineNuxtPlugin(async () => {
  const globalStore = useGlobalStore()
  const user = useSupabaseUser()
  // Categories are readable only by signed-in users: load them now, or right after the login
  if (user.value) await globalStore.fetchCategories()
  if (import.meta.client) {
    watch(user, (newUser) => {
      if (newUser) globalStore.fetchCategories()
    })
  }
})
