import { ComponentProps, forwardRef } from "react";
import CurrencyInput from "react-currency-input-field";

type Props = Omit<ComponentProps<typeof CurrencyInput>, "defaultValue">;

const MyCurrencyInput = forwardRef<HTMLInputElement, Props>((props, ref) => {
  return (
    <CurrencyInput
      ref={ref}
      decimalsLimit={2}
      decimalSeparator="."
      intlConfig={{ locale: "pl", currency: "pln" }}
      {...props}
    />
  );
});

export default MyCurrencyInput;
