import { useTranslation } from "react-i18next";
import { useAppDispatch } from "@src/store/store.ts";
import { useState } from "react";
import { DragEndEvent } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import DraggableList from "@src/components/organisms/DraggableList";
import { Box, IconButton, Stack } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import ConfirmDialog from "@src/components/organisms/ConfirmDialog";
import usePlannedExpenses from "@src/repository/usePlannedExpenses.ts";
import useDeletePlannedExpense from "@src/repository/useDeletePlannedExpense.ts";
import { setPlannedExpenseToEdit } from "@src/store/ExpenseSlice.ts";
import { useNavigate } from "react-router-dom";
import routes from "@src/utils/routes.ts";
import useOptimisticUpsert from "@src/repository/useOptimisticUpsert.ts";
import BottomFab from "@src/components/atoms/BottomFab";
import AddIcon from "@mui/icons-material/Add";
import { currencyFormat } from "@src/utils/functions.ts";
import CategoryIcon from "@src/components/atoms/CategoryIcon";

function PlannedExpenses() {
  const { t } = useTranslation("PlannedExpenses");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { data: plannedExpenses } = usePlannedExpenses();
  const { mutate: upsertPlannedExpenses } = useOptimisticUpsert("planned_expenses");
  const { mutate: deletePlannedExpense } = useDeletePlannedExpense();
  const [deletePlannedExpenseId, setDeletePlannedExpenseId] = useState<number | null>(null);

  const onConfirmDelete = () => {
    if (deletePlannedExpenseId) deletePlannedExpense(deletePlannedExpenseId);
    setDeletePlannedExpenseId(null);
  };

  const onDragEnd = async ({ active, over }: DragEndEvent) => {
    if (!over || active.id === over.id) return;
    const oldIndex = plannedExpenses.findIndex((plannedExpense) => plannedExpense.id === active.id);
    const newIndex = plannedExpenses.findIndex((plannedExpense) => plannedExpense.id === over.id);
    const newPlannedExpenses = arrayMove(plannedExpenses, oldIndex, newIndex);
    upsertPlannedExpenses(newPlannedExpenses);
  };

  return (
    <>
      <DraggableList
        items={plannedExpenses.map((plannedExpense) => ({
          id: plannedExpense.id,
          primary: (
            <Stack direction="row" sx={{ gap: 2 }}>
              <CategoryIcon icon={plannedExpense.category.icon} />
              {plannedExpense.description}
            </Stack>
          ),
          secondary: currencyFormat().format(plannedExpense.amount),
          listItemProps: {
            sx: { pr: 10 },
            secondaryAction: (
              <Box>
                <IconButton
                  onClick={() => {
                    dispatch(setPlannedExpenseToEdit(plannedExpense));
                    navigate(routes.createPlannedExpense);
                  }}
                >
                  <EditIcon />
                </IconButton>
                <IconButton edge="end" onClick={() => setDeletePlannedExpenseId(plannedExpense.id)}>
                  <DeleteIcon />
                </IconButton>
              </Box>
            ),
          },
        }))}
        onDragEnd={onDragEnd}
      />
      <BottomFab onClick={() => navigate(routes.createPlannedExpense)}>
        <AddIcon />
      </BottomFab>
      <ConfirmDialog
        title={t("confirmDelete")}
        open={deletePlannedExpenseId !== null}
        onCancel={() => setDeletePlannedExpenseId(null)}
        onConfirm={onConfirmDelete}
      />
    </>
  );
}

export default PlannedExpenses;
