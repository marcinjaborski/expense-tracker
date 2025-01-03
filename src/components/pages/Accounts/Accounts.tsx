import useAccounts from "@src/repository/useAccounts.ts";
import DraggableList from "@src/components/organisms/DraggableList";
import { DragEndEvent } from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";
import useUpsertAccounts from "@src/repository/useUpsertAccounts.ts";
import { Box, IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AccountDialog from "@src/components/organisms/AccountDialog";

function Accounts() {
  const { data: accounts } = useAccounts();
  const { mutate: upsertAccounts } = useUpsertAccounts();

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
                <IconButton>
                  <EditIcon />
                </IconButton>
                <IconButton edge="end">
                  <DeleteIcon />
                </IconButton>
              </Box>
            ),
          },
        }))}
        onDragEnd={onDragEnd}
      />
      <AccountDialog />
    </>
  );
}

export default Accounts;
