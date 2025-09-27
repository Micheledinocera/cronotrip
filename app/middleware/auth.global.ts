export default defineNuxtRouteMiddleware((to) => {
  if (to.meta?.auth === false) return
  const user = useSupabaseUser()
  if (!user.value && to.path !== '/login') {
    return navigateTo('/login', { replace: true })
  }
})