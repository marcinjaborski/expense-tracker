import AddIcon from "@mui/icons-material/Add";
import { TextField } from "@mui/material";
import ActionDialog from "@src/components/molecules/ActionDialog";
import { useTranslation } from "react-i18next";
import { useForm } from "react-hook-form";
import AmountTextField from "@src/components/atoms/AmountTextField";
import { Tables } from "@src/utils/database.types.ts";
import { useAppDispatch, useAppSelector } from "@src/store/store.ts";
import { setAccountDialogOpen } from "@src/store/DialogSlice.ts";
import { useEffect } from "react";
import useOptimisticUpsert from "@src/repository/useOptimisticUpsert.ts";

type FormData = {
  name: string;
  initialBalance: number;
};

type Props = {
  account: Tables<"accounts"> | null;
  resetAccount: () => void;
};

function AccountDialog({ account, resetAccount }: Props) {
  const { t } = useTranslation("Accounts");
  const dispatch = useAppDispatch();
  const { accountDialogOpen } = useAppSelector((state) => state.dialog);
  const { register, handleSubmit, reset } = useForm<FormData>();
  const { mutate: upsertAccounts } = useOptimisticUpsert("accounts");

  useEffect(() => {
    if (account) reset({ name: account.name, initialBalance: account.initialBalance });
    else reset({ name: "", initialBalance: 0 });
  }, [reset, account]);

  const onSubmit = (data: FormData) => {
    upsertAccounts(account?.id ? [{ ...data, id: account.id }] : [data]);
    dispatch(setAccountDialogOpen(false));
  };

  return (
    <ActionDialog
      open={accountDialogOpen}
      setOpen={(open) => {
        if (open) resetAccount();
        dispatch(setAccountDialogOpen(open));
      }}
      fabProps={{
        children: <AddIcon />,
        color: "primary",
        sx: { position: "absolute", bottom: "5rem", left: "50%", transform: "translateX(-50%)" },
      }}
      title={t("createAccountTitle")}
      content={
        <>
          <TextField label={t("name")} {...register("name", { required: true })} />
          <AmountTextField
            label={t("initialBalance")}
            {...register("initialBalance", {
              setValueAs: (value: string) => (value === "" ? 0 : parseFloat(value)),
            })}
          />
        </>
      }
      submitText={t("createAccount")}
      dialogProps={{
        PaperProps: {
          component: "form",
          onSubmit: handleSubmit(onSubmit),
        },
      }}
    />
  );
}

export default AccountDialog;
