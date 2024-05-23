"use client";

import { useTranslations } from "next-intl";
import { LuPencil, LuTrash } from "react-icons/lu";

import { getModal } from "@/utils/functions";
import { useUpdateParams } from "@/utils/hooks";
import { useFormatCurrency } from "@/utils/hooks/useFormatCurrency";
import { CONFIRM_MODAL, CREATE_ACCOUNT_MODAL } from "@/utils/ids";
import { DELETE_ID, UPDATE_ID } from "@/utils/searchParams";
import { Tables } from "@/utils/supabase/database.types";

type AccountCardProps = {
  account: Tables<"accounts">;
};

export function AccountCard({ account }: AccountCardProps) {
  const t = useTranslations("Accounts");
  const updateParams = useUpdateParams();
  const formatCurrency = useFormatCurrency();

  const onEdit = () => {
    getModal(CREATE_ACCOUNT_MODAL).showModal();
    updateParams(UPDATE_ID, String(account.id));
  };

  const onDelete = () => {
    getModal(CONFIRM_MODAL).showModal();
    updateParams(DELETE_ID, String(account.id));
  };

  return (
    <div className="card w-full bg-base-100 shadow-xl">
      <div className="card-body">
        <div className="card-title">{account.name}</div>
        <p>{formatCurrency(account.initialBalance)}</p>
        <div className="card-actions justify-end [&_svg]:text-xl">
          <button className="btn" type="button" aria-label={t("edit")} onClick={onEdit}>
            <LuPencil />
          </button>
          <button className="btn" type="button" aria-label={t("delete")} onClick={onDelete}>
            <LuTrash />
          </button>
        </div>
      </div>
    </div>
  );
}
