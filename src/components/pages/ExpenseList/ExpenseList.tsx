import { Stack, ToggleButtonGroup } from "@mui/material";
import ToggleButtonWithIcon from "@src/components/molecules/ToggleButtonWithIcon";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import CategoryIcon from "@mui/icons-material/Category";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import { useTranslation } from "react-i18next";
import { useRef, useState } from "react";
import { ExpenseOption } from "@src/utils/types.ts";
import useExpenses from "@src/repository/useExpenses.ts";
import useObserver from "@src/utils/hooks/useObserver.ts";
import ExpenseFilterDialog from "@src/components/organisms/ExpenseFilterDialog";
import { useAppDispatch, useAppSelector } from "@src/store/store.ts";
import ExpensesTableByDate from "../../organisms/ExpensesTableByDate";
import ExpensesTable from "@src/components/organisms/ExpensesTable";
import ConfirmDialog from "@src/components/organisms/ConfirmDialog";
import { setExpenseDeleteId } from "@src/store/ExpenseSlice.ts";
import useDeleteExpense from "@src/repository/useDeleteExpense.ts";
import { notNull } from "@src/utils/functions.ts";

function ExpenseList() {
  const { t } = useTranslation("ExpenseList");
  const [type, setType] = useState<ExpenseOption>("expense");
  const dispatch = useAppDispatch();
  const { q, categories, accounts, dir, sort, dateFrom, dateTo, amountFrom, amountTo } = useAppSelector(
    (state) => state.expenseFilter,
  );
  const { expenseDeleteId } = useAppSelector((state) => state.expense);
  const { data, fetchNextPage } = useExpenses({
    type,
    q,
    accounts,
    categories,
    sort,
    dir,
    dateFrom,
    dateTo,
    amountFrom,
    amountTo,
  });
  const expenses = data?.pages.flat().filter(notNull) || [];
  const { mutate: deleteExpense } = useDeleteExpense();
  const observerTarget = useRef(null);
  useObserver(observerTarget, fetchNextPage);

  const onConfirmDelete = () => {
    if (expenseDeleteId) deleteExpense(expenseDeleteId);
    dispatch(setExpenseDeleteId(null));
  };

  return (
    <Stack sx={{ height: "100%", p: 2 }}>
      <ToggleButtonGroup exclusive value={type} onChange={(_, newValue) => newValue !== null && setType(newValue)}>
        <ToggleButtonWithIcon text={t("all")} icon={<CategoryIcon />} value="all" />
        <ToggleButtonWithIcon text={t("incomes")} icon={<AddIcon />} value="income" />
        <ToggleButtonWithIcon text={t("expenses")} icon={<RemoveIcon />} value="expense" />
        <ToggleButtonWithIcon text={t("transfers")} icon={<SwapHorizIcon />} value="transfer" />
      </ToggleButtonGroup>
      {sort === "date" ? <ExpensesTableByDate expenses={expenses} /> : <ExpensesTable expenses={expenses} />}
      <div ref={observerTarget} />
      <ExpenseFilterDialog />
      <ConfirmDialog
        title={t("confirmDelete")}
        open={expenseDeleteId !== null}
        onCancel={() => dispatch(setExpenseDeleteId(null))}
        onConfirm={onConfirmDelete}
      />
    </Stack>
  );
}

export default ExpenseList;
