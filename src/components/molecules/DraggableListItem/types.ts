import { ComponentProps, ReactNode } from "react";
import { ListItem } from "@mui/material";

export type Item = {
  id: number;
  primary: ReactNode;
  secondary?: string;
  listItemProps?: ComponentProps<typeof ListItem>;
};
