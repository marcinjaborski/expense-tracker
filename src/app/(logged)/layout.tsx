"use client";
import { PropsWithChildren } from "react";
import { LuLayoutDashboard, LuPlus, LuList } from "react-icons/lu";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/utils/functions";
import { expensesRoutes } from "@/utils/routes";

export default function LoggedApplication({ children }: PropsWithChildren) {
  const pathname = usePathname();

  return (
    <>
      <div className="p-3">{children}</div>
      <div className="btm-nav">
        <Link
          href="/"
          className={cn("text-xl text-primary", {
            active: pathname === "/",
          })}
        >
          <LuLayoutDashboard />
        </Link>
        <Link
          href="/create-expense"
          className={cn("text-xl text-primary", {
            active: pathname === "/create-expense",
          })}
        >
          <LuPlus />
        </Link>
        <Link
          href="/expenses"
          className={cn("text-xl text-primary", {
            active: expensesRoutes.find((route) => pathname.includes(route)),
          })}
        >
          <LuList />
        </Link>
      </div>
    </>
  );
}
