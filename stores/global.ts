export const useGlobalStore = defineStore('global', {
  state: () => ({
    isDark: false
  }),
  actions: {
    toggleIsDark() {
      this.isDark=!this.isDark
    }
  }
})
