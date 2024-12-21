import { Typography } from "@mui/material";

type Props = {
  number: number;
  red?: boolean;
  green?: boolean;
};

function Amount({ number, red, green }: Props) {
  const currencyFormat = new Intl.NumberFormat("pl", { style: "currency", currency: "PLN" });

  return (
    <Typography sx={{ color: red ? "error.main" : green ? "success.main" : null }}>
      {currencyFormat.format(number)}
    </Typography>
  );
}

export default Amount;
