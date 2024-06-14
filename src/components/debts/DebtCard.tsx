import { useQueryClient } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { LuEye, LuEyeOff, LuPencil, LuTrash } from "react-icons/lu";

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

  const onSettledChange = async () => {
    await supabase.from("debts").update({ settled: !debt.settled }).eq("id", debt.id).select();
    await queryClient.invalidateQueries({ queryKey: ["debts"] });
  };

  return (
    <div className="card w-full bg-base-100 shadow-xl">
      <div className="card-body flex flex-col gap-5">
        <div className="flex flex-row items-center gap-1">
          <div className="grow">{formatCurrency(debt.amount)}</div>
          <button className="btn" type="button" aria-label={t("edit")} onClick={() => showUpdateModal(debt.id)}>
            <LuPencil />
          </button>
          <button className="btn" type="button" aria-label={t("delete")} onClick={() => showDeleteModal(debt.id)}>
            <LuTrash />
          </button>
          <button className="btn" type="button" aria-label={t("toggleSettled")} onClick={onSettledChange}>
            {debt.settled ? <LuEye /> : <LuEyeOff />}
          </button>
        </div>
        {debt.description ? <span>{debt.description}</span> : null}
      </div>
    </div>
  );
}
