"use client";

import { useQuery } from "@tanstack/react-query";

import { ExpenseReturnType } from "@/repository/prefetchExpenses";
import { DIR, DirOption, SortOption } from "@/utils/searchParams";
import { createClient } from "@/utils/supabase/client";
import { ExpenseOption } from "@/utils/types";

export const getExpensesClient = (type: ExpenseOption, sort: SortOption, dir: DirOption) => {
  const supabase = createClient();
  let query = supabase.from("expenses").select("*, category (*)");

  if (type !== "all") query = query.eq("type", type);
  query = query.order(sort, { ascending: dir === DIR.asc });
  return query.throwOnError().returns<ExpenseReturnType[]>();
};

export const useExpenses = (type: ExpenseOption, sort: SortOption, dir: DirOption) =>
  useQuery({
    queryKey: ["expenses", type, sort, dir],
    queryFn: async () => getExpensesClient(type, sort, dir).then((result) => result.data),
  });
