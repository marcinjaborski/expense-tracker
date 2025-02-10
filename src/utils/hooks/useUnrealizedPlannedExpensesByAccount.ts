import useUnrealizedPlannedExpenses from "@src/utils/hooks/useUnrealizedPlannedExpenses.ts";
import useAccounts from "@src/repository/useAccounts.ts";

function useUnrealizedPlannedExpensesByAccount() {
  const plannedExpenses = useUnrealizedPlannedExpenses("account");
  const { data: accounts } = useAccounts();

  return Object.fromEntries(
    Object.entries(plannedExpenses).map(([id, amount]) => [
      accounts.find((acc) => String(acc.id) === id)?.name,
      amount,
    ]),
  );
}

export default useUnrealizedPlannedExpensesByAccount;
