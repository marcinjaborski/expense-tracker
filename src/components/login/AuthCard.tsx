import { ReactNode } from "react";

import { SubmitButton } from "@/components/shared";

type AuthCardProps = {
  title: string;
  fields: ReactNode;
  bottomText: ReactNode;
  action: (formData: FormData) => void;
  errorMessage?: string;
};

export function AuthCard({ title, fields, bottomText, action, errorMessage = "" }: AuthCardProps) {
  return (
    <div className="hero min-h-screen">
      <div className="card hero-content flex-col shadow-2xl">
        <form action={action} className="card-body">
          <div className="card-title">
            <h1 className="text-4xl">{title}</h1>
          </div>
          {fields}
          <SubmitButton className="mt-4" />
        </form>
        <span className="text-error">{errorMessage}</span>
        <p>{bottomText}</p>
      </div>
    </div>
  );
}
