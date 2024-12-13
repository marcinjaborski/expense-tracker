"use client";

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createClient } from "@/utils/supabase/client";

export function useDeleteExpense() {
  const supabase = createClient();
  const queryClient = useQueryClient();

  return useMutation<unknown, Error, number>({
    mutationFn: async (id) => supabase.from("expenses").delete().eq("id", id).select(),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["expenses"] }),
  });
}
