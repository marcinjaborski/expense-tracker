import { useTranslations } from "next-intl";
import { LuPencil, LuTrash } from "react-icons/lu";

import { toCurrency } from "@/utils/functions";
import { Tables } from "@/utils/supabase/database.types";

type AccountCardProps = {
  account: Tables<"accounts">;
};

export function AccountCard({ account }: AccountCardProps) {
  const t = useTranslations("Accounts");
  return (
    <div className="card w-full bg-base-100 shadow-xl">
      <div className="card-body">
        <div className="card-title">{account.name}</div>
        <p>{t(toCurrency(account.currency))}</p>
        <div className="card-actions justify-end [&_svg]:text-xl">
          <button className="btn" type="button" aria-label={t("edit")}>
            <LuPencil />
          </button>
          <button className="btn" type="button" aria-label={t("delete")}>
            <LuTrash />
          </button>
        </div>
      </div>
    </div>
  );
}
