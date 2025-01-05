import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TablesInsert } from "@src/utils/database.types.ts";
import supabase from "@src/utils/supabase.ts";
import { updateArray } from "@src/utils/functions.ts";

function useUpsertCategories() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (categories: TablesInsert<"categories">[]) => supabase.from("categories").upsert(categories),
    onMutate: async (newAccounts) => {
      await queryClient.cancelQueries({ queryKey: ["categories"] });
      const previousCategories = queryClient.getQueryData(["categories"]) as TablesInsert<"categories">[];
      const nextCategories = updateArray(previousCategories, newAccounts);
      queryClient.setQueryData(["categories"], nextCategories);
      return { previousCategories, nextCategories };
    },
    onError: (_, __, context) => {
      if (context) queryClient.setQueryData(["categories"], context.previousCategories);
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: ["categories"] }),
  });
}

export default useUpsertCategories;
