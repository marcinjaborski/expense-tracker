import { QueryClient } from "@tanstack/react-query";

import { createClient } from "@/utils/supabase/server";

export const prefetchAccounts = async (queryClient: QueryClient) => {
  const supabase = createClient();
  const { data: accounts } = await supabase.from("accounts").select().order("favourite", { ascending: false });
  if (!accounts) return;

  await queryClient.prefetchQuery({
    queryKey: ["accounts"],
    queryFn: () => accounts,
  });
};
