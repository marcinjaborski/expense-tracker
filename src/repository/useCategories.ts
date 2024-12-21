import { useSuspenseQuery } from "@tanstack/react-query";
import supabase from "@src/utils/supabase.ts";

function useCategories() {
  return useSuspenseQuery({
    queryKey: ["categories"],
    queryFn: async () => {
      const query = supabase.from("categories").select().order("favourite", { ascending: false });
      return await query.throwOnError().then((result) => {
        if (result.error) throw result.error;
        return result.data;
      });
    },
  });
}

export default useCategories;
