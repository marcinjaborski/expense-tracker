import { useQuery } from "@tanstack/react-query";
import { DateTime } from "luxon";

import { createClient } from "@/utils/supabase/client";

export function useAmountByCategoryAndDate(
  startDate: DateTime<true>,
  endDate: DateTime<true>,
  upToCurrentDay?: boolean,
) {
  const supabase = createClient();

  const startDateSql = startDate.toSQLDate();
  const endDateSql = endDate.toSQLDate();
  return useQuery({
    queryKey: ["amountByCategoryAndDate", startDateSql, endDateSql, upToCurrentDay],
    queryFn: async () =>
      supabase.rpc("get_amount_by_category_and_date", {
        date_start: startDateSql,
        date_end: endDateSql,
        up_to_current_day: upToCurrentDay,
      }),
  });
}
