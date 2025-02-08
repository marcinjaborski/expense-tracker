import { useTranslation } from "react-i18next";
import { useState } from "react";
import useDebtsByPerson from "@src/utils/hooks/useDebtsByPerson.ts";
import { Box, Checkbox, FormControlLabel } from "@mui/material";
import { Tables } from "@src/utils/database.types.ts";
import ConfirmDialog from "@src/components/organisms/ConfirmDialog";
import useDeleteDebt from "@src/repository/useDeleteDebt.ts";
import DebtDialog from "@src/components/organisms/DebtDialog";
import DebtsAccordion from "@src/components/organisms/DebtsAccordion";

function Debts() {
  const { t } = useTranslation("Debts");
  const [debtToEdit, setDebtToEdit] = useState<Tables<"debts"> | null>(null);
  const [debtDeleteId, setDebtDeleteId] = useState<number | null>(null);
  const [showSettled, setShowSettled] = useState(false);
  const { mutate: deleteDebt } = useDeleteDebt();
  const debtsByPerson = useDebtsByPerson();

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
      {Object.entries(debtsByPerson || {}).map(([person, totalDebts]) => (
        <DebtsAccordion
          key={person}
          person={person}
          totalDebts={totalDebts}
          showSettled={showSettled}
          setDebtToEdit={setDebtToEdit}
          setDebtDeleteId={setDebtDeleteId}
        />
      ))}
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
