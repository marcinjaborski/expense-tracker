import { useForm } from "react-hook-form";
import { FormControl, InputLabel, MenuItem, Select, ToggleButtonGroup } from "@mui/material";
import { useTranslation } from "react-i18next";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import ToggleButtonWithIcon from "@src/components/molecules/ToggleButtonWithIcon";
import { CreateExpenseFormData } from "./types.ts";
import useAccounts from "@src/repository/useAccounts.ts";

function CreateExpenseForm() {
  const { t } = useTranslation("CreateExpense");
  const { register, handleSubmit } = useForm<CreateExpenseFormData>();
  const { data: accounts } = useAccounts();

  const onSubmit = () => {};

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <ToggleButtonGroup>
        <ToggleButtonWithIcon text={t("income")} icon={<AddIcon />} value="income" />
        <ToggleButtonWithIcon text={t("expense")} icon={<RemoveIcon />} value="expense" />
        <ToggleButtonWithIcon text={t("transfer")} icon={<SwapHorizIcon />} value="transfer" />
      </ToggleButtonGroup>
      <FormControl fullWidth>
        <InputLabel>{t("account")}</InputLabel>
        <Select label={t("account")} {...register("account")}>
          {accounts?.map((account) => <MenuItem value={account.id}>{account.name}</MenuItem>)}
        </Select>
      </FormControl>
    </form>
  );
}

export default CreateExpenseForm;
