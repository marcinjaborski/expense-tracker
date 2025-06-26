import { DateTime } from "luxon";
import { useQuery } from "@tanstack/react-query";
import queryKey from "@src/utils/queryKey.ts";
import supabase from "@src/utils/supabase.ts";

function useCountsByCategoryAndDate(
  startDateObj: DateTime<true>,
  endDateObj: DateTime<true>,
  upToCurrentDay?: boolean,
) {
  const startDate = startDateObj.toSQLDate();
  const endDate = endDateObj.toSQLDate();

  return useQuery({
    queryKey: queryKey.expenses.countsByCategoryAndDate({ startDate, endDate, upToCurrentDay }),
    queryFn: async () =>
      supabase.rpc("get_counts_by_category_and_date", {
        date_start: startDate,
        date_end: endDate,
        up_to_current_day: upToCurrentDay,
      }),
  });
}

export default useCountsByCategoryAndDate;
