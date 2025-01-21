import MyCurrencyInput from "@src/components/atoms/MyCurrencyInput";
import { InputAdornment, TextField } from "@mui/material";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { ComponentProps, ForwardedRef, forwardRef } from "react";

type Props = ComponentProps<typeof TextField> & {
  myCurrencyInputProps?: ComponentProps<typeof MyCurrencyInput>;
};

function AmountTextField({ myCurrencyInputProps, ...props }: Props, ref: ForwardedRef<HTMLInputElement>) {
  return (
    <TextField
      slotProps={{
        input: {
          inputComponent: MyCurrencyInput,
          endAdornment: (
            <InputAdornment position="end">
              <AttachMoneyIcon />
            </InputAdornment>
          ),
          inputProps: { ...myCurrencyInputProps },
        },
      }}
      ref={ref}
      {...props}
    />
  );
}

export default forwardRef(AmountTextField);
