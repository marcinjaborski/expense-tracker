import { ListItem, ListItemIcon, ListItemText } from "@mui/material";
import { Item } from "./types.ts";
import { useSortable } from "@dnd-kit/sortable";
import DragIndicatorIcon from "@mui/icons-material/DragIndicator";

export type Props = {
  item: Item;
};

function DraggableListItem({ item }: Props) {
  const { attributes, listeners, setNodeRef, transform, transition, isSorting } = useSortable({ id: item.id });

  const style = {
    transform: transform?.y ? `translate3d(0, ${transform?.y}px, 0)` : undefined,
    transition: isSorting ? transition : undefined,
    touchAction: "none",
  };

  return (
    <ListItem ref={setNodeRef} {...attributes} {...listeners} style={style} {...item.listItemProps}>
      <ListItemIcon>
        <DragIndicatorIcon />
      </ListItemIcon>
      <ListItemText primary={item.primary} secondary={item.secondary} />
    </ListItem>
  );
}

export default DraggableListItem;
