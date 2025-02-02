import { useQuery } from "@tanstack/react-query";
import queryKey from "@src/utils/queryKey.ts";
import supabase from "@src/utils/supabase.ts";

function useUser() {
  return useQuery({
    queryKey: queryKey.users.get(),
    queryFn: async () => {
      const { data, error } = await supabase.auth.getUser();
      if (error) throw error;
      return data;
    },
  });
}

export default useUser;
