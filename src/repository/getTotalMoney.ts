import { groupBy, sum, sumBy } from "lodash";

import { getAccounts } from "@/repository/getAccounts";
import { createClient } from "@/utils/supabase/server";

export async function getTotalMoney() {
  const supabase = createClient();
  const { data: accounts } = await getAccounts();
  const { data: expensesPerAccount } = await supabase.rpc("get_total_expenses");
  const expensesByAccount = groupBy(expensesPerAccount, "account");
  const totalMoneyForAccounts = Object.values(expensesByAccount).map((accountExpenses) => {
    const incomes = accountExpenses.find((expense) => expense.type === "income")?.sum || 0;
    const expenses = accountExpenses.find((expense) => expense.type === "expense")?.sum || 0;
    return incomes - expenses;
  });
  return sum(totalMoneyForAccounts) + sumBy(accounts, "initialBalance");
}
