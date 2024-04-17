import { redirect } from "@/navigation";
import { createClient } from "@/utils/supabase/server";
import { isDatabaseTable } from "@/utils/types";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const table = searchParams.get("table");
  if (!isDatabaseTable(table)) return redirect("/error");

  const supabase = createClient();
  const { data: csv } = await supabase.from(table).select().csv();
  if (csv === null) return redirect("/error");

  const buffer = Buffer.from(csv, "utf8");
  const headers = new Headers();
  headers.append("Content-Disposition", `attachment; filename="${table}.txt"`);
  headers.append("Content-Type", "application/text");

  return new Response(buffer, {
    headers,
  });
}
