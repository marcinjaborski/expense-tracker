import { QueryClient } from "@tanstack/react-query";

import { createClient } from "@/utils/supabase/server";
import { ExpenseTypes } from "@/utils/types";

export const prefetchCategories = async (queryClient: QueryClient) => {
  const supabase = createClient();
  const { data: categories } = await supabase.from("categories").select().order("favourite", { ascending: false });
  if (!categories) return;

  await Promise.all([
    queryClient.prefetchQuery({ queryKey: ["categories", "all"], queryFn: () => categories }),
    ...ExpenseTypes.options.map((type) =>
      queryClient.prefetchQuery({
        queryKey: ["categories", type],
        queryFn: () => categories.filter((category) => category.type === type),
      }),
    ),
  ]);
};
