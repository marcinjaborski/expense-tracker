"use client";

import { useQuery } from "@tanstack/react-query";

import { createClient } from "@/utils/supabase/client";

export const getAccountsClient = () => {
  const supabase = createClient();
  return supabase.from("accounts").select().order("favourite", { ascending: false }).throwOnError();
};

export const useAccounts = () =>
  useQuery({
    queryKey: ["accounts"],
    queryFn: async () => getAccountsClient().then((result) => result.data),
  });
