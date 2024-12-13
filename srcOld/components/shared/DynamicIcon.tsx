import { ComponentProps } from "react";
import { IconType } from "react-icons";
import { FaQuestion } from "react-icons/fa6";

import { categoryIcon } from "@/utils/categories";

type DynamicIconProps = ComponentProps<IconType> & {
  icon?: string;
};

export function DynamicIcon({ icon = "", ...props }: DynamicIconProps) {
  const Icon = categoryIcon[icon] || FaQuestion;
  return <Icon {...props} />;
}
