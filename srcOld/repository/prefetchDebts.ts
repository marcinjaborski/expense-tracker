import { QueryClient } from "@tanstack/react-query";

import { buildDebtsQuery } from "@/repository/buildDebtsQuery";
import { createClient } from "@/utils/supabase/server";

export async function prefetchDebts(queryClient: QueryClient) {
  const supabase = createClient();
  const { data: allDebts } = await buildDebtsQuery(supabase, 0, true);
  const { data: nonSettledDebts } = await buildDebtsQuery(supabase, 0, false);

  await Promise.all([
    queryClient.prefetchInfiniteQuery({
      queryKey: ["debts", true],
      queryFn: () => allDebts,
      initialPageParam: 0,
    }),
    queryClient.prefetchInfiniteQuery({
      queryKey: ["debts", false],
      queryFn: () => nonSettledDebts,
      initialPageParam: 0,
    }),
  ]);
}
