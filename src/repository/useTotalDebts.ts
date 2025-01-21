import { useQuery } from "@tanstack/react-query";
import supabase from "@src/utils/supabase.ts";

function useTotalDebts() {
  return useQuery({
    queryKey: ["debts", "totalDebts"],
    queryFn: async () => supabase.rpc("get_total_debts"),
  });
}

export default useTotalDebts;
