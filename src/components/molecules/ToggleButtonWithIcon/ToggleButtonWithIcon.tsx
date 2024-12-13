import { ToggleButton, Stack } from "@mui/material";
import { ReactNode } from "react";

type Props = {
  text: string;
  icon: ReactNode;
  value: string;
};

function ToggleButtonWithIcon({ text, icon, value }: Props) {
  return (
    <ToggleButton value={value}>
      <Stack sx={{ alignItems: "center" }}>
        {icon}
        {text}
      </Stack>
    </ToggleButton>
  );
}
export default ToggleButtonWithIcon;
