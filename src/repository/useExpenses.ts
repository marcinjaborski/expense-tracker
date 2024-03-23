"use client";

import { useInfiniteQuery } from "@tanstack/react-query";

import { DirOption, SortOption } from "@/utils/searchParams";
import { createClient } from "@/utils/supabase/client";
import { ExpenseOption } from "@/utils/types";

import { buildExpensesQuery, EXPENSE_PAGE_SIZE } from "./buildExpensesQuery";

export const getExpensesClient = (type: ExpenseOption, page: number, q: string, sort: SortOption, dir: DirOption) => {
  const supabase = createClient();
  return buildExpensesQuery(supabase, type, page, q, sort, dir).throwOnError();
};

export const useExpenses = (type: ExpenseOption, q: string, sort: SortOption, dir: DirOption) =>
  useInfiniteQuery({
    queryKey: ["expenses", type, q, sort, dir],
    queryFn: async ({ pageParam }) => getExpensesClient(type, pageParam, q, sort, dir).then((result) => result.data),
    initialPageParam: 0,
    getNextPageParam: (lastPage, __, lastPageParam) =>
      lastPage?.length === EXPENSE_PAGE_SIZE ? lastPageParam + 1 : null,
  });
