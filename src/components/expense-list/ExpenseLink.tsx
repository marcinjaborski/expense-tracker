import { cn } from "@/utils/functions";
import { ExpenseType } from "@/utils/types";
import { Link } from "@/navigation";
import { IconType } from "react-icons";
import { AppPathnames } from "@/config";

type ExpenseLinkProps = {
  currentType: ExpenseType;
  type: ExpenseType;
  Icon: IconType;
  label: string;
  href: AppPathnames;
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
