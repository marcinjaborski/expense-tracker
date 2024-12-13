"use client";

import { PropsWithChildren } from "react";
import { FaEllipsis } from "react-icons/fa6";
import { LuLayoutDashboard, LuList, LuPlus } from "react-icons/lu";

import { Link, usePathname } from "@/navigation";
import { cn } from "@/utils/functions";
import { isExpenseRoute } from "@/utils/routes";

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
          href="/all"
          className={cn("text-xl text-primary", {
            active: isExpenseRoute(pathname),
          })}
        >
          <LuList />
        </Link>
        <Link
          href="/other"
          className={cn("text-xl text-primary", {
            active: pathname === "/other",
          })}
        >
          <FaEllipsis />
        </Link>
      </div>
    </>
  );
}
