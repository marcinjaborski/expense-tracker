import { ClassValue } from "clsx";
import { cn } from "@/utils/functions";
import { ComponentProps } from "react";

type LabeledInputProps = ComponentProps<"input"> & {
  label: string;
  labelClassName?: ClassValue;
};

export const LabeledInput = ({
  label,
  labelClassName,
  className,
  ...inputProps
}: LabeledInputProps) => {
  return (
    <div>
      <label
        className={cn("label", labelClassName)}
        htmlFor={inputProps.id || inputProps.name}
      >
        <span className="text-base label-text">{label}</span>
      </label>
      <input
        type="text"
        id={inputProps.name}
        {...inputProps}
        className={cn(
          "w-full input input-bordered focus:input-primary",
          className,
        )}
      />
    </div>
  );
};
