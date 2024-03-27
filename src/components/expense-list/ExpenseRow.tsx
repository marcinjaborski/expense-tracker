"use client";

import { useClickAway } from "@uidotdev/usehooks";
import { useTranslations } from "next-intl";
import { useCallback, useState } from "react";
import { useLongPress } from "use-long-press";

import { DynamicIcon } from "@/components/shared";
import { ExpenseReturnType } from "@/repository/buildExpensesQuery";
import { cn, getModal } from "@/utils/functions";
import { useUpdateParams } from "@/utils/hooks";
import { CONFIRM_MODAL } from "@/utils/ids";
import { DELETE_ID } from "@/utils/searchParams";
import { ExpenseTypes } from "@/utils/types";

type ExpenseCellProps = {
  expense: ExpenseReturnType;
};

export function ExpenseRow({ expense }: ExpenseCellProps) {
  const t = useTranslations("ExpenseList");
  const updateParams = useUpdateParams();
  const [holding, setHolding] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const ref = useClickAway<HTMLTableRowElement>(() => {
    setMenuVisible(false);
  });

  const onLongPress = useCallback(() => {
    setMenuVisible(true);
    setHolding(false);
  }, []);

  const bind = useLongPress(onLongPress, {
    onStart: () => setHolding(true),
    onCancel: () => setHolding(false),
  });

  const onDelete = () => {
    setMenuVisible(false);
    getModal(CONFIRM_MODAL).showModal();
    updateParams(DELETE_ID, String(expense.id));
  };

  return (
    <tr ref={ref} className={cn("relative transition-colors", { active: holding })} {...bind()}>
      <td>{expense.description}</td>
      <td className="flex items-center gap-2">
        <DynamicIcon icon={expense.category?.icon} />
        {expense.category?.name}
      </td>
      <td
        className={cn("text-right", {
          "text-red-300": expense.type === ExpenseTypes.enum.expense,
          "text-green-300": expense.type === ExpenseTypes.enum.income,
        })}
      >
        {expense.amount}
      </td>
      {menuVisible ? (
        <td className={cn("menu absolute left-0 top-full z-30 w-56 rounded-box bg-base-200")}>
          <li>
            <span>{t("edit")}</span>
          </li>
          <li>
            <button type="button" onClick={onDelete}>
              {t("delete")}
            </button>
          </li>
        </td>
      ) : null}
    </tr>
  );
}
