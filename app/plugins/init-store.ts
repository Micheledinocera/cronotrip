export default defineNuxtPlugin(async () => {
  const globalStore = useGlobalStore()
  if (globalStore.categories.length === 0) {
    await globalStore.fetchCategories()
  }
})
