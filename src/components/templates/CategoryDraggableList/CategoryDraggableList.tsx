import { Box, IconButton, Typography } from "@mui/material";
import { setCategoryDialogOpen } from "@src/store/DialogSlice.ts";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import DraggableList from "@src/components/organisms/DraggableList";
import { useAppDispatch } from "@src/store/store.ts";
import { Tables } from "@src/utils/database.types.ts";
import useOptimisticUpsert from "@src/repository/useOptimisticUpsert.ts";
import CategoryIcon from "@src/components/atoms/CategoryIcon";
import useReorder from "@src/utils/hooks/useReorder.ts";

type Props = {
  categories: Tables<"categories">[];
  setCategoryToEdit: (category: Tables<"categories">) => void;
  setCategoryDeleteId: (id: number) => void;
};

const getOffset = (category?: Tables<"categories">) => {
  if (!category) return 0;
  if (category.type === "expense") return 0;
  if (category.type === "income") return 1000;
  if (category.type === "transfer") return 2000;
};

function CategoryDraggableList({ categories, setCategoryToEdit, setCategoryDeleteId }: Props) {
  const dispatch = useAppDispatch();
  const { mutate: upsertCategories } = useOptimisticUpsert("categories");
  const reorderCategories = useReorder(categories, getOffset(categories.at(0)));

  return (
    <DraggableList
      items={categories.map((category) => ({
        id: category.id,
        primary: (
          <Typography sx={{ display: "flex", gap: 2 }}>
            <CategoryIcon icon={category.icon} />
            {category.name}
          </Typography>
        ),
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
      onDragEnd={(event) => {
        const reorderedCategories = reorderCategories(event);
        if (reorderedCategories) upsertCategories(reorderedCategories);
      }}
    />
  );
}

export default CategoryDraggableList;
