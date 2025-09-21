export const useGlobalStore = defineStore('global', {
  state: () => ({
    isDark: 0
  }),
  actions: {
    toggleIsDark() {
      this.isDark=!this.isDark
    }
  }
})
