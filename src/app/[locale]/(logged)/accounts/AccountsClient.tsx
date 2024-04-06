"use client";

import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";

import { ConfirmModal } from "@/components";
import { useRouter } from "@/navigation";
import { useDeleteAccount } from "@/repository/useDeleteAccount";
import { useUpdateParams } from "@/utils/hooks";
import { DELETE_ID } from "@/utils/searchParams";

export function AccountsClient() {
  const t = useTranslations("Accounts");
  const searchParams = useSearchParams();
  const updateParams = useUpdateParams();
  const router = useRouter();
  const { mutate: deleteAccount } = useDeleteAccount();

  const onConfirmDelete = () => {
    if (!searchParams.has(DELETE_ID)) return;
    deleteAccount(Number(searchParams.get(DELETE_ID)));
    router.refresh();
    updateParams(DELETE_ID, null);
  };

  return (
    <ConfirmModal
      title={t("confirmDelete")}
      onConfirm={onConfirmDelete}
      onCancel={() => updateParams(DELETE_ID, null)}
    />
  );
}
