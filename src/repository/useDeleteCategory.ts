import { useMutation, useQueryClient } from "@tanstack/react-query";
import supabase from "@src/utils/supabase.ts";
import { TablesUpdate } from "@src/utils/database.types.ts";
import queryKey from "@src/utils/queryKey.ts";

function useDeleteCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => supabase.from("categories").delete().eq("id", id),
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: queryKey.categories.all });
      const previousCategories = queryClient.getQueryData(queryKey.categories.all) as TablesUpdate<"categories">[];
      const nextCategories = previousCategories.filter((account) => account.id !== id);
      queryClient.setQueryData(queryKey.categories.all, nextCategories);
      return { previousCategories, nextCategories };
    },
    onError: (_, __, context) => {
      if (context) queryClient.setQueryData(queryKey.categories.all, context.previousCategories);
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: queryKey.categories.all }),
  });
}

export default useDeleteCategory;
