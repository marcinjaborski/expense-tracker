import { ComponentProps } from "react";
import { IconType } from "react-icons";

type ExpenseSelectProps = ComponentProps<"input"> & {
  label: string;
  Icon: IconType;
};

export function ExpenseSelect({
  label,
  Icon,
  ...inputProps
}: ExpenseSelectProps) {
  return (
    <label className="btn join-item has-[:checked]:btn-primary">
      <span className="flex flex-col items-center">
        <Icon className="text-2xl" />
        <span>{label}</span>
      </span>
      <input
        className="btn join-item hidden"
        type="radio"
        name="type"
        aria-label={label}
        {...inputProps}
      />
    </label>
  );
}
