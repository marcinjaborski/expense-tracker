import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TablesUpdate } from "@src/utils/database.types.ts";
import supabase from "@src/utils/supabase.ts";

function useUpsertAccounts() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (accounts: TablesUpdate<"accounts">[]) => supabase.from("accounts").upsert(accounts),
    onMutate: async (newAccounts) => {
      await queryClient.cancelQueries({ queryKey: ["accounts"] });
      const previousAccounts = queryClient.getQueryData(["accounts"]) as TablesUpdate<"accounts">[];
      if (newAccounts.length === 1) newAccounts = [...previousAccounts, { ...newAccounts[0], id: Math.random() }];
      queryClient.setQueryData(["accounts"], newAccounts);
      return { previousAccounts, newAccounts };
    },
    onError: (_, __, context) => {
      if (context) queryClient.setQueryData(["accounts"], context.previousAccounts);
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: ["accounts"] }),
  });
}

export default useUpsertAccounts;
