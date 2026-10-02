type DayRefMap = Record<string, HTMLElement | null>;
type DayRefType = 'place' | 'moment';
const dayRefs: Ref<DayRefMap> = ref({});

export function useDayScroll() {
  const activeRef: Ref<HTMLElement | null> = ref(null);
  const containerRef: Ref<HTMLElement | null> = ref(null); 

  let observer: IntersectionObserver | null = null;

  const registerDayElementRef = (
    dayRefKey: string,
    elementRef: HTMLElement | null
  ) => {
    dayRefs.value[dayRefKey] = elementRef;
  };

  
  const scrollToDayElement = (dayRefKey: string) => {
    const ref = dayRefs.value[dayRefKey];
    if (ref) ref?.scrollIntoView({behavior: 'smooth', block: 'start'});
  };

  const getDayRefsByType = (type: DayRefType) => {
    return computed(() => {
      return Object.keys(dayRefs.value)
        .filter(key => key.includes(`${type}_`))
        .map(key => dayRefs.value[key])
        .filter((el): el is HTMLElement => el !== null);
    });
  };

  const placeRefs = getDayRefsByType('place');

  const handleIntersect: IntersectionObserverCallback = (entries) => {
    let bestEntry: IntersectionObserverEntry | null = null;
    for (const entry of entries) {
      if (entry.isIntersecting) {
        if (!bestEntry || entry.intersectionRatio > (bestEntry.intersectionRatio || 0)) {
          bestEntry = entry;
        }
      }
    }
    if (bestEntry) activeRef.value = bestEntry.target as HTMLElement;
  };

  const setupObserver = () => {
    observer?.disconnect();
    
    if (!containerRef.value || placeRefs.value.length === 0) return;

    observer = new IntersectionObserver(handleIntersect, {
      root: containerRef.value,
      rootMargin: '0px',
      threshold: 0.5,
    });

    placeRefs.value.forEach(itemRef => {
      observer?.observe(itemRef);
    });
  };

  onMounted(() => {
    watch([containerRef, placeRefs], () => {
      nextTick(() => {
        setupObserver();
      });
    }, { immediate: true, deep: true }); 
  });

  onUnmounted(() => {
    observer?.disconnect();
  });
  
  return {
    containerRef, 
    registerDayElementRef,
    scrollToDayElement,
    activeRef,
    placeRefs,
    getDayRefsByType,
  };
}