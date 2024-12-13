"use client";

import { useClickAway } from "@uidotdev/usehooks";
import { useTranslations } from "next-intl";
import { useCallback, useState } from "react";
import { LuArrowDown } from "react-icons/lu";
import { useLongPress } from "use-long-press";

import { DynamicIcon } from "@/components/shared";
import { Link } from "@/navigation";
import { ExpenseReturnType } from "@/repository/buildExpensesQuery";
import { useModalContext } from "@/utils/context/ModalContext";
import { cn } from "@/utils/functions";
import { useFormatCurrency } from "@/utils/hooks/useFormatCurrency";
import { ExpenseTypes } from "@/utils/types";

type ExpenseCellProps = {
  expense: ExpenseReturnType;
};

export function ExpenseRow({ expense }: ExpenseCellProps) {
  const t = useTranslations("ExpenseList");
  const formatCurrency = useFormatCurrency();
  const [holding, setHolding] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const { showDeleteModal } = useModalContext();
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
    showDeleteModal(expense.id);
  };

  return (
    <tr ref={ref} className={cn("relative transition-colors", { active: holding })} {...bind()}>
      <td>{expense.description}</td>
      <td className="flex items-center gap-2">
        <DynamicIcon icon={expense.category?.icon} />
        <div className="flex flex-col gap-0.5">
          <span>{expense.category?.name}</span>
          {expense.type === ExpenseTypes.enum.transfer ? (
            <span className="flex items-center">
              {expense.from_account?.name}
              <LuArrowDown />
            </span>
          ) : null}
          <span>{expense.account?.name}</span>
        </div>
      </td>
      <td
        className={cn("text-right", {
          "text-expense": expense.type === ExpenseTypes.enum.expense,
          "text-income": expense.type === ExpenseTypes.enum.income,
        })}
      >
        {formatCurrency(expense.amount)}
      </td>
      {menuVisible ? (
        <td className={cn("menu absolute left-0 top-full z-30 w-56 rounded-box bg-base-200")}>
          <li>
            <Link
              href={{
                pathname: "/create-expense",
                query: new URLSearchParams({ updateId: String(expense.id) }).toString(),
              }}
            >
              {t("edit")}
            </Link>
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
