import { DateTime } from "luxon";
import { useQuery } from "@tanstack/react-query";
import supabase from "@src/utils/supabase.ts";
import queryKey from "@src/utils/queryKey.ts";

function useOutgoingTransfersByAccounts(endDateObj?: DateTime<true>) {
  const endDate = endDateObj?.toSQLDate();
  return useQuery({
    queryKey: queryKey.expenses.outgoingTransfersByAccounts({ endDate }),
    queryFn: async () => supabase.rpc("get_outgoing_transfers_by_accounts", { date_end: endDate }),
  });
}

export default useOutgoingTransfersByAccounts;
