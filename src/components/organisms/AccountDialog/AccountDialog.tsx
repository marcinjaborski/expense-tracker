import AddIcon from "@mui/icons-material/Add";
import { TextField } from "@mui/material";
import ActionDialog from "@src/components/molecules/ActionDialog";
import { useTranslation } from "react-i18next";
import useUpsertAccounts from "@src/repository/useUpsertAccounts.ts";
import { useForm } from "react-hook-form";
import AmountTextField from "@src/components/atoms/AmountTextField";
import { useState } from "react";

type FormData = {
  name: string;
  initialBalance: number;
};

function AccountDialog() {
  const { t } = useTranslation("Accounts");
  const { register, handleSubmit } = useForm<FormData>({});
  const { mutate: upsertAccounts } = useUpsertAccounts();
  const [closeDialog, setCloseDialog] = useState(() => () => {});

  const onSubmit = (data: FormData) => {
    upsertAccounts([data]);
    closeDialog();
  };

  return (
    <ActionDialog
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
      setCloseFunction={setCloseDialog}
    />
  );
}

export default AccountDialog;
