import CreateExpenseForm from "@src/components/organisms/CreateExpenseForm";
import { Suspense } from "react";
import { CircularProgress, Stack } from "@mui/material";

function CreateExpense() {
  return (
    <Suspense
      fallback={
        <Stack sx={{ height: "100%", justifyContent: "center", alignItems: "center" }}>
          <CircularProgress />
        </Stack>
      }
    >
      <CreateExpenseForm />
    </Suspense>
  );
}

export default CreateExpense;
