import { Link } from "@/navigation";
import { LabeledInput, AuthCard } from "@/components";
import { createClient } from "@/utils/supabase/server";
import { redirect } from "@/navigation";

async function register(formData: FormData) {
  "use server";
  const supabase = createClient();
  const data = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };

  const { error } = await supabase.auth.signUp(data);
  if (error) redirect("/error");

  redirect("/");
}

export default function Register() {
  return (
    <AuthCard
      title="Register"
      action={register}
      fields={
        <>
          <LabeledInput label="Email" name="email" type="email" required />
          <LabeledInput label="Password" name="password" type="password" required />
          <LabeledInput label="Confim password" type="password" required />
        </>
      }
      bottomText={
        <>
          Already have an account?{" "}
          <Link href="/login" className="font-bold">
            Log in
          </Link>
        </>
      }
    />
  );
}
