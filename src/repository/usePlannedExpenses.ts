import { useSuspenseQuery } from "@tanstack/react-query";
import supabase from "@src/utils/supabase.ts";
import queryKey from "@src/utils/queryKey.ts";
import { Tables } from "@src/utils/database.types.ts";

export type PlannedExpenseReturnType = Tables<"planned_expenses"> & {
  category: Tables<"categories">;
  account: Tables<"accounts">;
};

function usePlannedExpenses() {
  return useSuspenseQuery({
    queryKey: queryKey.planned_expenses.all,
    queryFn: async () =>
      await supabase
        .from("planned_expenses")
        .select("*, category (*), account (*)")
        .order("order")
        .throwOnError()
        .returns<PlannedExpenseReturnType[]>()
        .then((result) => {
          if (result.error) throw result.error;
          return result.data;
        }),
  });
}

export default usePlannedExpenses;
