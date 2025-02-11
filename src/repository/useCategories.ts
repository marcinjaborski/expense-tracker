import { useSuspenseQuery } from "@tanstack/react-query";
import supabase from "@src/utils/supabase.ts";
import queryKey from "@src/utils/queryKey.ts";

function useCategories() {
  return useSuspenseQuery({
    queryKey: queryKey.categories.all,
    queryFn: async () => {
      const query = supabase.from("categories").select().order("order");
      return await query.throwOnError().then((result) => {
        if (result.error) throw result.error;
        return result.data;
      });
    },
  });
}

export default useCategories;
