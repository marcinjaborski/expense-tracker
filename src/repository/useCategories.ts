"use client";

import { useQuery } from "@tanstack/react-query";

import { createClient } from "@/utils/supabase/client";
import { ExpenseOption, ExpenseType } from "@/utils/types";

export const getCategoriesClient = (type: ExpenseType | null) => {
  const supabase = createClient();
  let query = supabase.from("categories").select().order("favourite", { ascending: false });
  if (type) query = query.eq("type", type);
  return query.throwOnError();
};

export const useCategories = (type: ExpenseOption = "all") =>
  useQuery({
    queryKey: ["categories", type],
    queryFn: async () => getCategoriesClient(type === "all" ? null : type).then((result) => result.data),
  });
