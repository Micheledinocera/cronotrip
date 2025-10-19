interface MomentRefs {
  [indexes: string]: HTMLElement | null;
}

const dayRefs: Ref<MomentRefs> = ref({});

export const useDayScroll = () => {
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

  return {
    registerDayElementRef,
    scrollToDayElement,
  };
};
