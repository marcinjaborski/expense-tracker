import { useMutation, useQueryClient } from "@tanstack/react-query";
import { TablesUpdate } from "@src/utils/database.types.ts";
import supabase from "@src/utils/supabase.ts";
import { updateArray } from "@src/utils/functions.ts";
import { Table } from "@src/utils/types.ts";
import queryKey from "@src/utils/queryKey.ts";

function useOptimisticUpsert(table: Table) {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (data: TablesUpdate<typeof table>[]) => supabase.from(table).upsert(data),
    onMutate: async (newData) => {
      await queryClient.cancelQueries({ queryKey: queryKey[table].all });
      const previousData = (queryClient.getQueryData(queryKey[table].all) as TablesUpdate<typeof table>[]) || [];
      const nextData = updateArray(previousData, newData);
      queryClient.setQueryData(queryKey[table].all, nextData);
      return { previousData, nextData };
    },
    onError: (_, __, context) => {
      if (context) queryClient.setQueryData(queryKey[table].all, context.previousData);
    },
    onSettled: () => queryClient.invalidateQueries({ queryKey: queryKey[table].all }),
  });
}

export default useOptimisticUpsert;
