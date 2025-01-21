import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Database, TablesUpdate } from "@src/utils/database.types.ts";
import supabase from "@src/utils/supabase.ts";
import { updateArray } from "@src/utils/functions.ts";

function useOptimisticUpsert(table: keyof Database["public"]["Tables"]) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: TablesUpdate<typeof table>[]) => supabase.from(table).upsert(data),
    onMutate: async (newData) => {
      await queryClient.cancelQueries({ queryKey: [table] });
      const previousData = (queryClient.getQueryData([table]) as TablesUpdate<typeof table>[]) || [];
      const nextData = updateArray(previousData, newData);
      queryClient.setQueryData([table], nextData);
      return { previousData, nextData };
    },
    onError: (_, __, context) => {
      if (context) queryClient.setQueryData([table], context.previousData);
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: [table] }),
  });
}

export default useOptimisticUpsert;
