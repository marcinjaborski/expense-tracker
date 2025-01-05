import ToggleButtonWithIcon from "@src/components/molecules/ToggleButtonWithIcon";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import SwapHorizIcon from "@mui/icons-material/SwapHoriz";
import { ToggleButtonGroup } from "@mui/material";
import { ComponentProps } from "react";
import { useTranslation } from "react-i18next";
import { ExpenseType } from "@src/utils/types.ts";

type Props = ComponentProps<typeof ToggleButtonGroup> & {
  onChange: (value: ExpenseType) => void;
};

function ExpenseTypeSelect({ onChange, ...props }: Props) {
  const { t } = useTranslation("CreateExpense");

  return (
    <ToggleButtonGroup exclusive {...props} onChange={(_, newValue) => newValue !== null && onChange(newValue)}>
      <ToggleButtonWithIcon text={t("income")} icon={<AddIcon />} value="income" />
      <ToggleButtonWithIcon text={t("expense")} icon={<RemoveIcon />} value="expense" />
      <ToggleButtonWithIcon text={t("transfer")} icon={<SwapHorizIcon />} value="transfer" />
    </ToggleButtonGroup>
  );
}

export default ExpenseTypeSelect;
