import { useQuery } from "@tanstack/react-query";

import { createClient } from "@/utils/supabase/client";

export function useTotalDebts() {
  const supabase = createClient();

  return useQuery({
    queryKey: ["debts", "totalDebts"],
    queryFn: async () => supabase.rpc("get_total_debts"),
  });
}
