import { useMutation, useQueryClient } from "@tanstack/react-query";
import supabase from "@src/utils/supabase.ts";
import queryKey from "@src/utils/queryKey.ts";

function useDeleteExpense() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => supabase.from("expenses").delete().eq("id", id).select(),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKey.expenses.all }),
  });
}

export default useDeleteExpense;
