import useAccounts from "@src/repository/useAccounts.ts";
import DraggableList from "@src/components/organisms/DraggableList";
import { DragEndEvent } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import useUpsertAccounts from "@src/repository/useUpsertAccounts.ts";
import { Box, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AccountDialog from "@src/components/organisms/AccountDialog";
import { useState } from "react";
import { Tables } from "@src/utils/database.types.ts";
import { useAppDispatch } from "@src/store/store.ts";
import { setAccountDialogOpen } from "@src/store/DialogSlice.ts";
import useDeleteAccount from "@src/repository/useDeleteAccount.ts";
import ConfirmDialog from "@src/components/organisms/ConfirmDialog";
import { useTranslation } from "react-i18next";

function Accounts() {
  const { t } = useTranslation("Accounts");
  const dispatch = useAppDispatch();
  const { data: accounts } = useAccounts();
  const { mutate: upsertAccounts } = useUpsertAccounts();
  const { mutate: deleteAccount } = useDeleteAccount();
  const [accountToEdit, setAccountToEdit] = useState<Tables<"accounts"> | null>(null);
  const [deleteAccountId, setDeleteAccountId] = useState<number | null>(null);

  const onConfirmDelete = () => {
    if (deleteAccountId) deleteAccount(deleteAccountId);
    setDeleteAccountId(null);
  };

  const onDragEnd = async ({ active, over }: DragEndEvent) => {
    if (!over || active.id === over.id) return;
    const oldIndex = accounts.findIndex((account) => account.id === active.id);
    const newIndex = accounts.findIndex((account) => account.id === over.id);
    const newAccounts = arrayMove(accounts, oldIndex, newIndex);
    upsertAccounts(newAccounts);
  };

  return (
    <>
      <DraggableList
        items={accounts.map((account) => ({
          id: account.id,
          primary: account.name,
          listItemProps: {
            sx: { pr: 10 },
            secondaryAction: (
              <Box>
                <IconButton
                  onClick={() => {
                    setAccountToEdit(account);
                    dispatch(setAccountDialogOpen(true));
                  }}
                >
                  <EditIcon />
                </IconButton>
                <IconButton edge="end" onClick={() => setDeleteAccountId(account.id)}>
                  <DeleteIcon />
                </IconButton>
              </Box>
            ),
          },
        }))}
        onDragEnd={onDragEnd}
      />
      <AccountDialog account={accountToEdit} resetAccount={() => setAccountToEdit(null)} />
      <ConfirmDialog
        title={t("confirmDelete")}
        open={deleteAccountId !== null}
        onCancel={() => setDeleteAccountId(null)}
        onConfirm={onConfirmDelete}
      />
    </>
  );
}

export default Accounts;
