import { useMutation, useQueryClient } from "@tanstack/react-query";
import supabase from "@src/utils/supabase.ts";
import { TablesUpdate } from "@src/utils/database.types.ts";

function useDeleteAccount() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => supabase.from("accounts").delete().eq("id", id),
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ["accounts"] });
      const previousAccounts = queryClient.getQueryData(["accounts"]) as TablesUpdate<"accounts">[];
      const nextAccounts = previousAccounts.filter((account) => account.id !== id);
      queryClient.setQueryData(["accounts"], nextAccounts);
      return { previousAccounts, nextAccounts };
    },
    onError: (_, __, context) => {
      if (context) queryClient.setQueryData(["accounts"], context.previousAccounts);
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: ["accounts"] }),
  });
}

export default useDeleteAccount;
