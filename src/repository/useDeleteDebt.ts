import { useMutation, useQueryClient } from "@tanstack/react-query";
import supabase from "@src/utils/supabase.ts";

function useDeleteDebt() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => supabase.from("debts").delete().eq("id", id).select(),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["debts"] }),
  });
}

export default useDeleteDebt;
