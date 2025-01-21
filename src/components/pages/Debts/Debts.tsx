import { useTranslation } from "react-i18next";
import { Fragment, useRef, useState } from "react";
import useDebts from "@src/repository/useDebts.ts";
import useDebtsByPerson from "@src/utils/hooks/useDebtsByPerson.ts";
import useObserver from "@src/utils/hooks/useObserver.ts";
import supabase from "@src/utils/supabase.ts";
import useOptimisticUpsert from "@src/repository/useOptimisticUpsert.ts";
import { DateTime } from "luxon";
import { groupBy } from "lodash";
import {
  Box,
  Checkbox,
  Divider,
  Fab,
  FormControlLabel,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import Amount from "@src/components/atoms/Amount";
import HandshakeIcon from "@mui/icons-material/Handshake";
import { setDebtDialogOpen } from "@src/store/DialogSlice.ts";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useAppDispatch } from "@src/store/store.ts";
import { Tables } from "@src/utils/database.types.ts";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import ConfirmDialog from "@src/components/organisms/ConfirmDialog";
import useDeleteDebt from "@src/repository/useDeleteDebt.ts";
import DebtDialog from "@src/components/organisms/DebtDialog";

function Debts() {
  const { t } = useTranslation("Debts");
  const dispatch = useAppDispatch();
  const [debtToEdit, setDebtToEdit] = useState<Tables<"debts"> | null>(null);
  const [debtDeleteId, setDebtDeleteId] = useState<number | null>(null);
  const [showSettled, setShowSettled] = useState(false);
  const { data: debts, fetchNextPage } = useDebts({ showSettled });
  const { mutate: deleteDebt } = useDeleteDebt();
  const debtsByPerson = useDebtsByPerson();
  const { mutate: upsertDebts } = useOptimisticUpsert("debts");
  const observerTarget = useRef(null);
  useObserver(observerTarget, fetchNextPage);

  const groupedDebts = groupBy(debts, "person");

  const settleAll = async (person: string, amount: number) => {
    upsertDebts([{ person, amount, description: t("settleAll", { date: DateTime.now().toLocaleString() }) }]);
    await supabase.from("debts").update({ settled: true }).eq("settled", false).eq("person", person);
  };

  const onConfirmDelete = () => {
    if (debtDeleteId) deleteDebt(debtDeleteId);
    setDebtDeleteId(null);
  };

  return (
    <Box sx={{ p: 2 }}>
      <FormControlLabel
        label={t("showSettled")}
        control={<Checkbox checked={showSettled} onChange={(_, checked) => setShowSettled(checked)} />}
      />
      {Object.entries(groupedDebts).map(([person, personDebts]) => (
        <Fragment key={person}>
          <Stack direction="row" alignItems="center" spacing={1}>
            <Typography>{person}: </Typography>
            <Amount number={debtsByPerson?.[person] || 0} useNumberSignToColor />
            {debtsByPerson && debtsByPerson[person] !== 0 ? (
              <Fab onClick={() => settleAll(person, debtsByPerson[person])} size="small">
                <HandshakeIcon />
              </Fab>
            ) : null}
          </Stack>
          <List>
            {personDebts.map((personDebt) => (
              <ListItem
                key={personDebt.id}
                secondaryAction={
                  <Box>
                    <IconButton onClick={() => upsertDebts([{ ...personDebt, settled: !personDebt.settled }])}>
                      {personDebt.settled ? <VisibilityIcon /> : <VisibilityOffIcon />}
                    </IconButton>
                    <IconButton
                      onClick={() => {
                        dispatch(setDebtDialogOpen(true));
                        setDebtToEdit(personDebt);
                      }}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton edge="end" onClick={() => setDebtDeleteId(personDebt.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                }
              >
                <ListItemText
                  primary={<Amount number={personDebt.amount} useNumberSignToColor />}
                  secondary={personDebt.description}
                />
              </ListItem>
            ))}
          </List>
          <Divider sx={{ mb: 2 }} />
        </Fragment>
      ))}
      <div ref={observerTarget}></div>
      <DebtDialog debt={debtToEdit} resetDebt={() => setDebtToEdit(null)} />
      <ConfirmDialog
        title={t("confirmDelete")}
        open={debtDeleteId !== null}
        onCancel={() => setDebtDeleteId(null)}
        onConfirm={onConfirmDelete}
      />
    </Box>
  );
}

export default Debts;
