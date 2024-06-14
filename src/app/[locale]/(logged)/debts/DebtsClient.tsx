"use client";

import { useQueryClient } from "@tanstack/react-query";
import { groupBy } from "lodash";
import { DateTime } from "luxon";
import { useTranslations } from "next-intl";
import { Fragment, useRef, useState } from "react";
import { FaHandshake } from "react-icons/fa6";

import { ConfirmModal, CreateButton } from "@/components";
import { CreateDebtModal, DebtCard } from "@/components/debts";
import { FormWrap } from "@/components/shared/FormWrap";
import { useDebts } from "@/repository/useDebts";
import { useDeleteDebt } from "@/repository/useDeleteDebt";
import { ModalContext } from "@/utils/context/ModalContext";
import { cn, notNull } from "@/utils/functions";
import { useDebtsByPerson, useFormatCurrency, useMutateModals, useObserver } from "@/utils/hooks";
import { CREATE_DEBT_MODAL } from "@/utils/ids";
import { createClient } from "@/utils/supabase/client";

export function DebtsClient() {
  const t = useTranslations("Debts");
  const supabase = createClient();
  const queryClient = useQueryClient();
  const [showSettled, setShowSettled] = useState(false);
  const { data, fetchNextPage } = useDebts(showSettled);
  const { mutate: deleteDebt } = useDeleteDebt();
  const debts = data?.pages.flat().filter(notNull) ?? [];
  const debtsByPerson = useDebtsByPerson();
  const formatCurrency = useFormatCurrency();
  const observerTarget = useRef(null);
  useObserver(observerTarget, fetchNextPage);

  const { contextValue, deleteId, updateId } = useMutateModals(CREATE_DEBT_MODAL);

  const debtToUpdate = debts?.find(({ id }) => id === updateId);
  const groupedDebts = groupBy(debts, "person");

  const settleAll = async (person: string, amount: number) => {
    await supabase
      .from("debts")
      .insert({ person, amount, description: t("settleAll", { date: DateTime.now().toLocaleString() }) });
    await supabase.from("debts").update({ settled: true }).eq("settled", false);
    await queryClient.invalidateQueries({ queryKey: ["debts"] });
    setShowSettled(true);
  };

  return (
    <ModalContext.Provider value={contextValue}>
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
            <div className="mt-2 flex h-12 items-center gap-2 text-xl font-bold">
              <span>{person}:</span>
              {debtsByPerson ? (
                <span
                  className={cn({
                    "text-expense": debtsByPerson[person] < 0,
                    "text-income": debtsByPerson[person] > 0,
                  })}
                >
                  {formatCurrency(Math.abs(debtsByPerson[person]))}
                </span>
              ) : (
                <span className="loading loading-spinner loading-sm" />
              )}
              {debtsByPerson && debtsByPerson[person] !== 0 ? (
                <button
                  type="button"
                  className="btn text-xl"
                  aria-label={t("settleAllButton")}
                  onClick={() => debtsByPerson && settleAll(person, -debtsByPerson[person])}
                >
                  <FaHandshake />
                </button>
              ) : null}
            </div>
            {personDebts.map((debt) => (
              <DebtCard key={debt.id} debt={debt} />
            ))}
          </Fragment>
        ))}
        <div ref={observerTarget} />
      </div>
      <CreateButton label={t("createDebt")} createFn={contextValue.showCreateModal} />
      <FormWrap<typeof CreateDebtModal> Form={CreateDebtModal} debt={debtToUpdate} />
      <ConfirmModal title={t("confirmDelete")} onConfirm={() => deleteId && deleteDebt(deleteId)} />
    </ModalContext.Provider>
  );
}
