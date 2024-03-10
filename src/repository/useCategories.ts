"use client";

import { useQuery } from "@tanstack/react-query";

import { createClient as createClientClient } from "@/utils/supabase/client";
import { ExpenseType } from "@/utils/types";

export const getCategoriesClient = (type: ExpenseType) => {
  const supabase = createClientClient();
  return supabase.from("categories").select().eq("type", type).throwOnError();
};

export const useCategories = (type: ExpenseType) =>
  useQuery({
    queryKey: ["categories", type],
    queryFn: async () => getCategoriesClient(type).then((result) => result.data),
  });
