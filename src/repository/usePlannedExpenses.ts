import { useSuspenseQuery } from "@tanstack/react-query";
import supabase from "@src/utils/supabase.ts";
import queryKey from "@src/utils/queryKey.ts";

function usePlannedExpenses() {
  return useSuspenseQuery({
    queryKey: queryKey.planned_expenses.all,
    queryFn: async () =>
      await supabase
        .from("planned_expenses")
        .select()
        .throwOnError()
        .then((result) => {
          if (result.error) throw result.error;
          return result.data;
        }),
  });
}

export default usePlannedExpenses;
