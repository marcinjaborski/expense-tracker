import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TablesUpdate } from "@src/utils/database.types.ts";
import supabase from "@src/utils/supabase.ts";
import { updateArray } from "@src/utils/functions.ts";

function useUpsertAccounts() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (accounts: TablesUpdate<"accounts">[]) => supabase.from("accounts").upsert(accounts),
    onMutate: async (newAccounts) => {
      await queryClient.cancelQueries({ queryKey: ["accounts"] });
      const previousAccounts = queryClient.getQueryData(["accounts"]) as TablesUpdate<"accounts">[];
      const nextAccounts = updateArray(previousAccounts, newAccounts);
      queryClient.setQueryData(["accounts"], nextAccounts);
      return { previousAccounts, nextAccounts };
    },
    onError: (_, __, context) => {
      if (context) queryClient.setQueryData(["accounts"], context.previousAccounts);
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: ["accounts"] }),
  });
}

export default useUpsertAccounts;
