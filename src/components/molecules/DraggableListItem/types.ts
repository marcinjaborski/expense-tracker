import { ComponentProps } from "react";
import { ListItem } from "@mui/material";

export type Item = {
  id: number;
  primary: string;
  secondary?: string;
  listItemProps?: ComponentProps<typeof ListItem>;
};
