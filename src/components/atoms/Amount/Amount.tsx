import { Typography } from "@mui/material";
import { useMemo } from "react";

type Props = {
  number: number;
  red?: boolean;
  green?: boolean;
  useNumberSignToColor?: boolean;
};

const RED = "error.main";
const GREEN = "success.main";

function Amount({ number, red, green, useNumberSignToColor }: Props) {
  const currencyFormat = new Intl.NumberFormat("pl", { style: "currency", currency: "PLN" });
  const color = useMemo(() => {
    if (useNumberSignToColor) {
      if (number > 0) return GREEN;
      else if (number < 0) return RED;
      else return null;
    }
    if (red) return RED;
    if (green) return GREEN;
    return null;
  }, [red, green, number, useNumberSignToColor]);

  return <Typography sx={{ color }}>{currencyFormat.format(number)}</Typography>;
}

export default Amount;
