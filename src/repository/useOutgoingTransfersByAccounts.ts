import { useQuery } from "@tanstack/react-query";
import { DateTime } from "luxon";

import { createClient } from "@/utils/supabase/client";

export function useOutgoingTransfersByAccounts(endDate?: DateTime<true>) {
  const supabase = createClient();

  const endDateSql = endDate?.toSQLDate();
  return useQuery({
    queryKey: ["outgoingTransfersByAccounts", endDateSql],
    queryFn: async () => supabase.rpc("get_outgoing_transfers_by_accounts", { date_end: endDateSql }),
  });
}
