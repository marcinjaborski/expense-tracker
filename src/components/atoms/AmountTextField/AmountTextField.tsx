import MyCurrencyInput from "@src/components/atoms/MyCurrencyInput";
import { InputAdornment, TextField } from "@mui/material";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { ComponentProps, ForwardedRef, forwardRef } from "react";

type Props = ComponentProps<typeof TextField> & {
  myCurrencyInputProps?: ComponentProps<typeof MyCurrencyInput>;
  hideMoneyIcon?: boolean;
};

function AmountTextField(
  { myCurrencyInputProps, hideMoneyIcon = false, ...props }: Props,
  ref: ForwardedRef<HTMLInputElement>,
) {
  return (
    <TextField
      slotProps={{
        input: {
          inputComponent: MyCurrencyInput,
          endAdornment: !hideMoneyIcon ? (
            <InputAdornment position="end">
              <AttachMoneyIcon />
            </InputAdornment>
          ) : null,
          inputProps: { ...myCurrencyInputProps },
        },
      }}
      ref={ref}
      {...props}
    />
  );
}

export default forwardRef(AmountTextField);
