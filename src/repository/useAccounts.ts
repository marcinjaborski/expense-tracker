import { useSuspenseQuery } from "@tanstack/react-query";
import supabase from "@src/utils/supabase.ts";
import queryKey from "@src/utils/queryKey.ts";

function useAccounts() {
  return useSuspenseQuery({
    queryKey: queryKey.accounts.all,
    queryFn: async () =>
      await supabase
        .from("accounts")
        .select()
        .order("order")
        .throwOnError()
        .then((result) => {
          if (result.error) throw result.error;
          return result.data;
        }),
  });
}

export default useAccounts;
