import { PropsWithChildren } from "react";
import { LuLayoutDashboard, LuPlus, LuList } from "react-icons/lu";
import Link from "next/link";

export default function LoggedApplication({ children }: PropsWithChildren) {
  return (
    <>
      {children}
      <div className="btm-nav">
        <Link href="/" className="text-primary text-xl">
          <LuLayoutDashboard />
        </Link>
        <Link href="create-expense" className="text-primary text-xl active">
          <LuPlus />
        </Link>
        <Link href="expenses" className="text-primary text-xl">
          <LuList />
        </Link>
      </div>
    </>
  );
}
