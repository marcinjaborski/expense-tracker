"use server";

import { createClient } from "@/utils/supabase/server";

export async function getAccounts() {
  const supabase = createClient();
  return supabase.from("accounts").select();
}
