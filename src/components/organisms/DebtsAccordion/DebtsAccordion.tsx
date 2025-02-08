import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Fab,
  IconButton,
  List,
  ListItem,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import useDebts from "@src/repository/useDebts.ts";
import Amount from "@src/components/atoms/Amount";
import HandshakeIcon from "@mui/icons-material/Handshake";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { setDebtDialogOpen } from "@src/store/DialogSlice.ts";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { DateTime } from "luxon";
import supabase from "@src/utils/supabase.ts";
import { useTranslation } from "react-i18next";
import { useAppDispatch } from "@src/store/store.ts";
import useOptimisticUpsert from "@src/repository/useOptimisticUpsert.ts";
import { Dispatch, SetStateAction, useRef } from "react";
import useObserver from "@src/utils/hooks/useObserver.ts";
import { Tables } from "@src/utils/database.types.ts";

type DebtsAccordionProps = {
  person: string;
  totalDebts: number;
  showSettled: boolean;
  setDebtToEdit: Dispatch<SetStateAction<Tables<"debts"> | null>>;
  setDebtDeleteId: Dispatch<SetStateAction<number | null>>;
};

function DebtsAccordion({ person, totalDebts, showSettled, setDebtToEdit, setDebtDeleteId }: DebtsAccordionProps) {
  const { t } = useTranslation("Debts");
  const dispatch = useAppDispatch();
  const { data: debts, fetchNextPage } = useDebts({ person, showSettled });
  const { mutate: upsertDebts } = useOptimisticUpsert("debts");
  const observerTarget = useRef(null);
  useObserver(observerTarget, fetchNextPage);

  const settleAll = async (person: string, amount: number) => {
    upsertDebts([
      {
        person,
        amount: -amount,
        description: t("settleAll"),
        settled: true,
      },
    ]);
    await supabase.from("debts").update({ settled: true }).eq("settled", false).eq("person", person);
  };

  return (
    <Accordion>
      <AccordionSummary
        sx={{ display: "flex", "&>.MuiAccordionSummary-content": { alignItems: "center", gap: 1, height: 40 } }}
      >
        <Typography>{person}: </Typography>
        <Amount number={totalDebts} useNumberSignToColor />
        {totalDebts !== 0 ? (
          <Fab
            onClick={async (event) => {
              event.stopPropagation();
              await settleAll(person, totalDebts);
            }}
            size="small"
          >
            <HandshakeIcon />
          </Fab>
        ) : null}
      </AccordionSummary>
      <AccordionDetails>
        {debts?.length === 0 ? (
          <Typography variant="caption" fontStyle="italic">
            {t("noDebts")}
          </Typography>
        ) : null}
        {debts && debts.length > 0 ? (
          <List>
            {debts?.map((debt) => (
              <ListItem
                key={debt.id}
                secondaryAction={
                  <Box>
                    <IconButton onClick={() => upsertDebts([{ ...debt, settled: !debt.settled }])}>
                      {debt.settled ? <VisibilityIcon /> : <VisibilityOffIcon />}
                    </IconButton>
                    <IconButton
                      onClick={() => {
                        dispatch(setDebtDialogOpen(true));
                        setDebtToEdit(debt);
                      }}
                    >
                      <EditIcon />
                    </IconButton>
                    <IconButton edge="end" onClick={() => setDebtDeleteId(debt.id)}>
                      <DeleteIcon />
                    </IconButton>
                  </Box>
                }
              >
                <ListItemText
                  primary={
                    <Stack direction="row" sx={{ gap: 1, alignItems: "end" }}>
                      <Amount number={debt.amount} useNumberSignToColor />
                      <Typography variant="caption">{DateTime.fromISO(debt.created_at).toFormat("d.MM.yy")}</Typography>
                    </Stack>
                  }
                  secondary={debt.description}
                />
              </ListItem>
            ))}
          </List>
        ) : null}
        <div ref={observerTarget}></div>
      </AccordionDetails>
    </Accordion>
  );
}

export default DebtsAccordion;
