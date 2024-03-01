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
      <div className="box-border grid min-h-screen w-screen place-items-center p-3 pb-[5rem]">{children}</div>
      <div className="btm-nav z-20">
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
