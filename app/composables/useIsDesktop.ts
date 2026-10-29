// True from the `sm` breakpoint (640px) up; on the server, and until mounted, desktop.
export const useIsDesktop = () => {
  const isDesktop = ref(true);
  onMounted(() => {
    const query = window.matchMedia('(min-width: 640px)');
    isDesktop.value = query.matches;
    const update = (e: MediaQueryListEvent) => (isDesktop.value = e.matches);
    query.addEventListener('change', update);
    onUnmounted(() => query.removeEventListener('change', update));
  });
  return isDesktop;
};
