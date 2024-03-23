"use client";

import { useQuery } from "@tanstack/react-query";

import { DirOption, SortOption } from "@/utils/searchParams";
import { createClient } from "@/utils/supabase/client";
import { ExpenseOption } from "@/utils/types";

import { buildExpensesQuery } from "./buildExpensesQuery";

export const getExpensesClient = (type: ExpenseOption, q: string, sort: SortOption, dir: DirOption) => {
  const supabase = createClient();
  return buildExpensesQuery(supabase, type, q, sort, dir).throwOnError();
};

export const useExpenses = (type: ExpenseOption, q: string, sort: SortOption, dir: DirOption) =>
  useQuery({
    queryKey: ["expenses", type, q, sort, dir],
    queryFn: async () => getExpensesClient(type, q, sort, dir).then((result) => result.data),
  });
