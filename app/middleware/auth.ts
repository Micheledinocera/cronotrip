import { useSupabaseUser } from '#imports'
import { defineNuxtRouteMiddleware, navigateTo } from '#app'

export default defineNuxtRouteMiddleware((to) => {
  const user = useSupabaseUser()

  if (!user.value && to.path !== '/login') {
    return navigateTo('/login', { replace: true })
  }
})