import CreateExpenseForm from "@src/components/organisms/CreateExpenseForm";
import { Suspense } from "react";
import { CircularProgress, Stack } from "@mui/material";

type CreateExpenseProps = {
  planned: boolean;
};

function CreateExpense({ planned }: CreateExpenseProps) {
  return (
    <Suspense
      fallback={
        <Stack sx={{ height: "100%", justifyContent: "center", alignItems: "center" }}>
          <CircularProgress />
        </Stack>
      }
    >
      <CreateExpenseForm planned={planned} />
    </Suspense>
  );
}

export default CreateExpense;
