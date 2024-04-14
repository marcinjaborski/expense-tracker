"use client";

import { groupBy } from "lodash";
import { useTranslations } from "next-intl";
import { Fragment, useRef, useState } from "react";

import { CreateDebtModal, DebtCard } from "@/components/debts";
import { FormWrap } from "@/components/shared/FormWrap";
import { useDebts } from "@/repository/useDebts";
import { notNull } from "@/utils/functions";
import { useFormatCurrency } from "@/utils/hooks/useFormatCurrency";
import { useObserver } from "@/utils/hooks/useObserver";

export function DebtsClient() {
  const t = useTranslations("Debts");
  const [showSettled, setShowSettled] = useState(false);
  const { data, fetchNextPage } = useDebts(showSettled);
  const debts = data?.pages.flat().filter(notNull) ?? [];
  const formatCurrency = useFormatCurrency();
  const observerTarget = useRef(null);
  useObserver(observerTarget, fetchNextPage);

  const groupedDebts = groupBy(debts, "person");

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
      {Object.entries(groupedDebts).map(([person, personDebts]) => (
        <Fragment key={person}>
          <div className="mt-2 text-xl font-bold">
            {person} -{" "}
            {formatCurrency(personDebts.reduce((sum, { amount, settled }) => (settled ? sum : sum + amount), 0))}
          </div>
          {personDebts.map((debt) => (
            <DebtCard key={debt.id} debt={debt} />
          ))}
        </Fragment>
      ))}
      <div ref={observerTarget} />
      <FormWrap<typeof CreateDebtModal> Form={CreateDebtModal} />
    </div>
  );
}
