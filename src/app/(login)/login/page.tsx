import { LabeledInput } from "@/components";
import Link from "next/link";
import { AuthCard } from "@/app/(login)/(components)";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "next/navigation";

async function login(formData: FormData) {
  "use server";
  const supabase = createClient();
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signInWithPassword(data);
  if (error) redirect("/error");

  redirect("/");
}

export default function Login() {
  return (
    <AuthCard
      title="Login"
      action={login}
      fields={
        <>
          <LabeledInput label="Email" name="email" type="email" required />
          <LabeledInput
            label="Password"
            name="password"
            type="password"
            required
          />
        </>
      }
      bottomText={
        <>
          {"Don't have and account? "}
          <Link href="/register" className="font-bold">
            Sign up
          </Link>
        </>
      }
    />
  );
}
