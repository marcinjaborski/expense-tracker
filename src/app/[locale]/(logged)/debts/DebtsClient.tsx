"use client";

import { useTranslations } from "next-intl";
import { useRef, useState } from "react";

import { CreateDebtModal, DebtCard } from "@/components/debts";
import { FormWrap } from "@/components/shared/FormWrap";
import { useDebts } from "@/repository/useDebts";
import { notNull } from "@/utils/functions";
import { useObserver } from "@/utils/hooks/useObserver";

export function DebtsClient() {
  const t = useTranslations("Debts");
  const [showSettled, setShowSettled] = useState(false);
  const { data, fetchNextPage } = useDebts(showSettled);
  const debts = data?.pages.flat().filter(notNull) ?? [];
  const observerTarget = useRef(null);
  useObserver(observerTarget, fetchNextPage);

  return (
    <div className="flex w-full flex-col gap-2">
      <div className="form-control self-start">
        <label className="label flex cursor-pointer gap-1">
          <span className="label-text text-lg">{t("showSettled")}</span>
          <input
            type="checkbox"
            checked={showSettled}
            className="checkbox"
            onChange={(e) => setShowSettled(e.target.checked)}
          />
        </label>
      </div>
      {debts?.map((debt) => <DebtCard key={debt.id} debt={debt} />)}
      <div ref={observerTarget} />
      <FormWrap<typeof CreateDebtModal> Form={CreateDebtModal} />
    </div>
  );
}
