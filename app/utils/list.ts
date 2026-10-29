// Stable keys for v-for over lists that can be reordered, whose items have no id
const keys = new WeakMap<object, number>();
let lastKey = 0;
export const keyOf = (item: object) => {
  const raw = toRaw(item);
  if (!keys.has(raw)) keys.set(raw, ++lastKey);
  return keys.get(raw)!;
};

// Moves the item at index by delta positions (-1 up, 1 down), in place
export const moveItem = <T>(list: T[], index: number, delta: number) => {
  const target = index + delta;
  if (target < 0 || target >= list.length) return;
  const [item] = list.splice(index, 1);
  list.splice(target, 0, item!);
};
