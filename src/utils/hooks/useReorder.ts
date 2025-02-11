import { arrayMove } from "@dnd-kit/sortable";
import { DragEndEvent } from "@dnd-kit/core";

type OrderableElement = {
  id: number;
  order: number;
};

function useReorder<T extends OrderableElement>(elements: T[], offset: number = 0) {
  return ({ active, over }: DragEndEvent) => {
    if (!over || active.id === over.id) return;
    const oldIndex = elements.findIndex((el) => el.id === active.id);
    const newIndex = elements.findIndex((el) => el.id === over.id);
    const newElements = arrayMove(elements, oldIndex, newIndex);
    newElements.forEach((el, index) => (el.order = index + offset));
    return newElements;
  };
}

export default useReorder;
