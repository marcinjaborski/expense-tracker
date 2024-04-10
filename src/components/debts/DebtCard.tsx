import { Tables } from "@/utils/supabase/database.types";

type DebtCardProps = {
  debt: Tables<"debts">;
};

export function DebtCard({ debt }: DebtCardProps) {
  return (
    <div className="card w-full bg-base-100 shadow-xl">
      <div className="card-body">{debt.amount}</div>
    </div>
  );
}
