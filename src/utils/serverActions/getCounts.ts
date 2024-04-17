"use server";

import { createClient } from "@/utils/supabase/server";
import { DatabaseTable } from "@/utils/types";

export async function getCounts() {
  "use server";

  const supabase = createClient();
  const tables = ["expenses", "categories", "accounts", "debts"] satisfies DatabaseTable[];
  const promises = tables.map((table) => supabase.from(table).select("*", { count: "exact", head: true }));
  const results = await Promise.allSettled(promises);
  return results.map((result, index) => ({
    table: tables[index],
    count: result.status === "fulfilled" ? result.value.count : null,
  }));
}
