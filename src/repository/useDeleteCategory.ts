import { useMutation, useQueryClient } from "@tanstack/react-query";
import supabase from "@src/utils/supabase.ts";
import { TablesUpdate } from "@src/utils/database.types.ts";

function useDeleteCategory() {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: number) => supabase.from("categories").delete().eq("id", id),
    onMutate: async (id) => {
      await queryClient.cancelQueries({ queryKey: ["categories"] });
      const previousCategories = queryClient.getQueryData(["categories"]) as TablesUpdate<"categories">[];
      const nextCategories = previousCategories.filter((account) => account.id !== id);
      queryClient.setQueryData(["categories"], nextCategories);
      return { previousCategories, nextCategories };
    },
    onError: (_, __, context) => {
      if (context) queryClient.setQueryData(["categories"], context.previousCategories);
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: ["categories"] }),
  });
}

export default useDeleteCategory;
