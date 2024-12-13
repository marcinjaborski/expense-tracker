"use client";

import { ComponentProps } from "react";
import { useFormStatus } from "react-dom";

import { cn } from "@/utils/functions";

type SubmitButtonProps = ComponentProps<"input">;

export function SubmitButton({ className, ...props }: SubmitButtonProps) {
  const { pending } = useFormStatus();
  return (
    <input
      type="submit"
      {...props}
      className={cn("btn btn-primary", className, { disabled: pending })}
      disabled={pending}
    />
  );
}
