import { useMutation, useQueryClient } from "@tanstack/react-query";
import supabase from "@src/utils/supabase.ts";
import { TablesUpdate } from "@src/utils/database.types.ts";

function useUpdateExpense() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (expense: TablesUpdate<"expenses">) => {
      if (!expense.id) throw new Error("Expense id missing");
      supabase.from("expenses").update(expense).eq("id", expense.id);
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["expenses"] }),
  });
}

export default useUpdateExpense;
