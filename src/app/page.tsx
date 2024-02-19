import { createClient } from "@/utils/supabase/server";
import { cookies } from "next/headers";

export default async function Home() {
  const cookieStore = cookies();
  const supabase = createClient(cookieStore);

  const { data } = await supabase.from("expenses").select();

  return (
    <ul>{data?.map((todo) => <li key={todo.id}>{todo.description}</li>)}</ul>
  );
}
