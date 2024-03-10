import { QueryClient } from "@tanstack/react-query";

import { createClient } from "@/utils/supabase/server";
import { ExpenseTypes } from "@/utils/types";

export const prefetchCategories = async (queryClient: QueryClient) => {
  const supabase = createClient();
  const { data: categories } = await supabase.from("categories").select();
  if (!categories) return;

  await Promise.all(
    ExpenseTypes.options.map((type) =>
      queryClient.prefetchQuery({
        queryKey: ["categories", type],
        queryFn: () => categories.filter((category) => category.type === type),
      }),
    ),
  );
};
