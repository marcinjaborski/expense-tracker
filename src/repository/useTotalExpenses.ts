import { useQuery } from "@tanstack/react-query";
import { DateTime } from "luxon";

import { createClient } from "@/utils/supabase/client";

export function useTotalExpenses(endDate?: DateTime<true>) {
  const supabase = createClient();

  const endDateSql = endDate?.toSQLDate();
  return useQuery({
    queryKey: ["totalExpenses", endDateSql],
    queryFn: async () => supabase.rpc("get_total_expenses", { date_end: endDateSql }),
  });
}
