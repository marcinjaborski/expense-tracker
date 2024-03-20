"use client";

import { useQuery } from "@tanstack/react-query";

import { ExpenseReturnType } from "@/repository/prefetchExpenses";
import { createClient } from "@/utils/supabase/client";
import { ExpenseOption } from "@/utils/types";

export const getExpensesClient = (type: ExpenseOption) => {
  const supabase = createClient();
  let query = supabase.from("expenses").select("*, category (*)");

  if (type !== "all") query = query.eq("type", type);

  return query.throwOnError().returns<ExpenseReturnType[]>();
};

export const useExpenses = (type: ExpenseOption) =>
  useQuery({
    queryKey: ["expenses", type],
    queryFn: async () => getExpensesClient(type).then((result) => result.data),
  });
