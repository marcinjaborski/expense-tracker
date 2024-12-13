"use client";

import { useTranslations } from "next-intl";

import { ConfirmModal, CreateButton } from "@/components";
import { AccountCard, CreateAccountModal } from "@/components/accounts";
import { FormWrap } from "@/components/shared/FormWrap";
import { useAccounts } from "@/repository/useAccounts";
import { useDeleteAccount } from "@/repository/useDeleteAccount";
import { ModalContext } from "@/utils/context/ModalContext";
import { useMutateModals } from "@/utils/hooks";
import { CREATE_ACCOUNT_MODAL } from "@/utils/ids";

export function AccountsClient() {
  const t = useTranslations("Accounts");
  const { data: accounts } = useAccounts();
  const { mutate: deleteAccount } = useDeleteAccount();
  const { contextValue, deleteId, updateId } = useMutateModals(CREATE_ACCOUNT_MODAL);

  const accountToUpdate = accounts?.find((acc) => acc.id === updateId);

  return (
    <ModalContext.Provider value={contextValue}>
      <div className="mt-3 flex h-full w-full flex-col gap-4">
        {!accounts?.length ? (
          <div>{t("noAccounts")}</div>
        ) : (
          accounts.map((account) => <AccountCard key={account.id} account={account} />)
        )}
      </div>
      <CreateButton label={t("createAccount")} createFn={contextValue.showCreateModal} />
      <FormWrap<typeof CreateAccountModal> Form={CreateAccountModal} account={accountToUpdate} />
      <ConfirmModal title={t("confirmDelete")} onConfirm={() => deleteId && deleteAccount(deleteId)} />
    </ModalContext.Provider>
  );
}
