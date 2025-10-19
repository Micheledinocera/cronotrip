interface MomentRefs {
  [indexes: string]: HTMLElement | null;
}

const momentRefs: Ref<MomentRefs> = ref({});

export const useMomentScroll = () => {
  const registerMomentRef = (
    momentRefKey: string,
    elementRef: HTMLElement | null
  ) => {
    momentRefs.value[momentRefKey] = elementRef;
  };

  const scrollToMoment = (momentRefKey: string) => {
    const ref = momentRefs.value[momentRefKey];
    if (ref) ref?.scrollIntoView({behavior: 'smooth', block: 'start'});
  };

  return {
    registerMomentRef,
    scrollToMoment,
  };
};
