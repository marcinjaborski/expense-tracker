import { useMutation, useQueryClient } from "@tanstack/react-query";
import supabase from "@src/utils/supabase.ts";
import queryKey from "@src/utils/queryKey.ts";

function useDeleteDebt() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => supabase.from("debts").delete().eq("id", id).select(),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: queryKey.debts.all }),
  });
}

export default useDeleteDebt;
