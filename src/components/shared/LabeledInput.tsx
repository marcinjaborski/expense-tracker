import { ClassValue } from "clsx";
import { ComponentProps } from "react";

import { cn } from "@/utils/functions";

type LabeledInputProps = ComponentProps<"input"> & {
  label: string;
  labelClassName?: ClassValue;
  errorMessage?: string;
};

export function LabeledInput({
  label,
  labelClassName = "",
  errorMessage = "",
  className,
  ...inputProps
}: LabeledInputProps) {
  return (
    <label>
      <div className={cn("label", labelClassName)}>
        <span className="label-text text-base">{label}</span>
      </div>
      <input type="text" {...inputProps} className={cn("input input-bordered w-full focus:input-primary", className)} />
      <div className="label">
        <span className="label-text-alt text-error">{errorMessage}</span>
      </div>
    </label>
  );
}
