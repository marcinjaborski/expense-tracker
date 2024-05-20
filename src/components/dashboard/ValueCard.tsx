"use client";

import { cn } from "@/utils/functions";
import { useFormatCurrency } from "@/utils/hooks/useFormatCurrency";

type ValueCardProps = {
  value: number;
  label: string;
};

export function ValueCard({ value, label }: ValueCardProps) {
  const formatCurrency = useFormatCurrency();

  return (
    <div className="card bg-neutral">
      <div className="card-body justify-between">
        <div className="card-title justify-center text-center">{label}</div>
        <div className={cn("text-center", { "text-expense": value < 0, "text-income": value > 0 })}>
          {formatCurrency(Math.abs(value))}
        </div>
      </div>
    </div>
  );
}
