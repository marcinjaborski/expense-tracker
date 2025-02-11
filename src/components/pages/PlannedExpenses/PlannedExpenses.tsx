import { useTranslation } from "react-i18next";
import { useAppDispatch } from "@src/store/store.ts";
import { useState } from "react";
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
import useReorder from "@src/utils/hooks/useReorder.ts";

function PlannedExpenses() {
  const { t } = useTranslation("PlannedExpenses");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { data: plannedExpenses } = usePlannedExpenses();
  const { mutate: upsertPlannedExpenses } = useOptimisticUpsert("planned_expenses");
  const { mutate: deletePlannedExpense } = useDeletePlannedExpense();
  const [deletePlannedExpenseId, setDeletePlannedExpenseId] = useState<number | null>(null);
  const reorderPlannedExpenses = useReorder(plannedExpenses);

  const onConfirmDelete = () => {
    if (deletePlannedExpenseId) deletePlannedExpense(deletePlannedExpenseId);
    setDeletePlannedExpenseId(null);
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
        onDragEnd={(event) => {
          const reorderedPlannedExpenses = reorderPlannedExpenses(event);
          if (reorderedPlannedExpenses) upsertPlannedExpenses(reorderedPlannedExpenses);
        }}
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
