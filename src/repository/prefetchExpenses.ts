import { QueryClient } from "@tanstack/react-query";

import { Tables } from "@/utils/supabase/database.types";
import { createClient } from "@/utils/supabase/server";
import { ExpenseOption } from "@/utils/types";

export type ExpenseReturnType = Tables<"expenses"> & {
  category: Tables<"categories"> | null;
};

export const prefetchExpenses = async (queryClient: QueryClient, type: ExpenseOption) => {
  const supabase = createClient();
  let query = supabase.from("expenses").select("*, category (*)");
  if (type !== "all") query = query.eq("type", type);
  const { data: expenses } = await query.returns<ExpenseReturnType[]>();
  if (!expenses) return;

  await queryClient.prefetchQuery({
    queryKey: ["expenses", type],
    queryFn: () => expenses,
  });
};
