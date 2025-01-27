import supabase from "@src/utils/supabase.ts";
import { Table } from "@src/utils/types.ts";
import { useQuery } from "@tanstack/react-query";
import queryKey from "@src/utils/queryKey.ts";

function useCounts() {
  const tables = ["expenses", "categories", "accounts", "debts"] satisfies Table[];
  return useQuery({
    queryKey: queryKey.counts.all,
    queryFn: () => {
      return Promise.all(
        tables.map(async (table) => {
          const { count } = await supabase.from(table).select("*", { count: "exact", head: true }).throwOnError();
          return { table, count };
        }),
      );
    },
  });
}

export default useCounts;
