// Reordering a list of the form by dragging (HTML5 drag and drop) from a handle, with the
// up and down arrows on the handle as the keyboard alternative (docs/wiki/design/schermate.md).
// `item(i)` goes on the element that moves, `handle(i)` on its grip button.
// Lists can be nested: each instance only reacts to its own drags.
export const useReorder = (list: () => unknown[], onMoved?: (from: number, to: number) => void) => {
  const armed = ref<number | null>(null);
  const dragging = ref<number | null>(null);
  const over = ref<number | null>(null);

  const move = (from: number, to: number) => {
    const items = list();
    if (from === to || to < 0 || to >= items.length) return;
    const [moved] = items.splice(from, 1);
    items.splice(to, 0, moved);
    onMoved?.(from, to);
  };

  const reset = () => {
    armed.value = dragging.value = over.value = null;
  };

  const item = (i: number) => ({
    draggable: armed.value === i,
    onDragstart: (e: DragEvent) => {
      if (armed.value !== i) return;
      e.stopPropagation();
      dragging.value = i;
      e.dataTransfer?.setData('text/plain', String(i));
      if (e.dataTransfer) e.dataTransfer.effectAllowed = 'move';
    },
    onDragover: (e: DragEvent) => {
      if (dragging.value === null) return;
      e.preventDefault();
      e.stopPropagation();
      over.value = i;
    },
    onDrop: (e: DragEvent) => {
      if (dragging.value === null) return;
      e.preventDefault();
      e.stopPropagation();
      move(dragging.value, i);
      reset();
    },
    onDragend: reset,
    class: {
      'opacity-50': dragging.value === i,
      'ring-2 ring-primary': over.value === i && dragging.value !== null && dragging.value !== i,
    },
  });

  const handle = (i: number) => ({
    onPointerdown: () => (armed.value = i),
    onPointerup: () => (armed.value = null),
    onKeydown: (e: KeyboardEvent) => {
      if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
        e.preventDefault();
        move(i, i + (e.key === 'ArrowUp' ? -1 : 1));
      }
    },
  });

  return {item, handle, move};
};
