import { ReactNode } from "react";

type AuthCardProps = {
  title: string;
  fields: ReactNode;
  bottomText: ReactNode;
  action: (formData: FormData) => Promise<void>;
};

export function AuthCard({ title, fields, bottomText, action }: AuthCardProps) {
  return (
    <div className="hero min-h-screen">
      <div className="card hero-content flex-col shadow-2xl">
        <form action={action} className="card-body">
          <div className="card-title">
            <h1 className="text-4xl">{title}</h1>
          </div>
          {fields}
          <input type="submit" className="btn btn-primary mt-4" />
        </form>
        <p>{bottomText}</p>
      </div>
    </div>
  );
}
