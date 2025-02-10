import { Controller, FieldValues } from "react-hook-form";
import AmountTextField from "@src/components/atoms/AmountTextField";
import { ComponentProps } from "react";

type ControlledAmountTextFieldProps<T extends FieldValues> = Omit<ComponentProps<typeof Controller<T>>, "render"> &
  ComponentProps<typeof AmountTextField>;

function ControlledAmountTextField<T extends FieldValues>({
  control,
  name,
  rules,
  shouldUnregister,
  ...amountTextFieldProps
}: ControlledAmountTextFieldProps<T>) {
  return (
    <Controller
      control={control}
      name={name}
      shouldUnregister={shouldUnregister}
      rules={rules}
      render={({ field: { value, onChange }, fieldState: { error } }) => (
        <AmountTextField
          {...amountTextFieldProps}
          value={value}
          error={!!error}
          myCurrencyInputProps={{
            onValueChange: (value) => onChange(value || 0),
          }}
        />
      )}
    />
  );
}

export default ControlledAmountTextField;
