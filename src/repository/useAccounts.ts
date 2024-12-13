import { useQuery } from "@tanstack/react-query";
import supabase from "@src/utils/supabase.ts";

function useAccounts() {
  return useQuery({
    queryKey: ["accounts"],
    queryFn: async () =>
      await supabase
        .from("accounts")
        .select()
        .order("favourite", { ascending: false })
        .throwOnError()
        .then((result) => result.data),
  });
}

export default useAccounts;
