import { useQuery } from "@tanstack/react-query";
import supabase from "@src/utils/supabase.ts";
import queryKey from "@src/utils/queryKey.ts";

function useTotalDebts() {
  return useQuery({
    queryKey: queryKey.debts.total(),
    queryFn: async () => supabase.rpc("get_total_debts"),
  });
}

export default useTotalDebts;
