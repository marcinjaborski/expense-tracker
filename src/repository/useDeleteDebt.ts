import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createClient } from "@/utils/supabase/client";

export function useDeleteDebt() {
  const supabase = createClient();
  const queryClient = useQueryClient();

  return useMutation<unknown, Error, number>({
    mutationFn: async (id) => supabase.from("debts").delete().eq("id", id).select(),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["debts"] }),
  });
}
