import { useMutation, useQueryClient } from "@tanstack/react-query";
import supabase from "@src/utils/supabase.ts";
import { TablesUpdate } from "@src/utils/database.types.ts";
import queryKey from "@src/utils/queryKey.ts";

function useDeletePlannedExpense() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => supabase.from("planned_expenses").delete().eq("id", id).throwOnError(),
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: queryKey.planned_expenses.all });
      const previousPlannedExpenses = queryClient.getQueryData(
        queryKey.planned_expenses.all,
      ) as TablesUpdate<"planned_expenses">[];
      const nextPlannedExpenses = previousPlannedExpenses.filter((plannedExpense) => plannedExpense.id !== id);
      queryClient.setQueryData(queryKey.planned_expenses.all, nextPlannedExpenses);
      return { previousPlannedExpenses, nextPlannedExpenses };
    },
    onError: (_, __, context) => {
      if (context) queryClient.setQueryData(queryKey.planned_expenses.all, context.previousPlannedExpenses);
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: queryKey.planned_expenses.all }),
  });
}

export default useDeletePlannedExpense;
