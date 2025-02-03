import { Menu, MenuItem, PopoverPosition, TableCell, TableRow } from "@mui/material";
import Amount from "@src/components/atoms/Amount";
import { ExpenseReturnType } from "@src/repository/useExpenses.ts";
import { LongPressReactEvents, useLongPress } from "use-long-press";
import { useCallback, useRef, useState, PointerEvent } from "react";
import { useTranslation } from "react-i18next";
import { useAppDispatch } from "@src/store/store.ts";
import { setExpenseDeleteId, setExpenseToEdit } from "@src/store/ExpenseSlice.ts";
import { useNavigate } from "react-router-dom";
import routes from "@src/utils/routes.ts";

type ExpenseRowProps = {
  expense: ExpenseReturnType;
};

function ExpenseRow({ expense }: ExpenseRowProps) {
  const { t } = useTranslation("ExpenseList");
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [holding, setHolding] = useState(false);
  const [menuPosition, setMenuPosition] = useState<PopoverPosition | undefined>(undefined);
  const rowRef = useRef<HTMLTableRowElement>(null);

  const onLongPress = useCallback((event: LongPressReactEvents) => {
    setMenuPosition({ top: (event as PointerEvent).pageY, left: (event as PointerEvent).pageX });
    setHolding(false);
  }, []);

  const bind = useLongPress(onLongPress, {
    onStart: () => setHolding(true),
    onCancel: () => setHolding(false),
  });

  const onMenuClose = () => setMenuPosition(undefined);

  const onEdit = () => {
    dispatch(setExpenseToEdit(expense));
    navigate(routes.createExpense);
  };

  const onDelete = () => {
    dispatch(setExpenseDeleteId(expense.id));
    onMenuClose();
  };

  return (
    <>
      <TableRow ref={rowRef} {...bind()} hover={holding}>
        <TableCell>{expense.description}</TableCell>
        <TableCell>
          <Amount number={expense.amount} red={expense.type === "expense"} green={expense.type === "income"} />
        </TableCell>
        <TableCell>{expense.category.name}</TableCell>
        <TableCell>{expense.account.name}</TableCell>
      </TableRow>
      <Menu
        open={!!menuPosition}
        anchorEl={rowRef.current}
        onClose={onMenuClose}
        anchorReference="anchorPosition"
        anchorPosition={menuPosition}
      >
        <MenuItem onClick={onEdit}>{t("edit")}</MenuItem>
        <MenuItem onClick={onDelete}>{t("delete")}</MenuItem>
      </Menu>
    </>
  );
}

export default ExpenseRow;
