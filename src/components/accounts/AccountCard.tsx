"use client";

import { useTranslations } from "next-intl";
import { LuPencil, LuTrash } from "react-icons/lu";

import { useModalContext } from "@/utils/context/ModalContext";
import { useFormatCurrency } from "@/utils/hooks/useFormatCurrency";
import { Tables } from "@/utils/supabase/database.types";

type AccountCardProps = {
  account: Tables<"accounts">;
};

export function AccountCard({ account }: AccountCardProps) {
  const t = useTranslations("Accounts");
  const formatCurrency = useFormatCurrency();
  const { showUpdateModal, showDeleteModal } = useModalContext();

  return (
    <div className="card w-full bg-base-100 shadow-xl">
      <div className="card-body">
        <div className="card-title">{account.name}</div>
        <p>{formatCurrency(account.initialBalance)}</p>
        <div className="card-actions justify-end [&_svg]:text-xl">
          <button className="btn" type="button" aria-label={t("edit")} onClick={() => showUpdateModal(account.id)}>
            <LuPencil />
          </button>
          <button className="btn" type="button" aria-label={t("delete")} onClick={() => showDeleteModal(account.id)}>
            <LuTrash />
          </button>
        </div>
      </div>
    </div>
  );
}
