import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createClient } from "@/utils/supabase/client";

export function useDeleteAccount() {
  const supabase = createClient();

  return useMutation<unknown, Error, number>({
    mutationFn: async (id) => supabase.from("accounts").delete().eq("id", id).select(),
  });
}
