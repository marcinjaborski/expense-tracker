import { DateTime } from "luxon";
import { useQuery } from "@tanstack/react-query";
import queryKey from "@src/utils/queryKey.ts";
import supabase from "@src/utils/supabase.ts";

function useTotalExpenses(endDateObj?: DateTime<true>) {
  const endDate = endDateObj?.toSQLDate();

  return useQuery({
    queryKey: queryKey.expenses.total(endDate),
    queryFn: async () => supabase.rpc("get_total_expenses", { date_end: endDate }),
  });
}

export default useTotalExpenses;
