export default defineNuxtPlugin(async () => {
  const globalStore = useGlobalStore()
  const user = useSupabaseUser()
  // Categories and statuses are readable only by signed-in users: load them now, or right after the login
  const load = () => Promise.all([globalStore.fetchCategories(), globalStore.fetchStatuses()])
  if (user.value) await load()
  if (import.meta.client) {
    watch(user, (newUser) => {
      if (newUser) load()
    })
  }
})
