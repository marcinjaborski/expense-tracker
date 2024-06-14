import { useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { LuPencil, LuTrash } from "react-icons/lu";

import { useModalContext } from "@/utils/context/ModalContext";
import { useFormatCurrency } from "@/utils/hooks/useFormatCurrency";
import { createClient } from "@/utils/supabase/client";
import { Tables } from "@/utils/supabase/database.types";

type DebtCardProps = {
  debt: Tables<"debts">;
};

export function DebtCard({ debt }: DebtCardProps) {
  const t = useTranslations("Debts");
  const supabase = createClient();
  const queryClient = useQueryClient();
  const formatCurrency = useFormatCurrency();
  const { showUpdateModal, showDeleteModal } = useModalContext();

  const onCheckChange = async (checked: boolean) => {
    await supabase.from("debts").update({ settled: checked }).eq("id", debt.id).select();
    await queryClient.invalidateQueries({ queryKey: ["debts"] });
  };

  return (
    <div className="card w-full bg-base-100 shadow-xl">
      <div className="card-body flex flex-row gap-1">
        <span>{formatCurrency(debt.amount)}</span>
        <span className="grow">{debt.description}</span>
        <button className="btn" type="button" aria-label={t("edit")} onClick={() => showUpdateModal(debt.id)}>
          <LuPencil />
        </button>
        <button className="btn" type="button" aria-label={t("delete")} onClick={() => showDeleteModal(debt.id)}>
          <LuTrash />
        </button>
        <input
          type="checkbox"
          checked={debt.settled}
          className="checkbox"
          onChange={(e) => onCheckChange(e.target.checked)}
        />
      </div>
    </div>
  );
}
