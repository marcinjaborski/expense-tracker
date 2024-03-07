import { ClassValue } from "clsx";
import { ComponentProps } from "react";

import { cn } from "@/utils/functions";

type LabeledInputProps = ComponentProps<"input"> & {
  label: string;
  labelClassName?: ClassValue;
};

export function LabeledInput({ label, labelClassName = "", className, ...inputProps }: LabeledInputProps) {
  return (
    <div>
      <label className={cn("label", labelClassName)} htmlFor={inputProps.id || inputProps.name}>
        <span className="label-text text-base">{label}</span>
      </label>
      <input
        type="text"
        id={inputProps.name}
        {...inputProps}
        className={cn("input input-bordered w-full focus:input-primary", className)}
      />
    </div>
  );
}
