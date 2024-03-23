import { ComponentProps } from "react";
import { IconType } from "react-icons";

import { Link } from "@/navigation";
import { cn } from "@/utils/functions";
import { ExpenseOption } from "@/utils/types";

type ExpenseLinkProps = {
  currentType: ExpenseOption;
  type: ExpenseOption;
  Icon: IconType;
  label: string;
  href: ComponentProps<typeof Link>["href"];
};

export function ExpenseLink({ currentType, type, Icon, label, href }: ExpenseLinkProps) {
  return (
    <Link
      className={cn("btn join-item flex flex-col items-center", {
        "btn-primary": type === currentType,
      })}
      href={href}
    >
      <Icon className="text-xl" />
      {label}
    </Link>
  );
}
