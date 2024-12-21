import { useSuspenseQuery } from "@tanstack/react-query";
import supabase from "@src/utils/supabase.ts";

function useAccounts() {
  return useSuspenseQuery({
    queryKey: ["accounts"],
    queryFn: async () =>
      await supabase
        .from("accounts")
        .select()
        .order("favourite", { ascending: false })
        .throwOnError()
        .then((result) => {
          if (result.error) throw result.error;
          return result.data;
        }),
  });
}

export default useAccounts;
