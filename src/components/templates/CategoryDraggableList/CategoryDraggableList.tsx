import { Box, IconButton } from "@mui/material";
import { setCategoryDialogOpen } from "@src/store/DialogSlice.ts";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import DraggableList from "@src/components/organisms/DraggableList";
import { DragEndEvent } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import { useAppDispatch } from "@src/store/store.ts";
import { Tables } from "@src/utils/database.types.ts";
import useOptimisticUpsert from "@src/repository/useOptimisticUpsert.ts";

type Props = {
  categories: Tables<"categories">[];
  setCategoryToEdit: (category: Tables<"categories">) => void;
  setCategoryDeleteId: (id: number) => void;
};

function CategoryDraggableList({ categories, setCategoryToEdit, setCategoryDeleteId }: Props) {
  const dispatch = useAppDispatch();
  const { mutate: upsertCategories } = useOptimisticUpsert("categories");

  const onDragEnd = async ({ active, over }: DragEndEvent) => {
    if (!over || active.id === over.id) return;
    const oldIndex = categories.findIndex((category) => category.id === active.id);
    const newIndex = categories.findIndex((category) => category.id === over.id);
    const newAccounts = arrayMove(categories, oldIndex, newIndex);
    upsertCategories(newAccounts);
  };

  return (
    <DraggableList
      items={categories.map((category) => ({
        id: category.id,
        primary: category.name,
        listItemProps: {
          sx: { pr: 10 },
          secondaryAction: (
            <Box>
              <IconButton
                onClick={() => {
                  dispatch(setCategoryDialogOpen(true));
                  setCategoryToEdit(category);
                }}
              >
                <EditIcon />
              </IconButton>
              <IconButton edge="end" onClick={() => setCategoryDeleteId(category.id)}>
                <DeleteIcon />
              </IconButton>
            </Box>
          ),
        },
      }))}
      onDragEnd={onDragEnd}
    />
  );
}

export default CategoryDraggableList;
