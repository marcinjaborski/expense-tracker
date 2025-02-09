import AddIcon from "@mui/icons-material/Add";
import { Autocomplete, IconButton, Stack, TextField } from "@mui/material";
import ActionDialog from "@src/components/molecules/ActionDialog";
import { useTranslation } from "react-i18next";
import { Controller, useForm } from "react-hook-form";
import { Tables } from "@src/utils/database.types.ts";
import { useAppDispatch, useAppSelector } from "@src/store/store.ts";
import { setDebtDialogOpen } from "@src/store/DialogSlice.ts";
import { useEffect, useState } from "react";
import useOptimisticUpsert from "@src/repository/useOptimisticUpsert.ts";
import { uniq } from "lodash";
import PersonIcon from "@mui/icons-material/Person";
import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";
import useTotalDebts from "@src/repository/useTotalDebts.ts";
import ControlledAmountTextField from "@src/components/atoms/ControlledAmountTextField";
import ControlledTextField from "@src/components/atoms/ControlledTextField";

type FormData = {
  person: string;
  amount: number;
  description: string;
};

type Props = {
  debt: Tables<"debts"> | null;
  resetDebt: () => void;
};

function DebtDialog({ debt, resetDebt }: Props) {
  const { t } = useTranslation("Debts");
  const dispatch = useAppDispatch();
  const [type, setType] = useState<"borrow" | "reimburse">("borrow");
  const { debtDialogOpen } = useAppSelector((state) => state.dialog);
  const { handleSubmit, reset, control } = useForm<FormData>();
  const { mutate: upsertDebts } = useOptimisticUpsert("debts");
  const { data: totalDebts } = useTotalDebts();
  const persons = uniq(Object.keys(totalDebts || {}));

  useEffect(() => {
    if (debt) reset({ person: debt.person, amount: Math.abs(debt.amount), description: debt.description });
    else reset({ person: "", amount: 0, description: "" });
  }, [reset, debt]);

  const onSubmit = (data: FormData) => {
    if (type === "reimburse") data.amount *= -1;
    upsertDebts(debt?.id ? [{ ...data, id: debt.id }] : [data]);
    dispatch(setDebtDialogOpen(false));
  };

  return (
    <ActionDialog
      open={debtDialogOpen}
      setOpen={(open) => {
        if (open) resetDebt();
        dispatch(setDebtDialogOpen(open));
      }}
      fabProps={{
        children: <AddIcon />,
        color: "primary",
        sx: { position: "absolute", bottom: "5rem", left: "50%", transform: "translateX(-50%)" },
      }}
      title={t("createDebt")}
      content={
        <>
          <Stack alignItems="center">
            <PersonIcon fontSize="large" />
            <IconButton
              size="large"
              onClick={() => setType((prevState) => (prevState === "borrow" ? "reimburse" : "borrow"))}
            >
              <ArrowUpwardIcon
                fontSize="large"
                sx={{ transition: "transform .2s ease-in-out", transform: type === "borrow" ? "rotate(180deg)" : null }}
              />
            </IconButton>
          </Stack>
          <Controller
            control={control}
            name="person"
            rules={{ required: true }}
            render={({ field: { value, onChange }, fieldState: { error } }) => (
              <Autocomplete
                freeSolo
                disableClearable
                options={persons}
                inputValue={value}
                onInputChange={(_, value) => onChange(value)}
                renderInput={(params) => <TextField label={t("person")} error={!!error} {...params} />}
              />
            )}
          />
          <ControlledAmountTextField control={control} name="amount" label={t("amount")} />
          <ControlledTextField
            control={control}
            name="description"
            rules={{ required: true }}
            label={t("description")}
          />
        </>
      }
      submitText={t("createDebt")}
      dialogProps={{
        PaperProps: {
          component: "form",
          onSubmit: handleSubmit(onSubmit),
        },
      }}
    />
  );
}

export default DebtDialog;
