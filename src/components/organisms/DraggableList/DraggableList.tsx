import DraggableListItem, { Item } from "@src/components/molecules/DraggableListItem";
import { ComponentProps, memo } from "react";
import { DndContext } from "@dnd-kit/core";
import { SortableContext } from "@dnd-kit/sortable";

export type Props = {
  items: Item[];
  onDragEnd: ComponentProps<typeof DndContext>["onDragEnd"];
};

const DraggableList = memo(({ items, onDragEnd }: Props) => {
  return (
    <DndContext onDragEnd={onDragEnd}>
      <SortableContext items={items}>
        {items.map((item) => (
          <DraggableListItem key={item.id} item={item} />
        ))}
      </SortableContext>
    </DndContext>
  );
});

export default DraggableList;
